import React from 'react';

const RoomFooter = ({ 
    creator, 
    created_by, 
    currentUser, 
    is_guest_room, 
    id, 
    isOwner, 
    isFull, 
    handleShare, 
    handleJoinRoom, 
    setShowDeleteConfirm, 
    openProfile,
    scheduled_start_time
}) => {
    return (
        <div className="flex justify-between items-center w-full mt-auto" style={{ padding: '4px 2px' }}>
            <div
                onClick={handleShare}
                className="cursor-pointer transition-all flex items-center justify-center"
                title="Share Room"
                style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    fontSize: window.innerWidth <= 480 ? '1rem' : '1.1rem', 
                    padding: '8px' 
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
                <i className="fas fa-share-alt"></i>
            </div>

            <div style={{ 
                fontSize: window.innerWidth <= 480 ? '0.6rem' : '0.65rem', 
                color: 'rgba(255,255,255,0.25)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                flex: 1,
                justifyContent: 'center'
            }}>
                <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: creator ? 'pointer' : 'default' }}
                    onClick={(e) => {
                        if (creator && openProfile) {
                          e.stopPropagation();
                          openProfile({...creator, id: creator.id || created_by});
                        }
                    }}
                >
                    <span style={{color: 'rgba(255,255,255,0.4)'}}>Created by</span>
                    <span 
                        style={{ 
                            color: 'rgba(255,255,255,0.7)', 
                            fontWeight: '600',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    >
                        {creator?.name || creator?.username || 'Guest Host'}
                    </span>
                </div>
            </div>

            <button
                onClick={handleJoinRoom}
                disabled={isFull}
                style={{
                    padding: window.innerWidth <= 480 ? '8px 20px' : '10px 24px',
                    borderRadius: '12px',
                    fontFamily: '"Orbitron", sans-serif',
                    fontWeight: 800,
                    fontSize: window.innerWidth <= 480 ? '0.7rem' : '0.8rem',
                    letterSpacing: '1px',
                    border: 'none',
                    background: isFull
                        ? 'rgba(100,100,100,0.3)'
                        : 'linear-gradient(135deg, #1d5eff, #3b82f6)',
                    color: isFull ? 'rgba(255,255,255,0.35)' : '#ffffff',
                    cursor: isFull ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isFull ? 'none' : '0 4px 15px rgba(29,94,255,0.4)',
                    transform: 'scale(1)',
                }}
                onMouseEnter={e => {
                    if (!isFull) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(29,94,255,0.6)';
                    }
                }}
                onMouseLeave={e => {
                    if (!isFull) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(29,94,255,0.4)';
                    }
                }}
            >
                {isFull ? 'FULL' : (scheduled_start_time && new Date(scheduled_start_time) > new Date() ? 'JOIN EARLY' : 'JOIN')}
            </button>
        </div>
    );
};

export default RoomFooter;
