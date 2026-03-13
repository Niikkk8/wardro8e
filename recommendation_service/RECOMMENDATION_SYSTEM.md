# Wardro8e Recommendation System — Architecture & Implementation Guide

## Current State

### What Exists

| Component | Location | Status |
|-----------|----------|--------|
| CLIP embedding generation | `wardro8e/recommendation_service/main.py` | Working — generates 512-dim vectors from product images |
| Admin product form | `wardro8e-admin/app/admin/(protected)/products/add/page.tsx` | Working — collects all structured metadata |
| Admin products API | `wardro8e-admin/app/api/admin/products/route.ts` | Working — validates, stores, triggers embedding generation |
| Style quiz (user prefs) | `wardro8e-app/src/app/(auth)/style-quiz.tsx` | Working — collects style_tags, favorite_colors, pattern_preferences |
| pgvector extension | Supabase (products.embedding column) | Configured — VECTOR(512) with ivfflat index |
| Similar products endpoint | — | **Not built yet** |
| Personalized feed endpoint | — | **Not built yet** |

### Data Already Being Collected

**From admins (per product):**

| Field | Type | Column vs JSONB | Purpose |
|-------|------|-----------------|---------|
| `gender` | `VARCHAR(20)` | Column | Hard filter |
| `colors` | `TEXT[]` | Column | Filtering + matching |
| `size_range` | `TEXT[]` | Column | Filtering |
| `fit_type` | `VARCHAR(50)` | Column | Soft boost |
| `style` | `TEXT[]` | Column | Soft boost + personalization |
| `occasion` | `TEXT[]` | Column | Soft boost + personalization |
| `season` | `TEXT[]` | Column | Soft boost + seasonal relevance |
| `attributes.pattern` | `JSONB` | JSONB | Matching + personalization |
| `attributes.materials` | `JSONB` | JSONB | Soft boost |
| `attributes.sleeve_type` | `JSONB` | JSONB | Category-specific |
| `attributes.neck_type` | `JSONB` | JSONB | Category-specific |
| `attributes.length` | `JSONB` | JSONB | Category-specific |
| `attributes.waist_type` | `JSONB` | JSONB | Category-specific |
| `attributes.closure_type` | `JSONB` | JSONB | Category-specific |
| `attributes.care_instructions` | `JSONB` | JSONB | Display only |
| `embedding` | `VECTOR(512)` | Column | Visual similarity |

**From users (via style quiz):**

| Field | Stored In | Purpose |
|-------|-----------|---------|
| `style_tags` | `user_preferences.style_tags` | Match against `products.style` |
| `favorite_colors` | `user_preferences.favorite_colors` | Match against `products.colors` |
| `pattern_preferences` | `user_preferences.pattern_preferences` | Match against `products.attributes->pattern` |
| `size_preferences` | `user_preferences.size_preferences` | Match against `products.size_range` |
| `price_range` | `user_preferences.price_range` | Filter by price |

**From user behavior (implicit, via `user_interactions` table):**

| Interaction | Weight | Signal |
|-------------|--------|--------|
| `purchase` | 1.0 | Strongest — user spent money |
| `save` | 0.7 | Saved to collection — high intent |
| `like` | 0.5 | Liked — moderate interest |
| `view` | 0.2 | Viewed — passive interest |

---

## Three Layers of Recommendations

### Layer 1: Visual Similarity (CLIP Embeddings)

**What it does:** Finds products that *look* similar based on image content.

**How it works:**
1. When admin creates a product, the first image is sent to the Python service
2. CLIP model converts the image to a 512-dimensional vector (embedding)
3. The embedding is stored in `products.embedding`
4. To find similar products, pgvector computes cosine distance between embeddings

**Query:**
```sql
SELECT id, title, price, image_urls, affiliate_url,
       source_brand_name, category, gender,
       1 - (embedding <=> $1) AS visual_similarity
FROM products
WHERE id != $2
  AND is_active = true
ORDER BY embedding <=> $1
LIMIT 50;
```

