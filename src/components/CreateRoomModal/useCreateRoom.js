import { useState, useEffect } from 'react';
import { createRoomApi } from '../../api/roomApi';
import { createGuestRoom } from '../../utils/guestRoomManager';
import { callAI } from '../../utils/ai/ai-service';

export const useCreateRoom = ({ isOpen, onClose, onRoomCreated, currentUser, namesByLanguage }) => {
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [durationHours, setDurationHours] = useState(1);
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [language, setLanguage] = useState('English');
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [banStatus, setBanStatus] = useState({ isBanned: false, remaining: 0 });
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [scheduledAt, setScheduledAt] = useState(null);
    const [level, setLevel] = useState('Beginner (A1)');

    // checkIpStatus removed for frontend-only mode

    const suggestTitle = async () => {
        const customTitles = [
            "🗣 Casual Talk (Any Level)", "🎯 Practice Speaking", "📚 Grammar Practice", 
            "💼 Business English", "🎤 Public Speaking", "🤝 Networking Room", "❤️ Mental Health Talk",
            "Beginner’s First Steps", "Newbie Language Lounge", "I’m New Here – Let’s Learn!",
            "Absolute Beginner Corner", "Hello World – Language Starters", "Fresh Start Language Room",
            "Zero to Hero Beginners", "Just Started Learning", "New Learner Hub", "Beginner Buddies",
            "First Words Club", "I’m a Beginner Too!", "Super Newbie Zone", "Learning from Scratch",
            "Welcome New Learners", "No Experience Needed", "Beginner Friendly Chat", "My First 100 Words",
            "Gentle Beginners Room", "Newbie Safe Space", "Starting from Zero", "Language Newbies Unite",
            "Beginner’s Happy Place", "Total Beginner Hangout", "Easy Peasy Beginners", "Slow & Steady Learners",
            "Beginner Vibes Only", "First-Time Learners", "Super Simple Starters", "Learning the Basics",
            "New Learner Lounge", "A1 Level Friends", "Complete Newbie Nest", "Let’s Begin Together",
            "Rookie Language Room", "Beginner’s Bootcamp", "Tiny Steps Language Room", "Newbie Night Vibes",
            "Language Newcomers", "Zero Knowledge Zone", "Newbie Nest", "Learning ABCs Together",
            "Beginner’s Buddy System", "Language for Newbies", "Newbie Nook", "Starting Strong Beginners",
            "Hello Beginner World", "Beginner’s Sanctuary", "Fresh Start Friends", "Language Rookie Room",
            "Newbie Learning Loop", "Beginner’s Joyful Journey", "Easy Entry Language Room", "Beginner’s Chill Zone",
            "Midnight Polyglots", "Polyglot Pub", "Language Exchange Buffet", "Worldly Wisdom Chat",
            "Fluent Friends", "Accent Improvement Lab", "Slang & Idioms Workshop", "Culture Swap Cafe",
            "The Grammar Gurus", "Vocabulary Voyagers", "Sentence Structure Seekers", "Fluent Flow Room",
            "Linguistic Labyrinth", "Word Wise Walkers", "Flashcard Friends", "Movie & Music Talk",
            "Global Gossip (Language)", "Street Smart Language", "Formal vs Informal Lab", "The Pronunciation Pros"
        ];
        
        const randomTitle = customTitles[Math.floor(Math.random() * customTitles.length)];
        setTitle(randomTitle);
    };

    const resetForm = () => {
        setTitle('');
        setTopic('');
        setIsPrivate(false);
        setDurationHours(1);
        setDurationMinutes(0);
        setLanguage('English');
        setMaxCapacity(0);
        setScheduledAt(null);
        setError(null);
        setLevel('Beginner (A1)');
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        if (banStatus.isBanned) {
            setError('You cannot create rooms while banned.');
            return;
        }
        if (!title.trim()) {
            setError('Room title cannot be empty.');
            return;
        }

        const hours = parseInt(durationHours, 10);
        const minutes = parseInt(durationMinutes, 10);

        if (isNaN(hours) || isNaN(minutes) || (hours === 0 && minutes === 0) || hours < 0 || minutes < 0 || hours > 24 || minutes >= 60) {
            setError('Invalid room duration. Hours (0-24), Minutes (0-59). Total must be > 0.');
            return;
        }
        if ((hours * 60 + minutes) < 5) {
            setError('Minimum room duration is 5 minutes.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (!currentUser) {
                const { PROFILE_IMAGES } = await import('../../data/profileImages');
                const randomAvatar = PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];
                
                const guestRoomData = {
                    title: title.trim(),
                    topic: language,
                    language: language,
                    max_capacity: parseInt(maxCapacity, 10) || 0,
                    audio_default_on: true,
                    video_default_on: true,
                    screen_share_enabled: true,
                    chat_enabled: true,
                    scheduled_start_time: scheduledAt ? scheduledAt.toISOString() : null,
                    level: level,
                    avatar_url: randomAvatar
                };

                const newRoom = createGuestRoom(guestRoomData, namesByLanguage);
                onRoomCreated(newRoom);
                resetForm();
                onClose();
                return;
            }

            const roomData = {
                title: title.trim(),
                topic: language || null,
                is_private: isPrivate,
                duration_hours: hours,
                duration_minutes: minutes,
                language: language,
                max_capacity: parseInt(maxCapacity, 10) || 0,
                created_by: currentUser?.id,
                audio_default_on: true,
                video_default_on: true,
                screen_share_enabled: true,
                chat_enabled: true,
                scheduled_start_time: scheduledAt ? scheduledAt.toISOString() : null,
                level: level
            };
            const newRoom = await createRoomApi(roomData);
            onRoomCreated(newRoom);
            resetForm();
            onClose();
        } catch (err) {
            console.error("Create room error:", err);
            setError(err.message || 'Failed to create room. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        title, setTitle,
        topic, setTopic,
        isPrivate, setIsPrivate,
        durationHours, setDurationHours,
        durationMinutes, setDurationMinutes,
        language, setLanguage,
        maxCapacity, setMaxCapacity,
        scheduledAt, setScheduledAt,
        error, isLoading,
        isSuggesting,
        suggestTitle,
        handleSubmit,
        level, setLevel
    };
};
