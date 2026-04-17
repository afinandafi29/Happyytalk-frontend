import React, { useState, useEffect } from 'react';

const StatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="flex items-center justify-between px-8 py-2 text-white/90 text-[11px] font-medium tracking-tight select-none">
      {/* Left: Time */}
      <div className="flex-1">
        <span>{formatTime(time)}</span>
      </div>

      {/* Center: Camera/Notch Hole (Simulated) */}
      <div className="w-4 h-4 rounded-full bg-black/40 border border-white/5 shadow-inner"></div>

      {/* Right: Icons (Signal, WiFi, Battery) */}
      <div className="flex-1 flex items-center justify-end gap-1.5">
        {/* Signal */}
        <div className="flex items-end gap-[1px] h-2.5">
          <div className="w-[1.5px] h-[30%] bg-white rounded-[0.5px]"></div>
          <div className="w-[1.5px] h-[50%] bg-white rounded-[0.5px]"></div>
          <div className="w-[1.5px] h-[75%] bg-white rounded-[0.5px]"></div>
          <div className="w-[1.5px] h-full bg-white rounded-[0.5px]"></div>
        </div>

        {/* WiFi */}
        <i className="fas fa-wifi text-[9px]"></i>

        {/* Battery */}
        <div className="flex items-center gap-1 ml-0.5">
          <span className="text-[10px]">74%</span>
          <div className="w-5 h-2.5 border border-white/40 rounded-[2px] p-[1px] flex items-center relative">
            <div className="w-[74%] h-full bg-white rounded-[1px]"></div>
            <div className="absolute -right-[2.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-1.5 bg-white/40 rounded-r-[0.5px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