`<=>` is pgvector's cosine distance operator. Lower distance = more similar.
`1 - distance` gives a similarity score from 0 to 1.

**Strengths:** Captures visual patterns, colors, textures, silhouettes that structured data can't describe.

**Weakness:** A red men's jacket and a red women's dress might score high because they look similar visually. Needs metadata filtering to be useful.

---

### Layer 2: Metadata Filtering & Re-ranking

**What it does:** Filters out irrelevant results and boosts relevant ones using the structured data admins enter.

**Hard filters (applied in the WHERE clause):**
- `gender` — must match the source product's gender or be 'unisex'
- `is_active` — must be true
- Optionally: `category` — same category for tighter results

**Soft boosts (applied as scoring after fetching):**

Each boost produces a value between 0.0 and 1.0:

| Factor | Weight | How to compute |
|--------|--------|---------------|
| Visual similarity (CLIP) | 0.40 | `1 - cosine_distance` (from pgvector) |
| Style overlap | 0.15 | `len(intersection) / len(union)` of style arrays |
| Occasion overlap | 0.10 | Same Jaccard similarity |
| Color overlap | 0.10 | Same Jaccard similarity |
| Season match | 0.05 | `len(intersection) / len(union)` of season arrays |
| Pattern match | 0.05 | 1.0 if same pattern, 0.0 otherwise |
| Material overlap | 0.05 | Same Jaccard similarity |
| Price proximity | 0.10 | `1 - abs(price_a - price_b) / max(price_a, price_b)` |

**Final score formula:**
```
final_score = visual_similarity * 0.40
            + style_overlap    * 0.15
            + occasion_overlap * 0.10
            + color_overlap    * 0.10
            + price_proximity  * 0.10
            + season_match     * 0.05
            + pattern_match    * 0.05
            + material_overlap * 0.05
```

**Implementation approach:**
1. Query pgvector for top 50 visually similar products (with hard filters in WHERE)
2. Fetch full metadata for those 50 products
3. Compute combined score in Python for each
4. Return top 10-20 re-ranked results

---

### Layer 3: User Personalization

**What it does:** Uses the user's style quiz answers and interaction history to build a personalized feed.

**Two sub-strategies:**

#### A. Preference-Based (for new/cold users with quiz data)

Match products against `user_preferences`:

```
preference_score = style_match     * 0.35   -- product.style ∩ user.style_tags
                 + color_match     * 0.25   -- product.colors ∩ user.favorite_colors
                 + pattern_match   * 0.15   -- product.attributes.pattern in user.pattern_preferences
                 + price_in_range  * 0.15   -- product.price between user.price_range.min and max
                 + recency_boost   * 0.10   -- products added in last 7 days get a bonus
```

#### B. Behavior-Based (for users with interaction history)

1. Get user's top 5 most-interacted products (weighted by interaction type)
2. For each, find visually similar products using Layer 1 + Layer 2
3. Merge, deduplicate, and re-rank
4. Blend with preference-based results (70% behavioral, 30% preference-based)

---

## Implementation Plan

### Endpoint 1: Similar Products

**Use case:** User is viewing a product → show "More Like This"

**Route:** `POST /similar-products`

**Request:**
```json
{
  "product_id": "uuid",
  "limit": 12
}
```

