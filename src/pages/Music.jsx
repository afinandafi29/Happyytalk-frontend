import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYouTubeApiKeys, rotateYouTubeApiKey } from '../api/youtubeApi';
import { 
    Home, Search, Library, Plus, Heart, Play, Pause, 
    SkipBack, SkipForward, Repeat, Shuffle, Volume2, 
    Mic2, ListMusic, MonitorSpeaker, Maximize2, ArrowLeft,
    MoreHorizontal, Clock, LayoutGrid
} from 'lucide-react';
import '../styles/Music.css';

const FALLBACK_TRACKS = [
    {
        id: { videoId: '4NRXx6ETzFw' },
        snippet: {
            title: 'Blinding Lights',
            channelTitle: 'The Weeknd',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/4NRXx6ETzFw/default.jpg' } }
        }
    },
    {
        id: { videoId: '7Qp5vcuMIay' },
        snippet: {
            title: 'Shape of You',
            channelTitle: 'Ed Sheeran',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/7Qp5vcuMIay/default.jpg' } }
        }
    },
    {
        id: { videoId: 'TUVcVTV8nbe' },
        snippet: {
            title: 'Levitating',
            channelTitle: 'Dua Lipa',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/TUVcVTV8nbe/default.jpg' } }
        }
    },
    {
        id: { videoId: 'kTJczUoc26U' },
        snippet: {
            title: 'Stay',
            channelTitle: 'The Kid LAROI, Justin Bieber',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/kTJczUoc26U/default.jpg' } }
        }
    },
    {
        id: { videoId: 'H5v3kku4y6Q' },
        snippet: {
            title: 'As It Was',
            channelTitle: 'Harry Styles',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/H5v3kku4y6Q/default.jpg' } }
        }
    },
    {
        id: { videoId: 'G7KNmW9a75Q' },
        snippet: {
            title: 'Flowers',
            channelTitle: 'Miley Cyrus',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/G7KNmW9a75Q/default.jpg' } }
        }
    },
    {
        id: { videoId: 'XXYlFuWEuKI' },
        snippet: {
            title: 'Save Your Tears',
            channelTitle: 'The Weeknd',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/XXYlFuWEuKI/default.jpg' } }
        }
    },
    {
        id: { videoId: 'mRD0-GxqHVo' },
        snippet: {
            title: 'Heat Waves',
            channelTitle: 'Glass Animals',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/mRD0-GxqHVo/default.jpg' } }
        }
    },
    {
        id: { videoId: 'qoluvmvN980' },
        snippet: {
            title: 'Cold Heart',
            channelTitle: 'Elton John, Dua Lipa',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/qoluvmvN980/default.jpg' } }
        }
    },
    {
        id: { videoId: 'orJSJGHjBLI' },
        snippet: {
            title: 'Bad Habits',
            channelTitle: 'Ed Sheeran',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/orJSJGHjBLI/default.jpg' } }
        }
    },
    {
        id: { videoId: 'UTHLK80zHS8' },
        snippet: {
            title: 'Industry Baby',
            channelTitle: 'Lil Nas X, Jack Harlow',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/UTHLK80zHS8/default.jpg' } }
        }
    },
    {
        id: { videoId: 'gNi_6U5Pm_o' },
        snippet: {
            title: 'Good 4 U',
            channelTitle: 'Olivia Rodrigo',
            thumbnails: { default: { url: 'https://i.ytimg.com/vi/gNi_6U5Pm_o/default.jpg' } }
        }
    }
];

