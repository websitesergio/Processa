import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// optional pentru debugging în DevTools:
declare global {
  interface Window {
    supabase?: typeof supabase;
  }
}
window.supabase = supabase;