**Logic (Python service):**
```python
@app.post("/similar-products")
async def find_similar_products(product_id: str, limit: int = 12):
    async with db_pool.acquire() as conn:
        # 1. Get source product's embedding + metadata
        source = await conn.fetchrow("""
            SELECT embedding, gender, category, style, occasion,
                   season, colors, price,
                   attributes->>'pattern' as pattern,
                   attributes->'materials' as materials
            FROM products WHERE id = $1
        """, product_id)

        if not source or not source['embedding']:
            raise HTTPException(404, "Product not found or has no embedding")

        # 2. Get top 50 visually similar with hard filters
        candidates = await conn.fetch("""
            SELECT id, title, price, sale_price, image_urls,
                   affiliate_url, source_brand_name, category,
                   gender, style, occasion, season, colors,
                   attributes->>'pattern' as pattern,
                   attributes->'materials' as materials,
                   1 - (embedding <=> $1) AS visual_similarity
            FROM products
            WHERE id != $2
              AND is_active = true
              AND gender IN ($3, 'unisex')
            ORDER BY embedding <=> $1
            LIMIT 50
        """, source['embedding'], product_id, source['gender'])

        # 3. Re-rank with metadata scoring
        results = []
        for c in candidates:
            score = compute_combined_score(source, c)
            results.append({**dict(c), 'score': score})

        results.sort(key=lambda x: x['score'], reverse=True)
        return results[:limit]


def compute_combined_score(source, candidate):
    visual = candidate.get('visual_similarity', 0)
    style_ov = jaccard(source.get('style') or [], candidate.get('style') or [])
    occasion_ov = jaccard(source.get('occasion') or [], candidate.get('occasion') or [])
    color_ov = jaccard(source.get('colors') or [], candidate.get('colors') or [])
    season_ov = jaccard(source.get('season') or [], candidate.get('season') or [])
    pattern_m = 1.0 if source.get('pattern') == candidate.get('pattern') else 0.0
    material_ov = jaccard(source.get('materials') or [], candidate.get('materials') or [])
    price_prox = 1.0 - abs(source['price'] - candidate['price']) / max(source['price'], candidate['price'], 1)

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


def jaccard(list_a, list_b):
    """Jaccard similarity between two lists. Returns 0.0-1.0."""
    set_a, set_b = set(list_a), set(list_b)
    if not set_a and not set_b:
        return 0.0
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    return intersection / union if union > 0 else 0.0
```

---

### Endpoint 2: Personalized Feed

**Use case:** User opens the app → show "For You" feed

**Route:** `POST /personalized-feed`

**Request:**
```json
{
  "user_id": "uuid",
  "limit": 20,
  "offset": 0
}
```

**Logic:**

**Option A — Supabase RPC function (simpler, no Python needed):**

```sql
CREATE OR REPLACE FUNCTION get_personalized_feed(
  p_user_id UUID,
  p_limit INT DEFAULT 20,
  p_offset INT DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  price NUMERIC,
  sale_price NUMERIC,
  image_urls TEXT[],
  affiliate_url TEXT,
  source_brand_name VARCHAR,
  category VARCHAR,
  gender VARCHAR,
  colors TEXT[],
  style TEXT[],
  score FLOAT
)
AS $$
DECLARE
  v_styles TEXT[];
  v_colors TEXT[];
  v_patterns TEXT[];
  v_price_min NUMERIC;
  v_price_max NUMERIC;
BEGIN
  SELECT style_tags, favorite_colors, pattern_preferences,
         COALESCE((price_range->>'min')::NUMERIC, 0),
         COALESCE((price_range->>'max')::NUMERIC, 100000)
  INTO v_styles, v_colors, v_patterns, v_price_min, v_price_max
  FROM user_preferences
  WHERE user_id = p_user_id;

  -- Fallback if no preferences found (new user, no quiz)
  IF v_styles IS NULL THEN
    RETURN QUERY
      SELECT p.id, p.title, p.price, p.sale_price, p.image_urls,
             p.affiliate_url, p.source_brand_name, p.category,
             p.gender, p.colors, p.style, 0.0::FLOAT AS score
      FROM products p
      WHERE p.is_active = true
      ORDER BY p.is_featured DESC, p.created_at DESC
      LIMIT p_limit OFFSET p_offset;
    RETURN;
  END IF;

  RETURN QUERY
  SELECT p.id, p.title, p.price, p.sale_price, p.image_urls,
         p.affiliate_url, p.source_brand_name, p.category,
         p.gender, p.colors, p.style,
    (
      -- Style overlap (35%)
      COALESCE(
        array_length(ARRAY(SELECT unnest(p.style) INTERSECT SELECT unnest(v_styles)), 1)::FLOAT
        / GREATEST(array_length(v_styles, 1), 1),
        0
      ) * 0.35

      -- Color overlap (25%)
      + COALESCE(
        array_length(ARRAY(SELECT unnest(p.colors) INTERSECT SELECT unnest(v_colors)), 1)::FLOAT
        / GREATEST(array_length(v_colors, 1), 1),
        0
      ) * 0.25

      -- Pattern match (15%)
      + CASE WHEN p.attributes->>'pattern' = ANY(v_patterns) THEN 0.15 ELSE 0 END

      -- Price in range (15%)
      + CASE WHEN p.price BETWEEN v_price_min AND v_price_max THEN 0.15 ELSE 0 END

      -- Recency boost (10%)
      + CASE WHEN p.created_at > NOW() - INTERVAL '7 days' THEN 0.10 ELSE 0 END
    ) AS score
  FROM products p
  WHERE p.is_active = true
  ORDER BY score DESC, p.created_at DESC
  LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;
```

