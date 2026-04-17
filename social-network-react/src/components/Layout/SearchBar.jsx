import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, showBanner, bannersCount }) => {
  return (
    <div className={`${(showBanner && bannersCount > 0) ? 'pt-2' : 'pt-16'} w-full flex justify-center mb-3`}>
      <div style={{ width: '100%', maxWidth: '640px', padding: '0 16px', position: 'relative' }}>
        <i className="fas fa-search" style={{
          position: 'absolute', left: '32px', top: '50%',
          transform: 'translateY(-50%)',
          color: '#3b82f6', fontSize: '1rem',
          pointerEvents: 'none', zIndex: 1,
        }}></i>
        <input
          id="search-input"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search rooms..."
          type="text"
          style={{
            width: '100%',
            padding: '13px 18px 13px 46px',
            borderRadius: '50px',
            border: '1px solid #3b82f6',
            background: 'rgba(255,255,255,0.08)',
            color: '#ffffff',
            outline: 'none',
            fontSize: '1rem',
            fontWeight: 400,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 0 0 1px rgba(59,130,246,0.3), 0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
          onFocus={e => {
            e.target.style.border = '1px solid #60a5fa';
            e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.25), 0 0 20px rgba(59,130,246,0.2)';
            e.target.style.background = 'rgba(255,255,255,0.1)';
          }}
          onBlur={e => {
            e.target.style.border = '1px solid #3b82f6';
            e.target.style.boxShadow = '0 0 0 1px rgba(59,130,246,0.3), 0 4px 20px rgba(0,0,0,0.3)';
            e.target.style.background = 'rgba(255,255,255,0.08)';
          }}
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            style={{
              position: 'absolute', right: '28px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.5)', padding: '4px', lineHeight: 1, zIndex: 1,
            }}
          >
            <i className="fas fa-times" style={{ fontSize: '0.85rem' }}></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
