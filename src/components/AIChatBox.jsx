
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { callAI } from '../utils/ai/ai-service';
import './AIChatBox.css';

const AIChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'model', text: "Hello! I'm your Happytalk AI assistant. How can I help you today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micStatus, setMicStatus] = useState('off');
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const speak = useCallback((text) => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    
    const cleanText = text.replace(/[*#`_~]/g, '').trim();
    if (!cleanText) return;

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Voice selection
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('google us english'));
    if (maleVoice) utterance.voice = maleVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg = { id: Date.now(), role: 'user', text: input.trim(), timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const response = await callAI(input.trim());
      const aiMsg = { id: Date.now() + 1, role: 'model', text: response, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
      speak(response);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg = { id: Date.now() + 2, role: 'model', text: "Sorry, I encountered an error. Please check your API configuration.", timestamp: Date.now() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const toggleMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (micStatus === 'listening') {
      recognitionRef.current?.stop();
      setMicStatus('off');
    } else {
      const recognition = new SR();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setMicStatus('listening');
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Automatically send after a short delay
        setTimeout(() => handleSendMessage(), 500);
      };
      recognition.onend = () => setMicStatus('off');
      recognition.onerror = () => setMicStatus('off');

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  return (
    <div className="ai-sidebar-container">
      <div className="ai-sidebar-header">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <i className="fas fa-robot text-xl"></i>
            </div>
            <div>
                <h3 className="text-white font-black uppercase tracking-tighter">Happytalk AI</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Always Active</span>
                </div>
            </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors" onClick={onClose}>
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="ai-sidebar-messages custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`ai-message-wrapper ${msg.role}`}>
            <div className="ai-message-content">
              {msg.text}
            </div>
            <div className="ai-message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="ai-message-wrapper model">
            <div className="ai-message-content thinking">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form className="ai-sidebar-input-area" onSubmit={handleSendMessage}>
        <div className="input-container relative">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Ask anything..."
            disabled={isThinking}
          />
          <div className="input-actions absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button 
              type="button" 
              className={`action-btn ${micStatus === 'listening' ? 'active' : ''}`}
              onClick={toggleMic}
            >
              <i className={`fas ${micStatus === 'listening' ? 'fa-stop-circle text-red-500' : 'fa-microphone'}`}></i>
            </button>
            <button type="submit" className="action-btn send" disabled={!input.trim() || isThinking}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AIChatBox;
