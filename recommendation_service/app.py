from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
import os
from supabase import create_client, Client
from PIL import Image
import requests
from io import BytesIO
import logging
import json
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── Supabase Client ───────────────────────────────────────────────────────────
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

_sb_client: Optional[Client] = None

def get_supabase() -> Optional[Client]:
    global _sb_client
    if _sb_client is None and SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY:
        try:
            _sb_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
            logger.info("Supabase client initialised")
        except Exception as e:
            logger.error(f"Failed to create Supabase client: {e}")
    return _sb_client


# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(title="Wardro8e AI Embeddings", version="2.1.0")

# In production set ALLOWED_ORIGINS="https://your-admin.vercel.app,https://your-app.com"
_raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",")] if _raw_origins != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── CLIP Model ────────────────────────────────────────────────────────────────
try:
    model = SentenceTransformer('clip-ViT-B-32')
    logger.info("CLIP model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load CLIP model: {e}")
    model = None


# ── Request Models ────────────────────────────────────────────────────────────
class ImageRequest(BaseModel):
    image_url: str

class SimilarProductsRequest(BaseModel):
    product_id: str
    limit: int = 12
    exclude_ids: List[str] = []

class PersonalizedFeedRequest(BaseModel):
    user_id: str
    limit: int = 20
    offset: int = 0
    exclude_ids: List[str] = []
    gender: Optional[str] = None


# ── Scoring Helpers ───────────────────────────────────────────────────────────
def jaccard(list_a, list_b) -> float:
    if not list_a and not list_b:
        return 0.0
    set_a = set(s.lower() for s in (list_a or []))
    set_b = set(s.lower() for s in (list_b or []))
    if not set_a or not set_b:
        return 0.0
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    return intersection / union if union > 0 else 0.0


def price_proximity(price_a: float, price_b: float) -> float:
    if not price_a or not price_b:
        return 0.0
    return 1.0 - abs(price_a - price_b) / max(price_a, price_b)


def cosine_sim(a: list, b: list) -> float:
    """Cosine similarity between two embedding vectors (Python/numpy)."""
    va = np.array(a, dtype=np.float32)
    vb = np.array(b, dtype=np.float32)
    norm_a, norm_b = np.linalg.norm(va), np.linalg.norm(vb)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(np.dot(va, vb) / (norm_a * norm_b))


def compute_combined_score(source: dict, candidate: dict) -> float:
    visual      = candidate.get('visual_similarity', 0)
    style_ov    = jaccard(source.get('style'),   candidate.get('style'))
    occasion_ov = jaccard(source.get('occasion'), candidate.get('occasion'))
    color_ov    = jaccard(source.get('colors'),  candidate.get('colors'))
    season_ov   = jaccard(source.get('season'),  candidate.get('season'))
    material_ov = jaccard(source.get('materials') or [], candidate.get('materials') or [])
    src_pat  = (source.get('pattern') or '').lower()
    cand_pat = (candidate.get('pattern') or '').lower()
    pattern_m   = 1.0 if src_pat and cand_pat and src_pat == cand_pat else 0.0
    price_prox  = price_proximity(source.get('price', 0), candidate.get('price', 0))

    return (
        visual       * 0.40 +
        style_ov     * 0.15 +
        occasion_ov  * 0.10 +
        color_ov     * 0.10 +
        price_prox   * 0.10 +
        season_ov    * 0.05 +
        pattern_m    * 0.05 +
        material_ov  * 0.05
    )


def parse_json_field(value) -> list:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        try:
            return json.loads(value)
        except Exception:
            return []
    return []


def row_to_product(row: dict, visual_similarity: float = 0.0) -> dict:
    attrs = row.get('attributes') or {}
    if isinstance(attrs, str):
        try:
            attrs = json.loads(attrs)
        except Exception:
            attrs = {}
    return {
        'id': str(row['id']),
        'title': row.get('title', ''),
        'price': float(row.get('price') or 0),
        'sale_price': float(row['sale_price']) if row.get('sale_price') is not None else None,
        'image_urls': parse_json_field(row.get('image_urls')),
        'affiliate_url': row.get('affiliate_url'),
        'source_brand_name': row.get('source_brand_name'),
        'source_platform': row.get('source_platform'),
        'category': row.get('category'),
        'subcategory': row.get('subcategory'),
        'gender': row.get('gender'),
        'colors': parse_json_field(row.get('colors')),
        'style': parse_json_field(row.get('style')),
        'occasion': parse_json_field(row.get('occasion')),
        'season': parse_json_field(row.get('season')),
        'size_range': parse_json_field(row.get('size_range')),
        'fit_type': row.get('fit_type'),
        'pattern': (attrs.get('pattern') or '') if attrs else '',
        'materials': parse_json_field(attrs.get('materials')) if attrs else [],
        'attributes': attrs,
        'is_featured': row.get('is_featured', False),
        'created_at': str(row.get('created_at') or ''),
        'visual_similarity': visual_similarity,
    }


def apply_brand_diversity(products: list, max_per_brand: int = 2, limit: int = 20) -> list:
    brand_count: dict = {}
    diverse = []
    for p in products:
        brand = p.get('source_brand_name') or 'unknown'
        brand_count[brand] = brand_count.get(brand, 0) + 1
        if brand_count[brand] <= max_per_brand:
            diverse.append(p)
        if len(diverse) >= limit:
            break
    return diverse


def gender_filter(rows: list, gender: Optional[str]) -> list:
    if not gender or gender in ('both', 'unisex'):
        return rows
    g = gender.lower()
    return [r for r in rows if r.get('gender') == g or r.get('gender') == 'unisex']


def _parse_prefs(row) -> dict:
    if not row:
        return {}
    price_range = row.get('price_range') or {}
    if isinstance(price_range, str):
        try:
            price_range = json.loads(price_range)
        except Exception:
            price_range = {}
    return {
        'style_tags': parse_json_field(row.get('style_tags')),
        'favorite_colors': parse_json_field(row.get('favorite_colors')),
        'pattern_preferences': parse_json_field(row.get('pattern_preferences')),
        'price_min': float(price_range.get('min', 0)),
        'price_max': float(price_range.get('max', 100000)),
    }


def _preference_score(product: dict, prefs: dict) -> float:
    if not prefs:
        return 0.0
    style_score  = jaccard(prefs.get('style_tags'), product.get('style')) * 0.35
    color_score  = jaccard(prefs.get('favorite_colors'), product.get('colors')) * 0.25
    pattern_prefs  = [p.lower() for p in (prefs.get('pattern_preferences') or [])]
    product_pattern = (product.get('pattern') or '').lower()
    pattern_score  = 0.15 if (product_pattern and product_pattern in pattern_prefs) else 0.0
    price = product.get('sale_price') or product.get('price') or 0
    price_min, price_max = prefs.get('price_min', 0), prefs.get('price_max', 100000)
    price_score = 0.15 if (price_min <= price <= price_max) else 0.0
    try:
        created = datetime.fromisoformat((product.get('created_at') or '').replace('Z', '+00:00'))
        age_days = (datetime.now(timezone.utc) - created).days
        recency_score = 0.10 if age_days <= 7 else 0.0
    except Exception:
        recency_score = 0.0
    return style_score + color_score + pattern_score + price_score + recency_score


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    sb = get_supabase()
    return {
        "message": "Wardro8e AI Embeddings Service",
        "status": "healthy",
        "model_loaded": model is not None,
        "db_connected": sb is not None,
    }


@app.get("/health")
async def health_check():
    sb = get_supabase()
    return {
        "status": "healthy",
        "model": "clip-ViT-B-32",
        "model_loaded": model is not None,
        "db_connected": sb is not None,
        "service": "embeddings+recommendations",
    }


@app.post("/generate-embedding")
async def generate_embedding(request: ImageRequest):
    """Generate a CLIP embedding for a clothing image URL."""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    try:
        response = requests.get(request.image_url, timeout=10)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content))
        if image.mode != 'RGB':
            image = image.convert('RGB')
        embedding = model.encode([image])
        embedding_list = embedding[0].tolist()
        logger.info(f"Generated embedding for: {request.image_url[:50]}...")
        return {
            "embedding": embedding_list,
            "dimensions": len(embedding_list),
            "model": "clip-ViT-B-32",
        }
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Failed to download image: {str(e)}")
    except Exception as e:
        logger.error(f"Error generating embedding: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate embedding: {str(e)}")


@app.post("/similar-products")
async def find_similar_products(request: SimilarProductsRequest):
    """
    Find products visually and semantically similar to a given product.
    Visual similarity is computed in Python via numpy cosine similarity.
    """
    sb = get_supabase()
    if sb is None:
        raise HTTPException(status_code=503, detail="Database not available")

    # 1. Fetch source product
    res = (
        sb.table('products')
        .select('*')
        .eq('id', request.product_id)
        .eq('is_active', True)
        .limit(1)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="Product not found")

    source_row = res.data[0]
    source = row_to_product(source_row)

    # 2. Fetch candidate products (all active, excludes source + caller's exclusions)
    exclude_set = set([request.product_id] + request.exclude_ids)
    cand_res = (
        sb.table('products')
        .select('*')
        .eq('is_active', True)
        .neq('id', request.product_id)
        .limit(400)
        .execute()
    )
    candidates_raw = [r for r in (cand_res.data or []) if r['id'] not in exclude_set]

    # Gender filter (same-gender + unisex)
    candidates_raw = gender_filter(candidates_raw, source.get('gender'))

    # 3. Score each candidate
    source_emb = source_row.get('embedding')
    results = []
    for row in candidates_raw:
        cand_emb = row.get('embedding')
        vis_sim = cosine_sim(source_emb, cand_emb) if source_emb and cand_emb else 0.0
        p = row_to_product(row, visual_similarity=vis_sim)
        p['score'] = compute_combined_score(source, p)
        results.append(p)

    results.sort(key=lambda x: x['score'], reverse=True)
    diverse = apply_brand_diversity(results, max_per_brand=2, limit=request.limit)

    logger.info(f"similar-products: {len(diverse)} results for {request.product_id}")
    return diverse[:request.limit]


