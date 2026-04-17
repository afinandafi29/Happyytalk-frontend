import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Languages, Globe, Cpu, Music, 
  Beaker, Landmark, Rocket, Activity, 
  Users, Palette, Scale, Calculator, 
  Atom, FlaskConical, Leaf, BarChart, 
  History, Gavel, ShieldCheck, HeartPulse, 
  Dna, Search, ArrowLeft, Star, ChevronRight,
  Settings, Zap, Sparkles
} from 'lucide-react';

const QuizCategories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categoryGroups = [
    {
      group: "Primary Learning Domains",
      categories: [
        { id: 'lang', title: 'Language Learning', icon: <Languages />, color: '#3b82f6' },
        { id: 'gk', title: 'General Knowledge (GK)', icon: <Globe />, color: '#10b981' },
        { id: 'tech', title: 'Technology & Coding', icon: <Cpu />, color: '#8b5cf6' },
        { id: 'pop', title: 'Entertainment & Pop Culture', icon: <Music />, color: '#ec4899' },
        { id: 'science', title: 'Science & Education', icon: <Beaker />, color: '#f59e0b' },
        { id: 'biz', title: 'Business & Finance', icon: <BarChart />, color: '#06b6d4' },
        { id: 'geo', title: 'History & Geography', icon: <Landmark />, color: '#ef4444' },
        { id: 'sports', title: 'Sports & Fitness', icon: <Activity />, color: '#10b981' },
      ]
    }
  ];

  const handleRandomQuiz = () => {
    navigate(`/quiz/random`);
  };

  const allCategories = categoryGroups.flatMap(g => g.categories);
  const filteredCategories = allCategories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="quiz-explorer-root">
      {/* Background */}
      <div className="quiz-bg">
        <div className="bg-grid"></div>
        <div className="ambient-sphere-1"></div>
        <div className="ambient-sphere-2"></div>
      </div>

      <header className="quiz-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => navigate('/apps')}>
            <ArrowLeft size={24} />
          </button>
          <div className="header-brand">
             <h1>Happytalk<span>.in</span> Quizzes</h1>
             <p>Challenge Your Intelligence</p>
          </div>
          <div className="header-actions">
             <button className="random-btn-top" onClick={handleRandomQuiz}>
                <Zap size={16} fill="currentColor" />
                <span>Quick Start</span>
             </button>
          </div>
        </div>

        <div className="search-row">
          <div className="search-glass">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search domains..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="quiz-main">
        {!searchQuery && (
          <motion.div 
            className="hero-random-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleRandomQuiz}
          >
            <div className="hero-random-content">
               <div className="icon-badge">
                  <Sparkles size={32} />
               </div>
               <div className="hero-text">
                  <h2>Random Challenge</h2>
                  <p>Can't decide? Let the universe choose your next topic.</p>
               </div>
            </div>
            <button className="hero-play-btn">
               Play Now
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {searchQuery ? (
            <motion.div 
              key="search"
              className="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="group-title">Matches for "{searchQuery}"</h2>
              <div className="quiz-grid">
                {filteredCategories.map((cat, idx) => (
                  <CategoryCard key={cat.id} cat={cat} idx={idx} navigate={navigate} />
                ))}
              </div>
            </motion.div>
          ) : (
            categoryGroups.map((group, gIdx) => (
              <div key={group.group} className="category-group">
                <h2 className="group-title">{group.group}</h2>
                <div className="quiz-grid">
                  {group.categories.map((cat, idx) => (
                    <CategoryCard key={cat.id} cat={cat} idx={idx} navigate={navigate} />
                  ))}
                </div>
              </div>
            ))
          )}
        </AnimatePresence>

        {filteredCategories.length === 0 && (
          <div className="no-stats-minimal">
             <Search size={48} opacity={0.1} />
             <p>No matches found.</p>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .quiz-explorer-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000000;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #333 transparent;
          z-index: 1;
        }

        .quiz-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          background: #000000;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .ambient-sphere-1 {
          position: absolute;
          width: 50vw;
          height: 50vw;
          top: -25vw;
          right: -10vw;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
          filter: blur(100px);
        }

        .ambient-sphere-2 {
          position: absolute;
          width: 60vw;
          height: 60vw;
          bottom: -30vw;
          left: -20vw;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%);
          filter: blur(120px);
        }

        .quiz-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(25px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px 7%;
        }

        .header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .header-brand h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header-brand h1 span { color: #3b82f6; }
        .header-brand p { margin: 4px 0 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.4); font-weight: 400; }

        .back-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        .back-btn:hover { background: #ffffff; color: #000000; transform: scale(1.1); }

        .random-btn-top {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .random-btn-top:hover { background: #2563eb; transform: translateY(-2px); }

        .search-row { display: flex; justify-content: center; }
        .search-glass {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 500px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 0 16px;
          transition: all 0.3s;
        }
        .search-glass:focus-within {
          border-color: #3b82f6;
          background: rgba(255,255,255,0.06);
        }
        .search-glass input {
          width: 100%;
          background: transparent;
          border: none;
          padding: 14px 0;
          color: white;
          font-size: 15px;
          outline: none;
        }

        .quiz-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 7% 120px;
        }

        /* Random Card */
        .hero-random-card {
          background: linear-gradient(135deg, #1e293b, #000000);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          padding: 40px;
          margin-bottom: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .hero-random-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent);
        }
        .hero-random-card:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .hero-random-content { display: flex; align-items: center; gap: 30px; position: relative; z-index: 2; }
        .icon-badge {
          width: 80px;
          height: 80px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
        }
        .hero-text h2 { font-size: 32px; font-weight: 800; margin: 0; }
        .hero-text p { margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.5); font-size: 16px; }

        .hero-play-btn {
          background: white;
          color: black;
          border: none;
          padding: 16px 32px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          transition: 0.2s;
          position: relative;
          z-index: 2;
        }
        .hero-random-card:hover .hero-play-btn { transform: scale(1.05); background: #3b82f6; color: white; }

        .group-title {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #3b82f6;
          font-weight: 700;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .group-title::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.05); }

        .category-group { margin-bottom: 80px; }

        .quiz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .card-wrapper {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .card-wrapper:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          transform: scale(1.02);
        }

        .card-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          opacity: 0.9;
        }

        .card-info { flex: 1; }
        .card-info h3 { font-size: 16px; font-weight: 600; margin: 0; color: rgba(255,255,255,0.95); }
        .card-info p { font-size: 12px; color: rgba(255,255,255,0.3); margin: 4px 0 0 0; }

        .no-stats-minimal {
          text-align: center;
          padding: 100px 0;
          color: rgba(255,255,255,0.2);
        }

        @media (max-width: 768px) {
          .quiz-header { padding: 20px 5%; }
          .quiz-main { padding: 30px 5% 100px; }
          .hero-random-card { flex-direction: column; text-align: center; gap: 30px; padding: 30px 20px; }
          .hero-random-content { flex-direction: column; gap: 20px; }
          .hero-text h2 { font-size: 24px; }
          .hero-text p { font-size: 14px; }
          .quiz-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

const CategoryCard = ({ cat, idx, navigate }) => (
  <motion.div 
    className="card-wrapper"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: idx * 0.01 }}
    onClick={() => navigate(`/quiz/${cat.id}`)}
  >
    <div className="card-icon-box" style={{ background: `linear-gradient(135deg, ${cat.color}66, ${cat.color}11)`, border: `1px solid ${cat.color}33` }}>
      {React.cloneElement(cat.icon, { size: 24, color: cat.color })}
    </div>
    <div className="card-info">
      <h3>{cat.title}</h3>
      <p>Master this domain</p>
    </div>
    <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
  </motion.div>
);

export default QuizCategories;
