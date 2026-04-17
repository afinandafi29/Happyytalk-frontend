import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Rss, User, Search, PlusCircle, LogIn, Sparkles } from 'lucide-react';
import InstallApp from '../InstallApp';
import { useAuth } from '../../contexts/AuthContext';

const MobileBottomNav = ({ onCreateRoom }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    // Navigation items rearranged: Home, Feed, Create, AI, Profile/SignIn
    const navItems = [
        { id: 'home', icon: Home, label: 'Home', path: '/' },
        { id: 'feed', icon: Rss, label: 'Feed', path: '/feed' },
        { id: 'create', icon: PlusCircle, label: 'Create', action: onCreateRoom, primary: true },
        { id: 'ai', icon: Sparkles, label: 'AI', path: '/ai' },
        {
            id: 'profile',
            icon: currentUser ? User : LogIn,
            label: currentUser ? 'Profile' : 'Sign In',
            path: currentUser ? '/profile' : '/in'
        },
    ];

    const isActive = (path) => {
        if (!path) return false;
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden bottom-navbar-wrapper">
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="flex justify-between items-center px-2 py-2"
            >
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = item.path ? isActive(item.path) : false;

                    return (
                        <div key={item.id} className="relative flex-1 flex justify-center">
                            {item.id === 'create' && (
                                <InstallApp className="absolute bottom-[120%] left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-2xl z-50 whitespace-nowrap animate-bounce border border-white/10" />
                            )}
                            
                            <button
                                onClick={() => item.action ? item.action() : navigate(item.path)}
                                className={`relative flex flex-col items-center justify-center transition-all duration-300 ${item.primary ? 'mt-[-32px]' : ''}`}
                            >
                                {item.primary ? (
                                    <div className="plus-icon-wrapper">
                                        <Icon size={28} color="white" strokeWidth={3} />
                                    </div>
                                ) : (
                                    <div className={`p-1.5 transition-all duration-300 ${active ? 'text-blue-500' : 'text-slate-400 opacity-70'}`}>
                                        <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                                    </div>
                                )}
                                <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${active ? 'text-blue-500' : 'text-slate-500'}`}>
                                    {item.label}
                                </span>
                            </button>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default MobileBottomNav;
