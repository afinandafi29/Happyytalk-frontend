import React, { useState, useEffect } from 'react';
import AppScreen from './AppScreen';
import GameScreen from './GameScreen';
import YouTubeContainer from './YouTubeContainer';
import WatchPartyScreen from './WatchPartyScreen';
import BottomNav from './BottomNav';
import SearchContainer from './SearchContainer';
import FeedScreen from './FeedScreen';
import SocialScreen from './SocialScreen';
import MovieScreen from './MovieScreen';
import WhiteboardScreen from './WhiteboardScreen';
import SettingsScreen from './SettingsScreen';
import WebAppScreen from './WebAppScreen';
import OneToOneCallScreen from './OneToOneCallScreen';
import UnsplashScreen from './UnsplashScreen';
import DictionaryScreen from './DictionaryScreen';

import ThemeScreen from './ThemeScreen';
import AppStoreScreen from './AppStoreScreen';

const Phone = ({ onClose, initialScreen = 'app' }) => {
  const [activeScreen, setActiveScreen] = useState(initialScreen);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveScreen(initialScreen);
  }, [initialScreen]);

  const [webAppUrl, setWebAppUrl] = useState('');
  const [webAppTitle, setWebAppTitle] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Listen for YouTube open event
  useEffect(() => {
    const handleOpenYouTube = () => {
      setActiveScreen('youtube');
    };

    window.addEventListener('openYouTubeInPhone', handleOpenYouTube);

    return () => {
      window.removeEventListener('openYouTubeInPhone', handleOpenYouTube);
    };
  }, []);

  // Listen for messages from iframe (e.g. AI app)
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'OPEN_YOUTUBE') {
        setActiveScreen('youtube');
      } else if (event.data?.type === 'PORTAL_BACK') {
        handleBackClick();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeScreen, onClose]);

  const handleAppClick = (appId) => {
    switch (appId) {
      case 'youtube-app':
        setActiveScreen('youtube');
        break;
      case 'games-folder':
        setActiveScreen('games');
        break;
      case 'watchparty-app':
        setActiveScreen('watchparty');
        break;
      case 'whiteboard-app':
        setActiveScreen('whiteboard');
        break;
      case 'feed-app':
        // URL navigation is handled in AppScreen now
        break;
      case 'social-app':
        setActiveScreen('social');
        break;
      case 'movie-app':
        setActiveScreen('movie');
        break;
      case 'theme-app':
        setActiveScreen('theme');
        break;
      case 'unsplash-app':
        setActiveScreen('unsplash');
        break;
      case 'dictionary-app':
        setActiveScreen('dictionary');
        break;
      case 'app-store':
        setActiveScreen('app-store');
        break;
      case 'instagram-app':
        setWebAppUrl('https://instagram.com');
        setWebAppTitle('Instagram');
        setActiveScreen('webapp');
        break;
      case 'facebook-app':
        setWebAppUrl('https://facebook.com');
        setWebAppTitle('Facebook');
        setActiveScreen('webapp');
        break;
      case 'twitter-app':
        setWebAppUrl('https://twitter.com');
        setWebAppTitle('Twitter');
        setActiveScreen('webapp');
        break;
      case 'linkedin-app':
        setWebAppUrl('https://linkedin.com');
        setWebAppTitle('LinkedIn');
        setActiveScreen('webapp');
        break;
      case 'ai-chat-app':
        setActiveScreen('ai');
        break;
      default:
        break;
    }
  };

  const handleHomeClick = () => {
    setActiveScreen('app');
    setSearchActive(false);
    setSearchQuery('');
  };

  const handleBackClick = () => {
    if (activeScreen === 'youtube') {
      setActiveScreen('ai');
    } else if (activeScreen === 'ai') {
      // Send message to AI iframe to close modals
      const iframe = document.querySelector('iframe[title="Happytalk AI"]');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'PHONE_BACK' }, '*');
      }
      // "close the mobile dont go to apps ok"
      onClose?.();
    } else if (activeScreen === 'app') {
      onClose?.();
    } else {
      setActiveScreen('app');
      setSearchActive(false);
      setSearchQuery('');
    }
  };

  const handleSearchClick = () => {
    if (activeScreen === 'app') {
      setSearchActive(!searchActive);
      if (!searchActive) {
        setSearchQuery('');
      }
    }
  };

  const handleExpandClick = () => {
    alert('Expand functionality not implemented.');
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-[300px] h-[600px] bg-[#0a0a0a] rounded-[45px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[8px] border-[#1a1a1a] relative group animate-in fade-in zoom-in duration-500">
      {/* Reflective Edge */}
      <div className="absolute inset-0 rounded-[35px] border-[1px] border-white/10 pointer-events-none"></div>

      {/* Status Bar - Hidden for clean UI */}
      <div className="absolute top-0 left-0 right-0 h-8 z-[60]"></div>

      <div className="phone-content-area relative h-full overflow-hidden bg-black">
        {/* Minimal padding for status bar */}
        <div className="h-6"></div>
        {activeScreen === 'app' && (
          <div className="w-full h-full transform scale-90 origin-top">
            <AppScreen 
              onAppClick={handleAppClick} 
              searchQuery={searchQuery} 
              showSearch={searchActive}
              onSearchChange={handleSearchChange}
            />
          </div>
        )}

        {activeScreen === 'games' && (
          <GameScreen searchQuery={searchQuery} />
        )}

        {activeScreen === 'youtube' && (
          <YouTubeContainer />
        )}

        {activeScreen === 'watchparty' && (
          <WatchPartyScreen searchQuery={searchQuery} />
        )}

        {activeScreen === 'feed' && (
          <FeedScreen />
        )}

        {activeScreen === 'social' && (
          <SocialScreen />
        )}

        {activeScreen === 'movie' && (
          <MovieScreen />
        )}

        {activeScreen === 'whiteboard' && (
          <WhiteboardScreen />
        )}

        {activeScreen === 'theme' && (
          <ThemeScreen />
        )}

        {activeScreen === 'unsplash' && (
          <UnsplashScreen />
        )}

        {activeScreen === 'dictionary' && (
          <DictionaryScreen />
        )}

        {activeScreen === 'app-store' && (
          <AppStoreScreen />
        )}

        {activeScreen === 'webapp' && (
          <WebAppScreen url={webAppUrl} title={webAppTitle} />
        )}

        {activeScreen === 'ai' && (
          <div className="w-full h-full overflow-hidden relative">
            <iframe 
              src="http://localhost:3001/?mode=mobile" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Happytalk AI"
              allow="microphone; clipboard-write;"
            />
          </div>
        )}

      </div>

      {activeScreen !== 'ai' && (
        <BottomNav
          onHomeClick={handleHomeClick}
          onSearchClick={handleSearchClick}
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
};

export default Phone;