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

// Fixed mock client structure to perfectly mimic Supabase SDK
const createMockClient = () => {
  const mockAuth = {
    onAuthStateChange: (cb) => {
      // Return a mock subscription object
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async ({ email }) => ({ data: { user: { id: 'mock-1', email } }, error: null }),
    signUp: async ({ email, data }) => ({ data: { user: { id: 'mock-1', email, user_metadata: data } }, error: null }),
    signOut: async () => ({ error: null }),
  };

  const mockStorage = {
    from: (bucket) => ({
      getPublicUrl: (path) => ({ data: { publicUrl: path } }),
      remove: async () => ({ error: null }),
      upload: async () => ({ data: { path: 'mock-path' }, error: null }),
    }),
  };

  const createDbApi = (tableName) => {
    const api = {
      select: () => api,
      eq: () => api,
      maybeSingle: async () => ({ data: (mockDb[tableName] || [])[0], error: null }),
      single: async () => ({ data: (mockDb[tableName] || [])[0], error: null }),
      order: () => api,
      limit: () => api,
      insert: async (data) => ({ data, error: null }),
      update: () => api,
      delete: () => api,
      then: (resolve) => {
        // This handles cases like: await supabase.from('table').select('*')
        resolve({ data: mockDb[tableName] || [], error: null });
        return { catch: () => {} };
      }
    };
    return api;
  };

  return {
    auth: mockAuth,
    storage: mockStorage,
    from: (tableName) => createDbApi(tableName),
  };
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