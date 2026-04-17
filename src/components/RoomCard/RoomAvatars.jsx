import React from 'react';
import { PROFILE_IMAGES } from '../../data/profileImages';

const RoomAvatars = ({ participants, highlightedAvatars, openProfile }) => {
    // Responsive avatar size: smaller on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const avatarSize = isMobile ? '72px' : '68px';

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '14px' : '10px',
            flex: 1,
            padding: isMobile ? '18px 0' : '10px 0',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            overflowY: 'visible',
            width: '100%',
        }}>
            {participants.slice(0, 4).map((person, i) => {
                // Use avatar_url, fall back to a real profile image (not a letter)
                const src = person.avatar_url || person.avatar || PROFILE_IMAGES[i % PROFILE_IMAGES.length];
                const isPremium = person.is_premium || person.premium;
                const hasRing = isPremium || (highlightedAvatars && highlightedAvatars.has(src));

                return (
                    <div
                        key={i}
                        className="room-avatar-item"
                        style={{ position: 'relative', flexShrink: 0, cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); if (person.id && openProfile) openProfile(person); }}
                    >
                        <div className="room-avatar-circle" style={{
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: '50%',
                            border: '2px solid rgba(255,255,255,0.2)',
                            overflow: 'hidden',
                            background: '#222',
                            position: 'relative', zIndex: 1,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        }} title={person.name || person.username || 'Learner'}>
                            <img
                                src={src}
                                alt={person.name || person.username || 'Learner'}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                onError={e => {
                                    e.target.onerror = null;
                                    // On error, try next profile image from local folder
                                    const nextIdx = (i + 5) % PROFILE_IMAGES.length;
                                    e.target.src = PROFILE_IMAGES[nextIdx];
                                }}
                            />
                        </div>
                    </div>
                );
            })}

            {participants.length === 0 && (
                <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                    Be the first to join!
                </div>
            )}

            {participants.length > 4 && (
                <div className="room-avatar-circle" style={{
                    width: avatarSize,
                    height: avatarSize,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600,
                    flexShrink: 0,
                }}>
                    +{participants.length - 4}
                </div>
            )}
        </div>
    );
};

export default RoomAvatars;
