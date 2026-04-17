import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, Search, Download, Heart, 
    ExternalLink, Maximize2, Share2, Camera,
    RefreshCcw, Grid, Layout
} from 'lucide-react';

const UnsplashApp = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchImages = useCallback(async (searchQuery = 'nature', pageNum = 1) => {
        setLoading(true);
        try {
            // Using a public-facing proxy or direct Unsplash source for demo
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&page=${pageNum}&per_page=20&client_id=v9e6n_8Z_6K_z_R_Z_K_z_R_Z_K_z_R_Z_K_z_R_Y`); 
            // Note: In a real app, this client_id would be an environment variable.
            const data = await response.json();
            if (data.results) {
                setImages(prev => pageNum === 1 ? data.results : [...prev, ...data.results]);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages('minimal aesthetic', 1);
    }, [fetchImages]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchImages(query || 'minimal aesthetic', 1);
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchImages(query || 'minimal aesthetic', nextPage);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 selection:bg-rose-500 selection:text-white">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16 gap-4 md:gap-8 relative">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <button 
                            onClick={() => navigate('/apps')}
                            className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        
                        <div className="flex flex-col items-center md:items-start absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center">
                                    <Camera size={18} className="text-black" />
                                </div>
                                <h1 className="text-xl md:text-2xl font-black tracking-tight">Gallary</h1>
                            </div>
                            <span className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.2em]">Powered by Unsplash</span>
                        </div>

                        <div className="w-10 md:hidden"></div> {/* Spacer for mobile */}
                    </div>

                    <form onSubmit={handleSearch} className="relative w-full max-w-xl group mt-4 md:mt-0">
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find inspiration..."
                            className="w-full bg-white/5 border border-white/10 rounded-[20px] px-6 py-4 md:px-8 md:py-5 pl-14 text-sm md:text-lg focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all shadow-2xl"
                        />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
                        <button type="submit" className="hidden">Search</button>
                    </form>

                    <div className="flex items-center gap-4 hidden md:flex">
                        <button className="p-3 text-white/40 hover:text-white transition-colors"><Grid size={24} /></button>
                        <button className="p-3 text-white/40 hover:text-white transition-colors"><Layout size={24} /></button>
                    </div>
                </header>

                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {images.map((img, idx) => (
                        <motion.div 
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (idx % 20) * 0.05 }}
                            className="relative group rounded-[20px] overflow-hidden cursor-zoom-in"
                            onClick={() => setSelectedImage(img)}
                        >
                            <img 
                                src={img.urls.regular} 
                                alt={img.alt_description}
                                className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={img.user.profile_image.small} 
                                            alt={img.user.name} 
                                            className="w-8 h-8 rounded-full border border-white/20"
                                        />
                                        <span className="text-sm font-bold text-white/90">{img.user.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all"><Heart size={18} /></button>
                                        <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all"><Download size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex justify-center py-20">
                        <button 
                            onClick={loadMore}
                            className="px-10 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all flex items-center gap-3 font-bold uppercase tracking-widest text-sm"
                        >
                            <RefreshCcw size={18} />
                            Load More
                        </button>
                    </div>
                )}
            </div>

            {/* Modal for Full Image */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedImage(null)}></div>
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-6xl w-full max-h-full bg-[#111] rounded-[40px] overflow-hidden flex flex-col shadow-2xl border border-white/5"
                        >
                            <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={selectedImage.user.profile_image.medium} 
                                        alt={selectedImage.user.name} 
                                        className="w-12 h-12 rounded-full border-2 border-white/10"
                                    />
                                    <div>
                                        <h2 className="font-bold text-lg">{selectedImage.user.name}</h2>
                                        <p className="text-white/40 text-sm">@{selectedImage.user.username}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"><Share2 size={24} /></button>
                                    <button className="p-4 bg-white rounded-2xl hover:bg-white/90 transition-all text-black font-bold flex items-center gap-2">
                                        <Download size={24} /> Download
                                    </button>
                                    <button 
                                        onClick={() => setSelectedImage(null)}
                                        className="p-4 bg-white/5 rounded-2xl hover:bg-red-500/20 transition-all hover:text-red-400 ml-4"
                                    >
                                        <ChevronLeft size={24} className="rotate-90 md:rotate-0" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-black/50">
                                <img 
                                    src={selectedImage.urls.full} 
                                    alt={selectedImage.alt_description} 
                                    className="max-w-full max-h-full object-contain rounded-2xl"
                                />
                            </div>
                            <div className="p-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 bg-[#0a0a0a] border-t border-white/5 text-center">
                                <div><p className="text-white/20 text-xs uppercase tracking-widest mb-1">Dimensions</p><p className="font-bold">{selectedImage.width} × {selectedImage.height}</p></div>
                                <div><p className="text-white/20 text-xs uppercase tracking-widest mb-1">Likes</p><p className="font-bold">{selectedImage.likes}</p></div>
                                <div><p className="text-white/20 text-xs uppercase tracking-widest mb-1">Created</p><p className="font-bold">{new Date(selectedImage.created_at).toLocaleDateString()}</p></div>
                                <div className="flex justify-center items-center gap-4">
                                    <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold transition-all"><ExternalLink size={20} /> View Source</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UnsplashApp;
