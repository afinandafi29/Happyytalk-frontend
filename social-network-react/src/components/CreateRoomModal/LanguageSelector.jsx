import React, { useState } from 'react';

const LanguageSelector = ({ language, setLanguage, availableLanguages, isLoading }) => {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="roomLanguage" style={{ color: '#d1d5db', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', tracking: '0.05em' }}>
                Language <span style={{ color: '#ef4444', fontWeight: 'bold' }}>*</span>
            </label>
            
            <div style={{ position: 'relative' }}>
                <div 
                    onClick={() => !isLoading && setIsLangOpen(!isLangOpen)}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: '#232a3a',
                        border: isLangOpen ? '1px solid #3b82f6' : '1px solid #374151',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease',
                        boxShadow: isLangOpen ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none'
                    }}
                >
                    <span>{language || 'Select Language'}</span>
                    <i className={`fas fa-chevron-${isLangOpen ? 'up' : 'down'}`} style={{ fontSize: '0.8rem', color: '#9ca3af' }}></i>
                </div>

                {isLangOpen && (
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        right: 0,
                        backgroundColor: '#1f2937',
                        borderRadius: '12px',
                        border: '1px solid #374151',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                        zIndex: 2000,
                        padding: '8px',
                        maxHeight: '250px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ position: 'relative', marginBottom: '8px' }}>
                            <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '0.8rem' }}></i>
                            <input 
                                type="text"
                                placeholder="Search languages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                                style={{
                                    width: '100%',
                                    backgroundColor: '#111827',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    padding: '8px 12px 8px 32px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1 }} className="custom-scrollbar">
                            {(availableLanguages || [])
                                .filter(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(lang => (
                                    <div 
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setIsLangOpen(false);
                                            setSearchTerm('');
                                        }}
                                        style={{
                                            padding: '10px 12px',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            color: language === lang ? '#3b82f6' : '#d1d5db',
                                            backgroundColor: language === lang ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.1s ease',
                                            fontWeight: language === lang ? '600' : '400'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (language !== lang) e.currentTarget.style.backgroundColor = '#374151';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (language !== lang) e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {lang}
                                    </div>
                                ))}
                            {(availableLanguages || []).filter(lang => lang.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '0.8rem' }}>
                                    No languages found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguageSelector;
