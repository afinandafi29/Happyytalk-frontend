import { createClient } from '@supabase/supabase-js';
import { mockDb } from './mockDb';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isConfigured = !!(supabaseUrl && supabaseAnonKey);
export const isPlaceholder = !isConfigured;

if (!isConfigured) {
  console.warn(
    '[Demo Mode] Happytalk is running with mock data. ' +
    'Real database connection requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
}

// Robust mock client for Demo Mode
const createMockClient = () => {
  const handler = {
    get(target, prop) {
      if (['from', 'auth', 'storage'].includes(prop)) {
        return (name) => createMockProxy(prop, name);
      }
      return () => createMockProxy();
    }
  };

  const createMockProxy = (type, name) => {
    const mock = {
      // Database mocking
      select: () => mock,
      insert: async (data) => ({ data, error: null }),
      update: () => mock,
      delete: () => mock,
      eq: () => mock,
      order: () => mock,
      limit: () => mock,
      single: async () => ({ data: (mockDb[name] || [])[0], error: null }),
      maybeSingle: async () => ({ data: (mockDb[name] || [])[0], error: null }),
      then: (resolve) => resolve({ data: mockDb[name] || [], error: null }),
      
      // Auth mocking
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async ({ email, data }) => ({ data: { user: { id: 'mock-1', email, user_metadata: data } }, error: null }),
      signInWithPassword: async ({ email }) => ({ data: { user: { id: 'mock-1', email } }, error: null }),
      signOut: async () => ({ error: null }),
      
      // Storage mocking
      getPublicUrl: (path) => ({ data: { publicUrl: path } }),
      remove: async () => ({ error: null })
    };
    return new Proxy(mock, handler);
  };

  return new Proxy({}, handler);
};

// Safe storage adapter
const safeStorage = {
  getItem: (key) => { try { return localStorage.getItem(key); } catch { return null; } },
  setItem: (key, value) => { try { localStorage.setItem(key, value); } catch { } },
  removeItem: (key) => { try { localStorage.removeItem(key); } catch { } }
};

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, { auth: { storage: safeStorage } })
  : createMockClient();