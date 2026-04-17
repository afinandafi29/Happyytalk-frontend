import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppIcon from './AppIcon';

const AppScreen = ({ onAppClick, searchQuery, showSearch, onSearchChange }) => {
  const navigate = useNavigate();
  const apps = [
    {
      id: 'youtube-app',
      title: 'YouTube',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="4" y="4" width="56" height="56" rx="12" fill="#ff0000" />
          <path d="M26 22l18 10-18 10z" fill="#fff" />
        </svg>
      )
    },
    {
      id: 'games-folder',
      title: 'Games',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="8" y="24" width="48" height="24" rx="12" fill="#4f8cff" />
          <circle cx="22" cy="36" r="5" fill="#fff" />
          <rect x="19" y="33" width="6" height="2" fill="#4f8cff" />
          <rect x="21" y="31" width="2" height="6" fill="#4f8cff" />
          <circle cx="42" cy="36" r="2.5" fill="#fff" />
          <circle cx="48" cy="36" r="2.5" fill="#fff" />
          <circle cx="45" cy="32" r="2.5" fill="#fff" />
          <circle cx="45" cy="40" r="2.5" fill="#fff" />
        </svg>
      )
    },
    {
      id: 'watchparty-app',
      title: 'Watch Party',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#ffb347" />
          <polygon points="28,22 46,32 28,42" fill="#fff" />
          <circle cx="20" cy="46" r="4" fill="#fff" />
          <circle cx="44" cy="46" r="4" fill="#fff" />
          <ellipse cx="32" cy="52" rx="12" ry="3" fill="#fff" opacity="0.6" />
        </svg>
      )
    },
    {
      id: 'whiteboard-app',
      title: 'Whiteboard',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="10" y="14" width="44" height="36" rx="4" fill="#fff" stroke="#333" strokeWidth="2" />
          <rect x="14" y="18" width="36" height="28" rx="2" fill="#e3f2fd" />
          <polygon points="50,44 54,50 46,50" fill="#333" />
          <rect x="40" y="38" width="8" height="2" fill="#1976d2" />
          <rect x="18" y="26" width="18" height="2" fill="#1976d2" />
          <rect x="18" y="30" width="10" height="2" fill="#1976d2" />
        </svg>
      )
    },
    {
      id: 'feed-app',
      title: 'Post',
      type: 'svg',
      url: '/post',
      svg: (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#4f8cff" />
          <rect x="20" y="22" width="24" height="20" rx="4" fill="#fff" />
          <rect x="24" y="26" width="16" height="4" rx="2" fill="#4f8cff" />
          <rect x="24" y="34" width="12" height="3" rx="1.5" fill="#b3d1ff" />
          <rect x="24" y="40" width="8" height="3" rx="1.5" fill="#b3d1ff" />
          <circle cx="28" cy="30" r="2" fill="#b3d1ff" />
        </svg>
      )
    },
    {
      id: 'news-app',
      title: 'News',
      type: 'svg',
      url: '/news',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="4" y="4" width="56" height="56" rx="12" fill="#ff5252" />
          <path d="M18 20h28v24H18z" fill="#fff" />
          <path d="M22 24h20v2H22zm0 6h20v2H22zm0 6h14v2H22z" fill="#bdbdbd" />
        </svg>
      )
    },
    {
      id: 'music-app',
      title: 'Music',
      type: 'svg',
      url: '/music',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="4" y="4" width="56" height="56" rx="12" fill="#ff2d55" />
          <path d="M44 14L24 19V43C22 41 19 40 16 40C12 40 8 43 8 47C8 51 12 54 16 54C20 54 24 51 24 47V25L40 21V39C38 37 35 36 32 36C28 36 24 39 24 43C24 47 28 50 32 50C36 50 40 47 40 43V14H44Z" fill="#fff" />
        </svg>
      )
    },
    {
      id: 'unsplash-app',
      title: 'Unsplash',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="8" y="8" width="48" height="48" rx="12" fill="#000" />
          <path d="M22 24h20v14H22zM32 28l-6 6h12z" fill="#fff" />
          <rect x="22" y="24" width="20" height="4" fill="#000" />
          <path d="M20 20h24v12h-4v-8h-16v8h-4z" fill="#fff" />
        </svg>
      )
    },
    {
      id: 'dictionary-app',
      title: 'Dictionary',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="8" y="8" width="48" height="48" rx="12" fill="#4f46e5" />
          <path d="M20 18h24v28H20z" fill="#fff" opacity="0.2" />
          <path d="M24 22h16v4H24zM24 30h16v2H24zM24 36h12v2H24z" fill="#fff" />
          <path d="M18 16v32h28V16H18zm26 30H20V18h24v28z" fill="#fff" />
        </svg>
      )
    },
    {
      id: 'social-app',
      title: 'Social',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#ffb347" />
          <circle cx="24" cy="32" r="8" fill="#fff" />
          <circle cx="40" cy="32" r="8" fill="#fff" />
          <ellipse cx="32" cy="44" rx="14" ry="6" fill="#fff" opacity="0.7" />
          <circle cx="24" cy="32" r="3" fill="#ffb347" />
          <circle cx="40" cy="32" r="3" fill="#ffb347" />
        </svg>
      )
    },
    {
      id: 'movie-app',
      title: 'Movie',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="10" y="16" width="44" height="32" rx="6" fill="#22223b" />
          <polygon points="30,26 46,32 30,38" fill="#ff595e" />
          <rect x="16" y="20" width="4" height="4" rx="2" fill="#f8f9fa" />
          <rect x="16" y="40" width="4" height="4" rx="2" fill="#f8f9fa" />
          <rect x="44" y="20" width="4" height="4" rx="2" fill="#f8f9fa" />
          <rect x="44" y="40" width="4" height="4" rx="2" fill="#f8f9fa" />
        </svg>
      )
    },
    {
      id: 'theme-app',
      title: 'Theme',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#333" />
          <path d="M20 32a12 12 0 1 1 24 0 12 12 0 0 1-24 0z" fill="#fff" opacity="0.5" />
          <circle cx="32" cy="32" r="10" fill="#ff4081" />
          <circle cx="42" cy="22" r="4" fill="#00e676" />
          <circle cx="22" cy="42" r="4" fill="#2979ff" />
        </svg>
      )
    },
    {
      id: 'app-store',
      title: 'App Store',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#2979ff" />
          <path d="M32 18L18 26v18l14 8 14-8V26z" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
          <path d="M32 18v22M18 26l14 14M46 26L32 40" stroke="#2979ff" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'ai-chat-app',
      title: 'AI Chat',
      type: 'svg',
      svg: (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#8b5cf6" />
          <rect x="18" y="22" width="28" height="20" rx="4" fill="#fff" />
          <circle cx="24" cy="28" r="2" fill="#8b5cf6" />
          <circle cx="32" cy="28" r="2" fill="#8b5cf6" />
          <circle cx="40" cy="28" r="2" fill="#8b5cf6" />
          <path d="M22 35h20M22 38h16" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: '1to1-app',
      title: '1:1 Call',
      type: 'svg',
      url: '/1to1',
      svg: (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#34C759" />
          <path d="M42,40A30.6,30.6,0,0,1,36,43c-6,1.4-12-1-16-5s-6.4-10-5-16c1-3,2-5,5-7l2-1,5,5-1,3A43,43,0,0,0,29,35a43,43,0,0,0,13,8l3-1,5,5-1,2Z" fill="#fff" />
        </svg>
      )
    },
    {
      id: 'truth-or-dare-app',
      title: 'Truth/Dare',
      type: 'svg',
      url: '/truth-or-dare',
      svg: (
        <svg viewBox="0 0 64 64">
          <rect x="4" y="4" width="56" height="56" rx="14" fill="linear-gradient(135deg, #AF52DE, #5856D6)" />
          <circle cx="32" cy="32" r="28" fill="#AF52DE" />
          <path d="M24 24h16v16H24z" fill="#fff" opacity="0.2" />
          <rect x="26" y="26" width="12" height="12" rx="2" fill="#fff" />
          <circle cx="29" cy="29" r="1.5" fill="#AF52DE" />
          <circle cx="35" cy="35" r="1.5" fill="#AF52DE" />
          <circle cx="29" cy="35" r="1.5" fill="#AF52DE" />
          <circle cx="35" cy="29" r="1.5" fill="#AF52DE" />
          <circle cx="32" cy="32" r="1.5" fill="#AF52DE" />
        </svg>
      )
    },
    {
      id: 'maps-app',
      title: 'Maps',
      type: 'svg',
      url: '/maps',
      svg: (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#007AFF" />
          <path d="M32 12c-8 0-14 6-14 14 0 10 14 26 14 26s14-16 14-26c0-8-6-14-14-14zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="#fff" />
        </svg>
      )
    }
  ];

  const externalApps = [
    { title: 'Instagram', icon: 'https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png', url: 'https://instagram.com' },
    { title: 'Facebook', icon: 'https://img.icons8.com/?size=100&id=118497&format=png', url: 'https://facebook.com' },
    { title: 'Pinterest', icon: 'https://img.icons8.com/?size=100&id=63676&format=png', url: 'https://pinterest.com' },
    { title: 'LinkedIn', icon: 'https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png', url: 'https://linkedin.com' },
    { title: 'Quora', icon: 'https://img.icons8.com/?size=100&id=wPcChHypTdti&format=png', url: 'https://quora.com' },
    { title: 'Reddit', icon: 'https://img.icons8.com/?size=100&id=FLisMqR76b1i&format=png', url: 'https://reddit.com' },
    { title: 'Google', icon: 'https://img.icons8.com/?size=100&id=17949&format=png', url: 'https://google.com' },
    { title: 'Chrome', icon: 'https://img.icons8.com/?size=100&id=63785&format=png', url: 'https://www.google.com/chrome/' },
    { title: 'Google Maps', icon: 'https://img.icons8.com/?size=100&id=DcygmpZqBEd9&format=png', url: 'https://maps.google.com' },
    { title: 'Google Docs', icon: 'https://img.icons8.com/?size=100&id=30464&format=png', url: 'https://docs.google.com' },
    { title: 'Gmail', icon: 'https://img.icons8.com/?size=100&id=qyRpAggnV0zH&format=png', url: 'https://mail.google.com' },
    { title: 'Google Pay', icon: 'https://img.icons8.com/?size=100&id=d3FdjviJ7gNe&format=png', url: 'https://pay.google.com' },
    { title: 'Amazon', icon: 'https://img.icons8.com/?size=100&id=21295&format=png', url: 'https://amazon.com' },
    { title: 'Amazon Music', icon: 'https://img.icons8.com/?size=100&id=3TE5FcLikFfj&format=png', url: 'https://music.amazon.com' },
    { title: 'Apple Music', icon: 'https://img.icons8.com/?size=100&id=D06tiv66uUis&format=png', url: 'https://music.apple.com' },
    { title: 'Amazon Prime', icon: 'https://img.icons8.com/?size=100&id=TUt56jArwSOO&format=png', url: 'https://www.amazon.com/amazonprime' },
    { title: 'Netflix', icon: 'https://img.icons8.com/?size=100&id=ortlsYTZxMvT&format=png', url: 'https://www.netflix.com' },
    { title: 'Flipkart', icon: 'https://img.icons8.com/?size=100&id=UU2im0hihoyi&format=png', url: 'https://www.flipkart.com' },
    { title: 'Swiggy', icon: 'https://img.icons8.com/?size=100&id=M8M9YjBrtUkd&format=png', url: 'https://www.swiggy.com' },
    { title: 'Paytm', icon: 'https://img.icons8.com/?size=100&id=Aub11Fs5DJVg&format=png', url: 'https://www.paytm.com' },
    { title: 'Canva', icon: 'https://img.icons8.com/?size=100&id=iWw83PVcBpLw&format=png', url: 'https://www.canva.com' },
    { title: 'WhatsApp', icon: 'https://img.icons8.com/?size=100&id=16713&format=png', url: 'https://www.whatsapp.com' },
    { title: 'Mail', icon: 'https://img.icons8.com/?size=100&id=cHNRcWMI2bLJ&format=png', url: 'https://www.apple.com/mail' },
    { title: 'Snapchat', icon: 'https://img.icons8.com/?size=100&id=67599&format=png', url: 'https://snapchat.com' },
    { title: 'Telegram', icon: 'https://img.icons8.com/?size=100&id=oWiuH0jFiU0R&format=png', url: 'https://telegram.org' },
    { title: 'Zoom', icon: 'https://img.icons8.com/?size=100&id=82ewLsKHYlLc&format=png', url: 'https://zoom.us' },
    { title: 'Google Meet', icon: 'https://img.icons8.com/?size=100&id=pE97I4t7Il9M&format=png', url: 'https://meet.google.com' },
    { title: 'YouTube Music', icon: 'https://img.icons8.com/?size=100&id=V1cbDThDpbRc&format=png', url: 'https://music.youtube.com' },
    { title: 'Google Translate', icon: 'https://img.icons8.com/?size=100&id=13647&format=png', url: 'https://translate.google.com' },
    { title: 'Perplexity AI', icon: 'https://img.icons8.com/?size=100&id=kzJWN5jCDzpq&format=png', url: 'https://www.perplexity.ai' }
  ];

  const allApps = [
    ...apps,
    ...externalApps.map((app, index) => ({
      id: `external-app-${index}`,
      title: app.title,
      icon: app.icon,
      type: 'image',
      url: app.url
    }))
  ];

  const filteredApps = allApps.filter(app =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full text-white overflow-y-auto no-scrollbar relative flex flex-col bg-black">
      {/* Search Widget - Conditional */}
      {showSearch && (
        <div className="px-6 pt-6 pb-2">
          <div className="w-full bg-[#1c1c1e] rounded-2xl p-3 flex items-center gap-3 border border-white/5 shadow-lg">
            <i className="fas fa-search text-white/40 text-sm"></i>
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white/20 w-full"
              autoFocus
            />
            <i className="fas fa-microphone text-white/40 text-sm"></i>
          </div>
        </div>
      )}

      <div className="flex-1 px-4 pt-4 pb-8">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px 8px',
            width: '100%'
          }}
        >
          {filteredApps.map((app) => (
            <AppIcon
              key={app.id}
              id={app.id}
              title={app.title}
              icon={app.icon}
              type={app.type}
              svg={app.svg}
              url={app.url}
              size={52}
              onClick={() => {
                if (app.url) {
                  if (app.url.startsWith('/')) {
                    navigate(app.url);
                  } else {
                    window.open(app.url, '_blank');
                  }
                } else if (onAppClick) {
                  onAppClick(app.id);
                } else {
                  alert(`${app.title} is coming soon!`);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppScreen;