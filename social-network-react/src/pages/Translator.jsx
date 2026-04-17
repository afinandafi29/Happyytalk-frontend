import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Languages, ArrowRightLeft, Copy, Share2, Volume2 } from 'lucide-react';

const Translator = () => {
    const navigate = useNavigate();
    const [sourceText, setSourceText] = useState('');
    const [targetText, setTargetText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('es');
    const [isTranslating, setIsTranslating] = useState(false);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ru', name: 'Russian' }
    ];

    const handleTranslate = async () => {
        if (!sourceText.trim()) return;
        
        setIsTranslating(true);
        // Mock translation for demo purposes
        setTimeout(() => {
            setTargetText(`[Translated to ${languages.find(l => l.code === targetLang).name}]: ${sourceText}`);
            setIsTranslating(false);
        }, 800);
    };

    const swapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
        setSourceText(targetText.replace(/^\[.*\]: /, ''));
        setTargetText('');
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white p-4 md:p-6">
            <div className="w-full mx-auto px-4 md:px-8">
                <header className="flex items-center justify-between mb-8 md:mb-12 relative h-14 md:h-auto">
                    {/* Top Left Back Button (Desktop-ish but used for both) */}
                    <button 
                        onClick={() => navigate('/apps')}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10"
                    >
                        <ChevronLeft size={20} />
                        <span className="hidden md:inline">Apps</span>
                    </button>

                    {/* Centered Title for Mobile */}
                    <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <div className="p-2 md:p-3 bg-blue-500 rounded-xl md:rounded-2xl">
                            <Languages size={20} className="text-white md:hidden" />
                            <Languages size={24} className="text-white hidden md:block" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Translator</h1>
                    </div>

                    <div className="w-10 md:w-20"></div> {/* Spacer */}
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* Source */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <select 
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code} className="bg-[#0a0a0a]">{lang.name}</option>
                            ))}
                        </select>
                        <div className="relative">
                            <textarea 
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                                placeholder="Enter text to translate..."
                                className="w-full h-64 bg-white/5 border border-white/10 rounded-[30px] p-8 text-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <div className="absolute bottom-6 right-6 flex gap-3 text-white/40">
                                <Volume2 size={20} className="hover:text-white cursor-pointer" />
                                <Copy size={20} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Swap Button (Absolute/Center on Desktop) */}
                    <div className="absolute left-1/2 top-[180px] -translate-x-1/2 z-10 hidden md:block">
                        <button 
                            onClick={swapLanguages}
                            className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full shadow-2xl hover:scale-110 transition-all border-4 border-[#0a0a0a]"
                        >
                            <ArrowRightLeft size={24} />
                        </button>
                    </div>

                    {/* Target */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <select 
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code} className="bg-[#0a0a0a]">{lang.name}</option>
                            ))}
                        </select>
                        <div className="relative">
                            <div className="w-full h-64 bg-blue-500/5 border border-blue-500/20 rounded-[30px] p-8 text-xl text-blue-100/90 overflow-y-auto">
                                {isTranslating ? (
                                    <div className="flex gap-2 items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                ) : (
                                    targetText || <span className="text-white/20">Translation will appear here...</span>
                                )}
                            </div>
                            <div className="absolute bottom-6 right-6 flex gap-3 text-white/40">
                                <Share2 size={20} className="hover:text-white cursor-pointer" />
                                <Copy size={20} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={handleTranslate}
                        disabled={isTranslating || !sourceText.trim()}
                        className="px-12 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-white/5 disabled:text-white/20 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        Translate Now
                    </button>
                </div>

                {/* Features Info */}
                <div className="mt-24 grid grid-cols-3 gap-8">
                    <div className="bg-white/5 p-8 rounded-[30px] border border-white/10">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                            <Languages size={24} className="text-purple-400" />
                        </div>
                        <h3 className="font-bold mb-2">100+ Languages</h3>
                        <p className="text-white/40 text-sm">Translate between over 100 languages with high accuracy.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[30px] border border-white/10">
                        <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4">
                            <Volume2 size={24} className="text-green-400" />
                        </div>
                        <h3 className="font-bold mb-2">Text-to-Speech</h3>
                        <p className="text-white/40 text-sm">Listen to your translations with crystal-clear pronunciation.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[30px] border border-white/10">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4">
                            <Share2 size={24} className="text-orange-400" />
                        </div>
                        <h3 className="font-bold mb-2">Instant Share</h3>
                        <p className="text-white/40 text-sm">Easily share translated text via email or social media.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Translator;
