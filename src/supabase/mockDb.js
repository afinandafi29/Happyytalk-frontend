// Central repository for mock data in Demo Mode
export const mockDb = {
  profiles: [
    { id: 'mock-user-1234', username: 'DemoUser', full_name: 'HappyTalk Demo', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser' },
    { id: 'afi-bot', username: 'AFI_Assistant', full_name: 'Your Coding Helper', avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=AFI' }
  ],
  banners: [
    { id: 1, title: 'Welcome to Happytalk', image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200' },
    { id: 2, title: 'Join our Community', image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200' }
  ],
  messages: [
    { id: 1, conversation_id: 'conv1', user_id: 'afi-bot', text: 'Welcome! This is a demo mode version of Happytalk.', created_at: new Date().toISOString() },
    { id: 2, conversation_id: 'conv1', user_id: 'mock-user-1234', text: 'Everything looks great!', created_at: new Date().toISOString() }
  ],
  conversations: [
    { id: 'conv1', name: 'General Support', created_at: new Date().toISOString() }
  ],
  conversation_members: [
    { conversation_id: 'conv1', user_id: 'mock-user-1234' },
    { conversation_id: 'conv1', user_id: 'afi-bot' }
  ]
};
