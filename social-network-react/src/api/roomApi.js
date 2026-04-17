// Frontend-only Room API using localStorage
import { mockRooms } from '../data/mockRooms';

const USER_ROOMS_KEY = 'happytalk_user_created_rooms';
// Bump this version string any time mockRooms.js is regenerated to bust the cache
const DATA_VERSION = 'v10-massive-rooms-2026-04-16';
const VERSION_KEY = 'happytalk_rooms_version';

// On version change, wipe ALL old caches
const bustCache = () => {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== DATA_VERSION) {
        // Clear all old room caches
        localStorage.removeItem('happytalk_local_rooms');
        localStorage.removeItem('happytalk_rooms');
        localStorage.removeItem(USER_ROOMS_KEY);
        localStorage.setItem(VERSION_KEY, DATA_VERSION);
    }
};

// Get only user-created rooms (rooms added via the UI, not mockRooms)
const getUserCreatedRooms = () => {
    try {
        const rooms = localStorage.getItem(USER_ROOMS_KEY);
        if (!rooms) return [];
        return JSON.parse(rooms);
    } catch (e) {
        return [];
    }
};

const saveUserCreatedRooms = (rooms) => {
    localStorage.setItem(USER_ROOMS_KEY, JSON.stringify(rooms));
};

export const getRoomsApi = async () => {
    bustCache();
    // Always use mockRooms as the base, then prepend any user-created rooms
    const userRooms = getUserCreatedRooms();
    return [...userRooms, ...mockRooms];
};


export const createRoomApi = async (roomData) => {
    const userRooms = getUserCreatedRooms();
    const slug = roomData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const newRoom = {
        ...roomData,
        id: `room-${Date.now()}`,
        created_at: new Date().toISOString(),
        jitsi_room_name: slug,
        mirotalk_room_name: slug,
        is_active: true,
        people: []
    };
    userRooms.unshift(newRoom);
    saveUserCreatedRooms(userRooms);
    return newRoom;
};

export const setRoomTopicApi = async (roomId, topicData) => {
    const userRooms = getUserCreatedRooms();
    const idx = userRooms.findIndex(r => r.id === roomId);
    if (idx !== -1) {
        userRooms[idx].topic = topicData.topic;
        saveUserCreatedRooms(userRooms);
        return { message: 'Topic updated', room: userRooms[idx] };
    }
    // mockRooms are read-only, just acknowledge
    return { message: 'Topic updated (mock)' };
};

export const deleteRoomApi = async (roomId) => {
    // Check user-created rooms
    const userRooms = getUserCreatedRooms();
    const filtered = userRooms.filter(r => r.id !== roomId);
    if (filtered.length !== userRooms.length) {
        saveUserCreatedRooms(filtered);
        return { message: "Room deleted successfully" };
    }

    // Check guest rooms
    const guestRoomsStr = localStorage.getItem('happytalk_guest_rooms');
    if (guestRoomsStr) {
        const guestRooms = JSON.parse(guestRoomsStr);
        const filteredGuest = guestRooms.filter(r => r.id !== roomId);
        if (filteredGuest.length !== guestRooms.length) {
            localStorage.setItem('happytalk_guest_rooms', JSON.stringify(filteredGuest));
            return { message: "Room deleted successfully" };
        }
    }

    return { message: "Room not found" };
};

export const joinRoomByInviteApi = async (token) => {
    const allRooms = [...getUserCreatedRooms(), ...mockRooms];
    const room = allRooms.find(r => r.invite_token === token);
    if (room) return { room };
    throw new Error('Invalid invite token');
};

export const regenerateInviteTokenApi = async (roomId) => {
    const userRooms = getUserCreatedRooms();
    const idx = userRooms.findIndex(r => r.id === roomId);
    if (idx !== -1) {
        const newToken = Math.random().toString(36).substr(2, 9);
        userRooms[idx].invite_token = newToken;
        saveUserCreatedRooms(userRooms);
        return { message: 'Invite link regenerated.', invite_token: newToken };
    }
    throw new Error('Room not found');
};

export const disableInviteTokenApi = async (roomId) => {
    const userRooms = getUserCreatedRooms();
    const idx = userRooms.findIndex(r => r.id === roomId);
    if (idx !== -1) {
        userRooms[idx].invite_token = null;
        saveUserCreatedRooms(userRooms);
        return { message: 'Invite link disabled.' };
    }
    throw new Error('Room not found');
};

export const toggleRoomPrivacyApi = async (roomId) => {
    // Check user-created rooms
    const userRooms = getUserCreatedRooms();
    const idx = userRooms.findIndex(r => r.id === roomId);
    if (idx !== -1) {
        userRooms[idx].is_private = !userRooms[idx].is_private;
        if (userRooms[idx].is_private && !userRooms[idx].invite_token) {
            userRooms[idx].invite_token = Math.random().toString(36).substr(2, 9);
        }
        saveUserCreatedRooms(userRooms);
        return { message: 'Privacy toggled', room: userRooms[idx] };
    }

    // Check guest rooms
    const guestRoomsStr = localStorage.getItem('happytalk_guest_rooms');
    if (guestRoomsStr) {
        const guestRooms = JSON.parse(guestRoomsStr);
        const guestIdx = guestRooms.findIndex(r => r.id === roomId);
        if (guestIdx !== -1) {
            guestRooms[guestIdx].is_private = !guestRooms[guestIdx].is_private;
            if (guestRooms[guestIdx].is_private && !guestRooms[guestIdx].invite_token) {
                guestRooms[guestIdx].invite_token = Math.random().toString(36).substr(2, 9);
            }
            localStorage.setItem('happytalk_guest_rooms', JSON.stringify(guestRooms));
            return { message: 'Privacy toggled', room: guestRooms[guestIdx] };
        }
    }

    throw new Error('Room not found');
};

export const addParticipantToRoomApi = async (roomId, user) => {
    // Check user-created rooms
    const userRooms = getUserCreatedRooms();
    const idx = userRooms.findIndex(r => r.id === roomId);
    if (idx !== -1) {
        if (!userRooms[idx].people) userRooms[idx].people = [];
        if (!userRooms[idx].people.some(p => String(p.id) === String(user.id))) {
            userRooms[idx].people.unshift(user);
            saveUserCreatedRooms(userRooms);
        }
        return userRooms[idx];
    }

    // Check guest rooms
    const guestRoomsStr = localStorage.getItem('happytalk_guest_rooms');
    if (guestRoomsStr) {
        const guestRooms = JSON.parse(guestRoomsStr);
        const guestIdx = guestRooms.findIndex(r => r.id === roomId);
        if (guestIdx !== -1) {
            if (!guestRooms[guestIdx].people) guestRooms[guestIdx].people = [];
            if (!guestRooms[guestIdx].people.some(p => String(p.id) === String(user.id))) {
                guestRooms[guestIdx].people.unshift(user);
                localStorage.setItem('happytalk_guest_rooms', JSON.stringify(guestRooms));
            }
            return guestRooms[guestIdx];
        }
    }

    return null;
};

