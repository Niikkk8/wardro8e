from fastapi import FastAPI, HTTPException
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel
import numpy as np
import os
from PIL import Image
import requests
from io import BytesIO
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Wardro8e AI Embeddings", version="1.0.0")

# Initialize CLIP model (runs once when server starts)
try:
    model = SentenceTransformer('clip-ViT-B-32')
    logger.info("CLIP model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load CLIP model: {e}")
    model = None

class ImageRequest(BaseModel):
    image_url: str

@app.get("/")
async def root():
    return {
        "message": "Wardro8e AI Embeddings Service", 
        "status": "healthy",
        "model_loaded": model is not None
    }

@app.post("/generate-embedding")
async def generate_embedding(request: ImageRequest):
    """Generate CLIP embedding for a clothing image"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Download image from URL (could be Supabase Storage or other CDN)
        response = requests.get(request.image_url, timeout=10)
        response.raise_for_status()
        
        # Open image with PIL
        image = Image.open(BytesIO(response.content))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Generate embedding using CLIP
        embedding = model.encode([image])
        
        # Convert to list for JSON serialization (512-dimensional vector for CLIP ViT-B-32)
        embedding_list = embedding[0].tolist()
        
        logger.info(f"Generated embedding for image: {request.image_url[:50]}...")
        return {
            "embedding": embedding_list,
            "dimensions": len(embedding_list),
            "model": "clip-ViT-B-32"
        }
        
    except requests.RequestException as e:
        logger.error(f"Failed to download image {request.image_url}: {e}")
        raise HTTPException(status_code=400, detail=f"Failed to download image: {str(e)}")
    except Exception as e:
        logger.error(f"Error generating embedding: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate embedding: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy", 
        "model": "clip-ViT-B-32",
        "model_loaded": model is not None,
        "service": "embeddings"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
