# Product Creation Flow - Complete Documentation

This document provides a comprehensive overview of how products are added to the database in the wardro8e application, including schema details, validation rules, and the complete flow from user input to database storage.

---

## Table of Contents

1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [Frontend Form Component](#frontend-form-component)
4. [API Endpoint](#api-endpoint)
5. [Validation Rules](#validation-rules)
6. [Image Upload Process](#image-upload-process)
7. [Complete Flow Diagram](#complete-flow-diagram)
8. [Error Handling](#error-handling)
9. [Security Considerations](#security-considerations)

---

## Overview

The product creation system is a multi-step process that involves:
- **Frontend**: A 4-step wizard form (`ClothingProductForm.tsx`) for collecting product information
- **API**: A Next.js API route (`/api/brand/products`) that handles validation, image uploads, and database insertion
- **Storage**: Supabase Storage for product images and size charts
- **Database**: PostgreSQL (via Supabase) with JSONB attributes and vector embeddings

**Key Requirements:**
- Only verified brands can create products
- Products must have at least one image
- All required fields must be validated on both client and server
- Images are uploaded to Supabase Storage before database insertion
- AI embeddings are generated asynchronously after product creation

---

## Database Schema

### Products Table

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    category VARCHAR(100),
    subcategory VARCHAR(100),
    attributes JSONB, -- {colors: ['red', 'blue'], pattern: 'floral', materials: ['cotton'], size_range: ['S', 'M', 'L'], size_chart_url: '...'}
    image_urls TEXT[], -- Array of public URLs from Supabase Storage
    embedding VECTOR(512), -- CLIP embeddings for similarity search (generated asynchronously)
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Auto | Primary key, auto-generated |
| `brand_id` | UUID | Yes | Foreign key to `brands` table |
| `title` | VARCHAR(255) | Yes | Product title (trimmed, max 255 chars) |
| `description` | TEXT | Yes | Product description |
| `price` | DECIMAL(10,2) | Yes | Product price (must be > 0) |
| `sale_price` | DECIMAL(10,2) | No | Optional sale price |
| `category` | VARCHAR(100) | Yes | Main category (e.g., "tops", "dresses") |
| `subcategory` | VARCHAR(100) | No | Subcategory (e.g., "shirts", "maxi") |
| `attributes` | JSONB | Yes | Clothing-specific attributes (see below) |
| `image_urls` | TEXT[] | Yes | Array of image URLs (at least 1 required) |
| `embedding` | VECTOR(512) | No | AI-generated embedding (added asynchronously) |
| `stock_quantity` | INTEGER | Yes | Available stock (must be >= 0) |
| `is_active` | BOOLEAN | Yes | Product visibility status (default: true) |
| `created_at` | TIMESTAMP | Auto | Creation timestamp |

### Attributes JSONB Structure

The `attributes` field stores clothing-specific metadata as JSON:

```json
{
  "colors": ["red", "blue", "black"],
  "pattern": "floral",
  "materials": ["cotton", "polyester"],
  "size_range": ["S", "M", "L", "XL"],
  "size_chart_url": "https://supabase.co/storage/.../size-chart.jpg"
}
```

**Required Attributes:**
- `colors`: Array of strings (at least 1 required)
- `pattern`: String (required)
- `materials`: Array of strings (at least 1 required)
- `size_range`: Array of strings (at least 1 required)

**Optional Attributes:**
- `size_chart_url`: String (URL to uploaded size chart image)

### Database Indexes

```sql
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_embedding ON products USING ivfflat (embedding vector_cosine_ops);
```

---

## Frontend Form Component

### Component: `ClothingProductForm.tsx`

**Location:** `components/ClothingProductForm.tsx`

**Type:** Client-side React component with multi-step wizard

### Form Data Structure

```typescript
interface ClothingFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  stock_quantity: string;
  colors: string[]; // Multiple colors
  pattern: string;
  materials: string[]; // Multiple materials
  size_range: string[];
  images: File[];
  size_chart: File | null; // Optional size chart upload
}
```

### Step-by-Step Form Flow

#### Step 1: Basic Info
- **Fields:**
  - `title` (required, text input)
  - `description` (required, textarea)
  - `price` (required, number input, must be > 0)
  - `category` (required, dropdown select)
  - `subcategory` (optional, dropdown select, depends on category)
  - `stock_quantity` (required, number input, must be >= 0)

- **Categories Available:**
  - `tops` → Subcategories: shirts, t-shirts, crop-tops, tank-tops, sweaters
  - `dresses` → Subcategories: maxi, midi, mini, cocktail, casual
  - `bottoms` → Subcategories: jeans, trousers, skirts, shorts, leggings
  - `outerwear` → Subcategories: jackets, coats, blazers, cardigans
  - `ethnic` → Subcategories: sarees, kurtas, lehengas, salwar-suits

#### Step 2: Style Details
- **Fields:**
  - `colors` (required, multi-select buttons, at least 1)
  - `pattern` (required, dropdown select)
  - `materials` (required, multi-select buttons, at least 1)

- **Available Colors:** Black, White, Red, Blue, Green, Yellow, Pink, Purple, Orange, Brown, Gray, Navy, Beige, Maroon, Teal, Coral

- **Available Patterns:** Solid, Stripes, Floral, Polka Dots, Geometric, Abstract, Animal Print, Paisley, Checkered, Plaid, Tie-Dye

- **Available Materials:** Cotton, Silk, Polyester, Linen, Wool, Denim, Chiffon, Satin, Velvet, Knit, Leather, Lace, Georgette, Crepe

#### Step 3: Sizing
- **Fields:**
  - `size_range` (required, multi-select buttons, at least 1)
  - `size_chart` (optional, file upload)

- **Available Sizes:** XS, S, M, L, XL, XXL

- **Size Chart:**
  - Optional image upload
  - Max file size: 5MB
  - Accepted types: image/*

#### Step 4: Images
- **Fields:**
  - `images` (required, file upload, at least 1, max 5)

- **Image Requirements:**
  - Minimum: 1 image
  - Maximum: 5 images
  - Max file size per image: 10MB
  - Accepted types: image/*

### Client-Side Validation

Validation occurs at two levels:

1. **Per-Step Validation** (`validateStep`): Validates fields for the current step before allowing progression
2. **Final Validation** (`validateForm`): Validates all fields before submission

**Validation Rules:**

| Field | Rules |
|-------|-------|
| `title` | Required, non-empty after trim |
| `description` | Required, non-empty after trim |
| `price` | Required, must be a valid number > 0 |
| `category` | Required, must be selected |
| `stock_quantity` | Required, must be a valid number >= 0 |
| `colors` | Required, array length > 0 |
| `pattern` | Required, must be selected |
| `materials` | Required, array length > 0 |
| `size_range` | Required, array length > 0 |
| `images` | Required, array length > 0, max 5 files, each < 10MB |
| `size_chart` | Optional, if provided must be image < 5MB |

### Form Submission

When the user clicks "Create Product" on Step 4:

1. **Final validation** is performed
2. **Authentication token** is retrieved from Supabase session
3. **FormData** is constructed with:
   - Text fields (title, description, price, category, subcategory, stock_quantity)
   - Attributes JSON (colors, pattern, materials, size_range)
   - Image files (as `image_0`, `image_1`, etc.)
   - Size chart file (if provided, as `size_chart`)
4. **POST request** is sent to `/api/brand/products` with:
   - `Authorization: Bearer <token>` header
   - `credentials: "include"` for cookie support
   - FormData as request body

---

## API Endpoint

### Route: `/api/brand/products`

**Location:** `app/api/brand/products/route.ts`

**Methods:**
- `GET`: Fetch products for authenticated brand
- `POST`: Create a new product

### POST Endpoint Flow

#### 1. Authentication Check

```typescript
const user = await getAuthenticatedUser(req);
if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
```

**Authentication Methods:**
- Checks for `Authorization: Bearer <token>` header
- Falls back to session cookies
- Uses Supabase client to verify token/session

#### 2. Brand Verification Check

```typescript
const { data: brand } = await supabase
  .from("brands")
  .select("verified, brand_name")
  .eq("id", user.id)
  .single();

if (!brand?.verified) {
  return NextResponse.json({ 
    message: "Only verified brands can create products. Please complete the verification process first." 
  }, { status: 403 });
}
```

**Critical Security:** Only verified brands can create products. This prevents unverified accounts from adding products to the platform.

#### 3. Parse Form Data

```typescript
const formData = await req.formData();

const title = formData.get("title")?.toString().trim();
const description = formData.get("description")?.toString().trim();
const price = Number(formData.get("price"));
const category = formData.get("category")?.toString().trim();
const stock_quantity = Number(formData.get("stock_quantity"));
const attributesStr = formData.get("attributes")?.toString();
```

#### 4. Server-Side Validation

**Text Fields:**
- `title`: Required, non-empty after trim
- `description`: Required, non-empty after trim
- `price`: Required, must be finite number > 0
- `category`: Required, non-empty after trim
- `stock_quantity`: Required, must be finite number >= 0

**Attributes Validation:**
```typescript
const attributes = JSON.parse(attributesStr);
if (!attributes.colors?.length || 
    !attributes.pattern || 
    !attributes.materials?.length || 
    !attributes.size_range?.length) {
  return NextResponse.json({ 
    message: "Colors, pattern, materials, and at least one size are required" 
  }, { status: 400 });
}
```

**Images Validation:**
- At least one image file is required
- Images are extracted from FormData entries with keys starting with `image_`

#### 5. Image Upload to Supabase Storage

**Product Images:**
```typescript
for (const file of imageFiles) {
  const url = await uploadToSupabaseStorage(file, `brands/${user.id}/products`);
  imageUrls.push(url);
}
```

**Size Chart (if provided):**
```typescript
if (sizeChartFile) {
  sizeChartUrl = await uploadToSupabaseStorage(sizeChartFile, `brands/${user.id}/size-charts`);
  if (attributes) {
    attributes.size_chart_url = sizeChartUrl;
  }
}
```

**Storage Path Structure:**
- Product images: `brands/{brand_id}/products/{timestamp}-{random}.{ext}`
- Size charts: `brands/{brand_id}/size-charts/{timestamp}-{random}.{ext}`

#### 6. Database Insertion

```typescript
const { data: product, error } = await supabase
  .from("products")
  .insert({
    brand_id: user.id,
    title,
    description,
    price,
    category,
    subcategory: subcategory || null,
    attributes,
    image_urls: imageUrls,
    stock_quantity,
    is_active: true,
  })
  .select("id, title, price, category, image_urls, created_at")
  .single();
```

**Inserted Fields:**
- `brand_id`: From authenticated user
- `title`: Trimmed string
- `description`: Trimmed string
- `price`: Parsed number
- `category`: Trimmed string
- `subcategory`: Trimmed string or null
- `attributes`: Parsed JSONB object
- `image_urls`: Array of public URLs
- `stock_quantity`: Parsed integer
- `is_active`: Always `true` for new products

#### 7. AI Embedding Generation (Asynchronous)

After successful product creation, the system attempts to generate an AI embedding:

```typescript
if (process.env.PYTHON_SERVICE_URL && imageUrls.length > 0) {
  const response = await fetch(`${embeddingServiceUrl}/generate-embedding`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: imageUrls[0] }),
    signal: controller.signal, // 25 second timeout
  });
  
  if (response.ok) {
    const { embedding } = await response.json();
    await supabase
      .from("products")
      .update({ embedding })
      .eq("id", product.id);
  }
}
```

**Key Points:**
- Only runs if `PYTHON_SERVICE_URL` is configured
- Uses the first product image
- 25-second timeout
- Non-blocking: Product creation succeeds even if embedding generation fails
- Updates the product record with the generated embedding

#### 8. Response

**Success (201):**
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "uuid",
    "title": "Product Title",
    "price": 2999,
    "category": "tops",
    "image_urls": ["https://..."],
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Responses:**
- `401`: Unauthorized (no authentication)
- `403`: Forbidden (brand not verified)
- `400`: Bad Request (validation errors)
- `500`: Server Error (database/upload failures)

---

## Validation Rules

### Client-Side Validation (`ClothingProductForm.tsx`)

| Field | Validation Logic | Error Message |
|-------|------------------|---------------|
| `title` | `!formData.title.trim()` | "Product title is required" |
| `description` | `!formData.description.trim()` | "Description is required" |
| `price` | `!formData.price.trim()` or `isNaN(Number(formData.price))` or `Number(formData.price) <= 0` | "Price is required" / "Please enter a valid price" |
| `category` | `!formData.category` | "Category is required" |
| `stock_quantity` | `!formData.stock_quantity.trim()` or `isNaN(Number(formData.stock_quantity))` or `Number(formData.stock_quantity) < 0` | "Stock quantity is required" / "Please enter a valid stock quantity" |
| `colors` | `formData.colors.length === 0` | "At least one color is required" |
| `pattern` | `!formData.pattern` | "Pattern is required" |
| `materials` | `formData.materials.length === 0` | "At least one material is required" |
| `size_range` | `formData.size_range.length === 0` | "At least one size is required" |
| `images` | `formData.images.length === 0` | "At least one image is required" |
| `images` (file validation) | `files.length + formData.images.length > 5` | "Maximum 5 images allowed" |
| `images` (file validation) | `!file.type.startsWith('image/')` or `file.size > 10 * 1024 * 1024` | "Only image files under 10MB are allowed" |
| `size_chart` (file validation) | `!file.type.startsWith('image/')` | "Only image files are allowed for size chart" |
| `size_chart` (file validation) | `file.size > 5 * 1024 * 1024` | "Size chart image must be under 5MB" |

### Server-Side Validation (`/api/brand/products`)

| Field | Validation Logic | Error Message |
|-------|------------------|---------------|
| `title` | `!title` | "Product title is required" |
| `description` | `!description` | "Product description is required" |
| `price` | `!Number.isFinite(price)` or `price <= 0` | "Valid price is required" |
| `category` | `!category` | "Category is required" |
| `stock_quantity` | `!Number.isFinite(stock_quantity)` or `stock_quantity < 0` | "Valid stock quantity is required" |
| `attributes` | `!attributes.colors?.length` | "Colors, pattern, materials, and at least one size are required" |
| `attributes` | `!attributes.pattern` | "Colors, pattern, materials, and at least one size are required" |
| `attributes` | `!attributes.materials?.length` | "Colors, pattern, materials, and at least one size are required" |
| `attributes` | `!attributes.size_range?.length` | "Colors, pattern, materials, and at least one size are required" |
| `images` | `imageFiles.length === 0` | "At least one product image is required" |

**Note:** Server-side validation is the source of truth. Client-side validation provides immediate feedback but can be bypassed.

---

## Image Upload Process

### Storage Service: `lib/supabase-storage.ts`

**Function:** `uploadToSupabaseStorage(file: File, folder: string): Promise<string>`

**Process:**

1. **Generate Unique Filename:**
   ```typescript
   const fileExt = file.name.split('.').pop();
   const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
   ```
   - Format: `{folder}/{timestamp}-{random}.{extension}`
   - Example: `brands/abc123/products/1704067200000-k3j9h2.jpg`

2. **Upload to Supabase Storage:**
   ```typescript
   const { data, error } = await supabase.storage
     .from('product-images')
     .upload(fileName, file, {
       cacheControl: '3600',
       upsert: false
     });
   ```
   - Bucket: `product-images`
   - Cache control: 3600 seconds (1 hour)
   - Upsert: false (prevents overwriting)

3. **Get Public URL:**
   ```typescript
   const { data: { publicUrl } } = supabase.storage
     .from('product-images')
     .getPublicUrl(fileName);
   ```
   - Returns a public URL that can be used in `image_urls` array

**Storage Structure:**
```
product-images/
  └── brands/
      └── {brand_id}/
          ├── products/
          │   ├── 1704067200000-abc123.jpg
          │   ├── 1704067201000-def456.jpg
          │   └── ...
          └── size-charts/
              └── 1704067202000-ghi789.jpg
```

**Error Handling:**
- Upload failures throw errors that are caught by the API route
- Failed uploads result in a 500 response with message "Failed to upload images"

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                             │
│  User clicks "Add Product" → Opens ClothingProductForm modal   │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: BASIC INFO                           │
│  • Title, Description, Price, Category, Subcategory, Stock     │
│  • Client-side validation before allowing "Next"                │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 2: STYLE DETAILS                        │
│  • Colors (multi-select), Pattern, Materials (multi-select)    │
│  • Client-side validation before allowing "Next"                │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 3: SIZING                               │
│  • Size Range (multi-select), Size Chart (optional upload)     │
│  • Client-side validation before allowing "Next"                │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 4: IMAGES                               │
│  • Product Images (1-5 files, max 10MB each)                  │
│  • Client-side validation before allowing "Create Product"      │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FORM SUBMISSION                              │
│  1. Final validation (validateForm)                            │
│  2. Get auth token from Supabase session                       │
│  3. Build FormData with all fields and files                   │
│  4. POST to /api/brand/products                                │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API: AUTHENTICATION                          │
│  • Check Authorization header or session cookies                │
│  • Verify user exists → 401 if not authenticated               │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API: BRAND VERIFICATION                      │
│  • Query brands table for user.id                              │
│  • Check verified flag → 403 if not verified                   │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API: PARSE & VALIDATE                       │
│  • Parse FormData (text fields, JSON attributes, files)        │
│  • Server-side validation (required fields, types, ranges)      │
│  • → 400 if validation fails                                   │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API: UPLOAD IMAGES                           │
│  • For each image file:                                         │
│    - Generate unique filename                                   │
│    - Upload to Supabase Storage (product-images bucket)        │
│    - Get public URL                                            │
│  • Upload size chart if provided                               │
│  • → 500 if upload fails                                        │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API: DATABASE INSERT                         │
│  • Insert product record with:                                  │
│    - brand_id, title, description, price                        │
│    - category, subcategory                                     │
│    - attributes (JSONB)                                        │
│    - image_urls (TEXT[])                                       │
│    - stock_quantity, is_active=true                            │
│  • → 500 if insert fails                                        │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API: AI EMBEDDING (ASYNC)                    │
│  • If PYTHON_SERVICE_URL configured:                            │
│    - POST to embedding service with first image URL             │
│    - Wait up to 25 seconds                                      │
│    - Update product.embedding field                            │
│  • Non-blocking: product creation succeeds even if fails        │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API: RESPONSE                                │
│  • Return 201 with product data                                 │
│  • { message, product: { id, title, price, ... } }            │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND: SUCCESS                            │
│  • onSuccess() callback → Refresh products list                │
│  • onClose() → Close modal                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Error Handling

### Client-Side Errors

**Form Validation Errors:**
- Displayed inline below each field
- Red border on invalid inputs
- Prevents form progression/submission

**Submission Errors:**
- Displayed in red alert box at bottom of form
- Common errors:
  - "Authentication required"
  - "Failed to create product"
  - Server error messages

### Server-Side Errors

**401 Unauthorized:**
- User not authenticated
- Response: `{ message: "Unauthorized" }`

**403 Forbidden:**
- Brand not verified
- Response: `{ message: "Only verified brands can create products. Please complete the verification process first." }`

**400 Bad Request:**
- Validation failures
- Response: `{ message: "<specific validation error>" }`
- Examples:
  - "Product title is required"
  - "Valid price is required"
  - "Colors, pattern, materials, and at least one size are required"
  - "At least one product image is required"

**500 Server Error:**
- Database errors
- Image upload failures
- Generic: `{ message: "Server error" }` or `{ message: "Failed to create product" }`
- Specific: `{ message: "Failed to upload images" }` or `{ message: "Failed to upload size chart" }`

### Error Recovery

- **Client-side:** User can correct errors and resubmit
- **Server-side:** Partial uploads are not cleaned up automatically (consider adding cleanup logic)
- **Embedding failures:** Product creation succeeds, embedding can be regenerated later

---

## Security Considerations

### Authentication & Authorization

1. **Authentication Required:**
   - All API requests require valid Supabase session or Bearer token
   - Unauthenticated requests return 401

2. **Brand Verification:**
   - Only verified brands can create products
   - Checked via `brands.verified` flag
   - Prevents unverified accounts from polluting the product catalog

3. **Brand Ownership:**
   - Products are automatically associated with authenticated user's brand_id
   - Users can only create products for their own brand
   - RLS (Row Level Security) should be configured in Supabase to enforce this

### Input Validation

1. **Client-Side Validation:**
   - Provides immediate feedback
   - Can be bypassed (not trusted)

2. **Server-Side Validation:**
   - Source of truth
   - Validates all inputs before processing
   - Prevents SQL injection (using parameterized queries via Supabase)
   - Prevents XSS (sanitizes text inputs via trim)

3. **File Upload Security:**
   - File type validation (image/* only)
   - File size limits (10MB for product images, 5MB for size charts)
   - Unique filenames prevent overwrites
   - Files stored in brand-specific folders

### Data Sanitization

- **Text Fields:** Trimmed to remove leading/trailing whitespace
- **Numbers:** Validated as finite numbers with appropriate ranges
- **JSON Attributes:** Parsed and validated structure before insertion
- **File Names:** Generated server-side to prevent path traversal

### Storage Security

- **Supabase Storage:** Uses service role key for uploads (server-side only)
- **Public URLs:** Generated for images (consider signed URLs for private content)
- **Folder Structure:** Organized by brand_id to prevent conflicts

### Rate Limiting

**Note:** Rate limiting is not currently implemented for product creation. Consider adding:

```typescript
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limiter';

const identifier = getClientIdentifier(req);
const rateLimit = checkRateLimit(identifier, 10, 15 * 60 * 1000); // 10 requests per 15 minutes

if (!rateLimit.allowed) {
  return NextResponse.json({ 
    message: "Too many requests. Please try again later." 
  }, { status: 429 });
}
```

---

## Additional Notes

### Category & Subcategory System

- Categories are predefined: `tops`, `dresses`, `bottoms`, `outerwear`, `ethnic`
- Subcategories are category-specific and optional
- Subcategory dropdown is disabled until a category is selected
- Subcategory resets when category changes

### Multi-Select Fields

- Colors, materials, and sizes use toggle buttons
- Selected items are highlighted with primary color
- Arrays are stored in form state and sent as JSON in attributes

### Image Handling

- Images are stored as File objects in form state
- Preview URLs are generated using `URL.createObjectURL()`
- Images are sent as FormData entries (not base64)
- Public URLs are stored in database after upload

### AI Embedding

- Generated asynchronously after product creation
- Uses CLIP model via Python service
- 512-dimensional vector stored in `embedding` column
- Used for similarity search and recommendations
- Product creation succeeds even if embedding generation fails

### Future Enhancements

Consider adding:
- Product editing functionality
- Bulk product upload
- Product variants (size/color combinations)
- Draft/save functionality
- Image optimization/compression
- CDN integration for images
- Rate limiting for product creation
- Audit logging for product changes

---

## Related Files

- **Frontend Form:** `components/ClothingProductForm.tsx`
- **API Route:** `app/api/brand/products/route.ts`
- **Storage Helper:** `lib/supabase-storage.ts`
- **Supabase Client:** `lib/supabase.ts`
- **Products Page:** `app/dashboard/products/page.tsx`
- **Validators:** `lib/validators.ts` (general validation utilities)

---

*Last Updated: 2024*
