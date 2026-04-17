import React, { useState } from 'react';

const MessageBubble = ({ message, isMe, isFirst }) => {
    const [showTime, setShowTime] = useState(false);

    const formatTime = (ts) => {
        return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} ${isFirst ? 'mt-4' : 'mt-0.5'}`}>
            <div className={`flex items-end gap-2 group/bubble relative`}>
                {!isMe && isFirst && (
                    <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shadow-inner shrink-0 mt-2">
                        <img 
                            src="/default-avatar.png" 
                            alt="avatar" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                )}
                {!isMe && !isFirst && <div className="w-8 shrink-0"></div>}

                <div 
                    onClick={() => setShowTime(!showTime)}
                    className={`relative max-w-[85%] px-4 py-3 rounded-2xl text-[14px] font-sans leading-snug tracking-tight shadow-sm transition-all duration-200 cursor-pointer ${
                        isMe 
                            ? 'bg-blue-600 text-white rounded-br-sm shadow-blue-500/10 border border-blue-400/20' 
                            : 'bg-[#1e293b] text-white/90 rounded-bl-sm border border-white/5 shadow-black/20'
                    } ${isFirst ? '' : isMe ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                >
                    {message.content}
                </div>

                {isMe && isFirst && (
                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover/bubble:opacity-100 transition-opacity p-2 text-gray-700 hover:text-red-400 cursor-pointer">
                        <i className="far fa-heart text-[10px]"></i>
                    </div>
                )}
            </div>

            {/* Status Info */}
            <div className={`flex items-center gap-1.5 px-2 mt-1 min-h-[14px] w-full ${isMe ? 'justify-end pr-10' : 'justify-start pl-10'}`}>
                {showTime && (
                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-1 duration-200">
                        {formatTime(message.created_at)}
                    </span>
                )}
                {isMe && !showTime && message.status === 'seen' && (
                    <span className="text-[9px] text-blue-500 font-bold leading-none animate-in fade-in duration-300">Seen</span>
                )}
                {isMe && !showTime && message.status === 'delivered' && (
                    <i className="fas fa-check-circle text-[8px] text-gray-500 shadow-sm"></i>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
