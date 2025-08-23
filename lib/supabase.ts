import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser/client Supabase (anon key only)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only Admin client factory. Never expose the service role key to the client.
export function getSupabaseAdmin() {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseAdmin() must be called on the server only');
  }
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE;
  if (!serviceRole) {
    throw new Error('SUPABASE_SERVICE_ROLE is not set');
  }
  return createClient(supabaseUrl, serviceRole);
}

// Database types based on your brands table
export interface Brand {
  id: string; // uuid
  brand_name: string;
  brand_legal_name: string;
  verified: boolean;
  created_at: string;
}

export interface BrandSignupPayload {
  brand_name: string;
  brand_legal_name: string;
}