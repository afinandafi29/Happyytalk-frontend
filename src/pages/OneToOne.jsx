import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Search, Moon, Sun, Video, Phone, MessageSquare, Menu, X, Mic, MicOff, Camera, CameraOff, Flag, PhoneOff, Maximize2, Minimize2, MoveVertical } from 'lucide-react';
import io from 'socket.io-client';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/OneToOne.css';

const SIGNALING_SERVER = import.meta.env.VITE_SIGNALING_SERVER || import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

const OneToOne = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // UI State
    const { theme: globalTheme } = useTheme();
    const [localTheme, setLocalTheme] = useState(globalTheme);
    const [mode, setMode] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineCount, setOnlineCount] = useState(1236);

    // Filter State
    const [genderPreference, setGenderPreference] = useState('any');
    const [myInterests, setMyInterests] = useState([]);
    const [interestInputValue, setInterestInputValue] = useState('');

    // Chat State
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [strangerTyping, setStrangerTyping] = useState(false);
    const [splitRatio, setSplitRatio] = useState(50); // Stranger height %
    const [sidebarWidth, setSidebarWidth] = useState(38); // Baseline 38%
    const [isResizingVertical, setIsResizingVertical] = useState(false);
    const [isResizingHorizontal, setIsResizingHorizontal] = useState(false);
    const workspaceRef = useRef(null);
    const mainRef = useRef(null);
    const strangerBoxRef = useRef(null);
    const selfBoxRef = useRef(null);

    // Refs
    const socketRef = useRef(null);
    const localStreamRef = useRef(null);
    const localVideoRefStr = useRef(null); // Used for lobby preview
    const localVideoRefSelf = useRef(null); // Used for connected preview
    const partnerIdRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const messagesEndRef = useRef(null);

    // MiroTalk Integration - Dynamic URL resolver
    const getMirotalkUrl = () => {
        return 'https://p2p.mirotalk.com';
    };

    const [roomId, setRoomId] = useState(null);
    const [anonymousName, setAnonymousName] = useState(`User_${Math.floor(Math.random() * 9000) + 1000}`);
    const MIROTALK_URL = getMirotalkUrl();

    // Initialize Online Count
    useEffect(() => {
        const interval = setInterval(() => {
            setOnlineCount(prev => Math.max(300, Math.min(2500, prev + Math.floor(Math.random() * 80) - 40)));
        }, 5000);
        return () => {
            clearInterval(interval);
            cleanup();
        };
    }, []);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const cleanup = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }
        setRoomId(null);
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    };

    const startSearch = async (selectedMode) => {
        cleanup();
        setMode(selectedMode);
        setIsSearching(true);
        setIsConnected(false);
        setMessages([]);
        setRoomId(null);

        // Camera access is now handled exclusively by the MiroTalk iframe
        if (selectedMode === 'video' || selectedMode === 'audio') {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: selectedMode === 'video',
                    audio: true
                });
                localStreamRef.current = stream;
                if (localVideoRefStr.current) localVideoRefStr.current.srcObject = stream;
                if (localVideoRefSelf.current) localVideoRefSelf.current.srcObject = stream;
            } catch (err) {
                console.error("React: Error accessing local media:", err);
            }
        }

        socketRef.current = io(SIGNALING_SERVER);

        socketRef.current.on('match-found', ({ partnerId, roomId }) => {
            console.log(`[Matchmaking] Match found in room: ${roomId}`);
            partnerIdRef.current = partnerId;
            setIsSearching(false);
            setIsConnected(true);
            setRoomId(roomId);
            setMessages([{ type: 'system', text: 'Connected to stranger.' }]);
            
            // Do NOT stop local camera unconditionally, we still need it for self view
            // if (localStreamRef.current) {
            //     localStreamRef.current.getTracks().forEach(track => track.stop());
            //     localStreamRef.current = null;
            // }
        });

        socketRef.current.on('chat-message', ({ message }) => {
            setMessages(prev => [...prev, { type: 'stranger', text: filterMessage(message) }]);
        });

        socketRef.current.on('typing', () => setStrangerTyping(true));
        socketRef.current.on('stop-typing', () => setStrangerTyping(false));

        socketRef.current.on('partner-disconnected', () => {
            setMessages(prev => [...prev, { type: 'system', text: 'Stranger has disconnected.' }]);
            setRoomId(null);
            setTimeout(skipToNext, 1500);
        });

        socketRef.current.emit('find-match', {
            interests: myInterests.map(i => i.text.toLowerCase()),
            mode: selectedMode,
            gender: genderPreference
        });
    };

    // Re-attachment of stream
    useEffect(() => {
        const attach = () => {
            if (localStreamRef.current) {
                if (localVideoRefStr.current && localVideoRefStr.current.srcObject !== localStreamRef.current) {
                    localVideoRefStr.current.srcObject = localStreamRef.current;
                }
                if (localVideoRefSelf.current && localVideoRefSelf.current.srcObject !== localStreamRef.current) {
                    localVideoRefSelf.current.srcObject = localStreamRef.current;
                }
            }
        };
        attach();
        const timeout = setTimeout(attach, 500);
        return () => clearTimeout(timeout);
    }, [roomId, isSearching, mode]);

    const filterMessage = (text) => {
        let cleanText = text;
        const badWords = ['fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'slut', 'whore', 'cunt', 'nigger', 'fag', 'chink', 'spic', 'bastard', 'motherfucker'];
        const badWordsRegex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi');
        cleanText = cleanText.replace(badWordsRegex, '********');

        // Replace 8 or more consecutive digits (even with spaces or dashes)
        const phoneRegex = /(?:\d[\s-]*){8,}/g;
        cleanText = cleanText.replace(phoneRegex, '********');

        return cleanText;
    };

    const sendMessage = (e) => {
        e?.preventDefault();
        if (!inputMessage.trim() || !isConnected) return;
        const filtered = filterMessage(inputMessage.trim());
        setMessages(prev => [...prev, { type: 'you', text: filtered }]);
        socketRef.current.emit('chat-message', { message: filtered, to: partnerIdRef.current });
        setInputMessage('');
        socketRef.current.emit('stop-typing', { to: partnerIdRef.current });
    };

    const handleTyping = (e) => {
        setInputMessage(e.target.value);
        if (e.target.value && socketRef.current && isConnected) {
            socketRef.current.emit('typing', { to: partnerIdRef.current });
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
                socketRef.current.emit('stop-typing', { to: partnerIdRef.current });
            }, 1000);
        }
    };

    const skipToNext = () => {
        if (!mode) return;
        if (socketRef.current) socketRef.current.emit('skip');
        
        // Clean up current session
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }

        cleanup();
        const prevMode = mode;
        setIsConnected(false);
        setIsSearching(true);
        setRoomId(null);
        setMessages([]);
        if (prevMode) {
            setTimeout(() => startSearch(prevMode), 300);
        } else {
            setIsSearching(false);
        }
    };

    const stopChat = () => {
        cleanup();
        setIsConnected(false);
        setIsSearching(false);
        setMode(null);
        setMessages([]);
        setRoomId(null);
    };

    const handleBack = () => {
        if (mode || isSearching || isConnected) {
            stopChat();
        } else {
            navigate('/apps');
        }
    };

    const addInterest = () => {
        const trimmedValue = interestInputValue.trim();
        if (trimmedValue && !myInterests.some(i => i.text.toLowerCase() === trimmedValue.toLowerCase())) {
            setMyInterests(prev => [...prev, { id: Date.now(), text: trimmedValue }]);
            setInterestInputValue('');
        }
    };

    const removeInterest = (index) => {
        setMyInterests(prev => prev.filter((_, i) => i !== index));
    };

    const isTextModeActive = mode === 'text';
    const showMedia = !isTextModeActive;
    const isLobby = !mode && !isSearching && !isConnected;

    const handleMouseDownVertical = (e) => {
        setIsResizingVertical(true);
        e.preventDefault();
    };

    const handleMouseDownHorizontal = (e) => {
        setIsResizingHorizontal(true);
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isResizingVertical && workspaceRef.current) {
                const workspaceRect = workspaceRef.current.getBoundingClientRect();
                const relativeY = e.clientY - workspaceRect.top;
                const newRatio = (relativeY / workspaceRect.height) * 100;
                if (newRatio >= 20 && newRatio <= 80) setSplitRatio(newRatio);
            }
            
            if (isResizingHorizontal && mainRef.current) {
                const mainRect = mainRef.current.getBoundingClientRect();
                const relativeX = e.clientX - mainRect.left;
                const newWidth = (relativeX / mainRect.width) * 100;
                // Min 20%, Max 80%
                if (newWidth >= 20 && newWidth <= 80) setSidebarWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizingVertical(false);
            setIsResizingHorizontal(false);
        };

        if (isResizingVertical || isResizingHorizontal) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizingVertical, isResizingHorizontal]);

    const toggleMaximize = (target) => {
        if (target === 'stranger') {
            setSplitRatio(splitRatio > 50 ? 50 : 80);
        } else {
            setSplitRatio(splitRatio < 50 ? 50 : 20);
        }
    };

    return (
        <div className="oto-page-container" data-theme={localTheme}>
            <div className="oto-app-wrapper">
                <header className="oto-header">
                    <div className="oto-header-left">
                        <button className="oto-btn-back" onClick={handleBack}>
                            <ArrowLeft size={36} strokeWidth={2.5} color="#ffffff" />
                        </button>
                        <div className="oto-brand">Happy<span>talk.in</span></div>
                        <button className="oto-btn-theme-ghost" onClick={() => setLocalTheme(prev => prev === 'dark' ? 'light' : 'dark')}>
                            {localTheme === 'dark' ? <Sun size={18} color="#ffffff" /> : <Moon size={18} color="#ffffff" />}
                        </button>
                    </div>
                    <div className="oto-stats">{onlineCount.toLocaleString()} online now</div>
                </header>

                <main className="oto-workspace" ref={mainRef}>
                    {/* Left: Video Side */}
                    <div className="oto-video-side" style={{ width: `${sidebarWidth}%` }}>
                        {showMedia && (
                            <div className="oto-video-content" ref={workspaceRef}>
                                <div 
                                    className="oto-box-video oto-stranger"
                                    style={{ 
                                        flex: `0 0 calc(${splitRatio}% - 8px)`, 
                                        height: `calc(${splitRatio}% - 8px)` 
                                    }}
                                >
                                    {roomId && (
                                        <iframe
                                            className="oto-iframe"
                                            src={`${MIROTALK_URL}/join/${roomId}?name=${anonymousName}&audio=1&video=${mode === 'video' ? 1 : 0}&chat=0&screen=0&direct=1&pure=1&hide=1`}
                                            allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; web-share"
                                            title="Stranger"
                                        />
                                    )}
                                    <div className="oto-label-badge">Stranger</div>
                                </div>

                                <div 
                                    className="oto-box-video oto-self"
                                    style={{ 
                                        flex: `1 1 calc(${100 - splitRatio}% - 8px)`, 
                                        height: `calc(${100 - splitRatio}% - 8px)` 
                                    }}
                                >
                                    <video 
                                        ref={localVideoRefSelf} 
                                        autoPlay 
                                        playsInline 
                                        muted 
                                        className="oto-video-view mirror"
                                        style={{ display: mode === 'video' || mode === null ? 'block' : 'none' }} 
                                    />
                                    <div className="oto-label-badge self">You</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Horizontal Resize Bar */}
                    <div className="oto-resize-handle horizontal" onMouseDown={handleMouseDownHorizontal}>
                        <div className="oto-resize-line hor"></div>
                    </div>

                    {/* Right: Interaction Side */}
                    <div className="oto-interaction-side">
                        <div className="oto-interaction-body">
                            {isLobby ? (
                                <div className="oto-lobby-card">
                                    <div className="oto-lobby-content">
                                        <p className="text-sm">Welcome to <strong>Happytalk.in</strong></p>
                                        <p className="text-red-500 font-bold mb-3">18+ Only</p>
                                        <p className="text-sm opacity-80">No nudity or harassment</p>
                                        <p className="text-sm opacity-80 mb-6">Real webcam required</p>
                                        
                                        <div className="oto-interests-panel mb-8">
                                            <div className="oto-interests-container">
                                                {myInterests.map((interest, idx) => (
                                                    <span key={idx} className="oto-interest-chip">
                                                        {interest.text}
                                                        <X size={12} className="ml-1 cursor-pointer" onClick={() => removeInterest(idx)} />
                                                    </span>
                                                ))}
                                                <input 
                                                    type="text" 
                                                    placeholder="Add interests..." 
                                                    className="oto-interest-ghost"
                                                    value={interestInputValue} 
                                                    onChange={(e) => setInterestInputValue(e.target.value)} 
                                                    onKeyDown={(e) => e.key === 'Enter' && addInterest()} 
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <button className="oto-action-btn primary" onClick={() => startSearch('video')}>
                                                <Video size={18} /> Agree & Video Chat
                                            </button>
                                            <div className="flex gap-4">
                                                <button className="oto-action-btn audio-green flex-1" onClick={() => startSearch('audio')}>
                                                    <Mic size={18} /> Audio
                                                </button>
                                                <button className="oto-action-btn secondary flex-1" onClick={() => startSearch('text')}>
                                                    <MessageSquare size={18} /> Text
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="oto-chat-scroller">
                                    <div className="oto-messages-list">
                                        {isSearching && (
                                            <div className="oto-chat-bubble system" style={{ fontStyle: 'italic', color: '#888' }}>
                                                Searching...
                                            </div>
                                        )}
                                        {messages.map((msg, i) => (
                                            <div key={i} className={`oto-chat-bubble ${msg.type}`}>
                                                {msg.type !== 'system' && <strong>{msg.type === 'you' ? 'You: ' : 'Stranger: '}</strong>}
                                                {msg.text}
                                            </div>
                                        ))}
                                        {strangerTyping && <div className="oto-typing-ghost">Stranger is typing...</div>}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <footer className="oto-bottom-controls">
                            <button className="oto-ctrl-btn stop" onClick={stopChat} disabled={isLobby}>
                                <div className="btn-label">Stop</div>
                                <div className="btn-sub">End</div>
                            </button>
                            <button className="oto-ctrl-btn skip" onClick={skipToNext} disabled={isLobby}>
                                <div className="btn-label">Skip</div>
                                <div className="btn-sub">Esc</div>
                            </button>
                            <div className="oto-input-wrap">
                                <input 
                                    type="text" 
                                    className="oto-main-input" 
                                    placeholder={isConnected ? "Type your message..." : (isSearching ? "Waiting..." : "Select mode to start...")} 
                                    value={inputMessage} 
                                    onChange={handleTyping} 
                                    disabled={!isConnected} 
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(e)} 
                                />
                            </div>
                            <button className="oto-ctrl-btn send" onClick={sendMessage} disabled={!inputMessage.trim() || !isConnected}>
                                <div className="btn-label">Send</div>
                                <div className="btn-sub">Enter</div>
                            </button>
                        </footer>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default OneToOne;



