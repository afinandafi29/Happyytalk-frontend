import React from 'react';

const NotificationToast = ({ notification, onToastClick, onToastClose }) => {
  if (!notification) return null;

  return (
    <div
      onClick={onToastClick}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] w-[90%] max-w-sm bg-[#1e293b]/90 backdrop-blur-xl border border-blue-500/30 rounded-[24px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(37,99,235,0.2)] cursor-pointer animate-in fade-in slide-in-from-top-4"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={notification.sender?.avatar_url || '/default-avatar.png'}
            className="w-12 h-12 rounded-full border border-white/10"
            alt=""
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#1e293b]">
            <i className="fas fa-bell text-[8px] text-white"></i>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-black text-sm uppercase tracking-tight truncate">
            {notification.sender?.username || 'New Alert'}
          </p>
          <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
            {notification.type === 'friend_request' && 'Sent you a friend request'}
            {notification.type === 'friend_accepted' && 'Accepted your friend request'}
            {notification.type === 'message_request' && 'Sent you a message request'}
            {notification.type === 'follow' && 'Started following you'}
          </p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToastClose(); }}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
        >
          <i className="fas fa-times text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