**Option B — Python endpoint (for when you add behavioral data):**

```python
@app.post("/personalized-feed")
async def personalized_feed(user_id: str, limit: int = 20, offset: int = 0):
    async with db_pool.acquire() as conn:
        # 1. Get user preferences
        prefs = await conn.fetchrow("""
            SELECT style_tags, favorite_colors, pattern_preferences, price_range
            FROM user_preferences WHERE user_id = $1
        """, user_id)

        # 2. Get user's recent interactions (behavioral signal)
        interactions = await conn.fetch("""
            SELECT product_id, interaction_type, COUNT(*) as count
            FROM user_interactions
            WHERE user_id = $1
              AND created_at > NOW() - INTERVAL '30 days'
            GROUP BY product_id, interaction_type
        """, user_id)

        # 3. If user has interaction history, blend behavioral + preference
        if interactions:
            return await behavioral_feed(conn, prefs, interactions, limit, offset)
        elif prefs:
            return await preference_feed(conn, prefs, limit, offset)
        else:
            return await trending_feed(conn, limit, offset)
```

---

## How the Pieces Connect (Architecture Diagram)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN (wardro8e-admin)                       │
│                                                                     │
│   Add Product Form                                                  │
│   ├── Source: platform, brand_name, affiliate_url                   │
│   ├── Core: title, description, price, sale_price                   │
│   ├── Filters: gender, colors[], size_range[]                       │
│   ├── Personalization: fit_type, style[], occasion[], season[]      │
│   ├── Attributes: pattern, materials[], sleeve_type, neck_type...   │
│   └── Images: image_urls[]                                          │
│                                                                     │
│   POST /api/admin/products                                          │
│   ├── Validates all fields                                          │
│   ├── Uploads images to Supabase Storage                            │
│   ├── Inserts product row into Supabase                             │
│   └── Triggers async embedding generation ──────────────────┐       │
└─────────────────────────────────────────────────────────────┼───────┘
                                                              │
                                                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   PYTHON SERVICE (recommendation_service)            │
