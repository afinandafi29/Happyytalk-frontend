import React from 'react';

const InboxList = ({ conversations, activeId, onSelectChat, currentUser }) => {
    
    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 24 * 60 * 60 * 1000) {
            return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        }
        if (diff < 7 * 24 * 60 * 60 * 1000) {
            return date.toLocaleDateString([], { weekday: 'short' });
        }
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    if (!conversations.length) {
        return (
            <div className="p-8 text-center opacity-30 mt-10">
                <i className="fas fa-comments text-4xl mb-4"></i>
                <p className="text-xs uppercase tracking-widest font-black font-sans">No Conversations</p>
                <p className="text-[10px] lowercase tracking-normal mt-2">Start a new chat to see it here.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col py-2 px-3 gap-1">
            {conversations.map((conv) => {
                const isActive = activeId === conv.id;
                const partner = conv.partner || {};
                const name = conv.is_group ? conv.title : partner.username;
                const avatar = conv.is_group ? conv.avatar_url : partner.avatar_url;
                const isMeLast = conv.last_message_sender_id === currentUser.id;

                return (
                    <button
                        key={conv.id}
                        onClick={() => onSelectChat(conv)}
                        className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 group text-left ${
                            isActive ? 'bg-blue-600/15 shadow-[0_0_15px_rgba(37,99,235,0.1)]' : 'hover:bg-white/5'
                        }`}
                    >
                        <div className="relative shrink-0">
                            <img 
                                src={avatar || "/default-avatar.png"} 
                                alt={name}
                                className={`w-14 h-14 rounded-full object-cover border-2 transition-transform duration-300 ${
                                    isActive ? 'border-blue-500 scale-105' : 'border-white/5'
                                }`}
                            />
                            {/* Online status dot (dummy logic for now) */}
                            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-[#0f172a] rounded-full shadow-lg"></div>
                        </div>

                        <div className="flex-grow min-w-0 pr-2">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <h3 className={`font-bold truncate text-[14px] uppercase tracking-tight transition-colors ${
                                    isActive ? 'text-white' : 'text-gray-200'
                                }`}>
                                    {name}
                                </h3>
                                <span className="text-[10px] text-gray-500 shrink-0 font-medium ml-2">
                                    {formatTime(conv.last_message_at)}
                                </span>
                            </div>
                            
                            <p className="text-xs truncate text-gray-400 group-hover:text-gray-300 transition-colors leading-tight">
                                {isMeLast && <span className="text-gray-600 mr-1 font-bold lowercase italic">You:</span>}
                                {conv.last_message_content || "No messages yet"}
                            </p>
                        </div>
                        
                        {/* Unread indicator (placeholder) */}
                        {!isActive && Math.random() > 0.8 && (
                           <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse"></div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default InboxList;
