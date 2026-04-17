import React from 'react';

const AppIcon = ({ id, title, icon, type, svg, url, onClick, size = 64 }) => {
  const borderRadius = Math.round(size * 0.28); // Standard iOS-like ratio
  
  return (
    <div className="flex flex-col items-center group">
      <div 
        className="cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 active:scale-90 shadow-lg overflow-hidden relative"
        style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${borderRadius}px`,
            ...(type === 'image' ? { 
                backgroundImage: `url('${icon}')`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            } : {})
        }}
        onClick={onClick}
      >
        {type === 'svg' && (
            <div className="w-full h-full flex items-center justify-center">
                {svg}
            </div>
        )}
      </div>
      <div className="text-center text-[10px] sm:text-xs mt-2 text-white font-medium tracking-wide truncate w-full px-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {title}
      </div>
    </div>
  );
};

export default AppIcon;