const Music = () => {
    const navigate = useNavigate();
    const [tracks, setTracks] = useState(FALLBACK_TRACKS);
    const [activeTrack, setActiveTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(true);
    const [quotaExceeded, setQuotaExceeded] = useState(false);
    const [apiKeyIndex, setApiKeyIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [volume, setVolume] = useState(80);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(245);
    const [startAt, setStartAt] = useState(0);

    const availableKeys = React.useMemo(() => getYouTubeApiKeys(), []);
    const API_KEY = availableKeys[apiKeyIndex];

    const fetchMusic = useCallback(async (query = 'top hits 2024') => {
        if (!API_KEY || quotaExceeded) return;
        try {
            setLoading(true);
            const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${encodeURIComponent(query)}&type=video&videoEmbeddable=true&videoCategoryId=10&key=${API_KEY}`;
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.items) {
                setTracks(data.items);
                if (!activeTrack && data.items.length > 0) {
                    setActiveTrack(data.items[0]);
                }
            } else if (data.error) {
                if (data.error.code === 403) {
                    const nextKey = rotateYouTubeApiKey();
                    if (nextKey) setApiKeyIndex(prev => prev + 1);
                    else {
                        setQuotaExceeded(true);
                        setTracks(FALLBACK_TRACKS);
                    }
                }
            } else if (!data.items || data.items.length === 0) {
                setTracks(FALLBACK_TRACKS);
            }
        } catch (error) {
            console.error('Music fetch error:', error);
        } finally {
            setLoading(false);
        }
    }, [API_KEY, quotaExceeded, activeTrack]);

    useEffect(() => {
        fetchMusic();
    }, [fetchMusic]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) fetchMusic(searchTerm);
    };

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, duration]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const togglePlay = (track) => {
        if (activeTrack?.id?.videoId === track.id?.videoId) {
            setIsPlaying(!isPlaying);
        } else {
            setActiveTrack(track);
            setIsPlaying(true);
            setCurrentTime(0);
            setStartAt(0);
            setDuration(Math.floor(Math.random() * 100) + 180);
        }
    };

    const handleNext = () => {
        if (tracks.length === 0) return;
        const currentIndex = tracks.findIndex(t => t.id.videoId === activeTrack?.id?.videoId);
        const nextIndex = (currentIndex + 1) % tracks.length;
        togglePlay(tracks[nextIndex]);
    };

    const handlePrev = () => {
        if (tracks.length === 0) return;
        const currentIndex = tracks.findIndex(t => t.id.videoId === activeTrack?.id?.videoId);
        const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        togglePlay(tracks[prevIndex]);
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedPercent = x / rect.width;
        const newTime = Math.floor(clickedPercent * duration);
        setCurrentTime(newTime);
        setStartAt(newTime);
    };

    return (
        <div className="spotify-container">
            {/* Sidebar */}
            <aside className="spotify-sidebar">
                <div className="sidebar-nav">
                    <button className="back-btn-spotify" onClick={() => navigate('/apps')}>
                        <ArrowLeft size={24} />
                    </button>
                    <div className="nav-item active"><Home size={24} /> <span>Home</span></div>
                    <div className="nav-item"><Search size={24} /> <span>Search</span></div>
                    <div className="nav-item"><Library size={24} /> <span>Your Library</span></div>
                </div>

                <div className="sidebar-playlist">
                    <div className="nav-item"><Plus size={24} className="plus-sq" /> <span>Create Playlist</span></div>
                    <div className="nav-item"><Heart size={24} className="heart-sq" /> <span>Liked Songs</span></div>
                </div>

                <div className="sidebar-divider"></div>

                <div className="playlist-list">
                    <p>My Awesome Mix</p>
                    <p>Daily Drive</p>
                    <p>Late Night Vibes</p>
                    <p>Focus Flow</p>
                    <p>Happytalk Radio</p>
                </div>
            </aside>

            <main className="spotify-main">
                <header className="spotify-header">
                   <button 
                        onClick={() => navigate('/apps')}
                        className="mobile-only-back-btn"
                   >
                       <ArrowLeft size={32} />
                   </button>
                   <form className="spotify-search-form" onSubmit={handleSearch}>
                        <Search size={18} />
                        <input 
                            placeholder="What do you want to listen to?" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                   </form>
                   <div className="user-profile">
                        <div className="upgrade-btn hidden md:block">Explore Premium</div>
                        <div className="user-circle">H</div>
                   </div>
                </header>

                <div className="scroll-content">
                    <section className="hero-music">
                        <div className="hero-gradient"></div>
                        <div className="hero-row">
                            <div className="hero-img-container">
                                {activeTrack && <img src={activeTrack.snippet.thumbnails.high.url} alt="Active" />}
                            </div>
                            <div className="hero-text">
                                <p>PLAYLIST</p>
                                <h1>Happytalk Top Hits</h1>
                                <p className="hero-meta">Created by <span>Happytalk</span> • 30 songs, 2 hr 15 min</p>
                            </div>
                        </div>
                    </section>

                    <div className="music-controls-row">
                        <button className="big-play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause size={28} color="white" fill="white" /> : <Play size={28} color="white" fill="white" />}
                        </button>
                        <Heart size={32} className="heart-icon-row" />
                        <MoreHorizontal size={24} className="more-icon-row" />
                    </div>

                    <table className="tracks-table">
                        <thead>
                            <tr>
                                <th width="50">#</th>
                                <th>Title</th>
                                <th className="desktop-only">Album</th>
                                <th className="desktop-only"><Clock size={16} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="loading-td">Loading hits...</td></tr>
                            ) : tracks.map((track, i) => (
                                <tr 
                                    key={track.id.videoId} 
                                    className={activeTrack?.id?.videoId === track.id.videoId ? 'active-row' : ''}
                                    onClick={() => togglePlay(track)}
                                >
                                    <td>{i + 1}</td>
                                    <td className="track-title-cell">
                                        <img src={track.snippet.thumbnails.default.url} alt="thumb" />
                                        <div>
                                            <p className="song-name">{track.snippet.title.split('-')[1] || track.snippet.title}</p>
                                            <p className="artist-name">{track.snippet.channelTitle}</p>
                                        </div>
                                    </td>
                                    <td className="desktop-only">{track.snippet.channelTitle}</td>
                                    <td className="desktop-only">3:45</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Player Bar */}
            <footer className="spotify-player">
                <div className="player-left">
                    {activeTrack && (
                        <>
                            <img src={activeTrack.snippet.thumbnails.default.url} alt="current" />
                             <div className="player-track-info">
                                <div className="marquee-container">
                                    <p className="p-song-name marquee-text">{activeTrack.snippet.title.split('-')[1] || activeTrack.snippet.title}</p>
                                </div>
                                <p className="p-artist-name">{activeTrack.snippet.channelTitle}</p>
                            </div>
                            <Heart size={16} className="p-heart" />
                        </>
                    )}
                </div>

                <div className="player-center">
                    <div className="p-controls">
                        <Shuffle size={18} className="p-icon" />
                        <SkipBack size={20} className="p-icon" onClick={handlePrev} />
                        <button className="p-play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? (
                                <Pause size={44} color="#fff" fill="#fff" />
                            ) : (
                                <Play size={44} color="#fff" fill="#fff" style={{ marginLeft: '4px' }} />
                            )}
                        </button>
                        <SkipForward size={20} className="p-icon" onClick={handleNext} />
                        <Repeat size={18} className="p-icon" />
                    </div>
                    <div className="p-progress">
                        <span>{formatTime(currentTime)}</span>
                        <div className="p-bar-bg" onClick={handleSeek}>
                            <div 
                                className="p-bar-fill" 
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            ></div>
                        </div>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="player-right desktop-only">
                    <Mic2 size={16} className="p-icon" />
                    <ListMusic size={16} className="p-icon" />
                    <MonitorSpeaker size={16} className="p-icon" />
                    <div className="p-vol-row">
                        <Volume2 size={16} />
                        <div className="p-bar-bg small"><div className="p-bar-fill" style={{ width: `${volume}%` }}></div></div>
                    </div>
                    <Maximize2 size={16} className="p-icon" />
                </div>

                 {/* Hidden YouTube Iframe for Audio */}
                 {activeTrack && isPlaying && (
                    <div style={{ display: 'none' }}>
                        <iframe
                            key={`${activeTrack.id.videoId}-${startAt}`}
                            width="0"
                            height="0"
                            src={`https://www.youtube.com/embed/${activeTrack.id.videoId}?autoplay=1&start=${startAt}`}
                            title="Player"
                        ></iframe>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default Music;
