---
title: Wardro8e AI Embeddings
emoji: 🧠
colorFrom: blue
colorTo: purple
sdk: docker
sdk_version: "4.26.0"
app_file: app.py
app_port: 8000
suggested_hardware: cpu-basic
startup_duration_timeout: 10m
pinned: false
---

# Wardro8e AI Embeddings Service

A FastAPI service for generating CLIP embeddings for fashion product images.

## API Endpoints

- `GET /` - Service status
- `GET /health` - Health check
- `POST /generate-embedding` - Generate embedding from image URL

## Usage

```bash
curl -X POST "https://YOUR_USERNAME-wardro8e-embeddings.hf.space/generate-embedding" \
  -H "Content-Type: application/json" \
  -d '{"image_url": "https://example.com/image.jpg"}'
```