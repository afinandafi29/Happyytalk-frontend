import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import RoomCard from '../components/RoomCard';
import { LayoutContext } from '../components/Layout/Layout';
import { getRoomsApi, joinRoomByInviteApi } from '../api/roomApi';
// import { getJitsiTokenApi } from '../api/jitsiApi'; // Removed for frontend-only mode
import { startCleanupInterval, stopCleanupInterval } from '../utils/guestRoomManager';
import ShortsSection from '../components/ShortsSection';
import '../styles/main.css';

function Home() {
  const {
    searchTerm,
    activeCategory,
    unreadCount,
    setUnreadCount,
    refreshTrigger,
    activeHomeView,
    setActiveHomeView,
    isPhoneOpen,
    setIsPhoneOpen,
    setInitialPhoneScreen,
    handleCreateRoomClick,
    roomsData
  } = useContext(LayoutContext);

  const [rooms, setRooms] = useState(roomsData || []);
  const [isLoading, setIsLoading] = useState(!roomsData || roomsData.length === 0);
  const [error, setError] = useState(null);
  const [highlightedAvatars, setHighlightedAvatars] = useState(new Set());

  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (roomsData && roomsData.length > 0) {
      setRooms([...roomsData]);
    }
  }, [roomsData]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedRooms = await getRoomsApi();
      let allRooms = [];

      if (fetchedRooms && fetchedRooms.length > 0) {
        allRooms = [...fetchedRooms];
      } else {
        allRooms = [...(roomsData || [])];
      }
      setRooms(allRooms);
    } catch (err) {
      console.error("Error fetching data for Home:", err);
      setRooms([...(roomsData || [])]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      const allParticipants = rooms.flatMap(room => room.people || []);
      const shuffled = [...allParticipants].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10).map(p => p.avatar_url).filter(Boolean);
      setHighlightedAvatars(new Set(selected));
    }
  }, [rooms]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger]);

  useEffect(() => {
    const cleanupIntervalId = startCleanupInterval();
    const refreshIntervalId = setInterval(() => {
      // Only refresh if document is visible and NOT in shorts view
      if (document.visibilityState === 'visible' && activeHomeView !== 'shorts') {
        fetchData();
      }
    }, 60 * 1000);
    return () => {
      stopCleanupInterval(cleanupIntervalId);
      clearInterval(refreshIntervalId);
    };
  }, [fetchData, activeHomeView]);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleRoomCreated = (newRoom) => {
      setRooms((prevRooms) => {
        if (prevRooms.some(r => r.id === newRoom.id)) return prevRooms;
        return [newRoom, ...prevRooms];
      });
    };

    const handleUserJoined = ({ roomName, user }) => {
      setRooms(prevRooms => prevRooms.map(room => {
        if (room.jitsi_room_name === roomName) {
          const people = room.people || [];
          const userId = user.id || user.userId;
          if (people.some(p => (p.id || p.userId) === userId)) return room;
          return { ...room, people: [user, ...people] };
        }
        return room;
      }));
    };

    const handleUserLeft = ({ roomName, userId }) => {
      setRooms(prevRooms => prevRooms.map(room => {
        if (room.jitsi_room_name === roomName) {
          const people = room.people || [];
          return { ...room, people: people.filter(p => (p.id || p.userId) !== userId) };
        }
        return room;
      }));
    };

    const handleRoomDeleted = ({ roomId }) => {
      setRooms((prevRooms) => prevRooms.filter(r => r.id !== roomId));
    };

    socket.on('room_created', handleRoomCreated);
    socket.on('room_deleted', handleRoomDeleted);
    socket.on('user_joined_room', handleUserJoined);
    socket.on('user_left_room', handleUserLeft);

    return () => {
      socket.off('room_created', handleRoomCreated);
      socket.off('room_deleted', handleRoomDeleted);
      socket.off('user_joined_room', handleUserJoined);
      socket.off('user_left_room', handleUserLeft);
    };
  }, [socket, fetchData]);

  // Handle auto-join from shared links or invites (Merged from Main UI)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const joinRoomName = searchParams.get('join');
    const inviteToken = searchParams.get('invite');

    if (inviteToken) {
      const handleInvite = async () => {
        try {
          const { room } = await joinRoomByInviteApi(inviteToken);
          if (room) {
            const user = currentUser || {
              id: `guest-${Math.random().toString(36).substr(2, 9)}`,
              user_metadata: {
                username: `Guest-${Math.random().toString(36).substr(2, 4)}`,
                avatar_url: ''
              }
            };

            const encodedName = encodeURIComponent(user.user_metadata?.username || user.username || 'Guest');
            const mirotalkUrl = `https://p2p.mirotalk.com/join/default?name=${encodedName}&invite=${inviteToken}`;
            
            window.open(mirotalkUrl, '_blank');
            navigate('/', { replace: true });
          }
        } catch (err) {
          console.error('Invite join failed:', err);
          navigate('/', { replace: true });
        }
      };
      handleInvite();
    } else if (joinRoomName && rooms.length > 0) {
      const roomToJoin = rooms.find(r => r.jitsi_room_name === joinRoomName || r.id === joinRoomName);
      if (roomToJoin) {
        const user = currentUser || {
          id: `guest-${Math.random().toString(36).substr(2, 9)}`,
          user_metadata: {
            username: `Guest-${Math.random().toString(36).substr(2, 4)}`,
            avatar_url: ''
          }
        };
        const encodedName = encodeURIComponent(user.user_metadata?.username || user.username || 'Guest');
        const mirotalkUrl = `https://p2p.mirotalk.com/join/default?name=${encodedName}`;
        window.open(mirotalkUrl, '_blank');
        navigate('/', { replace: true });
      }
    }
  }, [location.search, rooms, navigate, currentUser]);

  const filterRooms = useCallback((room) => {
    const sTerm = (searchTerm || '').toLowerCase();
    const aCat = (activeCategory || 'all').toLowerCase();

    if (sTerm && !room.title?.toLowerCase().includes(sTerm)) {
      return false;
    }

    // Privacy Filter: Only show private rooms to the creator
    if (room.is_private && currentUser?.id !== room.created_by) {
      return false;
    }

    if (aCat === 'all' || aCat === 'trending') return true;
    if (aCat === 'news') return room.title?.toLowerCase().includes('news') || room.topic?.toLowerCase().includes('news');
    if (aCat === 'youtube') return room.title?.toLowerCase().includes('youtube') || room.topic?.toLowerCase().includes('video');
    if (aCat === 'podcast') return room.title?.toLowerCase().includes('podcast') || room.topic?.toLowerCase().includes('podcast');
    if (aCat === 'movies') return room.title?.toLowerCase().includes('movie') || room.topic?.toLowerCase().includes('movie');

    // Strict language/topic filter for Explore by Language
    const isMatch = room.language?.toLowerCase() === aCat || 
                   room.topic?.toLowerCase() === aCat ||
                   room.title?.toLowerCase().includes(aCat);
    
    return isMatch;
  }, [searchTerm, activeCategory, currentUser?.id]);

  const renderContent = () => {
    if (activeHomeView === 'shorts') {
      return <ShortsSection onBack={() => setActiveHomeView('rooms')} />;
    }

    const allFiltered = rooms.filter(filterRooms).sort((a, b) => {
      const aCat = (activeCategory || 'all').toLowerCase();
      if (aCat === 'all') return 0;
      
      const aMatch = (a.topic?.toLowerCase() === aCat || a.language?.toLowerCase() === aCat);
      const bMatch = (b.topic?.toLowerCase() === aCat || b.language?.toLowerCase() === aCat);
      
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });

    const now = new Date();

    const liveRooms = allFiltered.filter(room => {
      if (!room.scheduled_start_time) return true;
      return new Date(room.scheduled_start_time) <= now;
    }).sort((a, b) => {
      // Prioritize recently activated scheduled rooms and newly created rooms
      const timeA = a.scheduled_start_time ? new Date(a.scheduled_start_time).getTime() : new Date(a.created_at || 0).getTime();
      const timeB = b.scheduled_start_time ? new Date(b.scheduled_start_time).getTime() : new Date(b.created_at || 0).getTime();
      return timeB - timeA;
    });

    const scheduledRooms = allFiltered.filter(room => {
      if (!room.scheduled_start_time) return false;
      return new Date(room.scheduled_start_time) > now;
    }).sort((a, b) => {
      // Sort upcoming rooms by soonest start time first
      return new Date(a.scheduled_start_time).getTime() - new Date(b.scheduled_start_time).getTime();
    });

    return (
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Live Rooms Section */}
        <div className="room-grid mt-0" id="room-grid">
          {liveRooms.length > 0 ? (
            liveRooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                currentUser={currentUser}
                onTopicUpdated={fetchData}
                highlightedAvatars={highlightedAvatars}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 opacity-60">
              <i className="fas fa-ghost text-4xl mb-4"></i>
              <p className="text-sm font-medium">No active rooms found</p>
            </div>
          )}
        </div>

        {/* Scheduled Rooms Section (Improved Mobile UI) */}
        {scheduledRooms.length > 0 && (
          <div className="mt-2 mb-24 md:mb-20 fade-in-on-load">
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Upcoming
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                Scheduled
              </span>
            </div>
            <div className="room-grid mt-0">
              {scheduledRooms.map(room => (
                <div key={room.id} className="relative group overflow-hidden rounded-[32px]">
                  {/* Time Badge Overlay */}
                  <div className="absolute top-5 right-5 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-xs font-black text-indigo-400 flex items-center gap-2 shadow-2xl">
                    <i className="far fa-clock text-indigo-500"></i>
                    {new Date(room.scheduled_start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  
                  <div className="hover:opacity-100 transition-all duration-500 transform group-hover:scale-[1.02]">
                    <div className="relative">
                      <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none rounded-[32px] z-10" />
                      <RoomCard
                        room={room}
                        currentUser={currentUser}
                        onTopicUpdated={fetchData}
                        highlightedAvatars={highlightedAvatars}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isLoading && rooms.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader-container">
          <div className="premium-loader">
            <div></div><div></div><div></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p>{error}</p>
        <button onClick={fetchData} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Retry</button>
      </div>
    );
  }

  return (
    <div className="home-container w-full overflow-x-hidden">
      {/* Floating Action Buttons from New UI - Always visible now, mobile placement handled via CSS */}
      {activeHomeView !== 'shorts' && (
        <div className="fixed bottom-32 right-8 flex flex-col gap-4 z-50 floating-action-buttons">
          {/* Chat/Message Button */}
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('OPEN_CHAT_PANEL'));
            }}
            className="relative w-16 h-16 md:w-14 md:h-14 bg-[#0f172a] hover:scale-110 active:scale-95 text-white rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-300 border border-white/10 cursor-pointer"
            title="Messages"
          >
            <div className="absolute inset-0 bg-indigo-500/10 transition-colors" />
            <i className="fas fa-comment-dots text-2xl relative z-10 text-indigo-400"></i>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg ring-2 ring-[#0f172a] z-20">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={() => {
              navigate('/ai-chat');
            }}
            className="floating-ai-btn relative w-16 h-16 md:w-14 md:h-14 bg-[#0f172a] active:scale-95 text-white rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.5)] border border-white/10 cursor-pointer overflow-hidden p-0"
            title="AI Assistant"
          >
            <div className="absolute inset-0 bg-blue-500/10 transition-colors" />
            
            {/* Supreme Scale Bot Face - Fills Entire Container Volume */}
            <div className="relative z-10 w-full h-full flex items-center justify-center transform scale-[2.2]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="10" rx="3" stroke="url(#supremeBotGradient)" strokeWidth="1.5" />
                <circle cx="8" cy="16" r="2" fill="url(#supremeBotGradient)" />
                <circle cx="16" cy="16" r="2" fill="url(#supremeBotGradient)" />
                <path d="M12 11V7M8 7H16" stroke="url(#supremeBotGradient)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="5" r="1.2" fill="white" />
                <defs>
                  <linearGradient id="supremeBotGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60A5FA" />
                    <stop offset="1" stopColor="#C084FC" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </button>
 
          {/* Create/Plus Button (Merged) */}
          <button
            onClick={() => {
              setInitialPhoneScreen('app');
              setIsPhoneOpen(true);
            }}
            className="w-16 h-16 md:w-14 md:h-14 bg-[#0f172a] hover:scale-110 active:scale-95 text-white rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-300 border border-white/10 cursor-pointer"
            title="Apps"
          >
            <i className="fas fa-plus text-2xl"></i>
          </button>
        </div>
      )}


      {renderContent()}

      <div className="md:hidden h-16"></div>


    </div>
  );
}

export default Home;