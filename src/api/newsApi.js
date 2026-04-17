import axios from 'axios';

// API Configuration - Dynamic resolution from Admin Panel
const getApiKey = (key, defaultVal) => {
    try {
        const saved = localStorage.getItem('adminApiKeys');
        if (saved) {
            const keys = JSON.parse(saved);
            return keys[key] || defaultVal;
        }
    } catch (e) { /* ignore */ }
    return defaultVal;
};

const NEWSAPI_ORG_KEY = getApiKey('news_org', import.meta.env.VITE_NEWSAPI_ORG_KEY);
const GNEWS_API_KEY = getApiKey('gnews', import.meta.env.VITE_GNEWS_API_KEY);
const THENEWSAPI_TOKEN = getApiKey('thenewsapi', import.meta.env.VITE_THENEWSAPI_TOKEN);
const WORLD_NEWS_API_KEY = getApiKey('worldnews', import.meta.env.VITE_WORLD_NEWS_API_KEY);
const NEWSDATA_API_KEY = getApiKey('newsdata', import.meta.env.VITE_NEWSDATA_API_KEY);
const MEDIASTACK_API_KEY = getApiKey('mediastack', import.meta.env.VITE_MEDIASTACK_API_KEY);

// Helper for robust base64 encoding
const safeBtoa = (str) => {
    try {
        if (!str) return Math.random().toString(36).substring(7);
        return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
        return Math.random().toString(36).substring(7);
    }
};

// Normalizers
const normalizeGNews = (article) => ({
    uuid: article.url ? safeBtoa(article.url) : `gnews-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    title: article.title,
    description: article.description,
    snippet: article.content,
    url: article.url,
    image_url: article.image || 'https://images.unsplash.com/photo-1504711434969?auto=format&fit=crop&q=80&w=800',
    published_at: article.publishedAt,
    source: article.source?.name || 'GNews',
    categories: [],
    provider: 'gnews'
});

const normalizeTheNewsAPI = (article) => ({
    uuid: article.uuid,
    title: article.title,
    description: article.description,
    snippet: article.snippet || article.description,
    url: article.url,
    image_url: article.image_url || 'https://images.unsplash.com/photo-1504711434969?auto=format&fit=crop&q=80&w=800',
    published_at: article.published_at,
    source: article.source,
    categories: article.categories || [],
    provider: 'thenewsapi'
});

const normalizeNewsAPIOrg = (article) => ({
    uuid: article.url ? safeBtoa(article.url) : `newsapi-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    title: article.title,
    description: article.description,
    snippet: article.content || article.description,
    url: article.url,
    image_url: article.urlToImage || getRandomImage(),
    published_at: article.publishedAt,
    source: article.source?.name || 'NewsAPI',
    categories: [],
    provider: 'newsapi'
});

const normalizeWorldNews = (article) => ({
    uuid: article.id ? `world-${article.id}` : safeBtoa(article.url),
    title: article.title,
    description: article.text,
    snippet: article.text?.substring(0, 200),
    url: article.url,
    image_url: article.image || 'https://images.unsplash.com/photo-1504711434969?auto=format&fit=crop&q=80&w=800',
    published_at: article.publish_date,
    source: article.author || 'World News',
    categories: [],
    provider: 'worldnews'
});

const normalizeNewsData = (article) => ({
    uuid: article.article_id || safeBtoa(article.link),
    title: article.title,
    description: article.description,
    snippet: article.content || article.description,
    url: article.link,
    image_url: article.image_url || 'https://images.unsplash.com/photo-1504711434969?auto=format&fit=crop&q=80&w=800',
    published_at: article.pubDate,
    source: article.source_id,
    categories: article.category || [],
    provider: 'newsdata'
});

const normalizeMediastack = (article) => ({
    uuid: article.url ? safeBtoa(article.url) : `media-${Date.now()}`,
    title: article.title,
    description: article.description,
    snippet: article.description,
    url: article.url,
    image_url: article.image || getRandomImage(),
    published_at: article.published_at,
    source: article.source,
    categories: [article.category],
    provider: 'mediastack'
});

