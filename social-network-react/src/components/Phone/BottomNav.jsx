import React from 'react';

const BottomNav = ({ onHomeClick, onSearchClick, onBackClick }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] py-3 px-6 flex justify-around items-center z-50 bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <button
        onClick={onHomeClick}
        className="text-white/70 hover:text-white transition-all transform hover:scale-110 active:scale-90 bg-transparent border-none p-1 flex items-center justify-center cursor-pointer"
        title="Home"
      >
        <i className="fas fa-home text-xl"></i>
      </button>

      <button
        onClick={onSearchClick}
        className="text-white/70 hover:text-white transition-all transform hover:scale-110 active:scale-90 bg-transparent border-none p-1 flex items-center justify-center cursor-pointer"
        title="Search"
      >
        <i className="fas fa-search text-xl"></i>
      </button>

      <button
        onClick={onBackClick}
        className="text-white/70 hover:text-white transition-all transform hover:scale-110 active:scale-90 bg-transparent border-none p-1 flex items-center justify-center cursor-pointer"
        title="Back"
      >
        <i className="fas fa-arrow-left text-xl"></i>
      </button>
    </div>
  );
};

export default BottomNav;