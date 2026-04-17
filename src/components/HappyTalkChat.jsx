import React, { useState, useEffect, useRef } from 'react';
import '../styles/main.css';

const HappyTalkChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "👋 Welcome to HappyTalk! How can we help you today?", sender: 'agent', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    if (!isOpen) return null;

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'guest',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputValue('');

        // Simulate Agent Reply
        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                text: "Thanks for reaching out! An agent will be with you shortly. Since you are a Guest, all conversations are private.",
                sender: 'agent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    return (
        <div className="happytalk-widget-container animate-in slide-in-from-right duration-500">
            {/* Widget Header */}
            <div className="happytalk-widget-header">
                <div className="happytalk-header-info">
                    <div className="happytalk-status-dot active"></div>
                    <div>
                        <h3 className="happytalk-widget-title">HappyTalk</h3>
                        <span className="happytalk-widget-subtitle">Offline Support</span>
                    </div>
                </div>
                <button className="happytalk-close-btn" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            {/* Messages Area */}
            <div className="happytalk-messages-area custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`happytalk-message-row ${msg.sender === 'agent' ? 'agent' : 'guest'}`}>
                        {msg.sender === 'agent' && (
                            <div className="happytalk-avatar">HT</div>
                        )}
                        <div className="happytalk-message-bubble">
                            <p>{msg.text}</p>
                            <span className="happytalk-time">{msg.time}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form className="happytalk-input-area" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="happytalk-send-btn">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>

            <div className="happytalk-powered-by">
                Powered by <span>HappyTalk</span>
            </div>
        </div>
    );
};

export default HappyTalkChat;