// Fetchers
const fetchNewsAPIOrg = async (endpoint, params = {}) => {
    try {
        const url = `https://newsapi.org/v2${endpoint}`;
        const queryParams = {
            apiKey: NEWSAPI_ORG_KEY,
            language: 'en',
            pageSize: params.limit || 10,
            page: params.page || 1,
            ...params
        };
        const urlWithParams = `${url}?${new URLSearchParams(queryParams).toString()}`;
        const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(urlWithParams)}`;
        const { data } = await axios.get(proxyUrl);
        const parsedData = data;

        if (parsedData.status === 'ok') {
            return {
                articles: parsedData.articles.map(normalizeNewsAPIOrg),
                totalResults: parsedData.totalResults || 0
            };
        }
        return { articles: [], totalResults: 0 };
    } catch (error) {
        // Silently fail for known quota/network issues to reduce console noise
        if (error.response?.status !== 429 && error.response?.status !== 402) {
            console.error('NewsAPI.org fetch error:', error.message);
        }
        return { articles: [], totalResults: 0 };
    }
};

const fetchGNews = async (endpoint, params = {}) => {
    try {
        const url = `https://gnews.io/api/v4${endpoint}`;
        const queryParams = {
            token: GNEWS_API_KEY,
            lang: 'en',
            max: params.limit || 10,
            page: params.page || 1,
            ...params
        };
        const urlWithParams = `${url}?${new URLSearchParams(queryParams).toString()}`;
        const { data } = await axios.get(urlWithParams);
        return {
            articles: (data.articles || []).map(normalizeGNews),
            totalResults: data.totalArticles || 0
        };
    } catch (error) {
        return { articles: [], totalResults: 0 };
    }
};

const fetchWorldNews = async (params = {}) => {
    try {
        const url = `https://api.worldnewsapi.com/search-news`;
        const queryParams = {
            'api-key': WORLD_NEWS_API_KEY,
            'text': params.q || 'latest',
            'number': params.limit || 10,
            'offset': (params.page - 1) * (params.limit || 10),
            'language': 'en'
        };
        const urlWithParams = `${url}?${new URLSearchParams(queryParams).toString()}`;
        const { data } = await axios.get(urlWithParams);
        return {
            articles: (data.news || []).map(normalizeWorldNews),
            totalResults: data.available || 0
        };
    } catch (error) {
        return { articles: [], totalResults: 0 };
    }
};

const fetchNewsData = async (params = {}) => {
    try {
        const url = `https://newsdata.io/api/1/latest`;
        const queryParams = {
            apikey: NEWSDATA_API_KEY,
            q: params.q || 'news',
            language: 'en'
        };
        const urlWithParams = `${url}?${new URLSearchParams(queryParams).toString()}`;
        const { data } = await axios.get(urlWithParams);
        return {
            articles: (data.results || []).map(normalizeNewsData),
            totalResults: data.totalResults || 0
        };
    } catch (error) {
        if (error.response?.status !== 429 && error.response?.status !== 402) {
            console.error('NewsData Fetch Error:', error.message);
        }
        return { articles: [], totalResults: 0 };
    }
};

const fetchMediastack = async (params = {}) => {
    try {
        const url = `http://api.mediastack.com/v1/news`;
        const queryParams = {
            access_key: MEDIASTACK_API_KEY,
            keywords: params.q || 'latest',
            languages: 'en',
            limit: params.limit || 10,
            offset: (params.page - 1) * (params.limit || 10)
        };
        const urlWithParams = `${url}?${new URLSearchParams(queryParams).toString()}`;
        const { data } = await axios.get(urlWithParams);
        return {
            articles: (data.data || []).map(normalizeMediastack),
            totalResults: data.pagination?.total || 0
        };
    } catch (error) {
        return { articles: [], totalResults: 0 };
    }
};

const fetchTheNewsAPI = async (endpoint, params = {}) => {
    try {
        const url = `https://api.thenewsapi.com/v1/news${endpoint}`;
        const queryParams = {
            api_token: THENEWSAPI_TOKEN,
            language: 'en',
            limit: params.limit || 10,
            page: params.page || 1,
            ...params
        };
        const urlWithParams = `${url}?${new URLSearchParams(queryParams).toString()}`;
        const { data } = await axios.get(urlWithParams);
        return {
            articles: data.data.map(normalizeTheNewsAPI),
            totalResults: data.meta?.found || 0
        };
    } catch (error) {
        return { articles: [], totalResults: 0 };
    }
};

const FALLBACK_NEWS_IMAGES = [
    "https://images.unsplash.com/photo-1504711434969?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1585829365234-781fcdb4c40b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&q=80&w=800"
];

const getRandomImage = () => FALLBACK_NEWS_IMAGES[Math.floor(Math.random() * FALLBACK_NEWS_IMAGES.length)];

