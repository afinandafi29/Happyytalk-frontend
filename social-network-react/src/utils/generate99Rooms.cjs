const fs = require('fs');

const profilesDir = '/Users/afi/Downloads/Happytalk 2 3/social-network-/social-network-react/public/profiles';
const profileFiles = fs.readdirSync(profilesDir).filter(f => f.match(/\.(jpeg|jpg|png|webp|gif)$/i));

// Shuffle profiles
for (let i = profileFiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [profileFiles[i], profileFiles[j]] = [profileFiles[j], profileFiles[i]];
}

let profileIndex = 0;
const getUniqueProfile = () => {
    if (profileIndex >= profileFiles.length) profileIndex = 0;
    return `/profiles/${profileFiles[profileIndex++]}`;
};

const languages = [
    "English", "Spanish", "French", "German", "Japanese", "Korean", "Chinese", "Hindi", "Portuguese", "Italian",
    "Arabic", "Russian", "Turkish", "Dutch", "Greek", "Swedish", "Norwegian", "Danish", "Finnish", "Polish",
    "Vietnamese", "Thai", "Indonesian", "Malay", "Tagalog", "Hebrew", "Persian", "Swahili", "Amharic", "Bengali"
];

const topics = [
    "Casual Conversations", "Business Networking", "Language Exchange", "Travel Stories", "Movie Talk",
    "Tech & Innovation", "Music & Culture", "Cooking & Food", "Philosophy & Life", "Learning Tips",
    "Book Club", "Daily Routine", "Gaming Night", "News & Trends", "Art & Design", "Sports Talk",
    "Music Lovers", "Science & Space", "History Buffs", "Meditation & Wellness"
];

const names = [
    "Alex", "Sam", "Jordan", "Taylor", "Casey", "Riley", "Jamie", "Morgan", "Quinn", "Chris",
    "David", "Sarah", "Louis", "Chloe", "Hana", "Ji-ho", "Anjali", "Carlos", "Olga", "Li Wei",
    "Fatma", "Lars", "Nikos", "Amara", "Arjun", "Sofia", "Kenji", "Min-jun", "Elena", "Jonas"
];

const rooms = [];
const numRooms = 111;

for (let i = 0; i < numRooms; i++) {
    const lang = languages[i % languages.length];
    const topic = topics[i % topics.length];
    const creatorName = names[i % names.length];
    const numPeople = Math.floor(Math.random() * 6) + 1;
    const people = [];
    for (let j = 0; j < numPeople; j++) {
        people.push({
            id: `p-${i}-${j}`,
            name: names[(i + j + 5) % names.length],
            username: `user_${i}_${j}`,
            avatar_url: getUniqueProfile()
        });
    }

    rooms.push({
        id: `room-gen-${i}`,
        title: `${lang}: ${topic}`,
        topic: `A vibrant space to discuss ${topic.toLowerCase()} in ${lang}.`,
        language: lang,
        level: ['Beginner (A1)', 'Intermediate (B1)', 'Intermediate (B2)', 'Advanced (C1)'][Math.floor(Math.random() * 4)],
        is_private: false,
        created_by: 'system',
        creator: {
            id: `c-gen-${i}`,
            name: creatorName,
            username: `${creatorName.toLowerCase()}_${i}`,
            avatar_url: getUniqueProfile()
        },
        people: people
    });
}

const content = `export const mockRooms = ${JSON.stringify(rooms, null, 4)};`;
fs.writeFileSync('/Users/afi/Downloads/Happytalk 2 3/social-network-/social-network-react/src/data/mockRooms.js', content);
console.log('Successfully generated 111 rooms.');
