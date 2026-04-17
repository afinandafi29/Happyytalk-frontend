/**
 * Shared AI API: Centralized AI Gateway (HappyAI Proxy) first, then direct fallbacks.
 * Set VITE_OPENAI_API_KEY for ChatGPT, or VITE_GITHUB_AI_TOKEN for GitHub.
 */

const HAPPY_AI_GATEWAY = 'http://localhost:3001/api/ai';
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const GITHUB_AI_TOKEN = import.meta.env.VITE_GITHUB_AI_TOKEN || '';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const GITHUB_AI_URL = 'https://models.inference.ai.azure.com/chat/completions';

/**
 * @param {Array<{role: string, content: string}>} messages - conversation (system + user + assistant)
 * @returns {Promise<string>} - assistant reply text
 */
export async function fetchAIReply(messages) {
  // 1. Try Centralized HappyAI Gateway (Handles Rotation & CORS)
  try {
    const res = await fetch(HAPPY_AI_GATEWAY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map(m => ({ role: m.role || 'user', content: m.content })),
        model: "gpt-4o-mini"
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.content || '';
    }
    // Fall through if gateway is down
  } catch (e) {
    console.warn('HappyAI Gateway unreachable, falling back to direct keys:', e);
  }

  // 2. Try OpenAI if key is present
  if (OPENAI_KEY && OPENAI_KEY.startsWith('sk-')) {
    try {
      const res = await fetch(OPENAI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY.trim()}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content?.trim() || '';
      }
    } catch (e) {
      console.warn('OpenAI direct fetch failed:', e);
    }
  }

  // 3. GitHub Fallback
  const tokens = GITHUB_AI_TOKEN.split(',').map(t => t.trim()).filter(Boolean);
  if (tokens.length > 0) {
    for (let token of tokens) {
      try {
        const res = await fetch(GITHUB_AI_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages,
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          return data.choices?.[0]?.message?.content?.trim() || '';
        }
      } catch (e) {
        console.error('GitHub direct fetch failed:', e);
      }
    }
  }

  throw new Error('NO_AI_KEY_OR_FAILED');
}

export function hasAIKey() {
  return !!(OPENAI_KEY || GITHUB_AI_TOKEN);
}
