import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export whether the app is properly configured
export const isConfigured = !!(supabaseUrl && supabaseAnonKey);

// isPlaceholder is true when running without real Supabase credentials
export const isPlaceholder = !isConfigured;

if (!isConfigured) {
  console.warn(
    '[Happytalk] Supabase environment variables are missing.\n' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Netlify environment variables.\n' +
    'Running in demo/offline mode.'
  );
}

// Safe storage adapter to handle Brave/Incognito/Blocked LocalStorage
const safeStorage = {
  getItem: (key) => {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  setItem: (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* ignore */ }
  },
  removeItem: (key) => {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  }
};

// Use real values or safe placeholder strings — createClient NEVER receives undefined
const resolvedUrl = supabaseUrl || 'https://placeholder.supabase.co';
const resolvedKey = supabaseAnonKey || 'placeholder-anon-key-not-configured';

export const supabase = createClient(resolvedUrl, resolvedKey, {
  auth: {
    autoRefreshToken: isConfigured,
    persistSession: isConfigured,
    detectSessionInUrl: isConfigured,
    storage: safeStorage,
  },
});