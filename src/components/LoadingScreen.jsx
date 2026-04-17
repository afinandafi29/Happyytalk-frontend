import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#0f172a', // Slate 900
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      fontFamily: "'Outfit', 'Inter', sans-serif"
    }}>
      <div className="loader-orbit" style={{
        width: '80px',
        height: '80px',
        border: '3px solid rgba(56, 189, 248, 0.1)',
        borderRadius: '50%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderTop: '3px solid #38bdf8', // Sky 400
          borderRadius: '50%',
          animation: 'spin 1.2s linear infinite'
        }}></div>
        <img 
          src="/happytalk.png" 
          alt="HappyTalk" 
          style={{
            position: 'absolute',
            width: '54px',
            height: '54px',
            filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.6))'
          }} 
        />
      </div>
      <h2 style={{
        marginTop: '24px',
        color: '#f8fafc',
        fontSize: '1.25rem',
        fontWeight: '600',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>Happy Talk</h2>
      <p style={{
        color: '#94a3b8',
        fontSize: '0.875rem',
        marginTop: '8px'
      }}>Stabilizing connection...</p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
