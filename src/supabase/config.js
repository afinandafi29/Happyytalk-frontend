import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Critical Configuration Missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined in your environment variables. " +
    "Check your .env file."
  );
}

export const isPlaceholder = false; // Placeholder logic removed for stability

// Safe storage adapter to handle Brave/Incognito/Blocked LocalStorage
const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      console.warn('LocalStorage access denied (getItem), using memory fallback');
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      console.warn('LocalStorage access denied (setItem)');
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.warn('LocalStorage access denied (removeItem)');
    }
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: !isPlaceholder,
    persistSession: !isPlaceholder,
    detectSessionInUrl: true,
    storage: safeStorage // Use our safe wrapper
  }
});