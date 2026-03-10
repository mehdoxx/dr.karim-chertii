import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase public environment variables');
}

/**
 * Standard Supabase client using Anon Key.
 * Safe to be used in client-side components and standard API requests.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
