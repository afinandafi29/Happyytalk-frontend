const fs = require('fs');
const path = require('path');

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
    { name: 'English', creators: ['David', 'Sarah', 'James', 'Emily'], topics: ['IELTS Prep', 'Business English', 'Casual Chat', 'Tech Talk'] },
    { name: 'Spanish', creators: ['Carlos', 'Sofia', 'Juan', 'Elena'], topics: ['Travel Spain', 'Latin Culture', 'Beginner Spanish', 'Spanish Movies'] },
    { name: 'French', creators: ['Louis', 'Chloe', 'Amélie', 'Pierre'], topics: ['Parisian Life', 'French Cuisine', 'Art & Fashion', 'French Music'] },
    { name: 'German', creators: ['Jonas', 'Heike', 'Franz', 'Lena'], topics: ['Berlin Beats', 'German Tech', 'History', 'Daily German'] },
    { name: 'Japanese', creators: ['Hana', 'Takeshi', 'Yuki', 'Kenji'], topics: ['Anime Central', 'Tokyo Nightlife', 'Japanese Food', 'Culture'] },
    { name: 'Korean', creators: ['Ji-ho', 'Seung', 'Min-jun', 'Soo-yeon'], topics: ['K-Pop Hub', 'K-Drama Fans', 'Seoul Vibes', 'Korean BBQ'] },
    { name: 'Hindi', creators: ['Anjali', 'Arjun', 'Priya', 'Kavya'], topics: ['Bollywood Night', 'Indian Food', 'Yoga & Wellness', 'Culture'] },
    { name: 'Portuguese', creators: ['Fernanda', 'Lucas', 'Ana', 'Pedro'], topics: ['Rio Rhythm', 'Samba & Dance', 'Portuguese Basics', 'Travel'] },
    { name: 'Italian', creators: ['Andrea', 'Giulia', 'Matteo', 'Silvia'], topics: ['La Dolce Vita', 'Italian Pasta', 'Rome History', 'Fashion'] },
    { name: 'Arabic', creators: ['Ali', 'Nour', 'Rami', 'Huda'], topics: ['Dubai Stories', 'Arabic Culture', 'Language Basics', 'Middle East'] },
    { name: 'Russian', creators: ['Olga', 'Dmitri', 'Natasha', 'Igor'], topics: ['Moscow Mornings', 'Literature', 'History', 'Russian Soul'] },
    { name: 'Chinese', creators: ['Li Wei', 'Fang', 'Ming', 'Xia'], topics: ['Mandarin Master', 'Shanghai Life', 'Tea Ceremony', 'Chinese Tech'] },
    { name: 'Turkish', creators: ['Fatma', 'Mehmet', 'Aysha', 'Okan'], topics: ['Istanbul Calling', 'Turkish Coffee', 'Bazaar Gossip', 'History'] },
    { name: 'Dutch', creators: ['Lars', 'Lotte', 'Daan', 'Emma'], topics: ['Amsterdam Vibes', 'Dutch Design', 'Cycling Life', 'Culture'] },
    { name: 'Greek', creators: ['Nikos', 'Eleni', 'Kostas', 'Stavros'], topics: ['Greek Mythology', 'Med Life', 'Philosophy', 'Islands'] }
];

const rooms = [];

languages.forEach((lang, langIdx) => {
    lang.creators.forEach((creatorName, creatorIdx) => {
        const topic = lang.topics[creatorIdx % lang.topics.length];
        const numPeople = Math.floor(Math.random() * 5) + 1;
        const people = [];
        for (let i = 0; i < numPeople; i++) {
            people.push({
                id: `p-${langIdx}-${creatorIdx}-${i}`,
                name: `Guest ${i}`,
                username: `user_${langIdx}_${creatorIdx}_${i}`,
                avatar_url: getUniqueProfile()
            });
        }

        rooms.push({
            id: `room-${langIdx}-${creatorIdx}`,
            title: `${lang.name}: ${topic}`,
            topic: `A lively room for ${lang.name} enthusiasts to discuss ${topic.toLowerCase()}.`,
            language: lang.name,
            level: ['Beginner (A1)', 'Intermediate (B1)', 'Intermediate (B2)', 'Advanced (C1)'][Math.floor(Math.random() * 4)],
            is_private: false,
            created_by: 'system',
            creator: {
                id: `c-${langIdx}-${creatorIdx}`,
                name: creatorName,
                username: `${creatorName.toLowerCase()}_${lang.name.toLowerCase()}`,
                avatar_url: getUniqueProfile()
            },
            people: people
        });
    });
});

const content = `export const mockRooms = ${JSON.stringify(rooms, null, 4)};`;
fs.writeFileSync('/Users/afi/Downloads/Happytalk 2 3/social-network-/social-network-react/src/data/mockRooms.js', content);
console.log('Successfully generated 60 high-quality mock rooms with unique profiles.');
