import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, Search, Volume2, Book, 
    Bookmark, Star, History, Hash, Quote 
} from 'lucide-react';

const Dictionary = () => {
    const navigate = useNavigate();
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!word.trim()) return;

        setLoading(true);
        setError(null);
        setDefinition(null);

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();
            
            if (response.ok) {
                setDefinition(data[0]);
            } else {
                setError("Word not found. Please try another search.");
            }
        } catch (err) {
            setError("Something went wrong. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const playAudio = () => {
        const audio = definition?.phonetics.find(p => p.audio)?.audio;
        if (audio) new Audio(audio).play();
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white p-4 md:p-8 font-sans">
            <div className="w-full mx-auto px-4 md:px-12">
                <header className="flex items-center justify-between mb-8 md:mb-16 relative h-14 md:h-auto">
                    <button 
                        onClick={() => navigate('/apps')}
                        className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group"
                    >
                        <ChevronLeft size={24} className="text-white/60 group-hover:text-white" />
                    </button>
                    
                    <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-indigo-600 rounded-xl md:rounded-[22px] flex items-center justify-center mb-1 md:mb-4 shadow-xl shadow-indigo-500/20">
                            <Book size={20} className="text-white md:hidden" />
                            <Book size={32} className="text-white hidden md:block" />
                        </div>
                        <h1 className="text-xl md:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">Dictionary</h1>
                    </div>

                    <div className="flex gap-2 md:gap-3">
                        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hidden md:block"><History size={20} className="text-white/60" /></button>
                        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10"><Star size={20} className="text-white/60" /></button>
                    </div>
                </header>

                <div className="relative mb-12 group">
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            placeholder="Discover the meaning of..."
                            className="w-full bg-white/5 md:bg-white/5 border-2 border-white/10 rounded-[40px] px-10 py-8 md:px-14 md:py-10 text-2xl md:text-3xl font-bold placeholder-white/10 focus:outline-none focus:border-indigo-600 transition-all shadow-2xl focus:shadow-indigo-500/10"
                        />
                        <button 
                            type="submit"
                            className="absolute right-4 top-1/2 -translate-y-1/2 md:right-6 w-14 h-14 md:w-20 md:h-20 bg-indigo-600 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-indigo-500/40"
                        >
                            <Search size={32} />
                        </button>
                    </form>
                </div>

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center pt-20"
                            >
                                <div className="w-20 h-20 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
                                <p className="mt-8 text-white/40 font-bold uppercase tracking-widest">Searching...</p>
                            </motion.div>
                        ) : error ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center pt-20"
                            >
                                <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
                                    <Star size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-red-400 mb-2">Oops!</h2>
                                <p className="text-white/40 text-lg">{error}</p>
                            </motion.div>
                        ) : definition ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-10 pb-20"
                            >
                                <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8 gap-4">
                                    <div>
                                        <h1 className="text-6xl md:text-8xl font-black capitalize mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">{definition.word}</h1>
                                        <div className="flex items-center gap-4 text-indigo-400 text-xl font-medium font-mono">
                                            <span>{definition.phonetic}</span>
                                            {definition.phonetics.some(p => p.audio) && (
                                                <button 
                                                    onClick={playAudio}
                                                    className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center hover:bg-indigo-600/40 transition-all border border-indigo-600/20"
                                                >
                                                    <Volume2 size={24} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10"><Bookmark size={18} /> Save Word</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-10">
                                        {definition.meanings.map((meaning, idx) => (
                                            <div key={idx} className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-indigo-400 font-black italic uppercase tracking-wider">{meaning.partOfSpeech}</span>
                                                    <div className="flex-1 h-px bg-white/10"></div>
                                                </div>
                                                
                                                <div className="space-y-8">
                                                    {meaning.definitions.slice(0, 3).map((def, dIdx) => (
                                                        <div key={dIdx} className="group flex gap-6">
                                                            <div className="mt-2 w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 group-hover:scale-150 transition-all"></div>
                                                            <div className="space-y-4">
                                                                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">{def.definition}</p>
                                                                {def.example && (
                                                                    <div className="flex gap-3 text-white/40 border-l-2 border-white/10 pl-6 italic text-lg">
                                                                        <Quote size={18} className="flex-shrink-0 opacity-20" />
                                                                        <p>{def.example}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-8">
                                        {definition.meanings[0].synonyms.length > 0 && (
                                            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                                                <h3 className="flex items-center gap-2 font-bold mb-6 text-white/60 uppercase tracking-widest text-sm"><Hash size={16} /> Synonyms</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {definition.meanings[0].synonyms.slice(0, 8).map(s => (
                                                        <span key={s} className="px-4 py-2 bg-indigo-600/10 border border-indigo-600/20 rounded-xl text-indigo-400 text-sm font-bold hover:bg-indigo-600 transition-all cursor-default">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-[32px] p-8 text-white">
                                            <h3 className="font-black text-2xl mb-2">Word of the Day</h3>
                                            <p className="opacity-80 mb-6 text-sm">Expand your vocabulary every single day with Happytalk Premium.</p>
                                            <button className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:scale-[1.02] transition-all">Learn More</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-20 text-white/20">
                                <Search size={120} className="mb-8 opacity-10" />
                                <h2 className="text-2xl font-bold tracking-tight mb-2">Search for any word</h2>
                                <p className="max-w-xs text-center text-lg">Explore definitions, phonetics, and synonyms from the ultimate dictionary.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Dictionary;
