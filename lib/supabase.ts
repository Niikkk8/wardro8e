import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser/client Supabase (anon key only)
// Explicitly enable persistent sessions and auto refresh so sessions survive reloads
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Server-side Supabase client that uses anon key and respects RLS
export function getSupabaseServer(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        // Forward cookies from the request
        cookie: req.headers.get("cookie") || "",
        authorization: req.headers.get("authorization") || "",
      }
    }
  });
}

// Server-side Supabase client with service role (bypasses RLS). Use ONLY on the server.
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE!;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Helper function to get authenticated user from request using anon client
export async function getAuthenticatedUser(req: Request): Promise<{ id: string; email: string } | null> {
  try {
    // Try to get token from Authorization header first
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
    const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    
    console.log('getAuthenticatedUser: Checking auth', { 
      hasAuthHeader: !!authHeader, 
      hasBearer: !!bearer,
      hasCookies: !!req.headers.get("cookie")
    });
    
    if (bearer) {
      // Create a client bound to the bearer token and verify it
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      const supabaseWithToken = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { autoRefreshToken: false, persistSession: false },
        global: {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        },
      });
      const { data, error } = await supabaseWithToken.auth.getUser();
      
      if (error) {
        console.log('getAuthenticatedUser: Bearer token error', error);
        return null;
      }
      
      if (!data?.user?.id) {
        console.log('getAuthenticatedUser: No user from bearer token');
        return null;
      }
      
      console.log('getAuthenticatedUser: Success with bearer token', { userId: data.user.id });
      return {
        id: data.user.id,
        email: data.user.email || ''
      };
    }

    // If no bearer token, try to get session from the server client
    const supabase = getSupabaseServer(req);
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('getAuthenticatedUser: Session error', error);
      return null;
    }
    
    if (!session?.user?.id) {
      console.log('getAuthenticatedUser: No session or user');
      return null;
    }
    
    console.log('getAuthenticatedUser: Success with session', { userId: session.user.id });
    return {
      id: session.user.id,
      email: session.user.email || ''
    };
  } catch (error) {
    console.error('Error getting authenticated user:', error);
    return null;
  }
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