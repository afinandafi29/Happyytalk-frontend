import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabase/config';
import MessageBubble from './MessageBubble';

const DirectMessageWindow = ({ conversation, currentUser, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = (behavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('conversation_id', conversation.id)
                    .order('created_at', { ascending: true });

                if (error) throw error;
                setMessages(data || []);
                setTimeout(() => scrollToBottom('auto'), 100);
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();

        // Subscribe to real-time messages for this conversation
        const channel = supabase
            .channel(`conversation:${conversation.id}`)
            .on('postgres_changes', { 
                event: 'INSERT', 
                schema: 'public', 
                table: 'messages',
                filter: `conversation_id=eq.${conversation.id}`
            }, (payload) => {
                setMessages(prev => [...prev, payload.new]);
                scrollToBottom();
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [conversation.id]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const content = newMessage.trim();
        setNewMessage('');

        try {
            const { error } = await supabase
                .from('messages')
                .insert({
                    conversation_id: conversation.id,
                    sender_id: currentUser.id,
                    content
                });

            if (error) throw error;

            // Also update the conversation's last message for the inbox list
            await supabase
                .from('conversations')
                .update({
                    last_message_content: content,
                    last_message_sender_id: currentUser.id,
                    last_message_at: new Date().toISOString()
                })
                .eq('id', conversation.id);
            
        } catch (err) {
            console.error("Failed to send message:", err);
            alert("Delivery failed. Please try again.");
        }
    };

    const partner = conversation.partner || {};
    const chatTitle = conversation.is_group ? conversation.title : partner.username;
    const chatAvatar = conversation.is_group ? conversation.avatar_url : partner.avatar_url;

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-[#0f172a] to-[#080d1a] animate-in slide-in-from-right duration-300">
            {/* DM Header */}
            <div className="p-4 border-b border-white/5 bg-[#1e293b]/30 backdrop-blur-xl flex items-center gap-4 z-10 sticky top-0 shadow-lg shadow-black/20">
                <button onClick={onBack} className="md:hidden text-gray-400 hover:text-white p-2 transition-transform hover:scale-110">
                    <i className="fas fa-arrow-left text-lg"></i>
                </button>
                
                <div className="relative group cursor-pointer">
                    <img 
                        src={chatAvatar || "/default-avatar.png"} 
                        alt={chatTitle}
                        className="w-10 h-10 rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors shadow-inner"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#0f172a] rounded-full shadow-lg"></div>
                </div>
                
                <div className="flex-grow min-w-0">
                    <h3 className="font-black text-white uppercase tracking-tighter text-sm md:text-base cursor-pointer hover:text-blue-400 transition-colors">
                        {chatTitle}
                    </h3>
                    <p className="text-[9px] text-green-500 font-black uppercase tracking-[0.2em] leading-none mt-0.5">
                        Active Now
                    </p>
                </div>

                <div className="flex items-center gap-5 mr-2">
                    <button className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-90">
                        <i className="fas fa-phone-alt"></i>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-90">
                        <i className="fas fa-video"></i>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-90">
                        <i className="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>

            {/* Message Feed */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar custom-scrollbar relative">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-30 gap-4">
                        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Syncing Messages...</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center py-10 opacity-50 space-y-4">
                            <img src={chatAvatar || "/default-avatar.png"} alt="profile" className="w-20 h-20 rounded-full border-2 border-white/10 shadow-xl" />
                            <div className="text-center">
                                <h4 className="font-black uppercase tracking-widest text-sm">{chatTitle}</h4>
                                <p className="text-[10px] lowercase text-gray-400 mt-1">Language Learner • Joined 2024</p>
                                <button className="mt-4 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest">View Profile</button>
                            </div>
                        </div>

                        {messages.length === 0 ? (
                            <div className="text-center py-20 opacity-20">
                                <i className="fas fa-magic text-4xl mb-4 text-blue-500"></i>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Messages Recorded</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => {
                                const isMe = msg.sender_id === currentUser.id;
                                const isFirstInGroup = index === 0 || messages[index - 1].sender_id !== msg.sender_id;
                                return (
                                    <MessageBubble 
                                        key={msg.id} 
                                        message={msg} 
                                        isMe={isMe} 
                                        isFirst={isFirstInGroup}
                                    />
                                );
                            })
                        )}
                        {isTyping && (
                           <div className="flex items-start gap-2 animate-in fade-in duration-300">
                               <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shadow-inner shrink-0">
                                   <img src={partner.avatar_url || "/default-avatar.png"} alt="avatar" className="w-full h-full object-cover" />
                               </div>
                               <div className="bg-[#1e293b] px-4 py-3 rounded-2xl rounded-bl-sm border border-white/5 flex gap-1 items-center">
                                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-0"></div>
                                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                               </div>
                           </div>
                        )}
                        <div ref={messagesEndRef} className="h-4" />
                    </>
                )}
            </div>

            {/* Message Input Area */}
            <div className="p-4 border-t border-white/5 bg-[#1e293b]/20 backdrop-blur-lg">
                <form onSubmit={handleSend} className="flex items-center gap-3 bg-[#0f172a] rounded-[24px] p-2 pl-4 border border-white/10 focus-within:border-blue-500/40 focus-within:shadow-[0_0_20px_rgba(37,99,235,0.05)] transition-all">
                    <button type="button" className="text-gray-400 hover:text-white p-2 transition-transform hover:scale-110 active:scale-95">
                        <i className="far fa-smile text-lg"></i>
                    </button>
                    
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Message..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2 placeholder-gray-600 font-sans"
                    />

                    {newMessage.trim() === '' ? (
                        <div className="flex items-center gap-1.5 pr-2">
                            <button type="button" className="p-2.5 text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95">
                                <i className="fas fa-microphone text-lg"></i>
                            </button>
                            <button type="button" className="p-2.5 text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-90">
                                <i className="far fa-image text-lg"></i>
                            </button>
                            <button type="button" className="p-2.5 text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-90">
                                <i className="far fa-heart text-lg"></i>
                            </button>
                        </div>
                    ) : (
                        <button 
                            type="submit"
                            className="mr-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            Send
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default DirectMessageWindow;
