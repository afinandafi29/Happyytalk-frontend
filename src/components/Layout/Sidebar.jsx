import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useState, useEffect } from 'react';
import PWAInstallButton from '../PWAInstallButton';

const Sidebar = ({
    isOpen,
    onClose,
    onToggleAnimation,
    animationStopped,
    currentPath,
    user
}) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { theme, changeTheme, customColor, changeCustomColor, animatedTheme, changeAnimatedTheme } = useTheme();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showThemeDropdown, setShowThemeDropdown] = useState(false);
    const [showGamesDropdown, setShowGamesDropdown] = useState(false);

    const BACKGROUND_THEMES = [
        { id: 'none', name: 'None', icon: 'fa-ban' },
        { id: 'bubble', name: 'Bubble Background', icon: 'fa-circle' },
        { id: 'fireworks', name: 'Fireworks Background', icon: 'fa-star' },
        { id: 'gradient', name: 'Gradient Background', icon: 'fa-paint-brush' },
        { id: 'gravity-stars', name: 'Gravity Stars Background', icon: 'fa-meteor' },
        { id: 'hexagon', name: 'Hexagon Background', icon: 'fa-shapes' },
        { id: 'hole', name: 'Hole Background', icon: 'fa-circle-notch' },
        { id: 'stars', name: 'Stars Background', icon: 'fa-star' },
        { id: 'liquid-ether', name: 'Liquid Ether', icon: 'fa-water' },
        { id: 'prism', name: 'Prism', icon: 'fa-cube' },
        { id: 'dark-veil', name: 'Dark Veil', icon: 'fa-ghost' },
        { id: 'light-pillar', name: 'Light Pillar', icon: 'fa-lightbulb' },
        { id: 'silk', name: 'Silk', icon: 'fa-wind' },
        { id: 'floating-lines', name: 'Floating Lines', icon: 'fa-wave-square' },
        { id: 'light-rays', name: 'Light Rays', icon: 'fa-sun' },
        { id: 'pixel-blast', name: 'Pixel Blast', icon: 'fa-gamepad' },
        { id: 'color-bends', name: 'Color Bends', icon: 'fa-palette' },
        { id: 'aurora', name: 'Aurora', icon: 'fa-star' },
        { id: 'plasma', name: 'Plasma', icon: 'fa-fire' },
        { id: 'galaxy', name: 'Galaxy', icon: 'fa-space-shuttle' }
    ];

    const handleHomeClick = () => {
        navigate('/');
        if (onClose) onClose();
    };

    const handleProfileClick = () => {
        navigate('/profile');
        if (onClose) onClose();
    };



    const handleFeedClick = () => {
        navigate('/feed');
        if (onClose) onClose();
    };

    const handlePrivacyClick = () => {
        navigate('/privacy');
        if (onClose) onClose();
    };

    const handleHelpClick = () => {
        navigate('/faq');
        if (onClose) onClose();
    };

    const handleComingSoonFeature = (featureName) => {
        setPopupMessage(`${featureName} feature coming soon!`);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    const handleLogout = () => {
        logout();
        if (onClose) onClose();
    };

    const handleThemeChange = (themeId) => {
        changeAnimatedTheme(themeId);
    };

    return (
        <>
            <aside className={`sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <button onClick={onClose} title="Close Menu" style={{ marginLeft: 'auto' }}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <p className="menu-label">Navigation</p>
                <nav className="sidebar-section">
                    <ul className="sidebar-list">
                        <li>
                            <button onClick={handleHomeClick} className={currentPath === '/' ? 'active' : ''}>
                                <i className="fas fa-home"></i> <span>Home</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={handleFeedClick} className={currentPath === '/feed' ? 'active' : ''}>
                                <i className="fas fa-stream"></i> <span>Feed</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/news'); if (onClose) onClose(); }} className={currentPath === '/news' ? 'active' : ''}>
                                <i className="fas fa-newspaper"></i> <span>News</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/events'); if (onClose) onClose(); }} className={currentPath === '/events' ? 'active' : ''}>
                                <i className="fas fa-calendar-star" style={{ color: '#0052ff' }}></i> <span style={{ fontWeight: 'bold' }}>Events</span>
                            </button>
                        </li>

                        <li>
                            <button onClick={() => { navigate('/premium'); if (onClose) onClose(); }} className={currentPath === '/premium' ? 'active' : ''}>
                                <i className="fas fa-crown" style={{ color: '#ef4444' }}></i> <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Premium</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={handleProfileClick} className={currentPath === '/profile' ? 'active' : ''}>
                                <i className="fas fa-user"></i> <span>Profile</span>
                            </button>
                        </li>
                    </ul>
                </nav>

                <p className="menu-label">Features</p>
                <nav className="sidebar-section">
                    <ul className="sidebar-list">
                        <li>
                            <button onClick={() => { navigate('/calendar-app'); if (onClose) onClose(); }} className={currentPath === '/calendar-app' ? 'active' : ''}>
                                <i className="fas fa-calendar-alt"></i> <span>Calendar</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/1to1'); if (onClose) onClose(); }} className={currentPath === '/1to1' ? 'active' : ''}>
                                <i className="fas fa-phone-alt"></i> <span>1:1 Call</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/movies'); if (onClose) onClose(); }} className={currentPath === '/movies' ? 'active' : ''}>
                                <i className="fas fa-video"></i> <span>Movies</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/music'); if (onClose) onClose(); }} className={currentPath === '/music' ? 'active' : ''}>
                                <i className="fas fa-music"></i> <span>Music</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/maps'); if (onClose) onClose(); }} className={currentPath === '/maps' ? 'active' : ''}>
                                <i className="fas fa-map-marked-alt"></i> <span>Maps</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/countries'); if (onClose) onClose(); }} className={currentPath === '/countries' ? 'active' : ''}>
                                <i className="fas fa-globe-americas"></i> <span>Countries</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/ai-chat'); if (onClose) onClose(); }} className={currentPath === '/ai-chat' ? 'active' : ''}>
                                <i className="fas fa-robot"></i> <span>AI Chat</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/learning'); if (onClose) onClose(); }} className={currentPath === '/learning' ? 'active' : ''}>
                                <i className="fas fa-graduation-cap"></i> <span>Learning</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/store'); if (onClose) onClose(); }} className={currentPath === '/store' ? 'active' : ''}>
                                <i className="fas fa-shopping-bag" style={{ color: '#ec4899' }}></i> <span style={{ color: '#ec4899', fontWeight: 'bold' }}>Store</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => { navigate('/quizzes'); if (onClose) onClose(); }} className={currentPath === '/quizzes' ? 'active' : ''}>
                                <i className="fas fa-lightbulb"></i> <span>Quiz</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setShowGamesDropdown(!showGamesDropdown)}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                                className={currentPath.startsWith('/games') ? 'active' : ''}
                            >
                                <span><i className="fas fa-gamepad"></i> <span>Games</span></span>
                                <i className={`fas fa-chevron-${showGamesDropdown ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
                            </button>
                        </li>
                        {showGamesDropdown && (
                            <li style={{ paddingLeft: '12px' }}>
                                <ul className="sidebar-list" style={{ marginTop: '4px' }}>
                                    <li>
                                        <button onClick={() => { navigate('/games/truth-or-dare'); if (onClose) onClose(); }} className={currentPath === '/games/truth-or-dare' ? 'active' : ''}>
                                            <i className="fas fa-dice"></i> <span>Truth or Dare</span>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </nav>

                <p className="menu-label">Appearance</p>
                <nav className="sidebar-section">
                    <ul className="sidebar-list">
                        <li>
                            <button
                                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                                style={{ color: '#38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                            >
                                <span><i className="fas fa-sparkles"></i> <span>Background Theme</span></span>
                                <i className={`fas fa-chevron-${showThemeDropdown ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
                            </button>
                        </li>
                        {showThemeDropdown && (
                            <li style={{ paddingLeft: '0' }}>
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    padding: '8px',
                                    marginTop: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    {BACKGROUND_THEMES.map((bgTheme) => (
                                        <button
                                            key={bgTheme.id}
                                            onClick={() => handleThemeChange(bgTheme.id)}
                                            className={animatedTheme === bgTheme.id ? 'active' : ''}
                                            style={{
                                                width: '100%',
                                                padding: '10px 16px',
                                                marginBottom: '4px',
                                                fontSize: '14px',
                                                borderRadius: '8px',
                                                background: animatedTheme === bgTheme.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                                                border: animatedTheme === bgTheme.id ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent'
                                            }}
                                        >
                                            <i className={`fas ${bgTheme.icon}`} style={{ marginRight: '8px' }}></i>
                                            <span>{bgTheme.name}</span>
                                            {animatedTheme === bgTheme.id && (
                                                <i className="fas fa-check" style={{ float: 'right', color: '#38bdf8' }}></i>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </li>
                        )}
                        <li>
                            <button
                                className={theme === 'space' && !customColor ? 'active' : ''}
                                onClick={() => changeTheme('space')}
                            >
                                <i className="fas fa-rocket"></i> <span>Space Color</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={theme === 'dark' && !customColor ? 'active' : ''}
                                onClick={() => changeTheme('dark')}
                            >
                                <i className="fas fa-moon"></i> <span>Dark Color</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={theme === 'light' && !customColor ? 'active' : ''}
                                onClick={() => changeTheme('light')}
                            >
                                <i className="fas fa-sun"></i> <span>Light Color</span>
                            </button>
                        </li>
                        <li>
                            <button className={`relative ${customColor ? 'active' : ''}`} style={{ overflow: 'hidden' }}>
                                <input
                                    type="color"
                                    id="custom-color-input"
                                    className="absolute opacity-0 w-full h-full cursor-pointer left-0 top-0 z-10"
                                    onChange={(e) => changeCustomColor(e.target.value)}
                                    value={customColor || '#000000'}
                                    title="Pick any color"
                                />
                                <i className="fas fa-palette"></i>
                                <span>Custom Color</span>
                                {customColor && (
                                    <div
                                        className="absolute bottom-1 right-4 w-6 h-6 rounded-full border border-white/20"
                                        style={{ background: customColor }}
                                    ></div>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>

                <p className="menu-label">Account</p>
                <nav className="sidebar-section">
                    <ul className="sidebar-list">
                        <li>
                            <button onClick={handleHelpClick}>
                                <i className="fas fa-info-circle"></i> <span>Help & FAQ</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={handlePrivacyClick}>
                                <i className="fas fa-fingerprint"></i> <span>Privacy</span>
                            </button>
                        </li>
                        <PWAInstallButton renderButton={({ onClick }) => (
                            <li>
                                <button
                                    onClick={onClick}
                                    className="pwa-install-btn group"
                                    style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px', borderRadius: '12px', transition: 'all 0.2s', background: 'rgba(56, 189, 248, 0.1)' }}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                                        <i className="fas fa-download text-[#38bdf8]"></i>
                                    </div>
                                    <span className="font-semibold text-white">Install App</span>
                                </button>
                            </li>
                        )} />
                        <li>
                            <button onClick={handleLogout} className="logout-btn-new">
                                <i className="fas fa-power-off"></i> <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {showPopup && (
                <div className="coming-soon-popup">
                    <div className="coming-soon-content">
                        <i className="fas fa-rocket coming-soon-icon"></i>
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
