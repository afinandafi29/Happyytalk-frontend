import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
import { supabase, isPlaceholder } from '../supabase/config';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let cachedSession = null;
let sessionFetchPromise = null;

const getSession = async () => {
    // If a fetch is already in progress, return the promise
    if (sessionFetchPromise) return sessionFetchPromise;

    // Otherwise, start a new fetch
    sessionFetchPromise = (async () => {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) throw error;
            cachedSession = data?.session;
            return cachedSession;
        } catch (err) {
            console.warn('API Interceptor: Session retrieval failed:', err.message || err);
            return null;
        } finally {
            sessionFetchPromise = null;
        }
    })();

    return sessionFetchPromise;
};

// Initial session load
getSession();

// Listen for auth changes to update cache
supabase.auth.onAuthStateChange((event, session) => {
    cachedSession = session;
});

const isExpired = (session) => {
    if (!session?.expires_at) return true;
    // Add 10s buffer
    return (session.expires_at - 10) < (Date.now() / 1000);
};

api.interceptors.request.use(async (config) => {
    // Use cached session if available and NOT expired, otherwise attempt to get it (debounced)
    let session = cachedSession;
    
    if (!session || isExpired(session)) {
        session = await getSession();
    }

    if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export { api }