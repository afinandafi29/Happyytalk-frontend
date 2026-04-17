import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Learning = () => {
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();

  const handleGetStarted = () => {
    navigate('/learning-languages');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLanguageClick = (lang) => {
    navigate(`/quiz/${lang.toLowerCase()}`);
  };

  return (
    <div className={`learning-container ${theme}-mode`}>
      {/* Header Navigation */}
      <header className="learning-header">
        <button className="back-nav-btn" onClick={handleBackToHome}>
          ← <span>Back</span>
        </button>
        <a href="#" className="learning-logo" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
          happytalk.in
        </a>
        <button className="mode-toggle-btn" onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      {/* Hero Section */}
      <section className="learning-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            START YOUR LANGUAGE JOURNEY TODAY WITH HAPPYTALK!
          </h1>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Languages Bar */}
      <div className="languages-bar">
        <div className="languages-inner">
          {['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese'].map((lang) => (
            <div key={lang} className="lang-item" onClick={() => handleLanguageClick(lang)}>
              <img
                src={`https://flagcdn.com/${lang === 'Spanish' ? 'es' : lang === 'French' ? 'fr' : lang === 'German' ? 'de' : lang === 'Italian' ? 'it' : lang === 'Portuguese' ? 'pt' : 'jp'}.svg`}
                alt={lang}
                className="lang-flag"
              />
              <span className="lang-name">{lang}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .learning-container {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          transition: background-color 0.3s ease, color 0.3s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100%;
          position: relative;
        }

        .learning-container.dark-mode { background-color: #131f24; color: #eeeeee; }
        .learning-container.light-mode { background-color: #ffffff; color: #4b4b4b; }

        .learning-header {
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 5%;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          background: inherit;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .light-mode .learning-header { border-bottom-color: #e5e5e5; }

        .back-nav-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: bold;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .back-nav-btn:hover { background: #2563eb; transform: translateY(-2px); }

        .learning-logo {
          color: #3b82f6;
          font-size: 28px;
          font-weight: 800;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .mode-toggle-btn {
          cursor: pointer;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.1);
          background: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: inherit;
        }

        .light-mode .mode-toggle-btn { border-color: #e5e5e5; }

        .learning-hero {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 5% 150px;
          text-align: center;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 50px;
          line-height: 1.1;
          font-weight: 800;
          max-width: 900px;
        }

        .cta-button {
          display: block;
          width: 100%;
          max-width: 320px;
          padding: 20px 0;
          border-radius: 18px;
          font-weight: 800;
          font-size: 18px;
          cursor: pointer;
          border: none;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0 auto;
          transition: all 0.1s;
          background-color: #3b82f6;
          color: white;
          border-bottom: 6px solid #2563eb;
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }

        .cta-button:active {
          transform: translateY(3px);
          border-bottom-width: 2px;
        }

        .languages-bar {
          border-top: 2px solid rgba(255, 255, 255, 0.1);
          padding: 30px 0;
          background: inherit;
          position: absolute;
          bottom: 80px;
          left: 0;
          right: 0;
          z-index: 50;
        }

        .light-mode .languages-bar { border-top-color: #e5e5e5; }

        .languages-inner {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0 5%;
        }

        .lang-item {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          opacity: 0.8;
          transition: 0.2s;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
        }

        .lang-item:hover { opacity: 1; color: #3b82f6; transform: translateY(-2px); }

        .lang-flag {
          width: 24px;
          height: 16px;
          object-fit: cover;
          border-radius: 3px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .learning-header { padding: 0 15px; height: 60px; }
          .learning-logo { font-size: 20px; }
          .back-nav-btn { display: none; }
          .mode-toggle-btn { width: 40px; height: 40px; font-size: 16px; }

          .learning-hero { padding-bottom: 180px; }
          .hero-title { font-size: 2.2rem; margin-bottom: 30px; }
          .cta-button { padding: 16px 0; font-size: 16px; }
          
          .languages-bar { bottom: 65px; padding: 20px 0; }
          .languages-inner { gap: 15px; grid-template-columns: repeat(3, 1fr); display: grid; max-width: 320px; margin: 0 auto; }
          .lang-item { font-size: 10px; flex-direction: row; justify-content: flex-start; }
        }

        @media (max-width: 480px) {
          .learning-logo { font-size: 18px; }
          .hero-title { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
};

export default Learning;