// Fallback: Multi-source RSS
const fetchRSS = async (topic = '') => {
    const rssSources = [
        { name: 'Google News', url: `https://news.google.com/rss/${topic ? `search?q=${topic}&` : ''}hl=en-US&gl=US&ceid=US:en` },
        { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
        { name: 'Reuters', url: 'https://news.google.com/rss/search?q=reuters&hl=en-US&gl=US&ceid=US:en' }, // Using Google News RSS search as Reuters direct feed is unstable
        { name: 'CNN', url: 'http://rss.cnn.com/rss/cnn_topstories.rss' },
        { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
        { name: 'NPR', url: 'https://feeds.npr.org/1001/rss.xml' },
        { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' }
    ];

    try {
        const allArticles = [];
        const promises = rssSources.map(async (source) => {
            try {
                const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(source.url)}`;
                const response = await axios.get(proxyUrl);
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");
                const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0, 30);
                
                return items.map(item => {
                    const title = item.querySelector("title")?.textContent || '';
                    const link = item.querySelector("link")?.textContent || '';
                    const pubDate = item.querySelector("pubDate")?.textContent || '';
                    const media = item.getElementsByTagName("media:content")[0] || item.getElementsByTagName("enclosure")[0];
                    const imageUrl = media?.getAttribute("url") || getRandomImage();

                    return {
                        uuid: safeBtoa(link),
                        title: title.split(' - ')[0],
                        description: item.querySelector("description")?.textContent?.replace(/<[^>]*>/g, '').substring(0, 200) || `Latest coverage from ${source.name}.`,
                        snippet: item.querySelector("description")?.textContent?.replace(/<[^>]*>/g, '') || `Global news update regarding "${title}".`,
                        url: link,
                        image_url: imageUrl,
                        published_at: new Date(pubDate).toISOString(),
                        source: source.name,
                        categories: topic ? [topic] : ['General'],
                        provider: 'rss'
                    };
                });
            } catch (err) { return []; }
        });

        const results = await Promise.allSettled(promises);
        results.forEach(res => {
            if (res.status === 'fulfilled') allArticles.push(...res.value);
        });

        return {
            articles: allArticles.slice(0, 300),
            totalResults: 500
        };
    } catch (error) {
        return { articles: [], totalResults: 0 };
    }
};



// Aggregator
const getAggregatedNews = async (fetchers, params = {}) => {
    const results = await Promise.allSettled(fetchers);
    let allArticles = [];
    let maxFound = 0;

    results.forEach(res => {
        if (res.status === 'fulfilled' && res.value.articles && res.value.articles.length > 0) {
            allArticles = [...allArticles, ...res.value.articles];
            if (res.value.totalResults > maxFound) maxFound = res.value.totalResults;
        }
    });

    if (allArticles.length === 0) {
        const topic = params.categories || params.q || '';
        const rssResult = await fetchRSS(topic);
        if (rssResult.articles && rssResult.articles.length > 0) {
            allArticles = rssResult.articles;
            maxFound = rssResult.totalResults;
        }
    }

    allArticles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    const seen = new Set();
    const uniqueArticles = allArticles.filter(article => {
        if (!article.title) return false;
        const duplicate = seen.has(article.title);
        seen.add(article.title);
        return !duplicate;
    });

    return { articles: uniqueArticles, totalResults: maxFound };
};

// Exports
export const getHeadlines = async (params = {}) => {
    const q = params.categories || params.search || 'latest';
    const page = params.page || 1;
    const limit = params.limit || 10;

    const fetchers = [];

    if (GNEWS_API_KEY) fetchers.push(fetchGNews('/search', { q, page, limit }));
    if (NEWSAPI_ORG_KEY) fetchers.push(fetchNewsAPIOrg('/everything', { q, page, limit }));
    if (THENEWSAPI_TOKEN) fetchers.push(fetchTheNewsAPI('/top', { search: q, page, limit }));
    if (WORLD_NEWS_API_KEY) fetchers.push(fetchWorldNews({ q, page, limit }));
    if (NEWSDATA_API_KEY) fetchers.push(fetchNewsData({ q, page, limit }));
    if (MEDIASTACK_API_KEY) fetchers.push(fetchMediastack({ q, page, limit }));

    if (fetchers.length === 0) {
        const result = await fetchRSS(q);
        return { data: result.articles, meta: { found: result.totalResults } };
    }

    const aggregated = await getAggregatedNews(fetchers, { q, page, limit });
    return { data: aggregated.articles, meta: { found: aggregated.totalResults } };
};

export const getTopStories = async (params = {}) => getHeadlines(params);

export const getAllNews = async (params = {}) => {
    const q = params.search || params.categories || 'latest';
    const page = params.page || 1;

    let result = { articles: [], totalResults: 0 };

    try {
        const newsapi = await fetchNewsAPIOrg('/everything', { q, page });
        if (newsapi.totalResults > 0) result = newsapi;
        else {
            const gnews = await fetchGNews('/search', { q, page });
            result = gnews;
        }
    } catch (e) {
        result = await fetchRSS(q);
    }

    return { data: result.articles, meta: { found: result.totalResults } };
};

export const getArticle = async (uuid) => ({ data: null });
export const getSimilarNews = async () => getHeadlines({ limit: 3 });
export const getSources = async () => ({ data: [] });

export const newsApi = {
    getHeadlines,
    getTopStories,
    getAllNews,
    getArticle,
    getSimilarNews,
    getSources,
};