@app.post("/personalized-feed")
async def personalized_feed(request: PersonalizedFeedRequest):
    """
    Returns a personalized feed for a user.
    Strategy tiers: behavioral → preference-based → cold start (featured/new).
    """
    sb = get_supabase()
    if sb is None:
        raise HTTPException(status_code=503, detail="Database not available")

    # 1. Fetch user preferences
    prefs_res = (
        sb.table('user_preferences')
        .select('*')
        .eq('user_id', request.user_id)
        .limit(1)
        .execute()
    )
    prefs_row = prefs_res.data[0] if prefs_res.data else None

    # 2. Fetch recent interactions (last 30 days)
    thirty_days_ago = (datetime.now(timezone.utc) - timedelta(days=30)).isoformat()
    interactions_res = (
        sb.table('user_interactions')
        .select('product_id, interaction_type')
        .eq('user_id', request.user_id)
        .gte('created_at', thirty_days_ago)
        .execute()
    )
    weight_map = {'purchase': 1.0, 'save': 0.7, 'like': 0.5, 'view': 0.2, 'dismiss': -0.3}
    interaction_scores: dict = {}
    for row in (interactions_res.data or []):
        pid = str(row['product_id'])
        w = weight_map.get(row['interaction_type'], 0.1)
        interaction_scores[pid] = interaction_scores.get(pid, 0) + w

    # Derive gender
    user_gender = request.gender
    if not user_gender and prefs_row:
        user_gender = prefs_row.get('gender')

    # 3. Fetch all active candidate products (up to 400)
    exclude_set = set(request.exclude_ids or [])
    cand_res = (
        sb.table('products')
        .select('*')
        .eq('is_active', True)
        .limit(400)
        .execute()
    )
    all_candidates = [r for r in (cand_res.data or []) if r['id'] not in exclude_set]
    all_candidates = gender_filter(all_candidates, user_gender)

    # 4. Choose strategy
    has_interactions = bool(interaction_scores)
    has_prefs = bool(prefs_row and (
        prefs_row.get('style_tags') or prefs_row.get('favorite_colors')
    ))
    prefs = _parse_prefs(prefs_row)

    if has_interactions:
        # Behavioral: score candidates by similarity to top anchor products
        top_anchors = sorted(
            [(pid, score) for pid, score in interaction_scores.items() if score > 0],
            key=lambda x: -x[1]
        )[:5]
        anchor_ids = [pid for pid, _ in top_anchors]

        # Fetch anchor embeddings + metadata
        anchor_res = (
            sb.table('products')
            .select('id, embedding, style, occasion, colors, price, attributes')
            .in_('id', anchor_ids)
            .execute()
        )
        anchor_by_id = {str(r['id']): r for r in (anchor_res.data or [])}

        scored = []
        for row in all_candidates:
            p = row_to_product(row)
            cand_emb = row.get('embedding')
            behavioral_score = 0.0

            for anchor_id, anchor_weight in top_anchors:
                anchor = anchor_by_id.get(anchor_id)
                if not anchor:
                    continue
                anchor_emb = anchor.get('embedding')
                vis_sim = cosine_sim(anchor_emb, cand_emb) if anchor_emb and cand_emb else 0.0
                attrs = anchor.get('attributes') or {}
                if isinstance(attrs, str):
                    try:
                        attrs = json.loads(attrs)
                    except Exception:
                        attrs = {}
                anchor_dict = {
                    'style':     parse_json_field(anchor.get('style')),
                    'occasion':  parse_json_field(anchor.get('occasion')),
                    'colors':    parse_json_field(anchor.get('colors')),
                    'price':     float(anchor.get('price') or 0),
                    'materials': parse_json_field(attrs.get('materials')),
                    'pattern':   (attrs.get('pattern') or '').lower(),
                    'season':    [],
                }
                p['visual_similarity'] = vis_sim
                behavioral_score += compute_combined_score(anchor_dict, p) * float(anchor_weight)

            pref_score = _preference_score(p, prefs) if has_prefs else 0.0
            total = 0.7 * behavioral_score + 0.3 * pref_score
            scored.append((p, total))

    elif has_prefs:
        candidates = [row_to_product(r) for r in all_candidates]
        scored = [(p, _preference_score(p, prefs)) for p in candidates]

    else:
        # Cold start: featured first, then newest
        def cold_sort_key(r):
            featured = 0 if r.get('is_featured') else 1
            try:
                ts = datetime.fromisoformat(
                    (r.get('created_at') or '1970-01-01T00:00:00+00:00').replace('Z', '+00:00')
                ).timestamp()
            except Exception:
                ts = 0.0
            return (featured, -ts)

        all_candidates.sort(key=cold_sort_key)
        results = [row_to_product(r) for r in all_candidates]
        return results[request.offset: request.offset + request.limit]

    # Sort, diversify, paginate
    scored.sort(key=lambda x: -x[1])
    diverse = apply_brand_diversity(
        [p for p, _ in scored],
        max_per_brand=2,
        limit=len(scored),
    )
    paginated = diverse[request.offset: request.offset + request.limit]
    logger.info(f"personalized-feed: {len(paginated)} results for user {request.user_id}")
    return paginated
