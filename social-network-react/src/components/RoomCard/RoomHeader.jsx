import React from 'react';

const RoomHeader = ({ 
    title, 
    topic, 
    language, 
    level,
    is_private, 
    isOwner, 
    showMenu, 
    setShowMenu, 
    handleTogglePrivacy, 
    setShowDeleteConfirm 
}) => {
    return (
        <div className="flex items-start justify-between gap-2 w-full">
            <div className="flex-1 min-w-0 pr-1">
                <h2
                    className="m-0 text-white font-bold leading-snug truncate"
                    style={{
                        fontFamily: '"Orbitron", sans-serif',
                        fontSize: window.innerWidth <= 480 ? '1rem' : '1.1rem',
                        letterSpacing: '0.5px',
                    }}
                    title={title}
                >
                    {title || 'Practice with others'}
                </h2>
                <p
                    className="mt-1 truncate"
                    style={{ 
                        fontSize: window.innerWidth <= 480 ? '0.7rem' : '0.75rem', 
                        color: 'rgba(255,255,255,0.4)', 
                        margin: '2px 0 0 0' 
                    }}
                >
                    {topic || 'Practice with others'}
                </p>
                {level && (
                    <div 
                        className="inline-flex items-center px-1.5 py-0.5 rounded-md mt-1.5"
                        style={{ 
                            background: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            fontSize: '0.6rem',
                            color: '#60a5fa',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}
                    >
                        <i className="fas fa-signal-alt mr-1" style={{ fontSize: '0.55rem' }}></i>
                        {level.toUpperCase()}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                <div className="flex items-center gap-1" style={{ background: 'transparent' }}>
                    <span style={{ fontSize: window.innerWidth <= 480 ? '0.85rem' : '1rem' }}>🌐</span>
                    <span className="text-white font-bold"
                        style={{ fontSize: window.innerWidth <= 480 ? '0.6rem' : '0.65rem', letterSpacing: '0.8px', fontFamily: '"Orbitron", sans-serif' }}>
                        {(language || 'GLOBAL').toUpperCase()}
                    </span>
                </div>

                <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                        width: '28px', height: '28px',
                        background: is_private ? 'rgba(239,68,68,0.2)' : 'rgba(255,165,0,0.15)',
                        border: is_private ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,165,0,0.25)',
                    }}
                    title={is_private ? 'Private Room' : 'Open Room'}
                >
                    {is_private
                        ? <i className="fas fa-lock text-red-400" style={{ fontSize: '0.7rem' }}></i>
                        : <span style={{ fontSize: '0.85rem' }}>🎙️</span>
                    }
                </div>

                {isOwner && (
                    <div className="relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                            className="flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                            style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                        >
                            <i className="fas fa-ellipsis-v" style={{ fontSize: '0.9rem' }}></i>
                        </button>

                        {showMenu && (
                            <div 
                                className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl z-[60] border border-white/10 overflow-hidden"
                                style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={handleTogglePrivacy}
                                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 flex items-center gap-3 transition-colors border-none bg-transparent cursor-pointer"
                                >
                                    <i className={`fas ${is_private ? 'fa-globe' : 'fa-lock'} text-blue-400 w-4`}></i>
                                    {is_private ? 'Make Public' : 'Make Private'}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowMenu(false); setShowDeleteConfirm(true); }}
                                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-400/10 flex items-center gap-3 transition-colors border-none bg-transparent cursor-pointer"
                                >
                                    <i className="fas fa-trash-alt w-4"></i>
                                    Delete Room
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomHeader;
