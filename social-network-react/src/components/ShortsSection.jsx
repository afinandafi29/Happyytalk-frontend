import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle, Heart, MessageCircle, Repeat, Share2, Bookmark, ChevronLeft } from 'lucide-react';
import { getYouTubeApiKey } from '../api/youtubeApi';

export const ShortsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ShortsSection = ({ onBack }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState('');
    const [interactions, setInteractions] = useState({});
    const [activeIdx, setActiveIdx] = useState(0);
    const observer = useRef();

    const fetchShorts = async (pageToken = '') => {
        try {
            setLoading(true);
            const YT_KEY = getYouTubeApiKey();
            const queries = ['funny shorts', 'coding shorts', 'travel shorts', 'cooking shorts', 'tech shorts'];
            const query = queries[Math.floor(Math.random() * queries.length)];

            // Fallback for demo if no key or simple fetch
            if (!YT_KEY) {
                // Mock data
                const mockVideos = Array.from({ length: 5 }).map((_, i) => ({
                    id: `mock-${Date.now()}-${i}`,
                    username: `User_${Math.floor(Math.random() * 1000)}`,
                    desc: 'Check out this cool video! #shorts #viral',
                    pic: `https://i.pravatar.cc/150?u=${i}`
                }));
                // Simulate pagination for endless scroll
                setVideos(prev => [...prev, ...mockVideos]);
                setLoading(false);
                return;
            }

            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&videoDuration=short&key=${YT_KEY}&pageToken=${pageToken}`
            );
            const data = await response.json();
            if (data.items) {
                const newVideos = data.items.map(item => ({
                    id: item.id.videoId,
                    username: item.snippet.channelTitle,
                    desc: item.snippet.title,
                    pic: `https://i.pravatar.cc/150?u=${item.id.videoId}`
                }));
                if (pageToken) setVideos(prev => [...prev, ...newVideos]);
                else setVideos(newVideos);
                setNextPageToken(data.nextPageToken || '');
            }
        } catch (error) {
            console.error('Reels Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShorts();
    }, []);

    const lastReelRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                // Loop if mock or use token
                if (nextPageToken || !getYouTubeApiKey()) {
                    fetchShorts(nextPageToken);
                }
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, nextPageToken]);

    const handleScroll = (e) => {
        const container = e.target;
        const index = Math.round(container.scrollTop / container.clientHeight);
        if (index !== activeIdx) setActiveIdx(index);
    };

    const handleShare = async (video) => {
        const shareData = {
            title: video.desc,
            text: `Check out this short on Happytalk: ${video.desc}`,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                toggle(video.id, 'shared');
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard!');
                toggle(video.id, 'shared');
            }
        } catch (err) {
            console.error('Share failed:', err);
        }
    };

    const toggle = (id, field) => {
        setInteractions(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: !prev[id]?.[field] }
        }));
    };

    if (loading && videos.length === 0) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#000', color: '#fff' }}>
            <div className="loader-shorts"></div>
            <p style={{ marginLeft: '10px' }}>Loading Shorts...</p>
        </div>
    );

    return (
        <div className="shorts-scroll-container" onScroll={handleScroll}>
            {/* Overlay Navigation for Mobile Shorts */}
            <div className="shorts-mobile-ov-nav md:hidden" style={{
                position: 'fixed',
                top: '70px',
                left: '20px',
                zIndex: 100,
                pointerEvents: 'none'
            }}>
                <button onClick={onBack || (() => window.history.back())} style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto',
                    color: '#fff',
                    cursor: 'pointer'
                }}>
                    <ChevronLeft size={24} />
                </button>
            </div>

            {videos.map((video, idx) => (
                <div key={`${video.id}-${idx}`} className="reel-container" ref={idx === videos.length - 1 ? lastReelRef : null}>
                    <div className="reel-section" style={{ position: 'relative', height: '100%', width: '100%' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#000' }}>
                            <iframe
                                className="iframe-reel"
                                width="100%" height="100%"
                                src={`https://www.youtube.com/embed/${video.id}?autoplay=${activeIdx === idx ? 1 : 0}&mute=0&loop=1&playlist=${video.id}&controls=1&modestbranding=1&rel=0`}
                                frameBorder="0" allow="autoplay; encrypted-media" title="Video"
                                style={{ pointerEvents: 'auto' }} // Interaction allowed
                            />
                        </div>

                        {/* Text Overlay - Aline Style */}
                        <div className="shorts-text-overlay" style={{
                            position: 'absolute',
                            bottom: '80px',
                            left: '15px',
                            zIndex: 21,
                            pointerEvents: 'none',
                            width: 'calc(100% - 80px)',
                            textAlign: 'left'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                    padding: '2px'
                                }}>
                                    <img 
                                        src={video.pic} 
                                        alt={video.username} 
                                        style={{ width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #000' }}
                                    />
                                </div>
                                <span style={{ color: '#fff', fontWeight: '800', fontSize: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                    @{video.username.replace(/\s+/g, '').toLowerCase()}
                                </span>
                                <button style={{
                                    background: '#fff',
                                    color: '#000',
                                    border: 'none',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    pointerEvents: 'auto',
                                    cursor: 'pointer'
                                }}>
                                    Follow
                                </button>
                            </div>
                            <p style={{
                                color: '#fff',
                                fontSize: '0.95rem',
                                lineHeight: '1.4',
                                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                                marginBottom: '10px',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {video.desc}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: '0.85rem' }}>
                                <i className="fas fa-music" style={{ fontSize: '0.75rem' }}></i>
                                <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    Original Audio • {video.username}
                                </span>
                            </div>
                        </div>

                        {/* Right Side Actions - Icons Only */}
                        <div className="action-btn" style={{ position: 'absolute', right: '10px', bottom: '150px', zIndex: 20 }}>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center' }}>
                                <li>
                                    <button className="iconbtn" onClick={() => toggle(video.id, 'liked')} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '12px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                                        <Heart size={28} fill={interactions[video.id]?.liked ? '#ff3b5c' : 'rgba(255,255,255,0.9)'} color={interactions[video.id]?.liked ? '#ff3b5c' : 'white'} />
                                    </button>
                                </li>
                                <li>
                                    <button className="iconbtn" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '12px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                                        <MessageCircle size={28} color="white" />
                                    </button>
                                </li>
                                <li>
                                    <button className="iconbtn" onClick={() => toggle(video.id, 'reposted')} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '12px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                                        <Repeat size={28} color={interactions[video.id]?.reposted ? '#22c55e' : 'white'} />
                                    </button>
                                </li>
                                <li>
                                    <button className="iconbtn" onClick={() => handleShare(video)} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '12px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                                        <Share2 size={28} color={interactions[video.id]?.shared ? '#3b82f6' : 'white'} />
                                    </button>
                                </li>
                                <li>
                                    <button className="iconbtn" onClick={() => toggle(video.id, 'saved')} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '12px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                                        <Bookmark size={28} fill={interactions[video.id]?.saved ? '#fbbf24' : 'white'} color={interactions[video.id]?.saved ? '#fbbf24' : 'white'} />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShortsSection;
