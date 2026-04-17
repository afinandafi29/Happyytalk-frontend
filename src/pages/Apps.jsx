import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wifi, Signal, Battery, Clock as ClockIcon,
  LayoutGrid, Trash2, Folder, ChevronLeft, Search
} from 'lucide-react';

const Apps = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { id: 'movies', icon: '🎬', name: 'Movies', path: '/movies', color: 'linear-gradient(135deg, #FF3B30, #FF2D55)' },
    { id: 'music', icon: '🎵', name: 'Music', path: '/music', color: 'linear-gradient(135deg, #34C759, #30D158)' },
    { id: 'live', icon: '📡', name: 'Live', path: '/live', color: 'linear-gradient(135deg, #FF453A, #FF3B30)' },
    { id: 'calculator', icon: '🔢', name: 'Calculator', path: '/calculator', color: 'linear-gradient(135deg, #8E8E93, #636366)' },
    { id: 'calendar', icon: '📅', name: 'Calendar', path: '/calendar-app', color: 'linear-gradient(135deg, #FF3B30, #FF453A)' },
    { id: 'clock', icon: '⏰', name: 'Clock', path: '/clock-app', color: 'linear-gradient(135deg, #FF9500, #FFAC33)' },
    { id: 'truth-or-dare', icon: '🎲', name: 'Truth/Dare', path: '/truth-or-dare', color: 'linear-gradient(135deg, #AF52DE, #5856D6)' },
    { id: 'chat', icon: '🤖', name: 'AI Chat', path: '/ai-chat', color: 'linear-gradient(135deg, #5856D6, #AF52DE)' },
    { id: 'youtube', icon: '📺', name: 'YouTube', path: '/youtube', color: 'linear-gradient(135deg, #FF453A, #FF3B30)' },
    { id: 'translator', icon: '🌐', name: 'Translator', path: '/translator', color: 'linear-gradient(135deg, #34C759, #32D74B)' },
    { id: 'countries', icon: '🗺️', name: 'Countries', path: '/countries', color: 'linear-gradient(135deg, #007AFF, #0A84FF)' },
    { id: 'maps', icon: '📍', name: 'Maps', path: '/maps', color: 'linear-gradient(135deg, #5856D6, #AF52DE)' },
    { id: 'games', icon: '🎮', name: 'Games', path: '/games', color: 'linear-gradient(135deg, #FF9500, #FFAC33)' },
    { id: 'watch-party', icon: '🍿', name: 'Watch Party', path: '/watch-party', color: 'linear-gradient(135deg, #FF2D55, #FF375F)' },
    { id: 'whiteboard', icon: '🖌️', name: 'Whiteboard', path: '/whiteboard', color: 'linear-gradient(135deg, #007AFF, #0A84FF)' },
    { id: 'feed', icon: '📜', name: 'Feed', path: '/feed', color: 'linear-gradient(135deg, #34C759, #30D158)' },
    { id: 'news', icon: '📰', name: 'News', path: '/news', color: 'linear-gradient(135deg, #FF2D55, #FF375F)' },
    { id: 'learning', icon: '🎓', name: 'Learning', path: '/learning', color: 'linear-gradient(135deg, #007AFF, #0A84FF)' },
    { id: 'quizzes', icon: '🧠', name: 'Quizzes', path: '/quizzes', color: 'linear-gradient(135deg, #FF9500, #FFAC33)' },
    { id: 'notes', icon: '📝', name: 'Notes', path: '/notes-app', color: 'linear-gradient(135deg, #FFD60A, #FFE040)' },
    { id: 'dictionary', icon: '📖', name: 'Dictionary', path: '/dictionary', color: 'linear-gradient(135deg, #5856D6, #AF52DE)' },
    { id: 'unsplash', icon: '📷', name: 'Unsplash', path: '/unsplash', color: 'linear-gradient(135deg, #8E8E93, #636366)' },
    { id: '1to1', icon: '📞', name: '1:1 Call', path: '/1to1', color: 'linear-gradient(135deg, #34C759, #30D158)' },
  ];

  const handleAppClick = (app) => {
    if (app.path && app.path !== '#') {
      navigate(app.path);
    }
  };

  return (
    <div className="one-ui-container">
      <div className="one-ui-wallpaper"></div>

      <header className="one-ui-status-bar">
        <div className="status-left">
          <motion.button
            className="desktop-back-btn"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={18} />
            <span>Home</span>
          </motion.button>
          <span className="time-display hide-on-desktop">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        </div>

        <div className="status-center">
          <span className="desktop-title">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        </div>

        <div className="status-right">
          <Signal size={14} className="mobile-only-icon" />
          <Wifi size={14} className="mobile-only-icon" />
          <Battery size={20} className="battery-rotate mobile-only-icon" />
        </div>
      </header>

      <div className="one-ui-search-bar">
        <div className="search-pill">
          <Search size={18} className="text-white/40" />
          <span>Search</span>
        </div>
      </div>

      <main className="one-ui-main">
        <section className="app-drawer">
          <div className="app-grid">
            {apps.map((app) => (
              <motion.div
                key={app.id}
                className="app-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAppClick(app)}
              >
                <div className="app-icon-container" style={{ background: app.color }}>
                  <span className="app-emoji">{app.icon}</span>
                </div>
                <span className="app-label">{app.name}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <div className="mac-dock-container">
        <div className="mac-dock">
          {[
            { id: 'finder', icon: '🏠', path: '/' },
            { id: 'movies', icon: '🎬', path: '/movies' },
            { id: 'music', icon: '🎵', path: '/music' },
            { id: 'quizzes', icon: '🧠', path: '/quizzes' },
            { id: 'ai', icon: '🤖', path: '/ai-chat' },
            { id: '1to1', icon: '📞', name: '1:1 Call', path: '/1to1' },
            { id: 'trash', icon: '🗑️', path: '#' },
          ].map((d) => (
            <motion.div
              key={d.id}
              className="mac-dock-item"
              whileHover={{ y: -15, scale: 1.5 }}
              onClick={() => navigate(d.path)}
            >
              <span className="mac-emoji">{d.icon}</span>
              <div className="dock-indicator"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .one-ui-container {
          position: fixed;
          inset: 0;
          background: #000;
          color: white;
          font-family: 'SF Pro Display', 'Inter', -apple-system, sans-serif;
          overflow: hidden;
        }

        .one-ui-wallpaper {
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 0;
        }

        .one-ui-status-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 38px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          z-index: 3000;
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(20px);
        }

        .time-display {
           font-size: 14px;
           font-weight: 700;
           letter-spacing: -0.5px;
        }

        .desktop-back-btn { display: none; }
        .desktop-title { display: none; }
        .hide-on-desktop { display: inline; }

        .battery-rotate { transform: rotate(90deg); }

        .desktop-menu-items { display: none; gap: 20px; font-size: 13px; font-weight: 500; }

        .one-ui-search-bar {
           position: absolute;
           top: 60px;
           left: 0;
           right: 0;
           padding: 0 24px;
           z-index: 100;
        }

        .search-pill {
           background: rgba(255,255,255,0.15);
           backdrop-filter: blur(30px);
           border-radius: 12px;
           height: 48px;
           display: flex;
           align-items: center;
           padding: 0 16px;
           gap: 12px;
           font-size: 15px;
           color: rgba(255,255,255,0.7);
           border: 1px solid rgba(255,255,255,0.15);
           max-width: 600px;
           margin: 0 auto;
        }

        .one-ui-main {
          position: relative;
          z-index: 10;
          height: 100vh;
          padding: 120px 20px 220px;
        }

        .app-drawer {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .app-drawer::-webkit-scrollbar { display: none; }

        .app-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px 16px;
          padding-bottom: 100px;
        }

        .app-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .app-icon-container {
          width: 68px;
          height: 68px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          position: relative;
          overflow: hidden;
        }

        .app-icon-container::after {
           content: '';
           position: absolute;
           inset: 0;
           background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
        }

        .app-label {
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .mac-dock-container {
          display: none;
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          justify-content: center;
          z-index: 2000;
          padding: 0 20px;
        }

        .mac-dock {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(50px) saturate(210%);
          border-radius: 20px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0.5px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .mac-dock-item {
          width: 55px;
          height: 55px;
          background: rgba(255,255,255,0.15);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: background 0.2s;
        }
        .mac-dock-item:hover { background: rgba(255,255,255,0.25); }

        .mac-emoji { font-size: 32px; }

        .dock-indicator {
           position: absolute;
           bottom: -5px;
           width: 4px;
           height: 4px;
           background: #fff;
           border-radius: 50%;
           display: none;
        }

        @media (min-width: 1024px) {
           .app-grid { grid-template-columns: repeat(7, 1fr); gap: 60px 40px; }
           .app-icon-container { width: 100px; height: 100px; font-size: 44px; border-radius: 24px; }
           .one-ui-main { padding: 150px 150px 200px; }
           .search-pill { max-width: 600px; margin: 0 auto; border-radius: 14px; }
           
           .mac-dock-container { display: flex; }
           .desktop-menu-items { display: flex; }
           .mobile-only-icon { display: none; }
           .hide-on-desktop { display: none; }
           .desktop-back-btn { 
              display: flex; align-items: center; gap: 6px; 
              background: rgba(255,255,255,0.1); 
              padding: 4px 12px; border-radius: 8px; font-size: 13px; 
              font-weight: 600; color: #fff; cursor: pointer; border: none;
              margin-right: 20px;
           }
           .desktop-title { display: block; font-size: 15px; font-weight: 800; color: #fff; opacity: 1; letter-spacing: 0.5px; }

           .mac-dock { 
             border-radius: 12px; 
             padding: 6px 10px; 
             gap: 8px; 
             max-width: fit-content;
             margin: 0 auto;
           }
           .mac-dock-item { width: 44px; height: 44px; border-radius: 10px; }
           .mac-emoji { font-size: 26px; }
        }

        @media (max-width: 768px) {
          .app-grid { grid-template-columns: repeat(4, 1fr); padding-bottom: 120px; }
          .app-icon-container { width: 66px; height: 66px; font-size: 30px; }
          .one-ui-status-bar { background: transparent; backdrop-filter: none; }
        }
      `}</style>
    </div>
  );
};

export default Apps;

