import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer, getAuthenticatedUser } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return NextResponse.json({ products: [] }, { status: 200 });
    
    const supabase = getSupabaseServer(req);
    const { data, error } = await supabase
      .from("products")
      .select("id,title,price,stock_quantity,is_active,created_at")
      .eq("brand_id", user.id)
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
    return NextResponse.json({ products: data ?? [] });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    // Check if user is a verified brand (CRITICAL - only verified brands can add products)
    const supabase = getSupabaseServer(req);
    const { data: brand, error: brandError } = await supabase
      .from("brands")
      .select("verified, brand_name")
      .eq("id", user.id)
      .single();
    
    if (brandError) {
      console.error("Brand lookup error:", brandError);
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }
    
    if (!brand?.verified) {
      return NextResponse.json({ 
        message: "Only verified brands can create products. Please complete the verification process first." 
      }, { status: 403 });
    }
    
    // Parse multipart form data (for image uploads)
    const formData = await req.formData();
    
    // Extract and validate required fields
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const price = Number(formData.get("price"));
    const category = formData.get("category")?.toString().trim();
    const stock_quantity = Number(formData.get("stock_quantity"));
    const attributesStr = formData.get("attributes")?.toString();
    
    // Validation
    if (!title) {
      return NextResponse.json({ message: "Product title is required" }, { status: 400 });
    }
    if (!description) {
      return NextResponse.json({ message: "Product description is required" }, { status: 400 });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ message: "Valid price is required" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ message: "Category is required" }, { status: 400 });
    }
    if (!Number.isFinite(stock_quantity) || stock_quantity < 0) {
      return NextResponse.json({ message: "Valid stock quantity is required" }, { status: 400 });
    }
    
    // Parse clothing attributes
    let attributes = null;
    if (attributesStr) {
      try {
        attributes = JSON.parse(attributesStr);
        // Validate required clothing attributes
        if (!attributes.colors?.length || !attributes.pattern || !attributes.materials?.length || !attributes.size_range?.length) {
          return NextResponse.json({ 
            message: "Colors, pattern, materials, and at least one size are required" 
          }, { status: 400 });
        }
      } catch (error) {
        return NextResponse.json({ message: "Invalid attributes format" }, { status: 400 });
      }
    }
    
    // Extract images from form data
    const imageFiles: File[] = [];
    const sizeChartFile = formData.get('size_chart') as File | null;
    
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('image_') && value instanceof File) {
        imageFiles.push(value);
      }
    }
    
    if (imageFiles.length === 0) {
      return NextResponse.json({ message: "At least one product image is required" }, { status: 400 });
    }
    
    // Upload images to Supabase Storage
    const { uploadToSupabaseStorage } = await import('@/lib/supabase-storage');
    const imageUrls: string[] = [];
    let sizeChartUrl: string | null = null;
    
    // Upload product images
    for (const file of imageFiles) {
      try {
        const url = await uploadToSupabaseStorage(file, `brands/${user.id}/products`);
        imageUrls.push(url);
      } catch (error) {
        console.error("Image upload error:", error);
        return NextResponse.json({ message: "Failed to upload images" }, { status: 500 });
      }
    }
    
    // Upload size chart if provided
    if (sizeChartFile) {
      try {
        sizeChartUrl = await uploadToSupabaseStorage(sizeChartFile, `brands/${user.id}/size-charts`);
      } catch (error) {
        console.error("Size chart upload error:", error);
        return NextResponse.json({ message: "Failed to upload size chart" }, { status: 500 });
      }
    }
    
    // Optional fields
    const subcategory = formData.get("subcategory")?.toString().trim() || null;
    
    // Add size chart URL to attributes if provided
    if (sizeChartUrl && attributes) {
      attributes.size_chart_url = sizeChartUrl;
    }
    
    // Insert product into database
    const { data: product, error } = await supabase
      .from("products")
      .insert({
        brand_id: user.id,
        title,
        description,
        price,
        category,
        subcategory,
        attributes,
        image_urls: imageUrls,
        stock_quantity,
        is_active: true,
      })
      .select("id, title, price, category, image_urls, created_at")
      .single();
    
    if (error) {
      console.error("Product creation error:", error);
      return NextResponse.json({ message: "Failed to create product" }, { status: 500 });
    }
    
    // Generate AI embeddings asynchronously (don't wait for this)
    if (process.env.PYTHON_SERVICE_URL && imageUrls.length > 0) {
      const embeddingServiceUrl = process.env.PYTHON_SERVICE_URL;
      console.log(`🤖 Attempting to generate embedding for product ${product.id}`);
      console.log(`📡 Embedding service URL: ${embeddingServiceUrl}`);
      console.log(`🖼️  Image URL: ${imageUrls[0]}`);
      
      // Generate embedding for the first image
      fetch(`${embeddingServiceUrl}/generate-embedding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrls[0] }),
      })
      .then(async (response) => {
        console.log(`📥 Embedding service response status: ${response.status}`);
        
        if (response.ok) {
          const responseData = await response.json();
          console.log(`✅ Received embedding data:`, {
            dimensions: responseData.dimensions,
            model: responseData.model,
            embeddingLength: responseData.embedding?.length
          });
          
          const { embedding } = responseData;
          
          // Update product with embedding
          const { error: updateError } = await supabase
            .from("products")
            .update({ embedding })
            .eq("id", product.id);
          
          if (updateError) {
            console.error(`❌ Failed to save embedding to database:`, updateError);
          } else {
            console.log(`✅ Successfully saved embedding for product ${product.id}`);
          }
        } else {
          const errorText = await response.text();
          console.error(`❌ Embedding service error (${response.status}):`, errorText);
        }
      })
      .catch((error) => {
        console.error("❌ Failed to generate embedding - Network/Fetch error:", error);
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
        // Don't fail the request if embedding generation fails
      });
    } else if (!process.env.PYTHON_SERVICE_URL) {
      console.warn("⚠️  PYTHON_SERVICE_URL not configured, skipping embedding generation");
    } else if (imageUrls.length === 0) {
      console.warn("⚠️  No images uploaded, skipping embedding generation");
    }
    
    return NextResponse.json({ 
      message: "Product created successfully",
      product 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


