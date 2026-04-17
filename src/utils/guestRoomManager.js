
const DEFAULT_NAMES = ['Guest', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];

/**
 * Guest Room Manager
 * Handles temporary room creation for guest users
 * Rooms auto-delete after 15 minutes of inactivity
 */

const GUEST_ROOMS_KEY = 'happytalk_guest_rooms';
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Get all guest rooms from localStorage
 */
export const getGuestRooms = () => {
    try {
        const rooms = localStorage.getItem(GUEST_ROOMS_KEY);
        return rooms ? JSON.parse(rooms) : [];
    } catch (error) {
        console.error('Error reading guest rooms:', error);
        return [];
    }
};

/**
 * Save guest rooms to localStorage
 */
const saveGuestRooms = (rooms) => {
    try {
        localStorage.setItem(GUEST_ROOMS_KEY, JSON.stringify(rooms));
    } catch (error) {
        console.error('Error saving guest rooms:', error);
    }
};

/**
 * Create a new guest room
 */
export const createGuestRoom = (roomData, namesByLanguage = {}) => {
    const rooms = getGuestRooms();
    const language = roomData.language || 'English';
    const names = namesByLanguage[language] || namesByLanguage['Default'] || DEFAULT_NAMES;
    const randomName = names[Math.floor(Math.random() * names.length)];

    const newRoom = {
        id: `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: roomData.title,
        topic: roomData.topic || roomData.language,
        language: language,
        max_capacity: roomData.max_capacity || 0,
        happytalk_room_name: `guest-room-${Date.now()}`,
        meeting_url: null, // Will use local HAPPYY TALK
        created_at: new Date().toISOString(),
        last_activity: new Date().toISOString(),
        participants: 0,
        is_guest_room: true,
        is_private: !!roomData.is_private,
        scheduled_start_time: roomData.scheduled_start_time || null,
        level: roomData.level || 'Beginner (A1)',
        audio_default_on: !!roomData.audio_default_on,
        video_default_on: !!roomData.video_default_on,
        screen_share_enabled: roomData.screen_share_enabled !== false,
        chat_enabled: roomData.chat_enabled !== false,
        profile: {
            username: randomName,
            avatar_url: roomData.avatar_url || `/profiles/ACg8ocLxLZ2Fs3tijpP8QwTMBc_JDNdIPW_vqYrlUt1DvV19TcPphxUr-s12.jpeg`
        },
        people: []
    };

    rooms.unshift(newRoom);
    saveGuestRooms(rooms);

    // Track rooms created by this user session so they can delete them
    try {
        const myRooms = JSON.parse(localStorage.getItem('happytalk_my_rooms') || '[]');
        myRooms.push(newRoom.id);
        localStorage.setItem('happytalk_my_rooms', JSON.stringify(myRooms));
    } catch (e) {
        console.error('Error tracking my rooms:', e);
    }

    return newRoom;
};

/**
 * Update room activity (when someone joins/leaves)
 */
export const updateRoomActivity = (roomId, participantCount) => {
    const rooms = getGuestRooms();
    const roomIndex = rooms.findIndex(r => r.id === roomId);

    if (roomIndex !== -1) {
        rooms[roomIndex].last_activity = new Date().toISOString();
        rooms[roomIndex].participants = participantCount;
        saveGuestRooms(rooms);
    }
};

/**
 * Delete a guest room
 */
export const deleteGuestRoom = (roomId) => {
    const rooms = getGuestRooms();
    const filteredRooms = rooms.filter(r => r.id !== roomId);
    saveGuestRooms(filteredRooms);
};

/**
 * Clean up inactive rooms (no participants for 15+ minutes)
 */
export const cleanupInactiveRooms = () => {
    const rooms = getGuestRooms();
    const now = new Date().getTime();

    const activeRooms = rooms.filter(room => {
        const lastActivity = new Date(room.last_activity).getTime();
        const timeSinceActivity = now - lastActivity;

        // Keep room if it has participants OR if it's been less than 15 minutes
        if (room.participants > 0) {
            return true; // Keep rooms with active participants
        }

        if (timeSinceActivity < INACTIVITY_TIMEOUT) {
            return true; // Keep rooms that are still within the timeout period
        }


        return false; // Delete inactive rooms
    });

    if (activeRooms.length !== rooms.length) {
        saveGuestRooms(activeRooms);

    }

    return activeRooms;
};

/**
 * Initialize cleanup interval
 * Checks every minute for inactive rooms
 */
export const startCleanupInterval = () => {
    // Run cleanup immediately
    cleanupInactiveRooms();

    // Then run every minute
    const intervalId = setInterval(() => {
        cleanupInactiveRooms();
    }, 60 * 1000); // Check every minute

    return intervalId;
};

/**
 * Stop cleanup interval
 */
export const stopCleanupInterval = (intervalId) => {
    if (intervalId) {
        clearInterval(intervalId);
    }
};
