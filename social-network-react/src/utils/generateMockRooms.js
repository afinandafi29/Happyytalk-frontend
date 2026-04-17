const fs = require('fs');
const path = require('path');

const profilesDir = '/Users/afi/Downloads/Happytalk 2 3/social-network-/social-network-react/public/profiles';
const files = fs.readdirSync(profilesDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.gif'));

const languages = [
    { name: 'English', topics: ['IELTS Prep', 'Business English', 'Coffee & Conversations', 'Tech Talk', 'Movie Night', 'Slang & Idioms', 'Casual Chat', 'Travel Stories'] },
    { name: 'Spanish', topics: ['Hola Barcelona', 'Madrid Vibes', 'Telenovela Lovers', 'Spanish for Beginners', 'Salsa & Spanish', 'Travel Spain', 'Latin Culture'] },
    { name: 'French', topics: ['Parisian Evenings', 'French Foodies', 'C\'est la vie', 'Learn with Louis', 'French Cinema', 'Wine & Words'] },
    { name: 'German', topics: ['Berlin Techno & Talk', 'Oktoberfest Prep', 'Serious German Practice', 'German Engineering', 'Life in Munich'] },
    { name: 'Japanese', topics: ['Anime Lovers', 'Tokyo Nightlife', 'Japanese Food', 'JLPT Study Group', 'Shibuya Crossing', 'Kyoto Traditions'] },
    { name: 'Korean', topics: ['K-Pop Central', 'K-Drama Fans', 'Seoul Life', 'Korean Street Food', 'Learn Hangeul', 'Gangnam Style'] },
    { name: 'Chinese', topics: ['Mandarin Mastery', 'Shanghai Business', 'Chinese Tea Ceremony', 'Travel China', 'Dim Sum Chat'] },
    { name: 'Italian', topics: ['Pizza & Pasta', 'Italian Operas', 'Rome Adventures', 'Italian Fashion', 'Bella Ciao'] },
    { name: 'Portuguese', topics: ['Brazil Carnival', 'Lisbon Sunsets', 'Portuguese for Beginners', 'Football & Talk'] },
    { name: 'Hindi', topics: ['Bollywood Bang', 'Indian Spices', 'Namaste Network', 'Delhi Diaries', 'Yoga & Hindi'] }
];

const catchyTitles = [
    "The Chill Zone", "Expert Lounge", "Beginners Welcome", "Advanced Mastery", "Culture Exchange", 
    "The Midnight Club", "Sunshine Series", "Weekend vibes", "Globetrotters Only", "Local Legends",
    "The Polyglot Hub", "Deep Conversations", "Rapid Learning", "The Fluent Path", "Cultural Bridge"
];

const creators = [
    "David", "Carlos", "Louis", "Jonas", "Hana", "Seung-ho", "Anjali", "Ali", "Ana", "Maria",
    "Andrea", "James", "Elena", "Sato", "Kim", "Chloe", "Marco", "Sofia", "Lucas", "Maya"
];

const rooms = [];

for (let i = 1; i <= 50; i++) {
    const lang = languages[i % languages.length];
    const topic = lang.topics[Math.floor(Math.random() * lang.topics.length)];
    const title = `${lang.name}: ${catchyTitles[Math.floor(Math.random() * catchyTitles.length)]}`;
    const creatorName = creators[i % creators.length];
    
    const numPeople = Math.floor(Math.random() * 8) + 2;
    const people = [];
    for (let j = 0; j < numPeople; j++) {
        const avatar = files[Math.floor(Math.random() * files.length)];
        people.push({
            id: `p${i}_${j}`,
            name: `User ${j}`,
            username: `user_${i}_${j}`,
            avatar_url: `/profiles/${avatar}`
        });
    }

    const creatorAvatar = files[Math.floor(Math.random() * files.length)];

    rooms.push({
        id: `room-${i}`,
        title: title,
        topic: topic,
        language: lang.name,
        level: 'Intermediate (B2)',
        is_private: false,
        created_by: 'system',
        creator: {
            id: `pc${i}`,
            name: creatorName,
            username: `${creatorName.toLowerCase()}_${i}`,
            avatar_url: `/profiles/${creatorAvatar}`
        },
        people: people
    });
}

const content = `export const mockRooms = ${JSON.stringify(rooms, null, 4)};`;
fs.writeFileSync('/Users/afi/Downloads/Happytalk 2 3/social-network-/social-network-react/src/data/mockRooms.js', content);
console.log('Successfully generated 50 high-quality mock rooms.');