│                                                                     │
│   POST /generate-embedding (exists)                                 │
│   ├── Downloads product image                                       │
│   ├── Runs CLIP ViT-B-32 model                                     │
│   └── Returns 512-dim embedding → stored in products.embedding      │
│                                                                     │
│   POST /similar-products (TO BUILD)                                 │
│   ├── Fetches source product embedding + metadata                   │
│   ├── pgvector query: top 50 visually similar (with hard filters)   │
│   ├── Re-ranks with metadata scoring (style, occasion, color, etc.) │
│   └── Returns top 12 results                                        │
│                                                                     │
│   POST /personalized-feed (TO BUILD — or use Supabase RPC)          │
│   ├── Fetches user preferences + interaction history                │
│   ├── Scores products by preference match + behavioral signals      │
│   └── Returns ranked feed                                           │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SUPABASE (PostgreSQL + pgvector)                  │
│                                                                     │
│   products table                                                    │
│   ├── Structured metadata (gender, style, occasion, season, etc.)   │
│   ├── CLIP embedding (VECTOR(512))                                  │
│   └── ivfflat index for fast similarity search                      │
│                                                                     │
│   user_preferences table                                            │
│   ├── style_tags, favorite_colors, pattern_preferences              │
│   ├── size_preferences, price_range                                 │
│   └── Populated by style quiz on signup                             │
│                                                                     │
│   user_interactions table                                           │
│   ├── view, like, save, purchase events                             │
│   └── Populated by app as user browses                              │
│                                                                     │
│   RPC: get_personalized_feed() (TO BUILD)                           │
│   └── SQL function for preference-based scoring                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         APP (wardro8e-app)                           │
│                                                                     │
│   Home Feed (/(tabs)/index.tsx)                                     │
│   └── Calls personalized feed endpoint → masonry grid               │
│                                                                     │
│   Product Detail (/product/[id].tsx)                                │
│   ├── Displays: images, brand, title, price, sizes, fit, details    │
│   ├── "Buy Now" → opens affiliate_url                               │
│   └── "More Like This" → calls /similar-products → masonry grid     │
│                                                                     │
│   Discover (/(tabs)/discover.tsx)                                   │
│   └── Search + category filters using structured metadata            │
│                                                                     │
│   Style Quiz (/(auth)/style-quiz.tsx)                               │
│   └── Saves style_tags, favorite_colors, pattern_preferences        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Scoring Reference

### Jaccard Similarity (for array fields)

Used for: `style`, `occasion`, `season`, `colors`, `materials`

```
jaccard(A, B) = |A ∩ B| / |A ∪ B|
```

Example: `style = ["Casual", "Bohemian"]` vs `style = ["Casual", "Streetwear"]`
→ intersection = {"Casual"} (1), union = {"Casual", "Bohemian", "Streetwear"} (3)
→ jaccard = 1/3 = 0.33

### Price Proximity

```
price_proximity = 1 - |price_a - price_b| / max(price_a, price_b)
```

Example: ₹1,500 vs ₹2,000 → 1 - 500/2000 = 0.75
Example: ₹1,500 vs ₹8,000 → 1 - 6500/8000 = 0.19

### Visual Similarity

```
visual_similarity = 1 - cosine_distance(embedding_a, embedding_b)
```

pgvector computes this with the `<=>` operator.

---

## Weight Tuning

The scoring weights are starting points. Tune them based on:

- **Click-through rate:** If users click recommendations, the weights are good
- **Bounce rate:** If users immediately go back, visual similarity weight might be too high (showing look-alikes that aren't relevant)
- **A/B testing:** Try different weight configurations and measure engagement

Suggested experiments:
1. Visual-heavy: `visual=0.60, style=0.10, occasion=0.10, color=0.05, price=0.10, rest=0.05`
2. Metadata-heavy: `visual=0.25, style=0.20, occasion=0.15, color=0.15, price=0.10, rest=0.15`
3. Balanced (default): the weights defined in this doc

---

## Build Order

1. **Add `/similar-products` to Python service** — highest impact, enables "More Like This" on product pages
2. **Create `get_personalized_feed` Supabase RPC** — enables personalized home feed using quiz data
3. **Wire up app to call these endpoints** — replace static product data with live recommendations
4. **Add `user_interactions` tracking in the app** — log views, likes, saves as users browse
5. **Add behavioral feed logic** — once you have enough interaction data, blend it with preference scoring
