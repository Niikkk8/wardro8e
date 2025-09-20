# Wardro8e AI Embeddings Service

A lightweight FastAPI service for generating CLIP embeddings for fashion product images. This service focuses solely on vector conversion and storage - the foundation for future recommendation features.

## Overview

This service implements Phase 1 of our recommendation system:
- ✅ **Vector Embeddings**: Generate CLIP embeddings for product images
- ✅ **Simple & Reliable**: Minimal dependencies, focused functionality
- ✅ **Production Ready**: Docker containerized, health checks included
- 🔄 **Future Ready**: Foundation for similarity search and recommendations

## Features

- **CLIP Model Integration**: Uses pre-trained `clip-ViT-B-32` model
- **Image Processing**: Handles various image formats and sizes
- **Vector Generation**: Produces 512-dimensional embeddings
- **Error Handling**: Robust error handling and logging
- **Health Monitoring**: Built-in health check endpoints

## Quick Start

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Docker Deployment

```bash
# Build the image
docker build -t wardro8e-embeddings .

# Run the container
docker run -p 8000:8000 wardro8e-embeddings
```

## API Endpoints

### Generate Embedding
```http
POST /generate-embedding
Content-Type: application/json

{
  "image_url": "https://your-storage.com/product-image.jpg"
}
```

**Response:**
```json
{
  "embedding": [0.1, -0.2, 0.3, ...],
  "dimensions": 512,
  "model": "clip-ViT-B-32"
}
```

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "model": "clip-ViT-B-32",
  "model_loaded": true,
  "service": "embeddings"
}
```

## Integration with Next.js

The service is called asynchronously when products are created:

```typescript
// In your product creation API route
if (process.env.PYTHON_SERVICE_URL && imageUrls.length > 0) {
  // Generate embedding for the first image
  fetch(`${process.env.PYTHON_SERVICE_URL}/generate-embedding`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: imageUrls[0] }),
  })
  .then(async (response) => {
    if (response.ok) {
      const { embedding } = await response.json();
      // Update product with embedding in database
      await supabase
        .from("products")
        .update({ embedding })
        .eq("id", product.id);
    }
  })
  .catch(console.error);
}
```

## Deployment Options

### Free Tier Recommendations
- **Railway**: Free tier, easy deployment
- **Render**: Free tier with auto-deploy from Git
- **Hugging Face Spaces**: Free GPU inference (perfect for this use case)

### Environment Variables
```env
PYTHON_SERVICE_URL=http://localhost:8000
```

## Database Schema

Ensure your `products` table has an `embedding` column:

```sql
-- Add embedding column to products table
ALTER TABLE products 
ADD COLUMN embedding vector(512);

-- Create index for similarity search (when ready for Phase 2)
CREATE INDEX ON products USING ivfflat (embedding vector_cosine_ops);
```

## Future Phases

This service is designed to be extended:

**Phase 2**: Add similarity search endpoints
**Phase 3**: Add personalization based on user interactions
**Phase 4**: Advanced recommendation algorithms

## Monitoring

Check service health:
```bash
curl http://localhost:8000/health
```

View logs:
```bash
docker logs <container-id>
```