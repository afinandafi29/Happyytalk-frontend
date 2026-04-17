import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYouTubeApiKeys, rotateYouTubeApiKey } from '../api/youtubeApi';
import { Play, Info, Plus, ChevronRight, ChevronLeft, Search, Bell, User, ArrowLeft } from 'lucide-react';
import '../styles/Movies.css';

const Movies = () => {
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const [heroVideo, setHeroVideo] = useState(null);
    const [activeVideoId, setActiveVideoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quotaExceeded, setQuotaExceeded] = useState(false);
    const [apiKeyIndex, setApiKeyIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [pageToken, setPageToken] = useState('');
    const [pageHistory, setPageHistory] = useState(['']); // Keep track of tokens for "Previous"
    const [currentIndex, setCurrentIndex] = useState(0);

    const availableKeys = React.useMemo(() => getYouTubeApiKeys(), []);
    const API_KEY = availableKeys[apiKeyIndex];

    const movieCategories = [
        { title: 'Trending Now', query: 'official movie trailers 2024' },
        { title: 'Action & Adventure', query: 'best action movie trailers' },
        { title: 'Sci-Fi & Fantasy', query: 'sci-fi movie trailers 2024' },
        { title: 'Comedy Hits', query: 'best comedy movie scenes' },
        { title: 'Horror Essentials', query: 'new horror movie trailers' },
        { title: 'Animation for Everyone', query: 'pixar dreamworks trailers' },
        { title: 'Documentaries', query: 'best documentary trailers 2024' }
    ];

    const fetchCategoryVideos = useCallback(async (query, limit = 10, currentToken = '') => {
        if (!API_KEY || quotaExceeded) return { items: [], nextToken: '' };
        try {
            let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limit}&q=${encodeURIComponent(query)}&type=video&videoDuration=long&key=${API_KEY}&order=relevance`;
            if (currentToken) apiUrl += `&pageToken=${currentToken}`;
            
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.items) {
                return { items: data.items, nextToken: data.nextPageToken || '' };
            } else if (data.error) {
                if (data.error.code === 403) {
                    const nextKey = rotateYouTubeApiKey();
                    if (nextKey) {
                        setApiKeyIndex(prev => prev + 1);
                    } else {
                        setQuotaExceeded(true);
                    }
                }
            }
            return { items: [], nextToken: '' };
        } catch (error) {
            console.error('Fetch error:', error);
            return { items: [], nextToken: '' };
        }
    }, [API_KEY, quotaExceeded]);

    useEffect(() => {
        const loadAllSections = async (token = '') => {
            setLoading(true);
            let nextGlobalToken = '';
            const loadedSections = await Promise.all(
                movieCategories.map(async (cat) => {
                    const result = await fetchCategoryVideos(cat.query, 10, token);
                    if (result.nextToken) nextGlobalToken = result.nextToken;
                    return {
                        ...cat,
                        videos: result.items
                    };
                })
            );
            
            const validSections = loadedSections.filter(s => s.videos.length > 0);
            setSections(validSections);
            setPageToken(nextGlobalToken);
            
            if (validSections.length > 0 && validSections[0].videos.length > 0) {
                setHeroVideo(validSections[0].videos[Math.floor(Math.random() * validSections[0].videos.length)]);
            }
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        loadAllSections(pageHistory[currentIndex]);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchCategoryVideos, currentIndex]);

    const handleNextPage = () => {
        if (!pageToken) return;
        const newHistory = [...pageHistory, pageToken];
        setPageHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    };

    const handlePrevPage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleVideoClick = (videoId) => {
        setActiveVideoId(videoId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return (
        <div className="netflix-loading">
            <div className="netflix-logo-anim">HAPPYTALK</div>
            <div className="loader-circle"></div>
        </div>
    );

    return (
        <div className="netflix-container">
            {/* Header */}
            <header className={`netflix-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="header-left">
                    <button className="back-btn-netflix" onClick={() => navigate('/apps')}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="ht-movies-logo">HAPPYTALK MOVIES</h1>
                    <nav className="header-nav desktop-only">
                        <span>Home</span>
                        <span>TV Shows</span>
                        <span>Movies</span>
                        <span>New & Popular</span>
                        <span>My List</span>
                    </nav>
                </div>
                <div className="header-right">
                    <Search size={20} className="header-icon" />
                    <Bell size={20} className="header-icon" />
                    <div className="user-avatar-mini">
                        <User size={18} />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                {heroVideo && !activeVideoId && (
                    <section className="hero-section">
                        <div className="hero-vignette"></div>
                        <img 
                            src={heroVideo.snippet.thumbnails.high.url} 
                            alt="Hero Background" 
                            className="hero-bg-img"
                        />
                        <div className="hero-content">
                            <h1 className="hero-title">{heroVideo.snippet.title.split('|')[0]}</h1>
                            <p className="hero-description">{heroVideo.snippet.description.substring(0, 150)}...</p>
                            <div className="hero-buttons">
                                <button className="play-btn" onClick={() => handleVideoClick(heroVideo.id.videoId)}>
                                    <Play size={20} fill="currentColor" /> Play
                                </button>
                                <button className="info-btn">
                                    <Info size={20} /> More Info
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Video Player */}
                {activeVideoId && (
                    <section className="main-player-section">
                        <div className="player-wrapper">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                                title="Player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <button className="close-player-btn" onClick={() => setActiveVideoId(null)}>
                                <Plus size={24} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                    </section>
                )}

                {/* Rows */}
                <div className="movie-rows-container">
                    {sections.map((section, idx) => (
                        <div key={idx} className="movie-row">
                            <h2 className="row-title">{section.title}</h2>
                            <div className="row-posters">
                                {section.videos.map((video) => (
                                    <div 
                                        key={video.id.videoId} 
                                        className="movie-poster-card"
                                        onClick={() => handleVideoClick(video.id.videoId)}
                                    >
                                        <img 
                                            src={video.snippet.thumbnails.medium.url} 
                                            alt={video.snippet.title} 
                                        />
                                        <div className="poster-overlay">
                                            <div className="poster-actions">
                                                <div className="circle-btn"><Play size={12} fill="white" /></div>
                                                <div className="circle-btn"><Plus size={12} /></div>
                                            </div>
                                            <p className="poster-title">{video.snippet.title.substring(0, 40)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="netflix-pagination">
                    <button 
                        className={`page-btn ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={handlePrevPage}
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft size={24} /> Previous
                    </button>
                    <span className="page-indicator">Page {currentIndex + 1}</span>
                    <button 
                        className={`page-btn ${!pageToken ? 'disabled' : ''}`}
                        onClick={handleNextPage}
                        disabled={!pageToken}
                    >
                        Next <ChevronRight size={24} />
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Movies;
