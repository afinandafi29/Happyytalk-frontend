import React, { useState } from 'react';

const SocialScreen = () => {
  const [activeTab, setActiveTab] = useState('trending');
  
  const socialApps = [
    { 
      name: 'Instagram', 
      icon: 'https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000',
      url: 'https://instagram.com'
    },
    { 
      name: 'Facebook', 
      icon: 'https://img.icons8.com/?size=100&id=118497&format=png&color=000000',
      url: 'https://facebook.com'
    },
    { 
      name: 'Pinterest', 
      icon: 'https://img.icons8.com/?size=100&id=63676&format=png&color=000000',
      url: 'https://pinterest.com'
    },
    { 
      name: 'LinkedIn', 
      icon: 'https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000',
      url: 'https://linkedin.com'
    },
    { 
      name: 'X', 
      icon: 'https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000',
      url: 'https://x.com'
    },
    { 
      name: 'TikTok', 
      icon: 'https://img.icons8.com/?size=100&id=118638&format=png&color=000000',
      url: 'https://tiktok.com'
    },
    { 
      name: 'WhatsApp', 
      icon: 'https://img.icons8.com/?size=100&id=16713&format=png&color=000000',
      url: 'https://whatsapp.com'
    },
    { 
      name: 'Snapchat', 
      icon: 'https://img.icons8.com/?size=100&id=67599&format=png&color=000000',
      url: 'https://snapchat.com'
    },
    { 
      name: 'Telegram', 
      icon: 'https://img.icons8.com/?size=100&id=oWiuH0jFiU0R&format=png&color=000000',
      url: 'https://telegram.org'
    },
  ];
  
  return (
    <div className="h-full bg-black text-white overflow-y-auto no-scrollbar custom-scrollbar">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-center text-blue-500">Social</h2>
      </div>
      
      <div className="flex border-b border-gray-800">
        <button 
          className={`flex-1 py-3 px-4 text-center cursor-pointer transition-colors ${activeTab === 'trending' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('trending')}
        >
          Trending
        </button>
        <button 
          className={`flex-1 py-3 px-4 text-center cursor-pointer transition-colors ${activeTab === 'connect' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('connect')}
        >
          Connect
        </button>
      </div>
      
      {activeTab === 'trending' ? (
        <div className="p-4 space-y-4">
          <div className="bg-gray-900/50 p-4 rounded-2xl border border-white/5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white/90">Today's Trending</h3>
              <span className="text-blue-400 text-sm cursor-pointer hover:underline">See all</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center group cursor-pointer">
                <span className="text-blue-400 font-bold mr-3 w-4">#1</span>
                <span className="text-white/80 group-hover:text-white transition-colors">LanguageLearning</span>
              </div>
              <div className="flex items-center group cursor-pointer">
                <span className="text-blue-400 font-bold mr-3 w-4">#2</span>
                <span className="text-white/80 group-hover:text-white transition-colors">HappyTalkApp</span>
              </div>
              <div className="flex items-center group cursor-pointer">
                <span className="text-blue-400 font-bold mr-3 w-4">#3</span>
                <span className="text-white/80 group-hover:text-white transition-colors">PolyglotLife</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-2xl border border-white/5 shadow-lg">
            <h3 className="font-semibold mb-4 text-white/90 text-center">Latest News</h3>
            <div className="space-y-5">
              <div className="cursor-pointer group">
                <p className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">New language exchange app gaining popularity among students</p>
                <p className="text-[10px] text-gray-500 mt-2 font-medium">2 hours ago</p>
              </div>
              <div className="cursor-pointer group">
                <p className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">Study shows benefits of regular conversation practice for language learning</p>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">5 hours ago</p>
              </div>
            </div>
          </div>
          <div className="h-24"></div>
        </div>
      ) : (
        <div className="pl-5 pt-5 pb-5 pr-10">
          <div className="grid grid-cols-3 gap-y-10 gap-x-3 justify-items-center">
            {socialApps.map(app => (
              <a 
                key={app.name} 
                href={app.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[18px] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 active:scale-90 shadow-xl border border-white/10 group-hover:border-blue-500/30 overflow-hidden">
                  <img src={app.icon} alt={app.name} className="w-8 h-8 object-contain transition-transform group-hover:rotate-12" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 group-hover:text-white mt-2 transition-colors font-medium text-center line-clamp-1 w-full px-1">{app.name}</span>
              </a>
            ))}
          </div>
          <div className="h-24"></div>
        </div>
      )}
    </div>
  );
};

export default SocialScreen;