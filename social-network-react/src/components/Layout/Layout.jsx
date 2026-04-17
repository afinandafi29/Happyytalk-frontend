import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

import Header from './Header';
import BottomNavbar from './BottomNavbar';
import Footer from './Footer';
import Navigation from '../Navigation';
import { useSocket } from '../../contexts/SocketContext';
import '../../styles/main.css';
import CreateRoomModal from '../CreateRoomModal';
import { getBannersApi } from '../../api/bannerApi';
import { getStaticData } from '../../api/staticApi';
import UserProfileModal from '../UserProfileModal';

import TabletWrapper from './TabletWrapper';
import AnimatedBackground from './AnimatedBackground';
import BannerCarousel from '../BannerCarousel';
import Phone from '../Phone/Phone';
import SearchBar from './SearchBar';
import NotificationToast from './NotificationToast';





export const LayoutContext = React.createContext({});

const Layout = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const { theme, changeTheme } = useTheme();
  const [animationStopped, setAnimationStopped] = useState(false);
  const [customColor, setCustomColor] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [profileModalUser, setProfileModalUser] = useState(null);
  const [profileModalContext, setProfileModalContext] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const pathname = location.pathname;
  const isHomePage = pathname === '/' || pathname === '/jitsi';

  const handleCreateRoomClick = () => {
    // Enable room creation for everyone, even guests
    setCreateModalOpen(true);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeHomeView, setActiveHomeView] = useState('rooms');
  const [categoryVisible, setCategoryVisible] = useState(false);

  const [banners, setBanners] = useState([]);
  const [showBanner, setShowBanner] = useState(() => {
    return localStorage.getItem('showBanner') !== 'false';
  });

  const socket = useSocket();
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeNotification, setActiveNotification] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [profileImages, setProfileImages] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [namesByLanguage, setNamesByLanguage] = useState({});

  const fetchStatic = async () => {
    const data = await getStaticData();
    if (data) {
      if (data.languages) setAvailableLanguages(data.languages);
      if (data.names) setProfileImages(data.names);
      if (data.roomsData) setRoomsData(data.roomsData);
      if (data.namesByLanguage) setNamesByLanguage(data.namesByLanguage);
    }
  };

  // Listen for Live Notifications and Room Updates
  useEffect(() => {
    if (!socket) return;

    const handleNewNotif = (notif) => {
      setUnreadCount(prev => prev + 1);
      setActiveNotification(notif);
      setShowToast(true);

      // Auto-hide toast after 5s
      setTimeout(() => setShowToast(false), 5000);
    };

    socket.on('new_notification', handleNewNotif);

    // Refresh rooms when users join/leave
    socket.on('user_joined_room', () => {
      fetchStatic();
    });
    socket.on('user_left_room', () => {
      fetchStatic();
    });

    socket.on('room_created', () => {
      fetchStatic();
    });

    socket.on('room_deleted', () => {
      fetchStatic();
    });

    return () => {
      socket.off('new_notification', handleNewNotif);
      socket.off('user_joined_room');
      socket.off('user_left_room');
      socket.off('room_created');
      socket.off('room_deleted');
    };
  }, [socket]);

  const handleToastClick = () => {
    setShowToast(false);
    setUnreadCount(0); // Clear on interaction

    if (activeNotification) {
      if (activeNotification.type === 'friend_request' || activeNotification.type === 'message_request' || activeNotification.type === 'friend_accepted') {
        const sender = activeNotification.sender || { id: activeNotification.sender_id };
        // Open profile instead of chat
        setRightSidebarOpen(true);
      } else {
        setRightSidebarOpen(true);
      }
    }
  };

  // Sync activeCategory with pathname
  useEffect(() => {
    if (pathname === '/') setActiveCategory('all');
    else if (pathname === '/feed') setActiveCategory('feed');
    else if (pathname === '/news') setActiveCategory('news');
    else if (pathname === '/youtube') setActiveCategory('youtube');
    else if (pathname === '/premium') setActiveCategory('premium');
    else if (pathname === '/omegle') setActiveCategory('omegle');
    else if (pathname === '/live') setActiveCategory('live');
  }, [pathname]);

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await getBannersApi();
      setBanners(data);
    };
    if (isHomePage) fetchBanners();
  }, [isHomePage]);

  useEffect(() => {
    fetchStatic();
  }, [refreshTrigger]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  // ...



  const toggleAnimation = () => setAnimationStopped(!animationStopped);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const triggerRoomRefresh = () => setRefreshTrigger(prev => prev + 1);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [initialPhoneScreen, setInitialPhoneScreen] = useState('app');



  const layoutContextValue = {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    categoryVisible,
    setCategoryVisible,
    setCreateModalOpen,
    handleCreateRoomClick,
    windowWidth,
    sidebarOpen,
    refreshTrigger, // Export state
    triggerRoomRefresh, // Export function
    activeHomeView,
    setActiveHomeView,
    unreadCount,
    setUnreadCount,
    openProfile: (user, context = {}) => {
      setProfileModalUser(user);
      setProfileModalContext(context);
    },
    isPhoneOpen,
    setIsPhoneOpen,
    profileImages,
    roomsData,
    namesByLanguage,
    availableLanguages,
    initialPhoneScreen,
    setInitialPhoneScreen
  };

  // Listen for global Chat Panel trigger
  useEffect(() => {
    const handleOpenChat = () => {
      setRightSidebarOpen(true);
    };
    window.addEventListener('OPEN_CHAT_PANEL', handleOpenChat);

    const handleOpenAndSelectChat = () => {
      setRightSidebarOpen(true);
    };
    window.addEventListener('OPEN_AND_SELECT_CHAT', handleOpenAndSelectChat);

    const handleOpenAI = () => {
      setInitialPhoneScreen('ai');
      setIsPhoneOpen(true);
    };
    window.addEventListener('OPEN_AI_PANEL', handleOpenAI);

    return () => {
      window.removeEventListener('OPEN_CHAT_PANEL', handleOpenChat);
      window.removeEventListener('OPEN_AND_SELECT_CHAT', handleOpenAndSelectChat);
      window.removeEventListener('OPEN_AI_PANEL', handleOpenAI);
    };
  }, []);

  const isYouTubePage = pathname === '/youtube';
  const isImmersivePage = ['/premium', '/1to1'].includes(pathname);

  // Immersive full-screen pages that should not have main layout padding or main sidebar
  const fullScreenApps = [
    '/youtube', '/movies', '/music', '/live', '/learning', '/quizzes', '/ai-chat', '/news', '/apps', '/premium', '/1to1',
    '/how-it-works', '/features', '/about', '/report', '/faq', '/contact',
    '/community-standards', '/safety-center', '/verification', '/terms', '/privacy', '/cookies'
  ];
  const isFullScreenApp = fullScreenApps.some(route => pathname.startsWith(route));
  const isShortsView = isHomePage && activeHomeView === 'shorts';

  // Routes that should be wrapped in a tablet frame
  const appRoutes = [
    '/learning-languages',
    '/basic-learning', '/english-quiz', '/spanish-quiz'
  ];

  // Check if current path or any parent path is an app route
  const isAppPage = appRoutes.some(route => pathname.startsWith(route));
  const isMomentsPage = pathname === '/moments';

  const shouldHideNav = isShortsView || isFullScreenApp || isMomentsPage;
  const isNewsPage = pathname.startsWith('/news');
  const shouldHideBottomNav = (isFullScreenApp && !isNewsPage && !pathname.startsWith('/apps') && !pathname.startsWith('/learning') && !pathname.startsWith('/premium')) || isMomentsPage; // News, Apps, Learning, Premium should show bottom buttons


  return (
    <LayoutContext.Provider value={layoutContextValue}>
      <div className="background-glows">
        {/* Glow divs remain same */}
        <div className="glow1"></div>
        <div className="glow2"></div>
        <div className="glow3"></div>
        <div className="glow4"></div>
        <div className="glow5"></div>
        <div className="streak streak1"></div>
        <div className="streak streak2"></div>
        <div className="streak streak3"></div>
        <div className="streak streak4"></div>
        <div className="streak streak5"></div>
      </div>
      <AnimatedBackground />
      <div
        className="layout-root-wrapper min-h-screen flex flex-col"
        data-animation-stopped={animationStopped ? 'true' : 'false'}
      >
        {!shouldHideNav && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={toggleSidebar}
            onToggleAnimation={toggleAnimation}
            animationStopped={animationStopped}
            currentPath={pathname}
            user={currentUser}
          />
        )}

        <div
          className={`overlay ${sidebarOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
        ></div>

        <RightSidebar
          isOpen={rightSidebarOpen}
          onClose={toggleRightSidebar}
          onCreateRoomClick={handleCreateRoomClick}
        />



        <div className={`page-content-container flex flex-col flex-grow ${(sidebarOpen && windowWidth > 768 && !shouldHideNav) ? 'shifted' : ''} ${isShortsView ? 'layout-shorts-view' : ''}`}>
          <div className={`${isShortsView ? 'layout-header-absolute' : 'layout-header-sticky'}`}>
            {(!shouldHideNav || isShortsView) && (
              <>
                <Header
                  onMenuClick={toggleSidebar}
                  onProfileClick={toggleRightSidebar}
                  user={currentUser}
                  isHomePage={isHomePage}
                  isShortsView={isShortsView}
                />

                {!isShortsView && (
                  <div className="layout-persistent-nav">
                    <div className="w-full px-4 flex flex-col items-center">
                      {isHomePage && (
                        <div className="w-full flex flex-col items-center">
                          {/* Banner Section */}
                          {showBanner && banners.length > 0 && (
                            <div className="w-full max-w-7xl mt-8 mb-2 px-4">
                              <BannerCarousel onClose={() => {
                                setShowBanner(false);
                                localStorage.setItem('showBanner', 'false');
                              }} />
                            </div>
                          )}

                          <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            onClearSearch={() => {
                              setSearchTerm('');
                              setTimeout(() => document.getElementById('search-input')?.focus(), 0);
                            }}
                            showBanner={showBanner}
                            bannersCount={banners.length}
                          />

                        </div>
                      )}

                      <div className="w-full pt-1">
                        <Navigation
                          onExpandClick={() => setCategoryVisible(!categoryVisible)}
                          onCreateRoomClick={handleCreateRoomClick}
                          activeCategory={activeCategory}
                          setActiveCategory={setActiveCategory}
                          isExpanded={categoryVisible}
                          onThemeClick={() => {
                            const themes = ['space', 'dark', 'light'];
                            const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
                            changeTheme(themes[nextIndex]);
                          }}
                          onChatClick={() => setActiveCategory('chat')}
                          languages={availableLanguages.length > 0 ? availableLanguages : []}
                          onCategoryClick={(language) => {
                            setActiveCategory(language.toLowerCase());
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <main className={`main-content-area flex-grow overflow-x-hidden ${shouldHideNav ? '' : 'p-4'}`}>
            {isAppPage ? (
              <TabletWrapper title={pathname.substring(1).toUpperCase()}>
                <Outlet />
              </TabletWrapper>
            ) : (
              <Outlet />
            )}
          </main>
          {!shouldHideNav && <Footer />}
        </div>

        {!shouldHideBottomNav && (
          <BottomNavbar
            activeButton={pathname}
            onCreateClick={handleCreateRoomClick}
            isHomePage={isHomePage}
            isShortsView={isShortsView}
            isNewsPage={isNewsPage}
          />
        )}

        {createModalOpen && (
          <CreateRoomModal
            isOpen={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onRoomCreated={() => {
              setCreateModalOpen(false);
              triggerRoomRefresh(); // Trigger refresh on creation
            }}
          />
        )}


        <NotificationToast
          notification={activeNotification}
          onToastClick={handleToastClick}
          onToastClose={() => setShowToast(false)}
        />



        {isPhoneOpen && (
          <div className="fixed inset-0 z-[1002] flex items-center justify-end p-4 md:p-12 pointer-events-none">
            <div className="absolute inset-0 bg-black/10 pointer-events-auto" onClick={() => setIsPhoneOpen(false)}></div>
            <div className="relative transform scale-110 md:scale-100 transition-all duration-300 pointer-events-auto md:mr-4">
              <Phone onClose={() => setIsPhoneOpen(false)} initialScreen={initialPhoneScreen} />
            </div>
          </div>
        )}

        {/* Profile Modal Render */}
        {profileModalUser && (
          <UserProfileModal
            isOpen={!!profileModalUser}
            onClose={() => setProfileModalUser(null)}
            user={profileModalUser}
            currentUser={currentUser}
            {...profileModalContext}
          />
        )}
      </div>
    </LayoutContext.Provider >
  );
};

export default Layout;
