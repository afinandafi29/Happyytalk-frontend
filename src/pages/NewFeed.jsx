import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
    Zap, Home, TrendingUp, PlaySquare, Bell, Mail, Calendar,
    Moon, Sun, Search, Plus, User, Flame, MessageCircle,
    Repeat, Share2, Bookmark, Menu, ArrowLeft, Image, Video, Music, Type, Italic, Underline, Paperclip, Smile, AtSign, BarChart2, Radio, Users,
    ChevronDown, ChevronUp, Globe, Star, Settings, LogOut, Activity, UserCircle, Heart, X, LayoutGrid, RefreshCw, CircleDashed, MoreHorizontal, Trash2, Flag, AlertTriangle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { newsApi } from '../api/newsApi';
import { getPostsApi, toggleLikePostApi, deletePostApi, reportPostApi } from '../api/postApi';
import ShortsSection from '../components/Feed/ShortsSection';
import StoryModal from '../components/Feed/StoryModal';
import CreatePostForm from '../components/Feed/CreatePostForm';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { PREBUILT_POSTS } from '../data/prebuiltPosts';
import { generateFakePosts } from '../utils/postGenerator';
import { mockRooms } from '../data/mockRooms';
import '../styles/NewFeed.css';




// Helper for truncated text
const PostContent = ({ content }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const limit = 150;

    if (content.length <= limit) return <div className="content">{content}</div>;

    return (
        <div className="content">
            {isExpanded ? content : `${content.substring(0, limit)}...`}
            <button className="read-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Show Less' : 'Read More'}
            </button>
        </div>
    );
};


