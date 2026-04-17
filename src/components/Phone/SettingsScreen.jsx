import React, { useState, useEffect } from 'react';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [textSize, setTextSize] = useState('Medium');
  const [soundEffects, setSoundEffects] = useState(true);
  const [volume, setVolume] = useState(60);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedBrightness = localStorage.getItem('brightness') || 80;
    const savedTextSize = localStorage.getItem('textSize') || 'Medium';
    const savedSoundEffects = localStorage.getItem('soundEffects') !== 'false';
    const savedVolume = localStorage.getItem('volume') || 60;

    setDarkMode(savedDarkMode);
    setBrightness(savedBrightness);
    setTextSize(savedTextSize);
    setSoundEffects(savedSoundEffects);
    setVolume(savedVolume);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('brightness', brightness);
    localStorage.setItem('textSize', textSize);
    localStorage.setItem('soundEffects', soundEffects);
    localStorage.setItem('volume', volume);

    // Apply dark mode to the body if needed
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode, brightness, textSize, soundEffects, volume]);

  return (
    <div className="h-full bg-black text-white overflow-y-auto custom-scrollbar">
      <div className="p-4 border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Settings</h2>
      </div>
      
      <div className="p-4 space-y-6 pb-24">
        {/* Profile Section */}
        <div className="bg-slate-900/40 p-4 rounded-3xl border border-white/5 backdrop-blur-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white/10 flex items-center justify-center">
            <i className="fas fa-user text-2xl text-white/90"></i>
          </div>
          <div>
            <div className="font-bold text-white/90">Afi User</div>
            <div className="text-xs text-gray-500 font-medium">Apple ID, iCloud, Media & Purchases</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="px-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Theme & Appearance</h3>
          <div className="bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden">
            <div className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <i className="fas fa-moon text-indigo-400"></i>
                </div>
                <div className="text-[14px] font-medium text-white/80 group-hover:text-white">Dark Mode</div>
              </div>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="p-4 flex justify-between items-center border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <i className="fas fa-sun text-orange-400"></i>
                </div>
                <div className="text-[14px] font-medium text-white/80 group-hover:text-white">Brightness</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
                className="w-24 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-orange-400"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="px-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Sound & Haptics</h3>
          <div className="bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden">
            <div className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <i className="fas fa-bell text-rose-400"></i>
                </div>
                <div className="text-[14px] font-medium text-white/80 group-hover:text-white">Sound Effects</div>
              </div>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={() => setSoundEffects(!soundEffects)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
              </label>
            </div>
            
            <div className="p-4 flex justify-between items-center border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <i className="fas fa-volume-up text-blue-400"></i>
                </div>
                <div className="text-[14px] font-medium text-white/80 group-hover:text-white">Volume</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-24 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="px-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Privacy</h3>
          <div className="bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden">
             <div className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                    <i className="fas fa-location-arrow text-teal-400"></i>
                </div>
                <div className="text-[14px] font-medium text-white/80 group-hover:text-white">Location Services</div>
              </div>
              <i className="fas fa-chevron-right text-gray-600 group-hover:text-blue-400 text-xs transition-colors"></i>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
            <div className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">HappyTalk OS 1.0</div>
            <div className="text-[10px] text-gray-700 mt-1 font-medium">Model: PH-660-X</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;