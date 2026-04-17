import React, { useState, useEffect } from 'react';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching posts
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          author: 'StarGazer',
          avatar: '/profiles/ACg8ocJG7LMZRabftI6ewwD1U-TC7XZdv586UXWqq4EYrfj5V-o9sWMJ-s12.webp',
          content: 'Just joined an amazing English room! Learning new phrases and making friends. #LanguageLovers #HappyTalk',
          image: 'https://source.unsplash.com/random/600x400?galaxy',
          likes: 189,
          comments: 24,
          time: '2h ago'
        },
        {
          id: 2,
          author: 'CosmoChat',
          avatar: '/profiles/ACg8ocL2bhd8s2iHX2n3yHA8Zl9cc8HBh4lfMjMc2mIlBRxzcVkp5dRY-s12.webp',
          content: 'Spanish room was lit! Discussed favorite movies en español. Join us next time! #CineEnEspañol',
          image: null,
          likes: 567,
          comments: 42,
          time: '4h ago'
        },
        {
          id: 3,
          author: 'NebulaNerd',
          avatar: '/profiles/Abraham Baker.webp',
          content: 'French conversation practice was so fun! Learned about Parisian culture. #FrenchVibes',
          image: 'https://source.unsplash.com/random/600x400?paris',
          likes: 243,
          comments: 18,
          time: '1d ago'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="h-full bg-black text-white overflow-y-auto custom-scrollbar">
      <div className="p-4 border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Feed</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-4 space-y-6 pb-24">
          {posts.map(post => (
            <div key={post.id} className="bg-slate-900/40 rounded-3xl overflow-hidden border border-white/5 shadow-2xl backdrop-blur-sm">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-11 h-11 p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600">
                    <img src={post.avatar} alt={post.author} className="w-full h-full rounded-full object-cover border-2 border-black" />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-white/90 text-[14px]">{post.author}</div>
                    <div className="text-[11px] text-gray-500 font-medium">{post.time}</div>
                  </div>
                </div>
                <p className="text-white/80 mb-4 text-[13px] leading-relaxed">{post.content}</p>
                {post.image && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-800/50 group">
                    <img src={post.image} alt="Post content" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                  </div>
                )}
                <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 cursor-pointer group">
                             <i className="far fa-heart text-white/60 group-hover:text-red-500 transition-colors"></i>
                             <span className="text-[12px] text-white/60 font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5 cursor-pointer group">
                             <i className="far fa-comment text-white/60 group-hover:text-blue-400 transition-colors"></i>
                             <span className="text-[12px] text-white/60 font-medium">{post.comments}</span>
                        </div>
                    </div>
                    <i className="far fa-paper-plane text-white/60 cursor-pointer hover:text-white transition-colors"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedScreen;