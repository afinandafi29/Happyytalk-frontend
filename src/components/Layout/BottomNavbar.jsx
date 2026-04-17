import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutContext } from './Layout';

const BottomNavbar = ({ activeButton, onCreateClick, isHomePage, isShortsView, isNewsPage }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser } = useAuth();
  const { isPhoneOpen, unreadCount, setUnreadCount, setActiveHomeView, activeHomeView } = useContext(LayoutContext);

  const handleNav = (action) => {
    if (action === 'home') {
      setActiveHomeView('rooms');
      navigate('/');
    }
    else if (action === 'feed') {
      navigate('/feed');
    }
    else if (action === 'ai') {
      navigate('/ai-chat');
    }
    else if (action === 'profile') {
      navigate('/profile');
    }
    else if (action === 'back') {
      navigate(-1);
    }
    else if (action === 'create') {
      onCreateClick();
    }
    else if (action === 'newsSearch') {
      navigate('/news/search');
    }
    else if (action === 'share') {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href
        }).catch(err => console.error('Error sharing:', err));
      } else {
        alert('Share not supported on this device/browser');
      }
    }
  };

  return (
    <div className="bottom-navbar-wrapper">
      <div className="bottom-navbar">
        {(isNewsPage || pathname.startsWith('/apps') || pathname.startsWith('/learning') || pathname.startsWith('/premium')) ? (
          <>
            <button onClick={() => handleNav('home')}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </button>

            <button onClick={() => handleNav('feed')}>
              <i className="fas fa-th-large"></i>
              <span>Feed</span>
            </button>

            <button className="plus-nav-btn" onClick={() => handleNav('create')}>
              <i className="fas fa-plus"></i>
              <span>Create</span>
            </button>

            <button onClick={() => handleNav('newsSearch')}>
              <i className="fas fa-search"></i>
              <span>Search</span>
            </button>

            <button onClick={() => handleNav('back')}>
              <i className="fas fa-arrow-left"></i>
              <span>Back</span>
            </button>
          </>
        ) : (
          <>
            <button
              className={(activeButton === '/' && activeHomeView === 'rooms') ? 'active' : ''}
              onClick={() => handleNav('home')}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </button>

            <button
              className={activeButton === '/feed' ? 'active' : ''}
              onClick={() => handleNav('feed')}
            >
              <i className="fas fa-th-large"></i>
              <span>Feed</span>
            </button>

            <button
              className="plus-nav-btn"
              onClick={() => handleNav('create')}
            >
              <i className="fas fa-plus"></i>
              <span>Create</span>
            </button>

            <button
              className={isPhoneOpen ? 'active' : ''}
              onClick={() => handleNav('ai')}
            >
              <i className="fas fa-robot"></i>
              <span>AI</span>
            </button>

            {(isHomePage && !isShortsView) ? (
              <button
                className={activeButton.startsWith('/profile') ? 'active' : ''}
                onClick={() => handleNav('profile')}
              >
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </button>
            ) : (
              <button
                onClick={() => handleNav('back')}
              >
                <i className="fas fa-arrow-left"></i>
                <span>Back</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BottomNavbar;