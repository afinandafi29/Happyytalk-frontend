import React from 'react';

const PrivacyToggle = ({ isPrivate, setIsPrivate }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: isPrivate ? 'rgba(59, 130, 246, 0.1)' : 'rgba(42, 42, 42, 0.3)',
            borderRadius: '8px',
            border: isPrivate ? '2px solid #3b82f6' : '1px solid #374151',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }}
            onClick={() => setIsPrivate(!isPrivate)}>
            <div style={{
                position: 'relative',
                width: '52px',
                height: '28px',
                backgroundColor: isPrivate ? '#3b82f6' : '#4b5563',
                borderRadius: '14px',
                marginRight: '12px',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: isPrivate ? '26px' : '2px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
            </div>
            <div style={{ flex: 1 }}>
                <label
                    htmlFor="isPrivate"
                    style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: isPrivate ? '#60a5fa' : '#d1d5db',
                        cursor: 'pointer',
                        display: 'block'
                    }}>
                    Make this room private
                </label>
                {isPrivate && (
                    <p style={{
                        fontSize: '0.8rem',
                        color: '#9ca3af',
                        marginTop: '4px'
                    }}>
                        Only invited members can see and join
                    </p>
                )}
            </div>
        </div>
    );
};

export default PrivacyToggle;
