import { getSupabaseAdmin } from './supabase';

// Helper function to upload images to Supabase Storage
export async function uploadToSupabaseStorage(file: File, folder: string = 'products'): Promise<string> {
  const supabase = getSupabaseAdmin();
  
  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  // Upload file
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);

  return publicUrl;
}

// Helper to delete image from Supabase Storage
export async function deleteFromSupabaseStorage(filePath: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase.storage
    .from('product-images')
    .remove([filePath]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}

// Helper to get optimized image URL (Supabase has built-in transformations)
export function getOptimizedImageUrl(publicUrl: string, width: number = 400, height: number = 500): string {
  // Supabase Storage supports image transformations via URL parameters
  const url = new URL(publicUrl);
  url.searchParams.set('width', width.toString());
  url.searchParams.set('height', height.toString());
  url.searchParams.set('resize', 'cover');
  url.searchParams.set('quality', '80');
  return url.toString();
}
