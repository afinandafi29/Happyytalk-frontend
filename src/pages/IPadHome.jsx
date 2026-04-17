import React, { useState, useEffect } from 'react';

const IPadHome = () => {
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const apps = [
    { id: 'calendar', icon: '📅', name: 'Calendar', color: 'linear-gradient(135deg, #ff9500, #ff6b00)' },
    { id: 'clock', icon: '⏰', name: 'Clock', color: 'linear-gradient(145deg, #667eea, #764ba2)' },
    { id: 'photos', icon: '📷', name: 'Photos', color: 'linear-gradient(45deg, #f093fb, #6fa3ef)' },
    { id: 'camera', icon: '📸', name: 'Camera', color: 'linear-gradient(to bottom, #434343, #000000)' },
    { id: 'messages', icon: '💬', name: 'Messages', color: 'linear-gradient(135deg, #00c6ff, #0072ff)' },
    { id: 'mail', icon: '✉️', name: 'Mail', color: '#0066cc' },
    { id: 'music', icon: '♪', name: 'Music', color: 'linear-gradient(135deg, #667eea, #89fffd)' },
    { id: 'notes', icon: '📝', name: 'Notes', color: 'linear-gradient(45deg, #f6d365, #fda085)' },
    { id: 'reminders', icon: '✓', name: 'Reminders', color: '#ff3b30' },
    { id: 'findmy', icon: '📍', name: 'Find My', color: '#34c759' },
    { id: 'maps', icon: '🗺', name: 'Maps', color: 'linear-gradient(135deg, #00f260, #0575e6)' },
    { id: 'weather', icon: '☀️', name: 'Weather', color: 'linear-gradient(135deg, #667eea, #89f7fe)' },
    { id: 'settings', icon: '⚙️', name: 'Settings', color: '#8e8e93' },
    { id: 'appstore', icon: '🔵', name: 'App Store', color: 'linear-gradient(135deg, #5856d6, #5e5ce6)' },
    { id: 'podcasts', icon: '🎙', name: 'Podcasts', color: '#9933ff' },
    { id: 'tv', icon: '📺', name: 'TV', color: '#ff2d55' },
    { id: 'health', icon: '❤️', name: 'Health', color: 'linear-gradient(45deg, #ff6b6b, #ff8e53)' },
    { id: 'files', icon: '📁', name: 'Files', color: '#5856d6' }
  ];

  const handleAppClick = (appId) => {

    // You can add navigation logic here
  };

  return (
    <div style={{
      height: '100dvh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #ff9a8b 0%, #ff6a88 50%, #ff99ac 100%)',
      color: 'white',
      overflow: 'hidden',
      backgroundAttachment: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1024px',
        height: '100%',
        maxHeight: '1366px',
        aspectRatio: '3/4',
        background: '#000',
        borderRadius: 'min(5vw, 60px)',
        padding: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 0 0 12px #111',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: '#000',
          borderRadius: '48px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Status Bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '38px',
            padding: '0 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '14px',
            zIndex: 100,
            background: 'rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: 'white'
          }}>
            <div style={{ fontWeight: 600 }}>{currentTime}</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span>Wi-Fi</span>
              <span>100%</span>
            </div>
          </div>

          {/* Home Screen */}
          <div style={{
            height: '100%',
            padding: '20px 20px 100px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '20px 10px',
            overflowY: 'auto',
            alignContent: 'start'
          }}>
            {apps.map((app) => (
              <div
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.15s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={{
                  width: 'min(15vw, 90px)',
                  height: 'min(15vw, 90px)',
                  borderRadius: '22%',
                  background: app.color,
                  marginBottom: '8px',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'min(7vw, 42px)',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.4)'
                }}>
                  {app.icon}
                </div>
                <div style={{
                  fontSize: '14px',
                  textShadow: '0 1px 4px rgba(0,0,0,0.7)',
                  maxWidth: '100px',
                  lineHeight: '1.2'
                }}>
                  {app.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPadHome;
