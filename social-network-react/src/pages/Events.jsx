import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Calendar, MapPin, Users, Share2, Plus, Search, 
    Filter, ChevronLeft, ChevronRight, Star, 
    CheckCircle, Mail, MoreHorizontal, Globe, 
    LayoutGrid, List, Clock, Zap, ArrowLeft,
    Video, MessageSquare, Heart, Shield,
    Trophy, Sparkles, Coffee, BookOpen, Brain, 
    Code, Rocket, Megaphone, Smartphone, ExternalLink,
    Bookmark, History, Compass, Activity, Briefcase
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const INITIAL_LOAD = 8;
const LOAD_MORE_COUNT = 4;

const Events = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [activeCategory, setActiveCategory] = useState('All events');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    
    // Timer to update current time for live status
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Infinite Scroll Intersection Observer
    const loaderRef = useRef(null);

    const categories = [
        { name: 'All events', icon: LayoutGrid },
        { name: 'Technology', icon: Cpu },
        { name: 'Morning Routines', icon: BookOpen },
        { name: 'Social Activities', icon: Compass },
        { name: 'Language Learning', icon: MessageSquare },
        { name: 'Sports and Fitness', icon: Trophy },
        { name: 'Startup and Biz', icon: Rocket },
        { name: 'Career and Business', icon: Briefcase },
    ];

    function Cpu(props) { return <Smartphone {...props} />; }

    // Mock current day and times
    const today = new Date();
    const h = today.getHours();

    const eventDataRaw = [
        {
            id: 'live-1',
            title: "Join Our Morning Tech Talk",
            timeStr: "Starts Now",
            startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, 0),
            location: "Live Suite",
            host: "Tech Experts",
            attendees: 120,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?auto=format&fit=crop&q=80&w=1200",
            category: "Technology",
            desc: "A live session happening right now about the future of AI."
        },
        {
            id: 'upcoming-1',
            title: "Mindfulness and Breathing Mastery",
            timeStr: `Today at ${(h+2) % 24}:00`,
            startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), (h + 2) % 24, 0),
            location: "Virtual Zen",
            host: "Zen Guides",
            attendees: 85,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
            category: "Morning Routines",
            desc: "Prepare yourself for a deep state of focus and calm."
        },
        {
            id: 'english-1',
            title: "English Fluency Bootcamp",
            timeStr: "Every Mon at 8:00 PM",
            startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0),
            location: "Interactive Hub",
            host: "Fluency School",
            attendees: 210,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
            category: "Language Learning",
            desc: "The fastest way to achieve fluency through direct speaking practice."
        },
        {
            id: 'startup-1',
            title: "Fundraising for Early Startups",
            timeStr: "Tomorrow at 4:30 PM",
            startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 16, 30),
            location: "Global Stage",
            host: "VC Network",
            attendees: 350,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200",
            category: "Startup and Biz",
            desc: "Learn the secrets of successful fundraising from veterans."
        }
    ];

    const allRecords = useMemo(() => {
        let pool = [];
        for(let i=0; i<15; i++) {
            pool = [...pool, ...eventDataRaw.map((e, idx) => ({ ...e, id: `${e.id}-${i}` }))];
        }
        return pool;
    }, []);

    const filteredEvents = allRecords.filter(event => {
        const matchesCategory = activeCategory === 'All events' || event.category === activeCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const displayEvents = filteredEvents.slice(0, visibleCount);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading && visibleCount < filteredEvents.length) {
                setIsLoading(true);
                setTimeout(() => {
                    setVisibleCount(prev => prev + LOAD_MORE_COUNT);
                    setIsLoading(false);
                }, 800);
            }
        }, { threshold: 1.0 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [isLoading, visibleCount, filteredEvents.length]);

    const handleEventClick = (id) => {
        setSelectedEventId(id);
        window.scrollTo(0, 0);
    };

    const isLive = (event) => {
        return currentTime.getTime() >= event.startTime.getTime();
    };

    const getCountdown = (event) => {
        const diff = event.startTime.getTime() - currentTime.getTime();
        if (diff <= 0) return "Started";
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        return `Starts in ${hours}h ${mins}m ${secs}s`;
    };

    const currentEvent = allRecords.find(e => e.id === selectedEventId);

    return (
        <div className="black-meetup-root">
            {/* FIXED BACK BUTTON */}
            <button className="fixed-back-btn" onClick={() => navigate('/')}>
                <ArrowLeft size={18} />
                <span>Back</span>
            </button>

            <div className="meetup-immersive">
                
                {/* BLACK HEADER */}
                <header className="meetup-header-v2">
                    <div className="header-content-v2">
                        <div className="h-c-v2">
                            <div className="search-pill-v2">
                                <Search size={18} className="s-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Search for events..." 
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(INITIAL_LOAD); }}
                                />
                            </div>
                        </div>
                        <div className="h-r-v2">
                            <Compass size={20} className="r-icon" />
                            <Plus size={20} className="r-icon" />
                            <div className="h-divider"></div>
                        <button className="add-event-v4-btn" onClick={() => setSelectedEventId(null)}>
                            <Plus size={20} />
                            <span>Add Event</span>
                        </button>
                        <div className="h-divider"></div>
                            <div className="live-status-pill">
                                <div className="live-dot"></div>
                                <span>Global LIVE</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* CATEGORY RAIL */}
                <div className="meetup-rail-v3">
                    <div className="rail-inner-v3">
                        {categories.map(cat => (
                            <button 
                                key={cat.name} 
                                className={`rail-item-v3 ${activeCategory === cat.name ? 'active' : ''}`}
                                onClick={() => { setActiveCategory(cat.name); setVisibleCount(INITIAL_LOAD); setSelectedEventId(null); }}
                            >
                                <cat.icon size={26} />
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* MAIN FEED */}
                <main className="meetup-feed-area">
                    {selectedEventId ? (
                         <div className="detail-page-v3 animate-in">
                            <button className="back-btn-v3" onClick={() => setSelectedEventId(null)}>
                                <ArrowLeft size={18} /> <span>Back to Feed</span>
                            </button>
                            
                            <div className="poster-card-v3">
                                <img src={currentEvent.image} alt="event" />
                                <div className="poster-info-v3">
                                    <div className="badge-row">
                                        <span className="p-cat">{currentEvent.category}</span>
                                        {isLive(currentEvent) && <span className="p-live">JOIN NOW</span>}
                                    </div>
                                    <h1>{currentEvent.title}</h1>
                                    <p className="p-host">Hosted by {currentEvent.host}</p>
                                </div>
                            </div>

                            <div className="content-grid-v3">
                                <div className="c-main-v3">
                                    <section className="c-info">
                                        <h3>About this session</h3>
                                        <p>{currentEvent.desc}</p>
                                    </section>

                                    <section className="c-interact">
                                        <div className="status-hero-v3">
                                            {isLive(currentEvent) ? (
                                                <div className="interaction-ready animate-in">
                                                    <div className="success-tag">
                                                        <CheckCircle size={28} />
                                                        <div>
                                                            <h4>The meeting is live!</h4>
                                                            <p>You can join the room and participate with the group.</p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        className="join-live-btn-v3"
                                                        onClick={() => navigate(`/room/event-${currentEvent.id}?title=${encodeURIComponent(currentEvent.title)}`)}
                                                    >
                                                        <Video size={24} />
                                                        <span>Join Live Room</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="interaction-wait">
                                                    <div className="wait-tag">
                                                        <Clock size={28} />
                                                        <div>
                                                            <h4>Waiting to start...</h4>
                                                            <p>{getCountdown(currentEvent)}</p>
                                                        </div>
                                                    </div>
                                                    <button className="join-live-btn-v3 waiting" disabled>
                                                        <Zap size={24} />
                                                        <span>Wait for Session</span>
                                                    </button>
                                                    <p className="form-info-msg">Join button will activate as soon as the session starts.</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="optional-form-v3">
                                            <h4>Optional Information</h4>
                                            <p>Registering helps the host know you're interested.</p>
                                            <div className="mini-form-row">
                                                <input type="text" placeholder="Your Name" />
                                                <input type="email" placeholder="Your Email" />
                                                <button className="mini-reg-btn">Sign-In</button>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="c-sidebar-v3">
                                    <div className="side-card-v3">
                                        <div className="side-row-v3">
                                            <Calendar size={22} color="#0052ff" />
                                            <div>
                                                <strong>{currentEvent.date || 'Today'}</strong>
                                                <span>{currentEvent.timeStr}</span>
                                            </div>
                                        </div>
                                        <div className="divider-v3"></div>
                                        <div className="side-row-v3">
                                            <Users size={22} color="#0052ff" />
                                            <div>
                                                <strong>{currentEvent.attendees} Attending</strong>
                                                <span>Live from global lounge</span>
                                            </div>
                                        </div>
                                        <div className="avatars-row-v3">
                                            {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/50?u=${i+44}`} alt="u" />)}
                                            <div className="more-av">+ {currentEvent.attendees - 4}</div>
                                        </div>
                                        <div className="btn-actions-v3">
                                            <button className="a-btn"><Share2 size={18} /></button>
                                            <button className="a-btn"><Mail size={18} /></button>
                                            <button className="a-btn"><MoreHorizontal size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    ) : (
                        <div className="discover-v3">
                            <div className="grid-v3">
                                {displayEvents.map(event => (
                                    <div key={event.id} className="card-v3" onClick={() => handleEventClick(event.id)}>
                                        <div className="card-media-v3">
                                            <img src={event.image} alt={event.title} loading="lazy" />
                                            {isLive(event) ? (
                                                <div className="live-pill-v3">LIVE NOW</div>
                                            ) : (
                                                <div className="wait-pill-v3">{event.timeStr}</div>
                                            )}
                                            <button className="save-btn-v3"><Bookmark size={18} /></button>
                                        </div>
                                        <div className="card-data-v3">
                                            <h3 className="card-title-v3">{event.title}</h3>
                                            <p className="card-meta-v3">{event.host} • {event.category}</p>
                                            <div className="card-footer-v3">
                                                <div className="footer-l">
                                                    <Users size={14} className="ico-gray" />
                                                    <span>{event.attendees} attendees</span>
                                                </div>
                                                <div className="footer-r">
                                                    <span className="rating-v3">{event.rating || '4.5'} <Star size={10} fill="currentColor" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* INFINITE LOADER */}
                            <div ref={loaderRef} className="sentinel-v3">
                                {isLoading && <div className="loading-spinner-v3"></div>}
                                {!isLoading && visibleCount >= filteredEvents.length && filteredEvents.length > 0 && (
                                    <p className="end-msg-v3">Catch up on all live events above!</p>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <style>{`
                .black-meetup-root {
                    height: 100vh;
                    width: 100vw;
                    background: #000;
                    color: #fff;
                    font-family: 'Inter', system-ui, sans-serif;
                    overflow: hidden;
                    position: fixed;
                    top: 0;
                    right: 0;
                    left: 0;
                    z-index: 21000;
                }

                .fixed-back-btn {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    z-index: 22000;
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    padding: 8px 20px;
                    border-radius: 99px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: 600;
                    font-size: 14px;
                }
                .fixed-back-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateX(4px);
                }
                .fixed-back-btn span {
                    letter-spacing: 0.5px;
                }

                .meetup-immersive { height: 100%; width: 100%; display: flex; flex-direction: column; }

                /* HEADER - V2 BLACK */
                .meetup-header-v2 {
                    padding: 0 40px;
                    height: 74px;
                    background: #000;
                    border-bottom: 1px solid #111;
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .header-content-v2 { 
                    width: 100%;
                    max-width: 1400px; 
                    margin: 0 auto; 
                    display: flex; 
                    align-items: center; 
                    justify-content: flex-end; 
                }
                
                .h-c-v2 { 
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    max-width: 550px; 
                }
                .search-pill-v2 { display: flex; align-items: center; background: #0f0f0f; border-radius: 12px; padding: 12px 20px; color: #888; border: 1px solid #222; }
                .search-pill-v2 input { background: transparent; border: none; outline: none; width: 100%; color: #fff; font-size: 14px; font-weight: 500; margin-left: 10px; }

                .h-r-v2 { display: flex; align-items: center; gap: 18px; color: #777; }
                .r-icon { cursor: pointer; transition: color 0.1s; }
                .r-icon:hover { color: #0052ff; }
                .h-divider { width: 1px; height: 32px; background: #111; }
                
                .add-event-v4-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #0052ff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 14px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .add-event-v4-btn:hover { transform: translateY(-2px); }
                
                .live-status-pill { display: flex; align-items: center; gap: 8px; background: #f0fdf4; color: #166534; padding: 6px 12px; border-radius: 99px; font-weight: 800; font-size: 11px; text-transform: uppercase; }
                [data-theme="dark"] .live-status-pill { background: #16653420; color: #4ade80; }
                .live-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; }

                /* RAIL */
                .meetup-rail-v3 { background: #000; border-bottom: 1px solid #111; padding: 25px 40px; }
                .rail-inner-v3 { max-width: 1400px; margin: 0 auto; display: flex; gap: 40px; overflow-x: auto; scrollbar-width: none; }
                .rail-item-v3 { display: flex; flex-direction: column; align-items: center; gap: 10px; background: transparent; border: none; color: #6e6e6e; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
                .rail-item-v3:hover, .rail-item-v3.active { color: #0052ff; }
                .rail-item-v3.active { font-weight: 800; border-bottom: 4px solid #0052ff; padding-bottom: 15px; margin-bottom: -25px; }
                .rail-item-v3 span { font-size: 13px; font-weight: 700; }

                /* MAIN */
                .meetup-feed-area { flex: 1; overflow-y: auto; padding: 40px; background: #000; }
                .discover-v3 { max-width: 1400px; margin: 0 auto; }

                /* GRID */
                .grid-v3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 40px; }
                .card-v3 { background: #0a0a0a; border-radius: 20px; border: 1px solid #111; overflow: hidden; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .card-v3:hover { transform: translateY(-8px); border-color: #0052ff; }

                .card-media-v3 { height: 180px; position: relative; overflow: hidden; }
                .card-media-v3 img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
                .card-v3:hover .card-media-v3 img { transform: scale(1.1); }
                
                .live-pill-v3, .wait-pill-v3 { position: absolute; bottom: 12px; left: 12px; padding: 5px 12px; border-radius: 8px; font-size: 11px; font-weight: 900; }
                .live-pill-v3 { background: #ef4444; color: #fff; }
                .wait-pill-v3 { background: rgba(0,0,0,0.8); color: #fff; }
                .save-btn-v3 { position: absolute; top: 12px; right: 12px; width: 38px; height: 38px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; color: #0052ff; cursor: pointer; }

                .card-data-v3 { padding: 25px; }
                .card-title-v3 { font-size: 18px; font-weight: 800; margin-bottom: 8px; color: inherit; }
                .card-meta-v3 { font-size: 13px; color: #888; font-weight: 600; margin-bottom: 18px; }
                .card-footer-v3 { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f1f1; padding-top: 15px; }
                [data-theme="dark"] .card-footer-v3 { border-color: #111; }
                .footer-l { display: flex; align-items: center; gap: 8px; color: #888; font-size: 13px; font-weight: 700; }
                .rating-v3 { font-size: 12px; font-weight: 900; color: #f59e0b; display: flex; align-items: center; gap: 4px; }

                /* DETAIL VIEW V3 */
                .detail-page-v3 { max-width: 1200px; margin: 0 auto; }
                .back-btn-v3 { background: transparent; border: none; color: #777; display: flex; align-items: center; gap: 10px; margin-bottom: 30px; cursor: pointer; font-weight: 700; }
                .back-btn-v3:hover { color: #0052ff; }

                .poster-card-v3 { height: 450px; border-radius: 30px; overflow: hidden; position: relative; margin-bottom: 50px; }
                .poster-card-v3 img { width: 100%; height: 100%; object-fit: cover; }
                .poster-info-v3 { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.85)); display: flex; flex-direction: column; justify-content: flex-end; padding: 60px; }
                .badge-row { display: flex; gap: 12px; margin-bottom: 20px; }
                .p-cat { background: #0052ff; color: #fff; padding: 8px 16px; border-radius: 10px; font-weight: 900; font-size: 12px; text-transform: uppercase; }
                .p-live { background: #ef4444; color: #fff; padding: 8px 16px; border-radius: 10px; font-weight: 900; font-size: 12px; }
                .poster-info-v3 h1 { font-size: 56px; font-weight: 900; color: #fff; margin: 0; letter-spacing: -2px; }
                .p-host { font-size: 22px; color: #ccc; margin-top: 15px; font-weight: 600; }

                /* CONTENT GRID */
                .content-grid-v3 { display: grid; grid-template-columns: 1fr 380px; gap: 60px; }
                .c-main-v3 h3 { font-size: 26px; font-weight: 800; margin-bottom: 20px; color: #fff; }
                .c-info p { font-size: 18px; line-height: 1.7; color: #aaa; margin-bottom: 40px; }

                .status-hero-v3 { background: #0a0a0a; border: 1px solid #111; border-radius: 30px; padding: 40px; margin-bottom: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }

                .success-tag, .wait-tag { display: flex; align-items: center; gap: 20px; margin-bottom: 35px; }
                .success-tag { color: #22c55e; }
                .wait-tag { color: #eab308; }
                .success-tag h4, .wait-tag h4 { font-size: 24px; font-weight: 800; margin-bottom: 4px; color: #fff; }
                .success-tag p, .wait-tag p { font-weight: 600; font-size: 16px; opacity: 0.8; }

                .join-live-btn-v3 { 
                    width: 100%; background: #0052ff; color: #fff; border: none; padding: 22px; border-radius: 18px; font-weight: 900; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 15px; transition: all 0.3s;
                }
                .join-live-btn-v3:hover:not(.waiting) { transform: scale(1.02); box-shadow: 0 20px 40px rgba(0, 82, 255, 0.3); }
                .join-live-btn-v3.waiting { background: #111; color: #333; cursor: not-allowed; }
                .form-info-msg { text-align: center; margin-top: 20px; color: #666; font-weight: 600; font-size: 14px; }

                .optional-form-v3 { background: #050505; border: 2px dashed #222; border-radius: 24px; padding: 30px; }
                .optional-form-v3 h4 { font-size: 18px; margin-bottom: 8px; color: #fff; }
                .optional-form-v3 p { font-size: 14px; color: #666; margin-bottom: 25px; font-weight: 600; }
                .mini-form-row { display: flex; gap: 12px; }
                .mini-form-row input { flex: 1; min-width: 120px; background: #000; border: 1px solid #222; padding: 12px 18px; border-radius: 12px; outline: none; color: #fff; }
                .mini-reg-btn { background: #0052ff; color: #fff; border: none; padding: 0 25px; border-radius: 12px; font-weight: 800; cursor: pointer; }

                /* SIDEBAR */
                .side-card-v3 { background: #0a0a0a; border: 1px solid #111; border-radius: 30px; padding: 35px; position: sticky; top: 30px; }
                .side-row-v3 { display: flex; gap: 18px; align-items: center; color: #fff; }
                .side-row-v3 strong { font-size: 17px; display: block; margin-bottom: 2px; }
                .side-row-v3 span { color: #666; font-weight: 600; font-size: 13px; }
                .divider-v3 { height: 1px; background: #111; margin: 25px 0; }

                .avatars-row-v3 { display: flex; align-items: center; margin-bottom: 30px; }
                .avatars-row-v3 img { width: 34px; height: 34px; border-radius: 50%; border: 2px solid #fff; margin-left: -12px; }
                .avatars-row-v3 img:first-child { margin-left: 0; }
                .more-av { width: 34px; height: 34px; border-radius: 50%; background: #f0f0f0; color: #888; border: 2px solid #fff; margin-left: -12px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; }
                [data-theme="dark"] .more-av { background: #222; border-color: #0a0a0a; }

                .btn-actions-v3 { display: flex; justify-content: space-between; }
                .a-btn { width: 50px; height: 50px; border-radius: 14px; border: 1px solid #f0f0f0; background: transparent; color: #0052ff; cursor: pointer; transition: all 0.2s; }
                .a-btn:hover { background: #0052ff; color: #fff; }

                /* LOADER */
                .sentinel-v3 { padding: 60px 0; display: flex; flex-direction: column; align-items: center; }
                .loading-spinner-v3 { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0052ff; border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .end-msg-v3 { color: #999; font-weight: 700; }

                @media (max-width: 1024px) {
                    .meetup-header-v2 { padding: 12px 20px; }
                    .header-content-v2 { gap: 15px; }
                    .h-c-v2 { display: none; }
                    .content-grid-v3 { grid-template-columns: 1fr; }
                    .poster-card-v3 { height: 300px; padding: 30px; }
                    .poster-info-v3 h1 { font-size: 34px; }
                }

                .animate-in { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default Events;
