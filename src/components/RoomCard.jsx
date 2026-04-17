import { useContext } from 'react';
import { LayoutContext } from './Layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useRoomActions } from './RoomCard/useRoomActions';
import RoomHeader from './RoomCard/RoomHeader';
import RoomAvatars from './RoomCard/RoomAvatars';
import RoomFooter from './RoomCard/RoomFooter';
import RoomModals from './RoomCard/RoomModals';
import { filterProfanity } from '../utils/profanityFilter';

const RoomCard = ({ room, currentUser: propCurrentUser, onTopicUpdated, highlightedAvatars }) => {
    const { currentUser: authUser } = useAuth();
    const currentUser = propCurrentUser || authUser;
    const { openProfile } = useContext(LayoutContext);

    const {
        showDeleteConfirm, setShowDeleteConfirm,
        isDeleting,
        showLoginModal, setShowLoginModal,
        showFullModal, setShowFullModal,
        showMenu, setShowMenu,
        isFull,
        handleJoinRoom,
        handleShare,
        handleTogglePrivacy,
        handleDeleteRoom
    } = useRoomActions({ room, currentUser, onTopicUpdated });

    const {
        id, title, topic, profile: creator, people: profiles,
        created_by, is_private, language, is_guest_room, level
    } = room;

    const isOwner = (currentUser && (String(currentUser.id) === String(created_by))) || 
                    (JSON.parse(localStorage.getItem('happytalk_my_rooms') || '[]').includes(id));

    // Deduplicate participants
    const rawParticipants = profiles || [];
    const seenIds = new Set();
    const seenNames = new Set();
    let participants = rawParticipants.filter(p => {
        const name = (p.username || p.name || p.display_name)?.toLowerCase();
        if (seenIds.has(p.id) || seenNames.has(name)) return false;
        if (p.id) seenIds.add(p.id);
        if (name) seenNames.add(name);
        return true;
    });

    // Ensure current user is 1st if they are in the room
    if (currentUser) {
        const userIndex = participants.findIndex(p => String(p.id) === String(currentUser.id));
        if (userIndex > -1) {
            const userProfile = participants.splice(userIndex, 1)[0];
            participants.unshift(userProfile);
        }
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const getCardGradient = (lang) => {
        // On mobile, the CSS class handles the transparent glass background
        if (isMobile) return 'none';
        const l = (lang || '').toLowerCase();
        const base = '135deg, ';
        const end = ' 0%, rgba(10, 12, 30, 0.55) 100%)';
        if (l.includes('english')) return `linear-gradient(${base}rgba(29, 94, 255, 0.18)${end}`;
        if (l.includes('spanish')) return `linear-gradient(${base}rgba(255, 120, 0, 0.14)${end}`;
        if (l.includes('french')) return `linear-gradient(${base}rgba(220, 0, 80, 0.14)${end}`;
        if (l.includes('german')) return `linear-gradient(${base}rgba(255, 210, 0, 0.12)${end}`;
        if (l.includes('japanese')) return `linear-gradient(${base}rgba(255, 50, 100, 0.12)${end}`;
        if (l.includes('korean')) return `linear-gradient(${base}rgba(110, 0, 255, 0.12)${end}`;
        if (l.includes('chinese')) return `linear-gradient(${base}rgba(220, 30, 30, 0.14)${end}`;
        if (l.includes('portuguese')) return `linear-gradient(${base}rgba(0, 200, 80, 0.14)${end}`;
        return `linear-gradient(${base}rgba(255, 255, 255, 0.05)${end}`;
    };

    return (
        <>
            <div
                className="room-card relative flex flex-col justify-between overflow-hidden transition-all duration-300 group"
                style={{
                    background: getCardGradient(language),
                }}
>
                <RoomHeader 
                    title={filterProfanity(title)} topic={filterProfanity(topic)} language={language} level={level} is_private={is_private}
                    isOwner={isOwner} showMenu={showMenu} setShowMenu={setShowMenu}
                    handleTogglePrivacy={handleTogglePrivacy} setShowDeleteConfirm={setShowDeleteConfirm}
                />

                <RoomAvatars 
                    participants={participants} highlightedAvatars={highlightedAvatars} openProfile={openProfile}
                />

                <RoomFooter 
                    creator={creator} created_by={created_by} currentUser={currentUser}
                    is_guest_room={is_guest_room} id={id} isOwner={isOwner} isFull={isFull}
                    handleShare={handleShare} handleJoinRoom={handleJoinRoom}
                    setShowDeleteConfirm={setShowDeleteConfirm} openProfile={openProfile}
                    scheduled_start_time={room.scheduled_start_time}
                />

                <style>{`@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>

            <RoomModals 
                showDeleteConfirm={showDeleteConfirm} setShowDeleteConfirm={setShowDeleteConfirm}
                handleDeleteRoom={handleDeleteRoom} isDeleting={isDeleting} title={title}
                showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}
                showFullModal={showFullModal} setShowFullModal={setShowFullModal}
            />
        </>
    );
};

export default RoomCard;
