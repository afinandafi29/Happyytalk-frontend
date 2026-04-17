
// Utility to generate a large number of fake posts for Happytalk
const USERS = [
    { name: 'Alex Johnson', handle: '@alex_polyglot', pic: 'https://i.pravatar.cc/150?u=alex' },
    { name: 'Elena Rodriguez', handle: '@elena_spanish', pic: 'https://i.pravatar.cc/150?u=elena' },
    { name: 'Liam Chen', handle: '@liam_mandarin', pic: 'https://i.pravatar.cc/150?u=liam' },
    { name: 'Sarah Miller', handle: '@sarah_travels', pic: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'David Wilson', handle: '@david_tech', pic: 'https://i.pravatar.cc/150?u=david' },
    { name: 'Maria Garcia', handle: '@maria_italy', pic: 'https://i.pravatar.cc/150?u=maria' },
    { name: 'Sophie Laurent', handle: '@sophie_french', pic: 'https://i.pravatar.cc/150?u=sophie' },
    { name: 'Hans Miller', handle: '@hans_german', pic: 'https://i.pravatar.cc/150?u=hans' },
    { name: 'Yuki Tanaka', handle: '@yuki_jp', pic: 'https://i.pravatar.cc/150?u=yuki' },
    { name: 'Happytalk Official', handle: '@happytalk', pic: 'https://i.pravatar.cc/150?u=official' }
];

const TOPICS = [
    "Language Learning Hacks",
    "Networking for Success",
    "Happytalk Community Update",
    "Culture & Communication",
    "Professional Networking",
    "The Future of Education",
    "Digital Nomad Life",
    "Global Citizenship"
];

const TEMPLATES = [
    "Just discovered a new way to memorize vocabulary on happytalk.in! The AI tutor is a game changer for my Spanish studies. 🚀",
    "Networking is not just about who you know, but who knows what you know. Join the latest room on happyytalk.in to build your professional circle!",
    "Happytalk.in is finally live! The community is growing so fast. Who wants to practice some Mandarin today? 🇨🇳",
    "Had an amazing conversation with someone from Brazil today on happyytalk.in. It's incredible how technology brings us together.",
    "If you're looking to level up your career, start networking on happytalk.in. The 'Business English' rooms are top-notch.",
    "Check out the new features on happyytalk.in! The UI is so sleek and the video quality is crystal clear.",
    "Learning a language is 10% study and 90% practice. Get your 90% at happytalk.in today!",
    "Networking tips: 1. Listen more. 2. Ask questions. 3. Be on happytalk.in daily. 📈",
    "Just hit a 30-day streak on my language learning journey! Thanks to the folks at happyytalk.in for keeping me motivated.",
    "The best part about happyytalk.in? The authentic connections. I've met friends from 5 different continents this month alone!"
];

const IMAGES = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200"
];

export const generateFakePosts = (count, startIndex = 0) => {
    return Array.from({ length: count }).map((_, i) => {
        const id = startIndex + i;
        const user = USERS[id % USERS.length];
        const topic = TOPICS[id % TOPICS.length];
        const content = TEMPLATES[id % TEMPLATES.length];
        const image = id % 3 === 0 ? IMAGES[(id / 3) % IMAGES.length] : null; // Every 3rd post has an image
        
        return {
            id: `fake-${id}`,
            user: { ...user },
            title: topic,
            content: content,
            image: image,
            time: `${Math.floor(id / USERS.length) + 1}h ago`,
            likes: Math.floor(Math.random() * 5000) + 100,
            comments: Math.floor(Math.random() * 200),
            isNews: false,
            isMoment: true,
            created_at: new Date(Date.now() - id * 3600000).toISOString()
        };
    });
};
