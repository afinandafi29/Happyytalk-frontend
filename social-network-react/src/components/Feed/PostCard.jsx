import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat, Share2, Bookmark, MoreVertical, Trash2, AlertTriangle } from 'lucide-react';
import { toggleLikePostApi, deletePostApi, reportPostApi } from '../../api/postApi';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/feed.css';

const PostCard = ({ post, currentUser, onLikeToggled, onPostDeleted }) => {
    const navigate = useNavigate();
    const initialIsLiked = currentUser && post.likes?.some(like => like.user_id === currentUser.id);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [localLikeCount, setLocalLikeCount] = useState(post.likes_count || 0);
    const [showPostMenu, setShowPostMenu] = useState(false);
    const [showReportPostModal, setShowReportPostModal] = useState(false);
    const [postReportReason, setPostReportReason] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleLike = async (e) => {
        e.stopPropagation();
        if (!currentUser) {
            if (window.confirm("Please Sign In to like posts. Go to Sign In page?")) {
                window.location.href = "/in";
            }
            return;
        }
        try {
            const originalLikedState = isLiked;
            const originalLikeCount = localLikeCount;
            setIsLiked(!isLiked);
            setLocalLikeCount(prev => isLiked ? prev - 1 : prev + 1);

            await toggleLikePostApi(post.id);

            let updatedLikesArray;
            if (!originalLikedState) {
                updatedLikesArray = [...(post.likes || []), { user_id: currentUser.id }];
            } else {
                updatedLikesArray = (post.likes || []).filter(like => like.user_id !== currentUser.id);
            }
            onLikeToggled(post.id, updatedLikesArray, isLiked ? originalLikeCount - 1 : originalLikeCount + 1);
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (!currentUser || currentUser.id !== post.user_id) return;
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deletePostApi(post.id);
                if (onPostDeleted) onPostDeleted(post.id);
            } catch (err) {
                alert("Failed to delete post: " + err.message);
            }
        }
    };

    const author = post.author || post.profile || { username: 'User', avatar_url: '' };
    const metaInfo = `EN • ${new Date(post.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} ago`;

    // Handle multiple images if post has them (simulated for now by splitting image_url if it's a list)
    const images = post.image_url ? post.image_url.split(',').map(img => img.trim()) : [];

    return (
        <div className="moment-card" onClick={() => navigate(`/posts/${post.id}`)}>
            <div className="moment-header">
                <Link to={`/profile/${author.id || post.user_id}`} onClick={(e) => e.stopPropagation()}>
                    <div 
                        className="moment-avatar" 
                        style={{ backgroundImage: `url(${author.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(author.username || 'User') + '&background=random'})` }}
                    >
                    </div>
                </Link>
                <div className="moment-user-info">
                    <div className="moment-username">{author.username}</div>
                    <div className="moment-meta">{metaInfo}</div>
                </div>
                <div className="relative">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowPostMenu(!showPostMenu); }}
                        className="moment-action-btn text-gray-500 hover:text-white"
                    >
                        <MoreVertical size={18} />
                    </button>
                    {showPostMenu && (
                        <div className="absolute right-0 mt-2 w-40 bg-[#1f2937] border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
                            {currentUser?.id === post.user_id ? (
                                <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete
                                </button>
                            ) : (
                                <button onClick={(e) => { e.stopPropagation(); setShowReportPostModal(true); setShowPostMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center gap-2">
                                    <AlertTriangle size={14} /> Report
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="moment-content">
                {post.title && <strong className="block mb-1">{post.title}</strong>}
                {post.content}
            </div>

            {images.length > 0 && (
                <div className={`moment-gallery ${images.length === 1 ? 'wide' : 'many'}`}>
                    {images.map((img, idx) => (
                        <img key={idx} src={img} alt={`Moment ${idx}`} />
                    ))}
                </div>
            )}

            <div className="moment-actions">
                <div className="moment-action-group">
                    <button 
                        className={`moment-action-btn moment-like-btn ${isLiked ? 'liked' : ''}`}
                        onClick={handleLike}
                    >
                        <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                        <span>{localLikeCount}</span>
                    </button>
                    <button className="moment-action-btn" onClick={(e) => { e.stopPropagation(); navigate(`/posts/${post.id}`); }}>
                        <MessageCircle size={18} />
                        <span>{post.comments_count || 0}</span>
                    </button>
                    <button className="moment-action-btn">
                        <Repeat size={18} />
                        <span>{post.retweets || 0}</span>
                    </button>
                </div>
                <button 
                    className={`moment-action-btn ${isSaved ? 'text-[#bb86fc]' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
                >
                    <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                </button>
            </div>

            {showReportPostModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[2000] p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-[#16181e] p-6 rounded-2xl border border-gray-800 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Report Moment</h3>
                        <textarea
                            value={postReportReason}
                            onChange={(e) => setPostReportReason(e.target.value)}
                            className="w-full bg-[#0f0f12] border border-gray-800 rounded-lg p-3 text-white outline-none focus:border-[#bb86fc]"
                            rows="4"
                            placeholder="Reason for reporting..."
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setShowReportPostModal(false)} className="px-4 py-2 text-gray-400">Cancel</button>
                            <button 
                                onClick={async () => {
                                    await reportPostApi(post.id, postReportReason);
                                    setShowReportPostModal(false);
                                    alert("Reported successfully");
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;

