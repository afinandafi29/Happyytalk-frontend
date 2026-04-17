import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Clock, ExternalLink, ChevronDown } from 'lucide-react';

const NewsReelItem = ({ article, isFirst }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const cleanContent = (text) => {
        if (!text) return '';
        return text.replace(/<[^>]*>/g, '').replace(/\[\+\d+ chars\]/g, '').replace(/\.\.\.$/, '').trim();
    };

    return (
        <div className="news-reel-item" data-index={article._index}>
            {/* Background Image with Overlay */}
            <div className="reel-bg-container">
                <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="reel-bg-image"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1504711434969?auto=format&fit=crop&q=80&w=800';
                    }}
                />
                <div className="reel-overlay"></div>
            </div>

            {/* Content Container */}
            <div className="reel-content">
                <div className="reel-meta">
                    <span className="reel-source">{article.source}</span>
                    <span className="reel-divider"></span>
                    <span className="reel-date">
                        <Clock size={12} className="inline mr-1" />
                        {formatDate(article.published_at)}
                    </span>
                </div>

                <h2 className="reel-title">{article.title}</h2>
                <p className="reel-snippet">{cleanContent(article.snippet || article.description)}</p>

                <div className="reel-actions">
                    <Link to={`/news/article/${article.uuid}`} state={{ article }} className="reel-read-more">
                        Read Full Story
                        <ExternalLink size={16} className="ml-2" />
                    </Link>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            const shareData = {
                                title: article.title,
                                text: article.snippet || article.description,
                                url: `${window.location.origin}/news/article/${article.uuid}`
                            };

                            if (navigator.share) {
                                navigator.share(shareData).catch(err => console.error('Error sharing:', err));
                            } else {
                                navigator.clipboard.writeText(shareData.url).then(() => {
                                    alert('Link copied to clipboard!');
                                });
                            }
                        }}
                        className="reel-share-btn"
                        title="Share story"
                    >
                        <Share2 size={24} />
                    </button>
                </div>
            </div>


        </div>
    );
};

const NewsReel = ({ articles, onLoadMore, loadingMore, hasMore }) => {
    const containerRef = React.useRef(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const handleScroll = () => {
        if (!containerRef.current || loadingMore || !hasMore) return;
        
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        // If we are within 200px of the bottom
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            onLoadMore();
        }
    };

    React.useEffect(() => {
        const observerOptions = {
            root: containerRef.current,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = entry.target.getAttribute('data-index');
                    if (idx !== null) {
                        setActiveIndex(parseInt(idx));
                    }
                }
            });
        }, observerOptions);

        const items = containerRef.current?.querySelectorAll('.news-reel-item');
        items?.forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, [articles]);

    if (!articles || articles.length === 0) return null;

    return (
        <div 
            className="news-reel-container" 
            ref={containerRef}
            onScroll={handleScroll}
        >

            {articles.map((article, index) => (
                <NewsReelItem 
                    key={`${article.uuid || index}-${index}`}
                    article={{ ...article, _index: index }} 
                    isFirst={index === 0}
                />
            ))}
            {loadingMore && (
                <div className="flex justify-center p-12 bg-black">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                </div>
            )}
            {!hasMore && (
                <div className="text-center p-20 bg-black text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                    End of news universe
                </div>
            )}
        </div>
    );
};

export default NewsReel;
