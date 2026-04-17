
export const PREBUILT_POSTS = [
    {
        id: 'fake-post-1',
        user: {
            name: 'Happytalk Community',
            handle: '@happytalk',
            pic: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=200'
        },
        title: 'Welcome to the New Happytalk Feed!',
        content: 'We are thrilled to launch our new AI-powered news aggregator! Explore the latest headlines from around the globe, interleaved with community highlights. Stay curious, stay connected! 🚀',
        image: 'https://images.unsplash.com/photo-1504711434969?auto=format&fit=crop&q=80&w=1200',
        time: 'Just now',
        likes: 1240,
        comments: 42,
        isNews: false,
        isMoment: true,
        created_at: new Date().toISOString()
    },
    {
        id: 'fake-post-2',
        user: {
            name: 'Elena Rodriguez',
            handle: '@elena_spanish',
            pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        },
        title: 'Spanish Grammar Hack! 🇪🇸',
        content: "Stop confusing 'Ser' and 'Estar'! Think of 'Ser' for permanent traits (DOCTOR: Description, Occupation, Characteristic, Time, Origin, Relationship) and 'Estar' for temporary states (PLACE: Position, Location, Action, Condition, Emotion). Hope this helps your study session tonight!",
        image: 'https://images.unsplash.com/photo-1543783230-1662970a010d?auto=format&fit=crop&q=80&w=1200',
        time: '15m ago',
        likes: 856,
        comments: 29,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 900000).toISOString()
    },
    {
        id: 'fake-post-3',
        user: {
            name: 'Liam Chen',
            handle: '@liam_polyglot',
            pic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
        },
        title: 'My Morning Routine for Mandarin ☕',
        content: '15 minutes of flashcards, 10 minutes of listening to a podcast, and 5 minutes of writing. Consistency is key! What does your morning study look like?',
        image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=1200',
        time: '45m ago',
        likes: 2103,
        comments: 156,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 2700000).toISOString()
    },
    {
        id: 'fake-post-4',
        user: {
            name: 'Sarah Miller',
            handle: '@sarah_travels',
            pic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
        },
        title: 'Coffee in Tokyo 🇯🇵',
        content: 'Found this hidden gem in Shimokitazawa. The barista spoke perfect English and helped me practice my Japanese ordering skills! Communication really is the best bridge.',
        image: 'https://images.unsplash.com/photo-1554224155-16fb70468305?auto=format&fit=crop&q=80&w=1200',
        time: '2h ago',
        likes: 3402,
        comments: 89,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
        id: 'fake-post-5',
        user: {
            name: 'Artificial Intelligence',
            handle: '@happytalk_ai',
            pic: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=200'
        },
        title: 'Did you know?',
        content: 'There are approximately 7,168 living languages in the world today. About 40% of languages are now considered endangered, often with less than 1,000 speakers remaining. Learning a language is about more than words—it is about preserving culture.',
        image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=1200',
        time: '3h ago',
        likes: 5671,
        comments: 231,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 10800000).toISOString()
    },
    {
        id: 'fake-post-6',
        user: {
            name: 'James Wilson',
            handle: '@james_tech',
            pic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
        },
        title: 'The Future of Web Dev',
        content: 'Vite 6 is changing everything! The speed of HMR is just insane. Here is a quick preview of my new project built with Tailwind 4 and React 19. The ecosystem is moving fast!',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
        time: '5h ago',
        likes: 1290,
        comments: 67,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 18000000).toISOString()
    },
    {
        id: 'fake-post-7',
        user: {
            name: 'Global News Hub',
            handle: '@global_news',
            pic: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=200'
        },
        title: 'Technological Advancements in 2026',
        content: 'Scientists have made a major breakthrough in fusion energy, potentially carbon-free power for the next century. This development could reshape the global energy landscape significantly.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
        time: '6h ago',
        likes: 8902,
        comments: 412,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 21600000).toISOString()
    },
    {
        id: 'fake-post-8',
        user: {
            name: 'Traveler Joe',
            handle: '@joe_explores',
            pic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
        },
        title: 'Norway’s Fjords are magic! 🇳🇴',
        content: 'Words cant describe the feeling of standing here. If you haven’t visited Norway yet, put it at the top of your list. The air is crisp, the water is crystal clear, and the people are wonderful.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
        time: '8h ago',
        likes: 4561,
        comments: 103,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 28800000).toISOString()
    },
    {
        id: 'fake-post-9',
        user: {
            name: 'Foodie Friends',
            handle: '@foodie_life',
            pic: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=200'
        },
        title: 'Quick 15-Min Dinner 🍝',
        content: 'Garlic, olive oil, chili flakes, and parsley. Spaghetti Aglio e Olio is the ultimate lazy but gourmet meal. Sometimes the simplest recipes are the best. Bon appétit!',
        image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=1200',
        time: '12h ago',
        likes: 2310,
        comments: 54,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 43200000).toISOString()
    },
    {
        id: 'fake-post-10',
        user: {
            name: 'Design Daily',
            handle: '@design_daily',
            pic: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=200'
        },
        title: 'Glassmorphism is Here to Stay',
        content: 'The blend of transparency and blur creates a depth that feels premium and light. We are seeing more and more apps adopting this "Glass" look. What do you think—yay or nay?',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
        time: '1d ago',
        likes: 6782,
        comments: 198,
        isNews: false,
        isMoment: true,
        created_at: new Date(Date.now() - 86400000).toISOString()
    }
];
