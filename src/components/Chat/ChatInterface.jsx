import React from 'react';
import InstagramChat from './InstagramChat';

/**
 * ChatInterface Component
 * Overhauled to provide an Instagram-Style Direct Messaging experience.
 * Features a responsive layout with a conversation sidebar and a message window.
 */
const ChatInterface = ({ onClose }) => {
    return (
        <div className="h-full w-full bg-[#0f172a] shadow-2xl relative overflow-hidden group/chat">
            {/* Top Branding Accent - Similar to Instagram's colorful gradient */}
            <div className="md:hidden h-1 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-80 group-hover/chat:opacity-100 transition-opacity"></div>
            
            <InstagramChat onClose={onClose} />
            
            {/* Aesthetic Glow & Border Accents */}
            <div className="absolute inset-y-0 left-0 w-[1px] bg-white/5 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/5 pointer-events-none"></div>
        </div>
    );
};

export default ChatInterface;
