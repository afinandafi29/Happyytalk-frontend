import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navigation = ({
  onExpandClick,
  onCreateRoomClick,
  activeCategory,
  setActiveCategory,
  isExpanded,
  onThemeClick,
  onChatClick,
  languages,
  onCategoryClick
}) => {
  const navigate = useNavigate();
  const [isAppsDropdownOpen, setIsAppsDropdownOpen] = useState(false);

  const handleButtonClick = (category) => {
    setActiveCategory(category.toLowerCase());
  };

  return (
    <>
      <div className={`unified-navigation ${isExpanded ? 'expanded' : ''}`}>
        <div className="nav-main-row">
          <button
            className={`expand-toggle-btn ${isExpanded ? 'active' : ''}`}
            onClick={onExpandClick}
          >
            <i className="fas fa-chevron-down"></i>
          </button>

          <div className="nav-items-scroll">
            <button
              id="all-button"
              className={activeCategory === 'all' ? 'active' : ''}
              onClick={() => {
                handleButtonClick('all');
                navigate('/');
              }}
            >
              All
            </button>
            <button
              className={`nav-feed-btn ${activeCategory === 'feed' ? 'active' : ''}`}
              onClick={() => {
                handleButtonClick('feed');
                navigate('/feed');
              }}
            >
              FEED
            </button>

            <button
              className={activeCategory === 'news' ? 'active' : ''}
              onClick={() => {
                handleButtonClick('news');
                navigate('/news');
              }}
            >
              NEWS
            </button>

            <button
              className={activeCategory === 'youtube' ? 'active' : ''}
              onClick={() => {
                handleButtonClick('youtube');
                navigate('/youtube');
              }}
            >
              YOUTUBE
            </button>





            <button
              className={`nav-ai-btn ${activeCategory === 'ai-chat' ? 'active' : ''}`}
              style={{ fontSize: '0.85rem' }}
              onClick={() => {
                handleButtonClick('ai-chat');
                navigate('/ai-chat');
              }}
            >
              AI
            </button>

            <button
              className={activeCategory === 'apps' ? 'active' : ''}
              onClick={() => {
                handleButtonClick('apps');
                navigate('/apps');
              }}
            >
              APPS
            </button>

            <button
              className={activeCategory === 'events' ? 'active' : ''}
              onClick={() => {
                handleButtonClick('events');
                navigate('/events');
              }}
            >
              EVENT
            </button>

            <button
              className={activeCategory === 'learning' ? 'active' : ''}
              onClick={() => {
                handleButtonClick('learning');
                navigate('/learning');
              }}
            >
              LEARNING
            </button>

            <button
              className="one-to-one-btn"
              onClick={() => navigate('/1to1', { state: { reset: Date.now() } })}
            >
              1:1 Call
            </button>

            <button
              className={`premium-red-btn ${activeCategory === 'premium' ? 'active' : ''}`}
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
                color: 'white',
                fontWeight: '800',
                border: 'none',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}
              onClick={() => {
                handleButtonClick('premium');
                navigate('/premium');
              }}
            >
              PREMIUM
            </button>

            <button className="create-room-btn" onClick={onCreateRoomClick}>
              Create Room
            </button>
          </div>
        </div>

      </div>

      <div className={`languages-container ${isExpanded ? 'visible' : ''}`}>
        <div className="languages-section">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label" style={{ margin: 0, flex: 1 }}>Explore by Language</p>
            <button 
              onClick={onExpandClick}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="languages-grid-layout">
            {languages.map(lang => (
              <button
                key={lang}
                className={`lang-pill glass-pill ${activeCategory === lang.toLowerCase() ? 'active' : ''}`}
                onClick={() => {
                  onCategoryClick(lang);
                  if (window.location.pathname !== '/') navigate('/');
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Navigation;
