// Global state to synchronize key rotation across components
let activeKeyIndex = 0;
const exhaustedKeys = new Set();

/**
 * Shared YouTube API keys for all YouTube features.
 * Returns an array of available keys to support "try-next" logic on failure.
 */
export function getYouTubeApiKeys() {
  const keys = [];
  try {
    const saved = localStorage.getItem('adminApiKeys');
    if (saved) {
      const savedData = JSON.parse(saved);
      if (savedData?.youtube) keys.push(savedData.youtube);
    }
  } catch (_) { /* ignore */ }

  const key1 = import.meta.env.VITE_YT_API_KEY_1;
  const key2 = import.meta.env.VITE_YT_API_KEY_2;
  
  if (key1) keys.push(key1);
  if (key2) keys.push(key2);
  
  // Always include these since the user explicitly asked to use them
  keys.push('AIzaSyCH77hdoRb45Z-eheujpIWkUDegfF8ODzk');
  keys.push('AIzaSyANeN7n2QNDpiABJeFaehuvUccGLWp77_M');

  return [...new Set(keys)]; // Unique keys
}

/**
 * Returns the currently active YouTube API key.
 */
export function getYouTubeApiKey() {
    const keys = getYouTubeApiKeys();
    // Start from activeKeyIndex and skip exhausted ones if possible
    let index = activeKeyIndex % keys.length;
    return keys[index];
}

/**
 * Rotates to the next available API key.
 * Returns null if all keys have been tried.
 */
export function rotateYouTubeApiKey() {
    const keys = getYouTubeApiKeys();
    const currentKey = keys[activeKeyIndex % keys.length];
    exhaustedKeys.add(currentKey);

    if (exhaustedKeys.size >= keys.length) {
        return null; // All keys exhausted
    }

    activeKeyIndex = (activeKeyIndex + 1) % keys.length;
    return keys[activeKeyIndex];
}

export function isAllYouTubeKeysExhausted() {
    return exhaustedKeys.size >= getYouTubeApiKeys().length;
}
