import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYouTubeApiKey, getYouTubeApiKeys, rotateYouTubeApiKey } from '../api/youtubeApi';
import ShortsSection from '../components/Feed/ShortsSection';
import '../styles/YouTubeUI.css';

const YouTube = ({ onBack }) => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('Home'); // 'Home' or 'Shorts'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(false);
    const [nextPageToken, setNextPageToken] = useState('');
    const [quotaExceeded, setQuotaExceeded] = useState(false);
    const [apiKeyIndex, setApiKeyIndex] = useState(0);
    
    const searchInputRef = useRef(null);

    // Get all available keys to support fallback logic
    const availableKeys = React.useMemo(() => getYouTubeApiKeys(), []);
    const API_KEY = availableKeys[apiKeyIndex];
    
    const observer = useRef();

    const categories = [
        'All', 'Music', 'Gaming', 'Mixes', 'News', 'Live', 'Tech', 'ReactJS', 'Python', 'JavaScript', 'Programming', 'Podcasts', 'Cooking', 'Travel', 'Art', 'Fitness', 'Beauty', 'Comedy', 'Automobiles', 'Business', 'Finance', 'Crypto', 'Movies', 'Sports', 'Fashion', 'Learning'
    ];

    const handleBack = () => {
        if (onBack) onBack();
        else navigate(-1);
    };

    const fetchVideos = useCallback(async (query = '', pageToken = '') => {
        if (loading || !API_KEY || quotaExceeded) return;
        try {
            setLoading(true);
            const searchQuery = query || (selectedCategory === 'All' ? 'trending' : selectedCategory);

            // Enforce medium/long duration for Home content
            const durationParam = activeTab === 'Home' ? '&videoDuration=medium' : '';

            let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(searchQuery)}&type=video${durationParam}&key=${API_KEY}`;
            
            if (query === 'live' || selectedCategory === 'Live') {
                apiUrl += `&eventType=live`;
            } else {
                apiUrl += `&order=date`;
            }
            if (pageToken) apiUrl += `&pageToken=${pageToken}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.items) {
                setVideos(prev => pageToken ? [...prev, ...data.items] : data.items);
                setNextPageToken(data.nextPageToken || '');
                setQuotaExceeded(false);
            } else if (data.error) {
                console.error('YouTube API Error Data:', data.error);
                if (data.error.code === 403 && data.error.message.includes('quota')) {
                    // Use global rotation
                    const nextKey = rotateYouTubeApiKey();
                    if (nextKey) {
                        console.log(`[YouTube] Quota exceeded. Rotating to next key...`);
                        setApiKeyIndex(prev => prev + 1);
                    } else {
                        setQuotaExceeded(true);
                    }
                }
            }
        } catch (error) {
            console.error('YouTube API Fetch Exception:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, activeTab, API_KEY, loading, quotaExceeded, apiKeyIndex]);

    useEffect(() => {
        // Fetch on mount or when API key rotates
        if (!loading && !quotaExceeded && (videos.length === 0 || apiKeyIndex > 0)) {
            fetchVideos(searchTerm);
        }
    }, [fetchVideos, videos.length, loading, quotaExceeded, apiKeyIndex]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setVideos([]); // Clear current videos for new search
            fetchVideos(searchTerm);
        }
    };

    const handleCategoryClick = (category) => {
        if (category === selectedCategory) return;
        setActiveTab('Home'); // Switch back to Home if a category is clicked
        setVideos([]); 
        setSelectedCategory(category);
        setSearchTerm('');
    };

    const [activeVideoId, setActiveVideoId] = useState(null);

    const handleVideoClick = (videoId) => {
        setActiveVideoId(videoId);
    };

    // Infinite Scroll Logic
    const lastVideoRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && nextPageToken) {
                fetchVideos(searchTerm || selectedCategory, nextPageToken);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, nextPageToken, fetchVideos, searchTerm, selectedCategory]);

    return (
        <div className="youtube-clone-wrapper">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

            <header>
                <div className="left-section">
                    <i className="material-icons" onClick={handleBack} style={{ cursor: 'pointer' }}>menu</i>
                    <div className="yt-logo-container" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '4px' }}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                            alt="YouTube"
                            width="90"
                        />
                    </div>
                </div>
                <div className="search-container">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search"
                            value={searchTerm}
                            ref={searchInputRef}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="search-btn"><i className="material-icons">search</i></button>
                    </form>
                    <div style={{ marginLeft: '16px', background: '#181818', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <i className="material-icons" style={{ fontSize: 24 }}>mic</i>
                    </div>
                </div>
                <div className="right-section">
                    <i className="material-icons" title="Create">video_call</i>
                    <i className="material-icons" title="YouTube apps">apps</i>
                    <div className="notifications-container" style={{ position: 'relative' }}>
                        <i className="material-icons" title="Notifications">notifications</i>
                        <span className="notification-badge">9+</span>
                    </div>
                    <div className="channel-icon" title="Account" style={{ background: '#FF0000', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>H</div>
                </div>
            </header>

            <aside>
                <div className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => { setActiveTab('Home'); setSelectedCategory('All'); }}><i className="material-icons">home</i> Home</div>
                <div className={`nav-item ${activeTab === 'Shorts' ? 'active' : ''}`} onClick={() => setActiveTab('Shorts')}><i className="material-icons">explore</i> Shorts</div>
                <div className="nav-item"><i className="material-icons">subscriptions</i> Subscriptions</div>
                <hr />
                <div className="nav-item">You <i className="material-icons" style={{ fontSize: '16px', marginLeft: 'auto' }}>chevron_right</i></div>
                <div className="nav-item"><i className="material-icons">history</i> History</div>
                <div className="nav-item"><i className="material-icons">playlist_play</i> Playlists</div>
                <div className="nav-item"><i className="material-icons">smart_display</i> Your Videos</div>
                <div className="nav-item"><i className="material-icons">watch_later</i> Watch Later</div>
                <div className="nav-item"><i className="material-icons">thumb_up</i> Liked Videos</div>
                <hr />
                <div style={{ paddingLeft: '12px', marginBottom: '10px', fontSize: '16px', fontWeight: '500' }}>Subscriptions</div>
                <div className="nav-item">
                    <div className="channel-icon" style={{ width: '24px', height: '24px', marginRight: '20px', background: 'url(https://ui-avatars.com/api/?name=Music&background=random) center/cover' }}></div> Music
                </div>
                <div className="nav-item">
                    <div className="channel-icon" style={{ width: '24px', height: '24px', marginRight: '20px', background: 'url(https://ui-avatars.com/api/?name=Gaming&background=random) center/cover' }}></div> Gaming
                </div>
                <div className="nav-item">
                    <div className="channel-icon" style={{ width: '24px', height: '24px', marginRight: '20px', background: 'url(https://ui-avatars.com/api/?name=Tech&background=random) center/cover' }}></div> Tech
                </div>
                <div className="nav-item">
                    <div className="channel-icon" style={{ width: '24px', height: '24px', marginRight: '20px', background: 'url(https://ui-avatars.com/api/?name=News&background=random) center/cover' }}></div> News
                </div>
                <hr />
                <div className="nav-item"><i className="material-icons">settings</i> Settings</div>
                <div className="nav-item"><i className="material-icons">flag</i> Report History</div>
                <div className="nav-item"><i className="material-icons">help</i> Help</div>
                <div className="nav-item"><i className="material-icons">feedback</i> Send feedback</div>
            </aside>

            <main className={activeTab === 'Shorts' ? 'shorts-mode' : ''}>
                {quotaExceeded && (
                    <div className="quota-error-banner" style={{
                        background: 'rgba(255, 0, 0, 0.1)',
                        border: '1px solid #ff4d4d',
                        borderRadius: '8px',
                        padding: '16px',
                        margin: '16px',
                        textAlign: 'center',
                        color: '#ff4d4d',
                        gridColumn: '1/-1'
                    }}>
                        <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>warning</i>
                        <strong style={{ verticalAlign: 'middle' }}>YouTube API Quota Exceeded</strong>
                        <p style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
                            You've used all available requests for today. Please update your API keys in the `.env` file or try again later.
                        </p>
                    </div>
                )}
                {activeTab === 'Home' && (
                    <div className="filters">
                        {categories.map(cat => (
                            <div
                                key={cat}
                                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Shorts' ? (
                    <div className="youtube-shorts-inner-container" style={{ height: 'calc(100vh - 56px)', width: '100%', position: 'relative' }}>
                        <ShortsSection onBack={() => setActiveTab('Home')} />
                    </div>
                ) : (
                    <div className="video-grid">
                        {activeVideoId ? (
                            <div className="inline-player-container" style={{ gridColumn: '1/-1', width: '100%', aspectRatio: '16/9', marginBottom: '20px', position: 'relative' }}>
                                <button
                                    onClick={() => setActiveVideoId(null)}
                                    style={{ position: 'absolute', top: '-40px', right: '0', background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', zIndex: 10 }}
                                >
                                    Close Player
                                </button>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ borderRadius: '12px' }}
                                ></iframe>
                            </div>
                        ) : null}
                        {loading && videos.length === 0 ? (
                            <div style={{ color: 'white', padding: '40px', gridColumn: '1/-1', textAlign: 'center' }}>
                                <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.3)', borderRadius: '50%', borderTopColor: '#ff0000', animation: 'spin 1s ease-in-out infinite' }}></div>
                            </div>
                        ) : (
                            videos.map((video, index) => {
                                const videoId = video.id.videoId || (typeof video.id === 'string' ? video.id : null);
                                if (!videoId) return null;
                                
                                if (videos.length === index + 1) {
                                    return (
                                        <div ref={lastVideoRef} className="video-card" key={`${videoId}-${index}`} onClick={() => handleVideoClick(videoId)}>
                                            <div className="thumbnail">
                                                <img
                                                    src={video.snippet.thumbnails.medium.url}
                                                    alt={video.snippet.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                                                />
                                                {selectedCategory === 'Live' && <span style={{ position: 'absolute', bottom: 5, right: 5, background: 'red', color: 'white', padding: '2px 5px', borderRadius: 4, fontSize: 12 }}>LIVE</span>}
                                            </div>
                                            <div className="video-info">
                                                <div className="channel-icon" style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=${video.snippet.channelTitle}&background=random)`, backgroundSize: 'cover' }}></div>
                                                <div className="video-text">
                                                    <h3 dangerouslySetInnerHTML={{ __html: video.snippet.title }}></h3>
                                                    <div className="video-meta">{video.snippet.channelTitle}</div>
                                                    <div className="video-meta">
                                                        {new Date(video.snippet.publishedAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="video-card" key={`${videoId}-${index}`} onClick={() => handleVideoClick(videoId)}>
                                            <div className="thumbnail">
                                                <img
                                                    src={video.snippet.thumbnails.medium.url}
                                                    alt={video.snippet.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                                                />
                                                {selectedCategory === 'Live' && <span style={{ position: 'absolute', bottom: 5, right: 5, background: 'red', color: 'white', padding: '2px 5px', borderRadius: 4, fontSize: 12 }}>LIVE</span>}
                                            </div>
                                            <div className="video-info">
                                                <div className="channel-icon" style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=${video.snippet.channelTitle}&background=random)`, backgroundSize: 'cover' }}></div>
                                                <div className="video-text">
                                                    <h3 dangerouslySetInnerHTML={{ __html: video.snippet.title }}></h3>
                                                    <div className="video-meta">{video.snippet.channelTitle}</div>
                                                    <div className="video-meta">
                                                        {new Date(video.snippet.publishedAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        )}
                    </div>
                )}
                {loading && videos.length > 0 && (
                    <div style={{ color: 'white', padding: '20px', textAlign: 'center', width: '100%' }}>
                        <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid rgba(255,255,255,0.3)', borderRadius: '50%', borderTopColor: '#ff0000', animation: 'spin 1s ease-in-out infinite' }}></div>
                    </div>
                )}
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </main>
            <nav className="mobile-bottom-nav">
                <button className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => { setActiveTab('Home'); setSelectedCategory('All'); }}>
                    <i className="material-icons">home</i>
                    <span>Home</span>
                </button>
                <button className={`nav-item ${activeTab === 'Shorts' ? 'active' : ''}`} onClick={() => setActiveTab('Shorts')}>
                    <i className="material-icons">explore</i>
                    <span>Shorts</span>
                </button>
                <button className="nav-item plus-btn">
                    <div className="plus-icon">
                        <i className="material-icons">add</i>
                    </div>
                </button>
                <button className="nav-item" onClick={() => searchInputRef.current?.focus()}>
                    <i className="material-icons">search</i>
                    <span>Search</span>
                </button>
                <button className="nav-item" onClick={handleBack}>
                    <i className="material-icons">arrow_back</i>
                    <span>Back</span>
                </button>
            </nav>
        </div>
    );
};

export default YouTube;
