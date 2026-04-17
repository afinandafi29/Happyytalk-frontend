import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import AIChatBox from '../components/AIChatBox';

const LearningLanguages = () => {
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();
  const [mode, setMode] = useState('Advanced');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Sync mode with localStorage if needed, or just default to Advanced
  useEffect(() => {
    // Force dark theme as primary
    if (theme !== 'dark') {
      changeTheme('dark');
    }
    const savedMode = localStorage.getItem('learningLangMode');
    if (savedMode) setMode(savedMode);
  }, []);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem('learningLangMode', newMode);
  };

  const langs = useMemo(
    () => [
      { name: 'English', img: 'gb' },
      { name: 'Spanish', img: 'es' },
      { name: 'French', img: 'fr' },
      { name: 'Japanese', img: 'jp' },
      { name: 'German', img: 'de' },
      { name: 'Korean', img: 'kr' },
      { name: 'Italian', img: 'it' },
      { name: 'Chinese', img: 'cn' },
      { name: 'Hindi', img: 'in' },
      { name: 'Russian', img: 'ru' },
      { name: 'Arabic', img: 'sa' },
      { name: 'Portuguese', img: 'pt' },
      { name: 'Turkish', img: 'tr' },
      { name: 'Dutch', img: 'nl' },
      { name: 'Greek', img: 'gr' },
      { name: 'Vietnamese', img: 'vn' },
      { name: 'Polish', img: 'pl' },
      { name: 'Swedish', img: 'se' },
      { name: 'Latin', img: 'va' },
      { name: 'Indonesian', img: 'id' },
    ],
    [],
  );

  const handleLanguageClick = (name) => {
    const routeMap = {
      'English': '/english-quiz',
      'Spanish': '/spanish-quiz',
      'French': '/french-quiz',
      'Japanese': '/japanese-quiz',
      'German': '/german-quiz',
      'Korean': '/korean-quiz',
      'Italian': '/italian-quiz',
      'Chinese': '/chinese-quiz',
      'Hindi': '/hindi-quiz',
      'Russian': '/russian-quiz',
      'Portuguese': '/portuguese-quiz',
      'Turkish': '/turkish-quiz',
      'Dutch': '/dutch-quiz',
      'Greek': '/greek-quiz',
      'Vietnamese': '/vietnamese-quiz',
      'Polish': '/polish-quiz',
      'Swedish': '/swedish-quiz',
      'Latin': '/latin-quiz',
      'Indonesian': '/indonesian-quiz'
    };

    if (mode === 'Basic') {
      navigate(`/basic-learning?lang=${name}`);
      return;
    }

    if (routeMap[name]) {
      navigate(routeMap[name]);
      return;
    }

    alert(`${name} course coming soon!`);
  };

  const isDarkMode = theme === 'dark';

  return (
    <div className={`learning-languages-page ${!isDarkMode ? 'theme-light' : ''}`}>
      <style>{`
        .learning-languages-page {
          --bg: #000000;
          --text: #ffffff;
          --muted: #94a3b8;
          --card-bg: #0d0d0d;
          --card-border: #3b82f6;
          --card-border-hover: #60a5fa;
          --card-hover-bg: #1a1a1a;
          --flag-bg: #1e293b;
          --flag-border: #334155;
          --shadow: rgba(0, 0, 0, 0.4);
          --header-bg: #000000;

          font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: var(--bg);
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 0;
          color: var(--text);
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        .learning-languages-page.theme-light {
          --bg: #f0f9ff;
          --text: #1e293b;
          --muted: #475569;
          --card-bg: #ffffff;
          --card-border: #3b82f6;
          --card-border-hover: #2563eb;
          --card-hover-bg: #eff6ff;
          --flag-bg: #ffffff;
          --flag-border: #e2e8f0;
          --shadow: rgba(37, 99, 235, 0.1);
          --header-bg: #ffffff;
        }

        .header-section {
          background: var(--header-bg);
          padding: 20px 5%;
          box-shadow: 0 4px 12px var(--shadow);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 2px solid var(--card-border);
        }

        .learning-languages-logo {
          color: #3b82f6;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 15px;
          text-align: center;
        }

        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .glass-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .theme-toggle {
          background: var(--card-bg);
          color: var(--text);
          border: 2px solid var(--card-border);
          padding: 8px 16px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: bold;
          font-size: 13px;
          transition: all 0.2s;
        }

        .theme-toggle:hover { background: var(--card-hover-bg); }

        .mode-toggle {
          display: inline-flex;
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 30px;
          padding: 3px;
          position: relative;
        }

        .mode-btn {
          background: transparent;
          border: none;
          padding: 6px 16px;
          border-radius: 24px;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
          color: var(--text);
          z-index: 2;
          transition: 0.3s;
        }

        .mode-btn.active { color: #fff; background: var(--card-border); }

        .back-button {
          background: var(--card-border);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: bold;
          font-size: 13px;
        }

        .learning-languages-title {
          font-size: 24px;
          font-weight: 800;
          margin: 40px 0 30px 0;
          color: var(--text);
          text-align: center;
        }

        .learning-languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 60px 20px;
          width: 100%;
          box-sizing: border-box;
        }

        .learning-languages-card {
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 24px;
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          box-shadow: 0 8px 20px var(--shadow);
        }

        .learning-languages-card:hover {
          transform: translateY(-8px);
          background: var(--card-hover-bg);
          border-color: var(--card-border-hover);
        }

        .learning-languages-flag {
          width: 70px;
          height: 50px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border: 1px solid var(--flag-border);
        }

        .learning-languages-name {
          font-weight: 800;
          font-size: 16px;
          color: var(--text);
        }

        .ai-chat-trigger {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border: 3px solid white;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
          cursor: pointer;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .ai-chat-trigger:hover { transform: scale(1.1) rotate(5deg); }
        .ai-icon { font-size: 32px; }

        @media (max-width: 768px) {
          .learning-languages-page {
            --bg: #000000 !important;
            --text: #ffffff !important;
            --card-bg: #080808 !important;
            --card-border: #3b82f6 !important;
            --header-bg: #000000 !important;
            --shadow: rgba(59, 130, 246, 0.1) !important;
          }
          .header-section {
             padding: 16px 16px 20px 16px;
             border-bottom: 2px solid #1a1a1a;
          }
          .learning-languages-logo { 
            font-size: 18px; 
            margin-bottom: 20px; 
            letter-spacing: -0.5px;
            color: #3b82f6; 
          }
          .top-nav { 
            justify-content: center; 
            position: relative;
            padding-bottom: 10px;
          }
          .back-button {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            padding: 8px 16px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .mode-toggle {
            scale: 0.9;
            background: #111;
          }
          .learning-languages-grid { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 12px; 
            padding: 0 16px 120px 16px; 
          }
          .learning-languages-title { 
            font-size: 18px; 
            margin: 32px 0 24px 0; 
            font-weight: 900;
            opacity: 1;
            letter-spacing: -0.5px;
          }
          .learning-languages-card { 
            padding: 24px 12px; 
            border-radius: 24px; 
            border-width: 2px;
            background: #0d0d0d;
          }
          .learning-languages-flag { 
            width: 56px; 
            height: 38px; 
            border-radius: 8px;
          }
          .learning-languages-name { 
            font-size: 14px; 
            margin-top: 8px;
            font-weight: 800;
          }
          .ai-chat-trigger { 
            width: 56px; 
            height: 56px; 
            bottom: 24px; 
            right: 24px; 
            border-width: 2px;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
          }
        }
      `}</style>

      <header className="header-section">
        <div className="learning-languages-logo">Happytalk.in Learn</div>
        <div className="top-nav">
          <button className="back-button" onClick={() => navigate('/apps')}>
            ← Apps
          </button>
          <div className="mode-toggle">
            <button
                className={`mode-btn ${mode === 'Basic' ? 'active' : ''}`}
                onClick={() => handleModeChange('Basic')}
            >
              Basic
            </button>
            <button
                className={`mode-btn ${mode === 'Advanced' ? 'active' : ''}`}
                onClick={() => handleModeChange('Advanced')}
            >
              Advanced
            </button>
          </div>
          <div className="glass-controls hidden md:flex">
            <button className="theme-toggle" onClick={() => changeTheme(isDarkMode ? 'light' : 'dark')}>
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <h1 className="learning-languages-title">Explore New Worlds...</h1>

      <div className="learning-languages-grid">
        {langs.map((l) => (
          <button
            key={l.name}
            className="learning-languages-card"
            onClick={() => handleLanguageClick(l.name)}
          >
            <img
              className="learning-languages-flag"
              src={`https://flagcdn.com/h80/${l.img}.png`}
              alt={l.name}
            />
            <div className="learning-languages-name">{l.name}</div>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="ai-chat-trigger"
        onClick={() => setIsAIChatOpen(true)}
        aria-label="Open AI Chat"
      >
        <span className="ai-icon">🤖</span>
      </button>
      <AIChatBox isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} language="en" />
    </div>
  );
};

export default LearningLanguages;
