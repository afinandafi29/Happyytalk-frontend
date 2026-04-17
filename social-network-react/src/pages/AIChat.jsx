
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Send, Trash2, Moon, Sun, ArrowLeft, 
    Lightbulb, Compass, Code, PenTool 
} from 'lucide-react';
import { MegaBotAI } from '../utils/ai/megaBotEngine';
import './AIChat.css';

const AIChat = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [hideHeader, setHideHeader] = useState(false);
    
    const chatContainerRef = useRef(null);
    const typingIntervalRef = useRef(null);
    const megaBot = useMemo(() => new MegaBotAI(), []);

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("themeColor");
        if (savedTheme === "light_mode") {
            setIsDarkMode(false);
        }
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isGenerating]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        };
    }, []);

    const handleToggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("themeColor", newMode ? "dark_mode" : "light_mode");
    };

    const typeResponse = (fullResponse) => {
        const messageId = Date.now();
        setMessages(prev => [...prev, { id: messageId, role: 'assistant', text: '' }]);
        
        let currentText = '';
        const words = fullResponse.split(' ');
        let wordIndex = 0;

        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

        typingIntervalRef.current = setInterval(() => {
            if (wordIndex < words.length) {
                currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
                setMessages(prev => prev.map(m => m.id === messageId ? { ...m, text: currentText } : m));
                wordIndex++;
            } else {
                clearInterval(typingIntervalRef.current);
                typingIntervalRef.current = null;
                setIsGenerating(false);
            }
        }, 30); // Fast typing speed
    };

    const processMessage = (userMsg) => {
        if (!userMsg || isGenerating) return;

        setHideHeader(true);
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userMsg }]);
        setIsGenerating(true);

        // Simulate thinking delay
        setTimeout(() => {
            const response = megaBot.findBestResponse(userMsg);
            typeResponse(response);
        }, 980);
    };

    const handleSend = (e) => {
        if (e) e.preventDefault();
        const userMsg = input.trim();
        if (userMsg) {
            setInput('');
            processMessage(userMsg);
        }
    };

    const handleClearChat = () => {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
        }
        setMessages([]);
        setHideHeader(false);
        setIsGenerating(false);
    };

    const handleSuggestionClick = (prompt) => {
        setInput('');
        processMessage(prompt);
    };

    const suggestions = [
        { text: "Help me plan a game night with my 5 best friends for under $100.", icon: <PenTool size={20} /> },
        { text: "What are the best tips to improve my public speaking skills?", icon: <Lightbulb size={20} /> },
        { text: "Can you help me find information on web development?", icon: <Compass size={20} /> },
        { text: "Write JavaScript code to sum all elements in an array.", icon: <Code size={20} /> }
    ];

    return (
        <div className={`ai-chat-master-container ${isDarkMode ? '' : 'light_mode'} ${hideHeader ? 'hide-header' : ''}`}>
            {/* Back Button */}
            <button onClick={() => navigate('/')} className="back-home-btn icon-btn" title="Back to Home">
                <ArrowLeft size={24} />
            </button>

            {/* Header / Intro */}
            <header className="header">
                <h1 className="title">Hello, there</h1>
                <p className="subtitle">How can I help you today?</p>
                <ul className="suggestion-list">
                    {suggestions.map((s, i) => (
                        <li key={i} className="suggestion" onClick={() => handleSuggestionClick(s.text)}>
                            <h4 className="text">{s.text}</h4>
                            <span className="icon">{s.icon}</span>
                        </li>
                    ))}
                </ul>
            </header>

            {/* Chat Messages */}
            <div className="chat-list" ref={chatContainerRef}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.role === 'assistant' ? 'incoming' : 'outgoing'}`}>
                        <div className="message-content">
                            <img 
                                className="avatar" 
                                src={msg.role === 'assistant' 
                                    ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234285f4'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='40' fill='white' font-weight='bold'%3EAI%3C/text%3E%3C/svg%3E`
                                    : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2300bfa5'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='40' fill='white' font-weight='bold'%3EU%3C/text%3E%3C/svg%3E`
                                } 
                                alt="Avatar"
                            />
                            <p className="text">{msg.text}</p>
                        </div>
                        {msg.role === 'assistant' && msg.text && (
                            <span 
                                onClick={() => navigator.clipboard.writeText(msg.text)} 
                                className="action-icon" 
                                title="Copy message"
                            >
                                <Code size={16} />
                            </span>
                        )}
                    </div>
                ))}
                
                {isGenerating && !messages.find(m => m.role === 'assistant' && m.id === messages[messages.length-1]?.id) && (
                    <div className="message incoming">
                        <div className="message-content">
                            <img 
                                className="avatar rotate" 
                                src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234285f4'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='40' fill='white' font-weight='bold'%3EAI%3C/text%3E%3C/svg%3E`} 
                                alt="AI avatar" 
                            />
                            <div className="loading-indicator">
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="typing-area">
                <form className="typing-form" onSubmit={handleSend}>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Enter a prompt here" 
                            className="typing-input" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            required 
                        />
                        <button type="submit" className="send-btn" disabled={!input.trim() || isGenerating}>
                            <Send size={20} />
                        </button>
                    </div>
                    <div className="action-buttons">
                        <span onClick={handleToggleTheme} className="icon-btn" title="Toggle Theme">
                            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                        </span>
                        <span onClick={handleClearChat} className="icon-btn" title="Delete Chat">
                            <Trash2 size={24} />
                        </span>
                    </div>
                </form>
                <p className="disclaimer-text">
                   Happytalk AI may display inaccurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>
    );
};

export default AIChat;
