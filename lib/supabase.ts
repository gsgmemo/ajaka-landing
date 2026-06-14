import { createClient } from '@supabase/supabase-js';

// Browser/public client — lazy initialized to avoid build-time errors
export const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Missing Supabase public env vars');
  }
  return createClient(url, key);
};

// Server-side client with service role — lazy initialized
export const createServerClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase server env vars');
  }
  return createClient(url, serviceKey);
};

// Default export for convenience (backwards compat)
export const supabase = {
  get client() {
    return getSupabaseClient();
  },
};
