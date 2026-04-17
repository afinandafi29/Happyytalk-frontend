import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabase/config';
import { useAuth } from '../../contexts/AuthContext';
import InboxList from './InboxList';
import DirectMessageWindow from './DirectMessageWindow';

const InstagramChat = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [activeConversation, setActiveConversation] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const fetchConversations = async () => {
            setIsLoading(true);
            try {
                // Fetch conversations where user is a member
                const { data, error } = await supabase
                    .from('conversation_members')
                    .select(`
                        conversation_id,
                        conversations (
                            id,
                            is_group,
                            title,
                            avatar_url,
                            last_message_content,
                            last_message_at,
                            last_message_sender_id
                        )
                    `)
                    .eq('user_id', currentUser.id);

                if (error) throw error;
                
                // Fetch partner profiles for 1-to-1 chats
                const enrichedConversations = await Promise.all((data || []).map(async (row) => {
                    const conv = row.conversations;
                    if (!conv.is_group) {
                        const { data: members } = await supabase
                            .from('conversation_members')
                            .select('user_id, profiles(id, username, avatar_url)')
                            .eq('conversation_id', conv.id)
                            .neq('user_id', currentUser.id)
                            .maybeSingle();
                        
                        return { ...conv, partner: members?.profiles };
                    }
                    return conv;
                }));

                setConversations(enrichedConversations.filter(Boolean).sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at)));
            } catch (err) {
                console.error("Failed to load inbox:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversations();

        // Subscribe to conversation updates
        const channel = supabase
            .channel('inbox_updates')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'conversations' }, (payload) => {
                setConversations(prev => {
                    const index = prev.findIndex(c => c.id === payload.new.id);
                    if (index !== -1) {
                        const updated = [...prev];
                        updated[index] = { ...updated[index], ...payload.new };
                        return updated.sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at));
                    }
                    return prev;
                });
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [currentUser]);

    if (!currentUser) return null;

    return (
        <div className="h-full w-full flex bg-[#0f172a] text-white overflow-hidden animate-in fade-in duration-300">
            {/* Inbox Sidebar (Visible on md+ or when no active chat on sm) */}
            <div className={`w-full md:w-[350px] border-r border-white/10 flex flex-col ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase tracking-tighter">Messages</h2>
                    <div className="flex gap-4">
                         <button className="text-gray-400 hover:text-white transition-colors">
                            <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white transition-colors">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
                        <input 
                            type="text" 
                            placeholder="Search messages"
                            className="w-full bg-[#1e293b] border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-blue-500/50"
                        />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto no-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full opacity-30 gap-3">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Inbox Loading...</span>
                        </div>
                    ) : (
                        <InboxList 
                            conversations={conversations} 
                            activeId={activeConversation?.id}
                            onSelectChat={setActiveConversation}
                            currentUser={currentUser}
                        />
                    )}
                </div>
            </div>

            {/* Chat Panel (Visible on md+ or when active chat on sm) */}
            <div className={`flex-grow h-full bg-[#080d1a] relative ${!activeConversation ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
                {activeConversation ? (
                    <DirectMessageWindow 
                        conversation={activeConversation}
                        currentUser={currentUser}
                        onBack={() => setActiveConversation(null)}
                    />
                ) : (
                    <div className="flex flex-col items-center text-center p-12 max-w-sm">
                        <div className="w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center text-3xl text-white/50 mb-6 group hover:border-blue-500/30 transition-colors">
                            <i className="fas fa-paper-plane group-hover:scale-110 transition-transform"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Your Messages</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Send private photos and messages to a friend or group.</p>
                        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
                            Send Message
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstagramChat;
