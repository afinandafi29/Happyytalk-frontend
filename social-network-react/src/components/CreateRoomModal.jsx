import { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LayoutContext } from './Layout/Layout';
import { useCreateRoom } from './CreateRoomModal/useCreateRoom';
import LanguageSelector from './CreateRoomModal/LanguageSelector';
import PrivacyToggle from './CreateRoomModal/PrivacyToggle';
import { filterProfanity } from '../utils/profanityFilter';

const CreateRoomModal = ({ isOpen, onClose, onRoomCreated }) => {
    const { currentUser } = useAuth();
    const { availableLanguages, namesByLanguage } = useContext(LayoutContext);

    const {
        title, setTitle,
        topic, setTopic,
        isPrivate, setIsPrivate,
        durationHours, setDurationHours,
        durationMinutes, setDurationMinutes,
        language, setLanguage,
        maxCapacity, setMaxCapacity,
        scheduledAt, setScheduledAt,
        error, isLoading,
        isSuggesting,
        suggestTitle,
        handleSubmit,
        level, setLevel
    } = useCreateRoom({ isOpen, onClose, onRoomCreated, currentUser, namesByLanguage });

    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1500
    };

    const modalStyle = {
        backgroundColor: '#181e29',
        padding: '20px',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '480px',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        border: '1px solid #374151'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 12px',
        borderRadius: '8px',
        backgroundColor: '#232a3a',
        border: '1px solid #374151',
        color: 'white'
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        fontSize: '24px',
                        cursor: 'pointer'
                    }}
                    aria-label="Close"
                    disabled={isLoading}
                >
                    ×
                </button>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    color: 'white'
                }}>Create New Room</h3>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Title Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="roomTitle" style={{ color: '#d1d5db', fontSize: '1rem', fontWeight: '500' }}>
                            Room Title <span style={{ color: '#ef4444', fontWeight: 'bold' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                id="roomTitle"
                                value={title}
                                onChange={(e) => setTitle(filterProfanity(e.target.value))}
                                style={{ ...inputStyle, paddingRight: '45px' }}
                                placeholder="e.g., Evening Spanish Chat"
                                required
                                maxLength={100}
                                disabled={isSuggesting}
                            />
                            <button
                                type="button"
                                onClick={suggestTitle}
                                disabled={isSuggesting}
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                                    transition: 'all 0.2s ease',
                                    opacity: isSuggesting ? 0.7 : 1
                                }}
                                title="Suggest title with AI"
                            >
                                <i className={`fas ${isSuggesting ? 'fa-circle-notch fa-spin' : 'fa-magic'}`} style={{ color: 'white', fontSize: '0.9rem' }}></i>
                            </button>
                        </div>
                    </div>

                    <LanguageSelector 
                        language={language} setLanguage={setLanguage} 
                        availableLanguages={availableLanguages} isLoading={isLoading} 
                    />

                    {/* Language Level Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="languageLevel" style={{ color: '#d1d5db', fontSize: '1rem', fontWeight: '500' }}>
                            Language Level
                        </label>
                        <select
                            id="languageLevel"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="Absolute Beginner">Absolute Beginner</option>
                            <option value="Beginner (A1)">Beginner (A1)</option>
                            <option value="Elementary (A2)">Elementary (A2)</option>
                            <option value="Pre-Intermediate (B1)">Pre-Intermediate (B1)</option>
                            <option value="Intermediate (B1+)">Intermediate (B1+)</option>
                            <option value="Upper Intermediate (B2)">Upper Intermediate (B2)</option>
                            <option value="Advanced (C1)">Advanced (C1)</option>
                            <option value="Proficient (C2)">Proficient (C2)</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native Speaker">Native Speaker</option>
                        </select>
                    </div>

                    {/* Max Capacity Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="maxCapacity" style={{ color: '#d1d5db', fontSize: '1rem', fontWeight: '500' }}>
                            Max Participants <span style={{ color: '#6b7280', fontStyle: 'italic', fontSize: '0.9em' }}>(0 = Unlimited)</span>
                        </label>
                        <input
                            type="number"
                            id="maxCapacity"
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(Math.max(0, parseInt(e.target.value, 10) || 0))}
                            min="0"
                            max="100"
                            style={inputStyle}
                            placeholder="0 for unlimited, or enter max number"
                        />
                    </div>

                    <PrivacyToggle isPrivate={isPrivate} setIsPrivate={setIsPrivate} />

                    {/* Schedule Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                id="isScheduled"
                                checked={!!scheduledAt}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        const now = new Date();
                                        now.setMinutes(now.getMinutes() + 30);
                                        // Round to next 5 mins for better UX
                                        now.setMinutes(Math.ceil(now.getMinutes() / 5) * 5);
                                        setScheduledAt(now);
                                    } else {
                                        setScheduledAt(null);
                                    }
                                }}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <label htmlFor="isScheduled" style={{ color: '#d1d5db', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }}>
                                Schedule for later
                            </label>
                        </div>
                        
                        {scheduledAt && (
                            <div style={{ marginTop: '5px' }}>
                                <input
                                    type="datetime-local"
                                    value={new Date(scheduledAt.getTime() - scheduledAt.getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
                                    onChange={(e) => setScheduledAt(new Date(e.target.value))}
                                    min={new Date().toISOString().slice(0, 16)}
                                    style={{
                                        ...inputStyle,
                                        cursor: 'pointer',
                                        accentColor: '#2563eb'
                                    }}
                                />
                                <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '5px' }}>
                                    Room will appear in the "Upcoming" section and move to the top when live. You can join early at any time.
                                </p>
                            </div>
                        )}
                    </div>

                    {error && <p style={{ color: '#f87171', fontSize: '0.95rem', textAlign: 'center' }}>{error}</p>}
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                backgroundColor: '#374151',
                                color: '#d1d5db',
                                border: 'none',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                opacity: isLoading ? '0.7' : '1'
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create Room'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRoomModal;