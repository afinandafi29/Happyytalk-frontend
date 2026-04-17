import React from 'react';
import { Link } from 'react-router-dom';

const NewsHero = ({ article }) => {
    if (!article) return null;

    return (
        <div className="relative w-full h-[500px] md:h-[600px] xl:h-[700px] rounded-3xl overflow-hidden shadow-2xl mb-16 group ring-1 ring-white/10">
            <img
                src={article.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-20">
                <div className="max-w-5xl relative z-10 animate-slideUp">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400/30">
                            Top Story
                        </span>
                        {article.categories?.slice(0, 1).map(cat => (
                            <span key={cat} className="px-4 py-1.5 bg-white/10 backdrop-blur-xl text-gray-100 text-sm font-semibold rounded-full uppercase tracking-wide border border-white/20 hover:bg-white/20 transition-colors">
                                {cat}
                            </span>
                        ))}
                        <span className="text-white/70 font-medium text-base border-l-2 border-white/20 pl-4 ml-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {article.source}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                        {article.title}
                    </h1>

                    <p className="text-white/80 text-lg md:text-xl lg:text-2xl line-clamp-3 mb-10 max-w-4xl font-light leading-relaxed drop-shadow-lg hidden md:block border-l-4 border-blue-500 pl-6">
                        {article.description || article.snippet}
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            to={`/news/article/${article.uuid}`}
                            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_80px_-10px_rgba(59,130,246,0.6)]"
                        >
                            Read Full Story
                            <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        
                        <button
                            onClick={() => {
                                const shareData = {
                                    title: article.title,
                                    text: article.description || article.snippet,
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
                            className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all transform hover:-translate-y-1 backdrop-blur-md shadow-xl"
                            title="Share story"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsHero;
