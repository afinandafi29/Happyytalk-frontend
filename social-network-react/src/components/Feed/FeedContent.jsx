import React, { useState, useEffect, useCallback } from 'react';
import PostCard from './PostCard';
import CreatePostForm from './CreatePostForm';
import { getPostsApi } from '../../api/postApi';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/feed.css';

const FeedContent = ({ className, onHomeClick }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const [activeTab, setActiveTab] = useState('For you');
    const { currentUser } = useAuth();
    const { theme, changeTheme } = useTheme();

    const tabs = ['For you', 'Following', 'Learn', 'Travel', 'Best'];

    const fetchPosts = useCallback(async (pageNum) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getPostsApi(null, pageNum, 10);
            if (data.posts && data.posts.length > 0) {
                setPosts(prev => pageNum === 1 ? data.posts : [...prev, ...data.posts]);
                setHasMore(data.posts.length === 10);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            setError(err.message || 'Failed to load posts.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
    };

    const handlePostCreated = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
        setShowCreatePost(false);
    };

    const handlePostDeleted = (postId) => {
        setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    };

    const handleLikeToggled = (postId, updatedLikesArray, updatedLikeCount) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, likes: updatedLikesArray, likes_count: updatedLikeCount }
                    : post
            )
        );
    };

    const filteredPosts = posts.filter(post =>
        post.content?.toLowerCase().includes(searchTermLocal.toLowerCase()) ||
        post.profile?.username?.toLowerCase().includes(searchTermLocal.toLowerCase())
    );

    const toggleTheme = () => {
        changeTheme(theme === 'dark' || theme === 'space' ? 'light' : 'dark');
    };

    return (
        <div className={`feed-content-container ${className || ''}`}>
            {/* Header */}
            <header className="feed-header-new">
                <div className="logo-moment" onClick={onHomeClick} style={{ cursor: 'pointer' }}>Moments</div>
                <div className="flex items-center gap-4">
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    {onHomeClick && (
                        <button onClick={onHomeClick} className="text-gray-400 hover:text-white">
                            <i className="fas fa-home text-xl"></i>
                        </button>
                    )}
                </div>
            </header>

            {/* Search Bar */}
            <div className="search-bar-new">
                <i className="fas fa-search"></i>
                <input 
                    type="text" 
                    placeholder="Search moments, people, places..." 
                    value={searchTermLocal}
                    onChange={(e) => setSearchTermLocal(e.target.value)}
                />
            </div>

            {/* Tabs */}
            <div className="tabs-new">
                {tabs.map(tab => (
                    <div 
                        key={tab} 
                        className={`tab-new ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* Posts List */}
            {isLoading && posts.length === 0 && (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#bb86fc]"></div>
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 py-10 px-4 bg-red-500/10 m-4 rounded-xl">
                    {error}
                </div>
            )}

            <div className="posts-list-new">
                {filteredPosts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                        onLikeToggled={handleLikeToggled}
                        onPostDeleted={handlePostDeleted}
                    />
                ))}
            </div>

            {posts.length > 0 && hasMore && (
                <div className="flex justify-center py-10">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="tab-new hover:bg-white/10"
                    >
                        {isLoading ? 'Loading...' : 'Show more moments'}
                    </button>
                </div>
            )}

            {posts.length === 0 && !isLoading && !error && (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">No moments yet</h3>
                    <p className="text-gray-500 text-sm max-w-[260px]">Be the first to share a moment with the community!</p>
                </div>
            )}

            {/* Floating Create Post Button */}
            <button
                className="post-btn-floating"
                onClick={() => setShowCreatePost(true)}
                title="Create New Moment"
            >
                +
            </button>

            {showCreatePost && (
                <CreatePostForm
                    onClose={() => setShowCreatePost(false)}
                    onPostCreated={handlePostCreated}
                />
            )}
        </div>
    );
};

export default FeedContent;