const NewFeedPage = () => {
    const [feedCategory, setFeedCategory] = useState('For you');
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    const { theme: globalTheme } = useTheme();
    const [localTheme, setLocalTheme] = useState(globalTheme);
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab === 'Shots') return 'Shots';
        if (tab === 'Moments') return 'Moments';
        if (tab === 'Trends') return 'Trends';
        return 'Feed';
    });
    const [stories, setStories] = useState([]);
    const [page, setPage] = useState(1);
    const [trendsPage, setTrendsPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const feedCategories = ['For you', 'Following', 'Learn', 'Language Exchange', 'Travel', 'Best', 'Art', 'Music', 'Tech', 'Food', 'Gaming', 'Business', 'Lifestyle', 'Fashion'];
    const trendingList = [
        { name: '#HappyyTalk', category: 'Trending' },
        { name: 'F1 2026', category: 'Trending' },
        { name: '#CodeLife', category: 'Trending' },
        { name: 'ReactJS', category: 'Trending' },
        { name: '#SummerVibes', category: 'Trending' },
        { name: 'AI Revolution', category: 'Trending' }
    ];


    // Sidebar States
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile
    const [sidebarExpanded, setSidebarExpanded] = useState(false); // Desktop/Mobile 'Show More'
    const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 1200); // Desktop Collapsed Mode
    const [moreMenuOpen, setMoreMenuOpen] = useState(false);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    // Story Modal State
    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);

    // Auth Modal & Comment Sheet
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [expandedPosts, setExpandedPosts] = useState(new Set());

    // Delete Modal State
    const [deleteModalPost, setDeleteModalPost] = useState(null); // post to delete
    const [openPostMenu, setOpenPostMenu] = useState(null); // postId with open menu
    const [isDeleting, setIsDeleting] = useState(false);

    // Pagination State
    const observer = useRef();

    // Report State
    const [reportModalPost, setReportModalPost] = useState(null);
    const [reportReason, setReportReason] = useState('');
    const [isReporting, setIsReporting] = useState(false);
    const [reportSuccess, setReportSuccess] = useState(false);

    const handleReport = async () => {
        if (!reportModalPost || reportReason.trim().length < 10) return;
        setIsReporting(true);
        try {
            const res = await reportPostApi(reportModalPost.id, reportReason.trim());
            setReportSuccess(true);
            // If post was taken down or deleted, remove from feed
            if (res?.action === 'deleted' || res?.action === 'taken_down') {
                setPosts(prev => prev.filter(p => p.id !== reportModalPost.id));
            }
            setTimeout(() => {
                setReportModalPost(null);
                setReportReason('');
                setReportSuccess(false);
            }, 2000);
        } catch (err) {
            // silently fail - post might already be taken down
            console.error('Report failed:', err);
        } finally {
            setIsReporting(false);
        }
    };

    const toggleTheme = () => {
        setLocalTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // SEO Management
    useEffect(() => {
        document.title = "Happytalk Feed | Language Learning & Networking Community";
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Join Happytalk for the best language learning experience and professional networking. Practice English, Spanish, Mandarin and more at happytalk.in and happyytalk.in.");
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "Join Happytalk for the best language learning experience and professional networking. Practice English, Spanish, Mandarin and more at happytalk.in and happyytalk.in.";
            document.head.appendChild(meta);
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', "language learning, networking, happytalk, happytalk.in, happyytalk.in, speak english, practice spanish");
        } else {
            const meta = document.createElement('meta');
            meta.name = "keywords";
            meta.content = "language learning, networking, happytalk, happytalk.in, happyytalk.in, speak english, practice spanish";
            document.head.appendChild(meta);
        }

        // Cleanup on unmount
        return () => {
            document.title = "HAPPY TALK";
        };
    }, []);

    // Initial Data Fetch
    useEffect(() => {
        fetchStories();
    }, []);


    // Random seed for this session's fake post generation
    const [feedSeed] = useState(() => Math.floor(Math.random() * 1000));

    // Fetch News Feed with Pagination & Interleaving
    const fetchNewsFeed = useCallback(async (pageNum, forceRefresh = false) => {
        if (loading && !forceRefresh) return;
        setLoading(true);
        try {
            const FAKE_COUNT = 10;
            const NEWS_COUNT = 1;
            
            let fakePosts = [];
            if (pageNum === 1) {
                // Use curated PREBUILT_POSTS for the first batch, but shuffle them
                fakePosts = [...PREBUILT_POSTS]
                    .sort(() => Math.random() - 0.5)
                    .map(p => ({ ...p, id: `${p.id}-${feedSeed}` }));
            } else {
                fakePosts = generateFakePosts(FAKE_COUNT, (pageNum - 1) * FAKE_COUNT + (feedSeed % 50));
            }

            // 2. Fetch News
            let newsPosts = [];
            try {
                const categoryToUse = feedCategory === 'For you' ? '' : feedCategory;
                const newsRes = await newsApi.getHeadlines({ limit: NEWS_COUNT, page: pageNum, categories: categoryToUse });

                if (newsRes.data && newsRes.data.length > 0) {
                    newsPosts = newsRes.data.map(article => ({
                        id: article.uuid || Math.random(),
                        user: {
                            name: article.source || 'News Update',
                            handle: '@' + (article.source || 'news').toLowerCase().replace(/\s/g, ''),
                            pic: `https://ui-avatars.com/api/?name=${article.source}&background=random`
                        },
                        content: article.title + (article.description ? `\n\n${article.description}` : ''),
                        image: article.image_url,
                        time: new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        likes: Math.floor(Math.random() * 1000) + 100,
                        comments: Math.floor(Math.random() * 100),
                        isNews: true,
                        published_at: article.published_at,
                        isLikedByUser: false
                    }));
                }
            } catch (e) {
                console.warn("News API failed");
            }

            // 3. Inject a Live Room every batch (if in Feed tab)
            let roomPost = null;
            if (activeTab === 'Feed' && mockRooms && mockRooms.length > 0) {
                const randomRoom = mockRooms[Math.floor(Math.random() * mockRooms.length)];
                roomPost = {
                    id: `room-promo-${randomRoom.id}-${pageNum}-${feedSeed}`,
                    isRoom: true,
                    content: `${randomRoom.title}: ${randomRoom.topic}`,
                    originalRoom: randomRoom,
                    time: 'Happening Now'
                };
            }

            // 4. Interleave
            let pagePosts = [...fakePosts];
            if (newsPosts.length > 0) pagePosts.splice(5, 0, ...newsPosts);
            if (roomPost) pagePosts.splice(2, 0, roomPost); // Insert room near the top
            
            if (pageNum === 1 || forceRefresh) {
                setPosts(pagePosts);
            } else {
                setPosts(prev => [...prev, ...pagePosts]);
            }
        } catch (error) {
            console.error("Failed to fetch feed", error);
            const fallbackPosts = generateFakePosts(10, (pageNum - 1) * 10 + (feedSeed % 50));
            setPosts(prev => pageNum === 1 ? fallbackPosts : [...prev, ...fallbackPosts]);
        }
        setLoading(false);
    }, [loading, feedCategory, feedSeed, activeTab]);



    const handlePostCreated = (response) => {
        // The backend returns { post: { ... } }
        const newPost = response.post || response;
        
        const authorName = newPost.profile?.username || newPost.username || currentUser?.user_metadata?.username || currentUser?.username || 'User';
        
        // Format post to match other feeds
        const formattedPost = {
            id: newPost.id,
            user: {
                name: authorName,
                handle: '@' + authorName.toLowerCase().replace(/\s/g, ''),
                pic: newPost.profile?.avatar_url || newPost.profile_pic || currentUser?.user_metadata?.avatar_url || currentUser?.avatar_url || `https://ui-avatars.com/api/?name=${authorName}&background=random`
            },
            title: newPost.title,
            content: newPost.content,
            image: newPost.image_url || newPost.image,
            youtube_url: newPost.youtube_url,
            poll: newPost.poll,
            time: 'Just now',
            likes: 0,
            comments: 0,
            isNews: false,
            isMoment: true,
            created_at: new Date().toISOString()
        };
        setPosts(prev => [formattedPost, ...prev]);
        setCreateModalOpen(false);
    };

    // Check for shared post ID in URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('post');
        if (postId && posts.length > 0) {
            setTimeout(() => {
                const element = document.getElementById(`post-${postId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.style.border = '2px solid var(--primary-accent)';
                    setTimeout(() => element.style.border = 'none', 3000);
                }
            }, 1000);
        }
    }, [posts, location.search]);

    // Refresh feed when navigating to the Feed page or changing search state
    useEffect(() => {
        if (activeTab === 'Feed' && !isSearchActive) {
            fetchNewsFeed(1, true); // Force refresh every time they hit the Feed tab
        }
    }, [activeTab, isSearchActive, fetchNewsFeed]);

    // Handle pagination specifically
    useEffect(() => {
        if (activeTab === 'Feed' && page > 1) {
            fetchNewsFeed(page);
        }
    }, [page, activeTab, fetchNewsFeed]);

    const lastPostRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchNewsFeed(nextPage);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, page, fetchNewsFeed]);

    const lastTrendRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setTrendsPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    // Fetch Stories
    const handleAddComment = (postId, text) => {
        if (!text.trim()) return;

        const newComment = {
            username: currentUser?.username || 'You',
            user_pic: currentUser?.profile_pic || 'https://ui-avatars.com/api/?name=You',
            text: text.trim(),
            time: 'Just now'
        };

        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                const updatedCommentsList = post.comments_list ? [...post.comments_list, newComment] : [newComment];
                const updatedPost = { 
                    ...post, 
                    comments: (post.comments || 0) + 1,
                    comments_list: updatedCommentsList
                };
                return updatedPost;
            }
            return post;
        }));
        
        // No need to clear commentText globally if using per-post state, 
        // but since we are refactoring, let's just clear for now.
        setCommentText('');
    };

    const toggleComments = (postId, e) => {
        if (e) e.stopPropagation();
        setExpandedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const fetchStories = async () => {
        const names = ['Alex', 'Emma', 'Sarah', 'Elena', 'Justin', 'Liam', 'Maria', 'Cody', 'Noah', 'Ava', 'Olivia'];
        let storyImages = [];
        let newsStories = [];

        try {
            const newsRes = await newsApi.getTopStories({ limit: 5 });
            if (newsRes.data) {
                newsStories = newsRes.data.map((n, i) => ({
                    id: `news-story-${i}`,
                    user: { username: n.source || 'News', pic: `https://ui-avatars.com/api/?name=${n.source}&background=random` },
                    image: n.image_url,
                    isUser: false,
                    isNews: true,
                    title: n.title
                }));
            }

            const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
            if (PEXELS_KEY) {
                const res = await fetch(`https://api.pexels.com/v1/search?query=portrait&per_page=${names.length}&page=${Math.floor(Math.random() * 10) + 1}`, {
                    headers: { Authorization: PEXELS_KEY }
                });
                const data = await res.json();
                storyImages = data.photos.map(p => p.src.large);
            }
        } catch (e) { console.error("Story fetch error", e); }

        const userStories = names.map((name, i) => ({
            id: i,
            user: { username: name, pic: `https://i.pravatar.cc/150?u=${name}${Math.random()}` },
            image: storyImages[i] || `https://source.unsplash.com/random/400x800?sig=${i + 200 + Math.random()}`,
            isUser: i === 0,
            isNews: false
        }));

        const combined = [...userStories, ...newsStories];
        setStories(combined);
    };

    const openStory = (val) => {
        if (typeof val === 'number') {
            setActiveStoryIndex(val);
        } else if (typeof val === 'string') {
            const idx = stories.findIndex(s => s.user.username === val);
            if (idx !== -1) {
                setActiveStoryIndex(idx);
            } else {
                const hash = val.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                setActiveStoryIndex(hash % stories.length);
            }
        }
        setIsStoryOpen(true);
    };

    const handleSearch = async (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && searchQuery.trim()) {
            setIsSearchActive(true);
            setTrendsPage(1);
        }
    };

    const handleNavClick = (tab) => {
        if (tab === 'Home' || tab === 'Feed') {
            if (activeTab === 'Feed') {
                fetchNewsFeed(1, true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setActiveTab('Feed');
            setSidebarOpen(false);
            setIsSearchActive(false);
            setSearchQuery('');
            return;
        }
        if (tab === 'All' || tab === 'Main Screen') {
            navigate('/');
            return;
        }
        if (tab === 'Events') {
            navigate('/events');
            return;
        }
        if (tab === 'Moments' && activeTab === 'Moments') {
            fetchStories(); // Refresh stories on second click
            return;
        }

        setActiveTab(tab);
        setSidebarOpen(false);
        if (tab === 'Trends') {
            setIsSearchActive(true);
            setSearchQuery('trending');
            setTrendsPage(1);
        } else if (tab === 'Feed' || tab === 'Home') {
            setIsSearchActive(false);
            setSearchQuery('');
            setSearchResults([]);
            setPage(1);
        } else if (tab === 'Messages') {
            window.dispatchEvent(new CustomEvent('OPEN_CHAT_PANEL'));
        } else if (tab === 'Install App') {
            window.dispatchEvent(new CustomEvent('SHOW_INSTALL_PROMPT'));
        }
    };

    const primaryItems = [
        { name: 'Home', icon: Home },
        { name: 'Moments', icon: CircleDashed },
        { name: 'Trends', icon: TrendingUp },
        { name: 'Shots', icon: PlaySquare },
        { name: 'Events', icon: Calendar },
        { name: 'Notifications', icon: Bell },
        { name: 'Messages', icon: Mail },
        { name: 'Main Screen', icon: LayoutGrid },
    ];

    const secondaryItems = [
        { name: 'Communities', icon: Globe },
        { name: 'Premium', icon: Star },
        { name: 'Bookmarked', icon: Bookmark },
    ];

    const onlineUsers = ['Brooklyn S.', 'Jerome Bell', 'Robert Fox', 'Jane Cooper', 'Floyd Miles', 'Ronald Richards'];

    // Fetch Trends
    useEffect(() => {
        if (activeTab === 'Trends') {
            const query = searchQuery || 'trending';
            const fetchTrends = async () => {
                setLoading(true);
                try {
                    const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
                    let newImages = [];

                    if (PEXELS_KEY) {
                        const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${trendsPage}`, {
                            headers: { Authorization: PEXELS_KEY }
                        });
                        const data = await res.json();
                        newImages = data.photos.map(p => p.src.large);
                    } else {
                        newImages = Array(15).fill(0).map((_, i) => `https://source.unsplash.com/random/800x600?${query}&sig=${trendsPage * 100 + i}`);
                    }

                    setSearchResults(prev => trendsPage === 1 ? newImages : [...prev, ...newImages]);
                } catch (err) { console.error(err); }
                setLoading(false);
            };
            fetchTrends();
        }
    }, [activeTab, trendsPage, searchQuery]);

    useEffect(() => {
        if (activeTab === 'Trends' && searchQuery !== 'trending') {
            setTrendsPage(1);
        }
    }, [searchQuery, activeTab]);

    const handleLike = async (postId, e) => {
        if (e) e.stopPropagation();
        if (!currentUser) {
            setAuthModalOpen(true);
            return;
        }

        // Optimistically update UI
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                const isLiked = post.isLikedByUser;
                return {
                    ...post,
                    isLikedByUser: !isLiked,
                    likes: isLiked ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));

        try {
            // Only try to sync with backend if it's a real database post (Moments)
            // News posts use string IDs or random IDs and aren't in the DB
            const isDatabasePost = typeof postId === 'number' || (typeof postId === 'string' && !postId.includes('-')); 
            if (isDatabasePost) {
                await toggleLikePostApi(postId);
            }
        } catch (err) {
            console.error("Like sync error:", err);
            // Revert if database sync failed? 
            // For now, keep local like to ensure "it works" for the user.
        }
    };

    const handleShareClick = (post, e) => {
        if (e) e.stopPropagation();
        if (!currentUser) {
            setAuthModalOpen(true);
            return;
        }
        const link = `${window.location.origin}/feed?post=${post.id}`;
        navigator.clipboard.writeText(link);
        alert("Link copied to clipboard!");
    };

    const handleDoubleTap = (e, post) => {
        if (e) e.preventDefault();
        if (!currentUser) {
            setAuthModalOpen(true);
            return;
        }
        if (!post.isLikedByUser) {
            handleLike(post.id);
        }

        const card = e.currentTarget;
        const heart = document.createElement('div');
        heart.innerHTML = `<svg width="100" height="100" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

        heart.style.position = 'absolute';
        heart.style.top = '50%';
        heart.style.left = '50%';
        heart.style.transform = 'translate(-50%, -50%) scale(0)';
        heart.style.animation = 'likeBounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        heart.style.zIndex = 20;
        heart.style.pointerEvents = 'none';

        if (getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
        }

        card.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    };


    const handleShare = (post) => {
        if (!currentUser) {
            setAuthModalOpen(true);
            return;
        }
        const link = `${window.location.origin}/feed?post=${post.id}`;
        navigator.clipboard.writeText(link);
    };

    const handleDeletePost = async () => {
        if (!deleteModalPost) return;
        setIsDeleting(true);
        try {
            // Only real DB posts (UUID strings) can be deleted via API
            const isDbPost = typeof deleteModalPost.id === 'string' && deleteModalPost.id.includes('-');
            if (isDbPost) {
                await deletePostApi(deleteModalPost.id);
            }
            setPosts(prev => prev.filter(p => p.id !== deleteModalPost.id));
        } catch (err) {
            console.error('Delete failed:', err);
        } finally {
            setIsDeleting(false);
            setDeleteModalPost(null);
        }
    };

    const handleJoinRoom = (room) => {
        const userName = currentUser?.username || `Guest-${Math.floor(Math.random() * 9000) + 1000}`;
        const encodedName = encodeURIComponent(userName);
        const roomName = room?.mirotalk_room_name || room?.jitsi_room_name || room?.id || 'default';
        const mirotalkUrl = `https://p2p.mirotalk.com/join/${roomName}?name=${encodedName}`;
        window.open(mirotalkUrl, '_blank');
    };

    const renderContent = () => {
        if (activeTab === 'Shorts') return <ShortsSection onBack={() => setActiveTab('Home')} onOpenStory={openStory} />;

        if (isSearchActive || activeTab === 'Trends') {
            return (
                <div style={{ marginTop: '0px' }}>
                    <div className="image-grid" style={{ marginTop: '20px' }}>
                        {searchResults.length > 0 ? searchResults.map((src, i) => (
                            <div key={i} className="grid-item" ref={i === searchResults.length - 1 ? lastTrendRef : null}>
                                <img src={src} alt="Result" />
                            </div>
                        )) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                {loading ? 'Loading Trends...' : 'Explore trending topics or search above.'}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (activeTab === 'Moments') {
            return (
                <div className="whatsapp-stories-container">
                    <div className="ws-section">
                        <h3>My Moments</h3>
                        <div className="ws-item creator" onClick={() => setCreateModalOpen(true)}>
                            <div className="ws-avatar-wrap">
                                <div className="ws-avatar placeholder">
                                    <User size={24} color="#64748b" />
                                </div>
                                <div className="ws-plus-badge"><Plus size={12} /></div>
                            </div>
                            <div className="ws-info">
                                <h4>My Moments</h4>
                                <p>Tap to add status update</p>
                            </div>
                        </div>
                    </div>

                    <div className="ws-section">
                        <h3>Recent updates</h3>
                        <div className="ws-list">
                            {stories.map((s, i) => (
                                <div key={i} className="ws-item" onClick={() => openStory(i)}>
                                    <div className="ws-avatar-wrap">
                                        <img src={s.user.pic} alt={s.user.username} className="ws-avatar" />
                                    </div>
                                    <div className="ws-info">
                                        <h4>{s.user.username}</h4>
                                        <p>{Math.floor(Math.random() * 23) + 1} hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="feed" id="feed-posts">
                {(activeTab === 'Feed' || activeTab === 'Home') && !isSearchActive && (


                    <div className="tabs-container">
                        {feedCategories.map(cat => (
                            <div 
                                key={cat} 
                                className={`feed-tab ${feedCategory === cat ? 'active' : ''}`}
                                onClick={() => {
                                    setFeedCategory(cat);
                                    setPage(1);
                                    setPosts([]);
                                    fetchNewsFeed(1);
                                }}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>
                )}
                
                {posts.map((post, index) => (

                    <div
                        key={`${post.id}-${index}`}
                        id={`post-${post.id}`}
                        className="moment"
                        ref={index === posts.length - 1 ? lastPostRef : null}
                        onDoubleClick={(e) => handleDoubleTap(e, post)}
                    >
                        {post.isRoom ? (
                            <div style={{ background: 'linear-gradient(135deg, rgba(29, 94, 255, 0.1) 0%, rgba(13, 14, 37, 0.4) 100%)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '24px', color: 'white', textAlign: 'center', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', backdropFilter: 'blur(12px)' }}>
                                <style>{`
                                    @keyframes waveAnim {
                                        0%, 100% { transform: scaleY(0.4); }
                                        50% { transform: scaleY(1); }
                                    }
                                `}</style>
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '24px' }}>
                                        <div style={{ width: '4px', height: '100%', background: '#3b82f6', borderRadius: '2px', animation: 'waveAnim 1s infinite ease-in-out' }}></div>
                                        <div style={{ width: '4px', height: '100%', background: '#3b82f6', borderRadius: '2px', animation: 'waveAnim 1s infinite ease-in-out 0.2s' }}></div>
                                        <div style={{ width: '4px', height: '100%', background: '#3b82f6', borderRadius: '2px', animation: 'waveAnim 1s infinite ease-in-out 0.4s' }}></div>
                                        <div style={{ width: '4px', height: '100%', background: '#3b82f6', borderRadius: '2px', animation: 'waveAnim 1s infinite ease-in-out 0.2s' }}></div>
                                        <div style={{ width: '4px', height: '100%', background: '#3b82f6', borderRadius: '2px', animation: 'waveAnim 1s infinite ease-in-out' }}></div>
                                    </div>
                                    <h3 className="text-xl font-bold m-0" style={{ fontFamily: '"Orbitron", sans-serif', color: 'var(--text-main)' }}>Live Audio Room</h3>
                                </div>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{post.content}</p>
                                <button 
                                    onClick={() => handleJoinRoom(post.originalRoom)}
                                    className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_15_rgba(59,130,246,0.5)] transition-transform hover:scale-105" 
                                    style={{ padding: '10px 24px', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    Join Room
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="moment-header" style={{ position: 'relative' }}>
                                    <div 
                                        className="moment-avatar" 
                                        style={{ backgroundImage: `url(${post.user.pic})` }}
                                        onClick={() => navigate(`/profile/${post.user.handle.replace('@', '')}`)}
                                    >
                                        {!post.user.pic && <UserCircle size={44} color="#666" />}
                                    </div>
                                    <div className="moment-user-info">
                                        <div className="moment-username">{post.user.name}</div>
                                        <div className="moment-meta">
                                            {!post.isNews && (
                                                <span className="lang-badges" style={{ color: 'var(--accent)', fontWeight: 'bold', marginRight: '6px' }}>
                                                    {post.id % 2 === 0 ? 'EN • JP • CN' : 'EN ⇄ CN'} •
                                                </span>
                                            )}
                                            {post.user.handle} • {post.time}
                                        </div>
                                    </div>

                                    {/* 3-dot menu - only for the user's own posts */}
                                    {post.isMoment && currentUser && (
                                        <div style={{ marginLeft: 'auto', position: 'relative' }}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setOpenPostMenu(openPostMenu === post.id ? null : post.id); }}
                                                style={{
                                                    background: 'none', border: 'none', cursor: 'pointer',
                                                    color: 'var(--text-muted)', padding: '6px', borderRadius: '50%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    transition: 'background 0.2s',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>
                                            {openPostMenu === post.id && (
                                                <div
                                                    style={{
                                                        position: 'absolute', top: '36px', right: 0,
                                                        background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: '12px', padding: '6px', zIndex: 500,
                                                        minWidth: '160px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                                                        animation: 'fadeIn 0.15s ease',
                                                    }}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    {/* Report - shown to all logged in users */}
                                                    <button
                                                        onClick={() => { setReportModalPost(post); setOpenPostMenu(null); }}
                                                        style={{
                                                            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                                            padding: '10px 14px', background: 'none', border: 'none',
                                                            color: '#f59e0b', cursor: 'pointer', borderRadius: '8px',
                                                            fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
                                                            transition: 'background 0.15s',
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.1)'}
                                                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                                    >
                                                        <Flag size={16} /> Report Post
                                                    </button>
                                                    {/* Delete - only the post author sees this (isMoment = user-created) */}
                                                    <button
                                                        onClick={() => { setDeleteModalPost(post); setOpenPostMenu(null); }}
                                                        style={{
                                                            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                                            padding: '10px 14px', background: 'none', border: 'none',
                                                            color: '#ef4444', cursor: 'pointer', borderRadius: '8px',
                                                            fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
                                                            transition: 'background 0.15s',
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                                                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                                    >
                                                        <Trash2 size={16} /> Delete Post
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                
                                {post.title && (
                                    <div className="moment-title" style={{ fontWeight: '800', fontSize: '18px', margin: '0 16px 8px 16px', color: 'var(--text-main)' }}>
                                        {post.title}
                                    </div>
                                )}
                                
                                <div className="moment-content">
                                    {post.content}
                                </div>
                                
                                {post.image && (
                                    <div className="moment-gallery">
                                        <img src={post.image} alt="Post" />
                                    </div>
                                )}

                                {/* YouTube Embed */}
                                {post.youtube_url && (
                                    <div style={{ margin: '0 16px 12px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <iframe
                                            src={post.youtube_url}
                                            style={{ width: '100%', height: '220px', border: 'none', display: 'block' }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title="YouTube video"
                                        />
                                    </div>
                                )}

                                {/* Poll Display */}
                                {post.poll && (() => {
                                    let pollData;
                                    try { pollData = typeof post.poll === 'string' ? JSON.parse(post.poll) : post.poll; } catch { return null; }
                                    if (!pollData?.options) return null;
                                    const totalVotes = pollData.options.reduce((acc, o) => acc + (o.votes || 0), 0);
                                    return (
                                        <div style={{ margin: '0 16px 12px', padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <p style={{ color: 'var(--text-main)', fontWeight: '700', marginBottom: '12px', fontSize: '15px' }}>📊 {pollData.question}</p>
                                            {pollData.options.map((opt, i) => {
                                                const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                                                return (
                                                    <div key={i} style={{ marginBottom: '8px', position: 'relative', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            const updated = { ...pollData, options: pollData.options.map((o, idx) => idx === i ? { ...o, votes: (o.votes || 0) + 1 } : o) };
                                                            setPosts(prev => prev.map(p => p.id === post.id ? { ...p, poll: updated } : p));
                                                        }}>
                                                        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden', height: '38px', position: 'relative' }}>
                                                            <div style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #0052ff, #6699ff)', height: '100%', transition: 'width 0.5s ease', position: 'absolute', left: 0, top: 0 }} />
                                                            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px', height: '100%' }}>
                                                                <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{opt.text}</span>
                                                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '700' }}>{pct}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '10px' }}>{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</p>
                                        </div>
                                    );
                                })()}

                                <div className="moment-actions-unified">
                                    <button 
                                        className={`unified-action-btn like ${post.isLikedByUser ? 'liked' : ''}`} 
                                        onClick={(e) => handleLike(post.id, e)}
                                    >
                                        <Flame size={18} /> <span>{post.likes}</span>
                                    </button>
                                    <button className="unified-action-btn comment" onClick={(e) => toggleComments(post.id, e)}>
                                        <MessageCircle size={18} /> <span>{post.comments}</span>
                                    </button>
                                    <button className="unified-action-btn repost">
                                        <Repeat size={18} /> <span>{post.reposts || 0}</span>
                                    </button>
                                    <button className="unified-action-btn share" onClick={(e) => handleShareClick(post, e)}>
                                        <Share2 size={18} />
                                    </button>
                                    <button className="unified-action-btn bookmark">
                                        <Bookmark size={18} />
                                    </button>
                                </div>

                                {expandedPosts.has(post.id) && (
                                    <div className="inline-comment-section">
                                        <div className="comment-input-wrapper">
                                            <textarea 
                                                className="comment-inline-input" 
                                                placeholder="Add comment..."
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleAddComment(post.id, commentText);
                                                    }
                                                }}
                                            ></textarea>
                                            <div className="comment-input-toolbar">
                                                <div className="toolbar-icons">
                                                    <Type size={16} />
                                                    <Italic size={16} />
                                                    <Underline size={16} />
                                                    <Paperclip size={16} />
                                                    <Image size={16} />
                                                    <Smile size={16} />
                                                    <AtSign size={16} />
                                                </div>
                                                <button 
                                                    className="comment-submit-btn"
                                                    onClick={() => handleAddComment(post.id, commentText)}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>

                                        <div className="inline-comment-list-header">
                                            <span>Comments <span className="comment-count-badge">{post.comments}</span></span>
                                            <div className="sort-comments">
                                                <ChevronDown size={14} /> Most recent
                                            </div>
                                        </div>

                                        <div className="inline-comment-list">
                                            {post.comments_list && post.comments_list.length > 0 ? (
                                                post.comments_list.map((c, i) => (
                                                    <div key={i} className="inline-comment-item">
                                                        <div className="comment-thread-line"></div>
                                                        <img src={c.user_pic} className="comment-user-avatar" alt="" />
                                                        <div className="comment-body">
                                                            <div className="comment-user-name">
                                                                {c.username} <span className="comment-timestamp">{c.time || '1 hour ago'}</span>
                                                            </div>
                                                            <div className="comment-content-text">{c.text}</div>
                                                            <div className="comment-actions-row">
                                                                <button><Flame size={14} /> {c.likes || 0}</button>
                                                                <button><MessageCircle size={14} /> Reply</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="no-comments-msg">No comments yet. Be the first to comment!</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
                {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
            </div >
        );
    };

    return (
        <div className="new-feed-container" data-theme={localTheme} onClick={() => setOpenPostMenu(null)}>
            {/* Create Post Modal */}
            {createModalOpen && (
                <CreatePostForm
                    onClose={() => setCreateModalOpen(false)}
                    onPostCreated={handlePostCreated}
                />
            )}

            {/* Report Modal (Portal) */}
            {reportModalPost && ReactDOM.createPortal(
                <div
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 99999, animation: 'fadeIn 0.2s ease',
                    }}
                    onClick={() => { setReportModalPost(null); setReportReason(''); setReportSuccess(false); }}
                >
                    <div
                        style={{
                            background: '#0f0f0f', borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '36px', maxWidth: '440px', width: '90%',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.95)',
                            animation: 'modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {reportSuccess ? (
                            <div style={{ textAlign: 'center', padding: '10px 0' }}>
                                <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
                                <h3 style={{ color: '#fff', fontWeight: '800', fontSize: '20px', marginBottom: '8px' }}>Report Submitted</h3>
                                <p style={{ color: '#a0a0a0', fontSize: '14px' }}>Thank you. We'll review this post.</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Flag size={22} color="#f59e0b" />
                                    </div>
                                    <div>
                                        <h3 style={{ color: '#fff', fontWeight: '800', fontSize: '18px', margin: 0, fontFamily: 'Inter, sans-serif' }}>Report Post</h3>
                                        <p style={{ color: '#777', fontSize: '13px', margin: 0 }}>Help keep the community safe</p>
                                    </div>
                                    <button onClick={() => { setReportModalPost(null); setReportReason(''); }}
                                        style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <X size={16} />
                                    </button>
                                </div>

                                <label style={{ color: '#aaa', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                                    Reason for reporting
                                </label>
                                <textarea
                                    value={reportReason}
                                    onChange={e => setReportReason(e.target.value)}
                                    placeholder="Describe why you're reporting this post (min 10 characters)..."
                                    rows="4"
                                    style={{
                                        width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '14px',
                                        outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
                                        marginBottom: '20px',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#f59e0b'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                                />

                                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px', fontSize: '12px', color: '#f59e0b' }}>
                                    <AlertTriangle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                                    10 reports → 1hr takedown &nbsp;•&nbsp; 20 reports → removed &nbsp;•&nbsp; 100 reports → permanently deleted
                                </div>

                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                    <button onClick={() => { setReportModalPost(null); setReportReason(''); }}
                                        style={{ padding: '11px 22px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleReport}
                                        disabled={isReporting || reportReason.trim().length < 10}
                                        style={{ padding: '11px 22px', borderRadius: '12px', background: '#f59e0b', border: 'none', color: '#000', fontWeight: '700', fontSize: '14px', cursor: (isReporting || reportReason.trim().length < 10) ? 'not-allowed' : 'pointer', opacity: (isReporting || reportReason.trim().length < 10) ? 0.6 : 1, fontFamily: 'Inter, sans-serif' }}>
                                        {isReporting ? 'Submitting...' : 'Submit Report'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}

            {/* Delete Confirmation Modal (Portal) */}
            {deleteModalPost && ReactDOM.createPortal(
                <div
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 99999, animation: 'fadeIn 0.2s ease',
                    }}
                    onClick={() => setDeleteModalPost(null)}
                >
                    <div
                        style={{
                            background: '#0f0f0f', borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '36px', maxWidth: '420px', width: '90%',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.95)',
                            animation: 'modalPop 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
                            textAlign: 'center',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '50%',
                            background: 'rgba(239,68,68,0.15)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                        }}>
                            <Trash2 size={28} color="#ef4444" />
                        </div>
                        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>
                            Delete Post?
                        </h3>
                        <p style={{ color: '#a0a0a0', fontSize: '15px', marginBottom: '28px', lineHeight: '1.5' }}>
                            This will permanently remove your post. This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setDeleteModalPost(null)}
                                style={{
                                    padding: '12px 28px', borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff', fontWeight: '600', fontSize: '15px',
                                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeletePost}
                                disabled={isDeleting}
                                style={{
                                    padding: '12px 28px', borderRadius: '12px',
                                    background: '#ef4444', border: 'none',
                                    color: '#fff', fontWeight: '700', fontSize: '15px',
                                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                                    opacity: isDeleting ? 0.7 : 1, fontFamily: 'Inter, sans-serif',
                                }}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {authModalOpen && (
                <div className="auth-modal-overlay">
                    <div className="auth-modal" style={{ background: '#0a0a0a', borderRadius: '28px', padding: '36px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.9)' }}>
                        <h2 style={{ color: 'white' }}>Join the conversation</h2>
                        <p style={{ color: '#a0a0a0' }}>You need to be signed in to like, share, and comment on posts.</p>
                        <div className="flex gap-4 justify-center mt-6">
                            <button className="auth-btn-login" onClick={() => navigate('/login')} style={{ background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}>Sign In</button>
                            <button className="auth-btn-cancel" onClick={() => setAuthModalOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <StoryModal
                isOpen={isStoryOpen}
                stories={stories}
                activeIndex={activeStoryIndex}
                onClose={() => setIsStoryOpen(false)}
                onNext={() => setActiveStoryIndex(prev => (prev + 1) % stories.length)}
                onPrev={() => setActiveStoryIndex(prev => (prev - 1 + stories.length) % stories.length)}
            />


            {/* MOBILE ONLY HEADER */}
            <div className="mobile-only-header md:hidden">
                <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu size={24} color="var(--text-main)" />
                </button>
                <div className="mobile-brand-center" onClick={() => navigate('/')}>
                    <Zap size={22} color="#ffffff" fill="#ffffff" />
                    <span>Happyytalk</span>
                </div>
                <button className="mobile-theme-toggle" onClick={toggleTheme}>
                    {localTheme === 'dark' ? <Sun size={20} color="var(--text-main)" /> : <Moon size={20} color="var(--text-main)" />}
                </button>
            </div>

            <div className={`app-container ${activeTab === 'Shorts' ? 'full-height-mobile' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>

                {/* SIDEBAR LEFT */}
                <aside className={`sidebar-left ${sidebarOpen ? 'mobile-visible open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`} style={sidebarOpen ? {
                    display: 'flex', position: 'fixed', top: '60px', left: 0, height: 'calc(100% - 60px)', zIndex: 1000, width: '280px', boxShadow: '2px 0 10px rgba(0,0,0,0.5)', background: localTheme === 'dark' ? '#121212' : '#ffffff', opacity: 1
                } : { width: sidebarCollapsed ? '80px' : '240px' }}>

                    <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
                        <Zap size={24} /> <span style={{ display: sidebarCollapsed ? 'none' : 'block' }}>Happyytalk</span>
                    </div>

                    <nav className="side-nav">
                        {primaryItems.map((item) => (
                            <div
                                key={item.name}
                                className={`side-link ${activeTab === item.name ? 'active' : ''}`}
                                onClick={() => handleNavClick(item.name)}
                                title={sidebarCollapsed ? item.name : ''}
                                style={{ justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' }}
                            >
                                <div className="side-icon-wrapper">
                                    <item.icon size={22} />
                                </div>
                                <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>{item.name}</span>
                            </div>
                        ))}

                        <button
                            className="side-link"
                            style={{ 
                                width: '100%', border: 'none', background: 'none', 
                                justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' 
                            }}
                            onClick={() => setSidebarExpanded(!sidebarExpanded)}
                        >
                            <div className="side-icon-wrapper">
                                {sidebarExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                            </div>
                            <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>{sidebarExpanded ? 'Show Less' : 'Show More'}</span>
                        </button>

                        {sidebarExpanded && (
                            <div className="animate-in slide-in-from-top-2 fade-in duration-200">
                                {secondaryItems.map((item) => (
                                    <div
                                        key={item.name}
                                        className={`side-link ${activeTab === item.name ? 'active' : ''}`}
                                        onClick={() => handleNavClick(item.name)}
                                        style={{ justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' }}
                                    >
                                        <div className="side-icon-wrapper">
                                            <item.icon size={22} />
                                        </div>
                                        <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>{item.name}</span>
                                    </div>
                                ))}

                                <div className="side-link" onClick={() => handleNavClick('Settings')} style={{ justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' }}>
                                    <div className="side-icon-wrapper">
                                        <Settings size={22} />
                                    </div>
                                    <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>Settings</span>
                                </div>
                                <div className="side-link" onClick={() => handleNavClick('Activity')} style={{ justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' }}>
                                    <div className="side-icon-wrapper">
                                        <Activity size={22} />
                                    </div>
                                    <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>Your Activity</span>
                                </div>
                                <div className="side-link" onClick={() => handleNavClick('Switch')} style={{ justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' }}>
                                    <div className="side-icon-wrapper">
                                        <UserCircle size={22} />
                                    </div>
                                    <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>Switch Accounts</span>
                                </div>
                                <div className="side-link" onClick={() => alert('Logged Out')} style={{ color: '#ef4444', justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' }}>
                                    <div className="side-icon-wrapper">
                                        <LogOut size={22} />
                                    </div>
                                    <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>Log Out</span>
                                </div>
                            </div>
                        )}

                        <div className="side-divider" style={{ height: '1px', background: 'var(--border-color)', margin: '15px 0' }}></div>

                        <button
                            className="side-link create-btn-sidebar"
                            style={{ 
                                background: 'rgba(29, 155, 240, 0.1)', 
                                border: '1px solid rgba(29, 155, 240, 0.2)',
                                borderRadius: '12px',
                                color: 'var(--primary-blue)', 
                                fontWeight: 'bold', 
                                margin: '8px 0',
                                width: '100%',
                                justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' 
                            }}
                            onClick={(e) => { 
                                e.preventDefault();
                                e.stopPropagation();
                                if (!currentUser) {
                                    setAuthModalOpen(true);
                                } else {
                                    setCreateModalOpen(true); 
                                }
                                setSidebarOpen(false); 
                            }}
                        >
                            <div className="side-icon-wrapper">
                                <Plus size={22} strokeWidth={3} />
                            </div>
                            <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>Create Post</span>
                        </button>

                        <div
                            className={`side-link ${activeTab === 'Profile' ? 'active' : ''}`}
                            onClick={() => handleNavClick('Profile')}
                            style={{ justifyContent: (sidebarCollapsed && !sidebarOpen) ? 'center' : 'flex-start' }}
                        >
                            <div className="side-icon-wrapper">
                                <User size={22} />
                            </div>
                            <span style={{ display: (sidebarCollapsed && !sidebarOpen) ? 'none' : 'block' }}>Profile</span>
                        </div>

                        <button
                            className="side-link desktop-only"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            style={{ marginTop: '10px', border: 'none', background: 'none', color: 'var(--text-muted)', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
                        >
                            {sidebarCollapsed ? <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} /> : <ArrowLeft size={20} />}
                            <span style={{ display: sidebarCollapsed ? 'none' : 'block' }}>Collapse</span>
                        </button>
                    </nav>

                    {!sidebarCollapsed && (
                        <div className="desktop-only" style={{ padding: '0 20px', marginTop: '10px', flex: 1, overflowY: 'auto' }}>
                            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '10px' }}>
                                Online People
                            </div>
                            <div className="flex -space-x-2 overflow-hidden mb-4 p-2">
                                {onlineUsers.map((u, i) => (
                                    <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-[var(--card-bg)]" src={`https://i.pravatar.cc/150?u=${u}`} alt={u} />
                                ))}
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold ring-2 ring-white">+5</div>
                            </div>
                        </div>
                    )}
                </aside>

                {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

                <main className="main-content" style={activeTab === 'Shorts' ? { padding: 0, overflow: 'hidden' } : {}}>
                    {activeTab !== 'Shorts' && (
                        <>
                            <div className="top-navbar">
                                <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', marginRight: '10px', display: 'none' }}>
                                    <Menu size={24} color="var(--text-main)" />
                                </button>
                                <div className="mobile-brand"> <Zap size={32} /> Happyytalk </div>

                                <div className={`search-bar desktop-only`}>
                                    <Search size={18} color="#64748b" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearch}
                                    />
                                </div>

                                <button className="theme-btn-top" onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>
                                    {localTheme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                                </button>
                            </div>

                            <div className={`mobile-search-container ${isSearchActive ? 'visible' : ''}`}>
                                <Search size={18} color="#64748b" />
                                <input
                                    type="text"
                                    placeholder="Search trends, people..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    autoFocus
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="clear-btn">
                                        <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">x</div>
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    {/* Stories Rail removed as per request */}

                    {renderContent()}
                </main>

                <aside className="sidebar-right">
                    <div className="sidebar-box">
                        <h3 className="sidebar-title" style={{ color: 'var(--text-main)' }}>What are the latest things</h3>
                        <div className="flex flex-col gap-4">
                            {trendingList.map((tag, i) => (
                                <div key={i} className="cursor-pointer" onClick={() => { setSearchQuery(tag.name); handleNavClick('Trends'); }}>
                                    <div className="trending-label">Trending</div>
                                    <div className="trending-name">{tag.name}</div>
                                </div>
                            ))}
                        </div>

                        <div className="side-divider" style={{ height: '1px', background: 'var(--border-color)', margin: '20px 0' }}></div>

                        <h3 className="sidebar-title" style={{ color: 'var(--text-main)' }}>Suggested for you</h3>
                        <div className="flex flex-col gap-3">
                            {['Alex', 'Emma', 'Sarah', 'Justin'].map((name, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img src={`https://i.pravatar.cc/150?u=${name}`} style={{ width: '36px', height: '36px', borderRadius: '50%' }} alt={name} />
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--text-main)' }}>{name}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>@suggested</div>
                                        </div>
                                    </div>
                                    <button style={{ background: 'var(--text-main)', color: 'var(--bg-color)', border: 'none', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Follow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>




                <nav className="mobile-bottom-nav">
                    <button className={`mobile-nav-item ${activeTab === 'Home' || activeTab === 'Feed' ? 'active' : ''}`} onClick={() => handleNavClick('Home')}>
                        <Home size={28} />
                        <span>Home</span>
                    </button>
                    <button className={`mobile-nav-item ${isSearchActive && activeTab === 'Trends' ? 'active' : ''}`} onClick={() => { setIsSearchActive(true); handleNavClick('Trends'); }}>
                        <Search size={28} />
                        <span>Search</span>
                    </button>
                    <button className="mobile-nav-item create" onClick={() => setCreateModalOpen(true)}>
                        <div className="mobile-plus-icon">
                            <Plus size={32} />
                        </div>
                        <span>Create</span>
                    </button>
                    <button className={`mobile-nav-item ${activeTab === 'Shorts' ? 'active' : ''}`} onClick={() => handleNavClick('Shorts')}>
                        <PlaySquare size={28} />
                        <span>Shorts</span>
                    </button>
                    <button className="mobile-nav-item" onClick={() => navigate(-1)}>
                        <ArrowLeft size={28} />
                        <span>Back</span>
                    </button>
                </nav>

            </div>
        </div>
    );
};

export default NewFeedPage;
