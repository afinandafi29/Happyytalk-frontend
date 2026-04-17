import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OmegleSearching = ({ mode, interest = 'general' }) => {
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const modeEmoji = {
    video: '🎥',
    audio: '🎤',
    text: '💬'
  };

  const modeText = {
    video: 'Video Chat',
    audio: 'Audio Chat',
    text: 'Text Chat'
  };

  return (
    <div className="omegle-searching">
      <div className="searching-container">
        <div className="animated-bubbles">
          <div className="bubble bubble1"></div>
          <div className="bubble bubble2"></div>
          <div className="bubble bubble3"></div>
        </div>

        <h2 className="searching-title">Finding someone for you{dots}</h2>
        <p className="searching-mode">
          {modeEmoji[mode]} {modeText[mode]}
        </p>
        <p className="searching-interest">
          Interest: <span className="interest-tag">{interest}</span>
        </p>

        <button
          className="cancel-button"
          onClick={() => navigate('/one-to-one')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OmegleSearching;
