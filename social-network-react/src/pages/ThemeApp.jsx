import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, Palette, Moon, Sun, Monitor, 
    Smartphone, Zap, Layout, MonitorCheck,
    Contrast, Check, ShieldCheck
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeApp = () => {
    const navigate = useNavigate();
    const { theme, changeTheme } = useTheme();
    const [accentColor, setAccentColor] = useState('#3b82f6');

    const themes = [
        { id: 'dark', name: 'Deep Space', icon: <Moon size={24} />, description: 'Pure obsidian black for OLED screens.', color: '#000000' },
        { id: 'light', name: 'Arctic White', icon: <Sun size={24} />, description: 'Clean, crisp white for high visibility.', color: '#ffffff' },
        { id: 'dim', name: 'Dusk Grey', icon: <Contrast size={24} />, description: 'Soft charcoal tones for reduced eye strain.', color: '#1a1a1a' }
    ];

    const accents = [
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Purple', value: '#8b5cf6' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Orange', value: '#f59e0b' },
        { name: 'Green', value: '#10b981' },
        { name: 'Red', value: '#ef4444' }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#000000] text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="w-full mx-auto p-4 md:p-12">
                <header className="flex flex-col items-center mb-8 md:mb-20 animate-in fade-in slide-in-from-top-6 duration-1000 relative">
                    <button 
                        onClick={() => navigate('/apps')}
                        className={`absolute left-0 p-3 rounded-2xl transition-all border ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 md:p-2.5 bg-blue-500 rounded-lg md:rounded-xl shadow-lg shadow-blue-500/20 text-white">
                                <Palette size={18} className="md:hidden" />
                                <Palette size={24} className="hidden md:block" />
                            </div>
                            <h1 className="text-xl md:text-3xl font-black tracking-tight">Personalization</h1>
                        </div>
                        <span className="text-[10px] md:text-xs opacity-40 uppercase tracking-widest font-bold mt-1">Happytalk Theme Engine</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Visual Settings */}
                    <div className="space-y-12">
                        <section className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 transition-colors"><Monitor size={20} className="text-blue-500" /> System Appearance</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {themes.map(t => (
                                    <button 
                                        key={t.id}
                                        onClick={() => changeTheme(t.id)}
                                        className={`p-6 rounded-[32px] text-left transition-all border-2 relative overflow-hidden group 
                                            ${theme === t.id 
                                                ? (theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/5 border-blue-500') 
                                                : (theme === 'dark' ? 'bg-white/5 border-transparent hover:border-white/10' : 'bg-white border-transparent hover:border-black/5 shadow-sm')
                                            }
                                        `}
                                    >
                                        <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-all ${theme === t.id ? 'bg-blue-500 text-white' : 'opacity-40 group-hover:opacity-100'}`}>
                                            {t.icon}
                                        </div>
                                        <h4 className="font-bold mb-1">{t.name}</h4>
                                        <p className="text-xs opacity-40 leading-relaxed">{t.description}</p>
                                        {theme === t.id && (
                                            <div className="absolute top-4 right-4 text-blue-500"><ShieldCheck size={20} /></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2"><Zap size={20} className="text-yellow-500" /> Accent Colors</h3>
                            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] md:rounded-[40px] grid grid-cols-3 md:grid-cols-6 gap-4">
                                {accents.map(color => (
                                    <button 
                                        key={color.value}
                                        onClick={() => setAccentColor(color.value)}
                                        className={`aspect-square rounded-2xl transition-all relative flex items-center justify-center
                                            ${accentColor === color.value ? 'scale-110 shadow-xl' : 'hover:scale-105 active:scale-95 opacity-60 hover:opacity-100'}
                                        `}
                                        style={{ backgroundColor: color.value, boxShadow: accentColor === color.value ? `0 10px 30px ${color.value}40` : '' }}
                                    >
                                        {accentColor === color.value && <Check size={24} className="text-white drop-shadow-md" />}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-6 pb-20 md:pb-0">
                            <h3 className="text-xl font-bold flex items-center gap-2 font-black"><Layout size={20} className="text-pink-500" /> Visual Backgrounds</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: 'Midnight', class: 'bg-black' },
                                    { name: 'Ocean', class: 'bg-gradient-to-br from-blue-900 to-black' },
                                    { name: 'Sunset', class: 'bg-gradient-to-br from-orange-900 to-black' },
                                    { name: 'Forest', class: 'bg-gradient-to-br from-emerald-900 to-black' }
                                ].map(bg => (
                                    <button 
                                        key={bg.name}
                                        className={`h-24 md:h-32 rounded-3xl border-2 transition-all p-4 flex items-end ${bg.class} ${theme === bg.name ? 'border-white scale-[1.02]' : 'border-white/5 opacity-60'}`}
                                    >
                                        <span className="text-xs font-black uppercase tracking-widest">{bg.name}</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Live Preview */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <section className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2"><Layout size={20} className="text-purple-500" /> Live Preview</h3>
                            <div className={`p-10 rounded-[50px] border-[12px] shadow-2xl transition-all duration-500 overflow-hidden relative
                                ${theme === 'dark' ? 'bg-[#000000] border-[#111111]' : 'bg-white border-slate-200'}
                            `} style={{ borderColor: theme === 'dark' ? '#080808' : '#e2e8f0' }}>
                                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }}></div>
                                
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: accentColor + '20', border: `1px solid ${accentColor}40` }}></div>
                                    <div className="flex gap-2">
                                        <div className="w-4 h-4 rounded-full bg-red-400/20"></div>
                                        <div className="w-4 h-4 rounded-full bg-yellow-400/20"></div>
                                        <div className="w-4 h-4 rounded-full bg-green-400/20"></div>
                                    </div>
                                </div>

                                <h4 className="text-2xl font-black mb-4">The future is Decentralized.</h4>
                                <p className="opacity-40 text-sm leading-relaxed mb-8">Experience a social ecosystem where you define the aesthetic. From deep space blacks to crisp arctic whites.</p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="h-16 rounded-2xl bg-black/5 border border-black/5 p-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: accentColor }}></div>
                                        <div className="w-12 h-2 bg-black/10 rounded"></div>
                                    </div>
                                    <div className="h-16 rounded-2xl bg-black/5 border border-black/5"></div>
                                </div>

                                <button className="w-full py-4 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95" style={{ backgroundColor: accentColor }}>
                                    Apply Changes
                                </button>

                                <div className="mt-12 pt-8 border-t border-black/5 flex items-center justify-center gap-8 opacity-20">
                                    <Smartphone size={24} />
                                    <MonitorCheck size={24} />
                                    <Zap size={24} />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .animate-in {
                    animation-delay: 0.1s;
                }
            `}</style>
        </div>
    );
};

export default ThemeApp;
