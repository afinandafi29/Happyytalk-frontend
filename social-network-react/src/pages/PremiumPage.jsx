import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const RazorpayButton = ({ id }) => {
  const formRef = useRef(null);
  useEffect(() => {
    if (formRef.current && formRef.current.childNodes.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.async = true;
      script.setAttribute('data-payment_button_id', id);
      formRef.current.appendChild(script);
    }
  }, [id]);

  return <form ref={formRef} style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}></form>;
};

const PremiumPage = () => {
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();
  const isDarkMode = theme === 'dark' || theme === 'space';
  const [activeDuration, setActiveDuration] = useState('1');
  const [showServices, setShowServices] = useState(false);
  const [isBasicSelected, setIsBasicSelected] = useState(false);

  // Pricing Data
  const monthlyBase = { basic: 5, plus: 15, pro: 25, elite: 50, diamond: 75, titanium: 100 };
  const totals = {
    1: { basic: 5, plus: 15, pro: 25, elite: 50, diamond: 75, titanium: 100 },
    3: { basic: 15, plus: 45, pro: 75, elite: 150, diamond: 225, titanium: 300 },
    6: { basic: 30, plus: 90, pro: 150, elite: 300, diamond: 450, titanium: 600 },
    12: { basic: 60, plus: 180, pro: 300, elite: 600, diamond: 900, titanium: 1200 }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      desc: 'Basic access to start',
      buttonClass: 'btn-free',
      buttonText: 'Continue Free',
      features: [
        'Up to 2h/day Focus Rooms',
        'Limited translations & corrections',
        'Pin up to 4 partners',
        'Ads included'
      ]
    },
    {
      name: 'Basic',
      id: 'basic',
      desc: 'Better for regular practice',
      buttonClass: 'btn-basic',
      buttonText: 'Select Basic',
      features: [
        'Up to 4h/day Focus Rooms',
        'Ad-free experience',
        'Unlimited message translations',
        'Unlimited grammar corrections',
        'Pin up to 15 partners',
        'Unlimited saved words & phrases',
        '60 encouragements / day'
      ]
    },
    {
      name: 'Plus',
      id: 'plus',
      desc: 'Enhanced learning tools',
      buttonClass: 'btn-plus',
      buttonText: 'Select Plus',
      accentColor: '#a855f7', // Purple accent for Plus
      features: [
        'Up to 8h/day Focus Rooms',
        'Advanced partner search filters',
        'Smart partner recommendations',
        'Voice-to-text conversion',
        'Save & organize learning notes',
        '120 encouragements / day',
        'Priority profile visibility'
      ]
    },
    {
      name: 'Pro',
      id: 'pro',
      popular: true,
      desc: 'Full language mastery',
      buttonClass: 'btn-pro',
      buttonText: 'Select Pro',
      features: [
        'Unlimited Focus Room time',
        'Pin up to 50 partners',
        'Pronunciation feedback tools',
        'Unlimited audio transcriptions',
        'See who pinned / viewed you',
        'Private Focus Rooms',
        '200 encouragements / day'
      ]
    },
    {
      name: 'Elite',
      id: 'elite',
      desc: 'Premium global access',
      buttonClass: 'btn-elite',
      buttonText: 'Select Elite',
      features: [
        'All Pro features',
        'Premium badge + custom ID',
        'Early access to new features',
        'Priority customer support',
        '300 encouragements / day',
        'Location-based discovery boost'
      ]
    },
    {
      name: 'Diamond',
      id: 'diamond',
      desc: 'Ultimate Power User',
      buttonClass: 'btn-diamond',
      buttonText: 'Select Diamond',
      features: [
        'Dedicated account manager',
        'Unlimited everything',
        '500 encouragements / day',
        'Exclusive "Diamond" Profile Ring',
        'Direct access to dev team feedback',
        'Monthly 1:1 Coaching Session'
      ]
    },
    {
      name: 'Titanium',
      id: 'titanium',
      desc: 'Legendary Status',
      buttonClass: 'btn-titanium',
      buttonText: 'Select Titanium',
      features: [
        'Founder\'s Circle Access',
        'Lifetime "Legend" Badge',
        '1000 encouragements / day',
        'Beta test new groundbreaking features',
        'Personalized App Theme',
        'VIP Event Invitations'
      ]
    },
    {
      name: 'Donation',
      price: 'Support Us',
      desc: 'Help the community grow',
      buttonClass: 'btn-donate',
      buttonText: 'Make Donation',
      isDonation: true,
      features: [
        'Thank-you badge on profile',
        'Community shoutout in newsletter',
        'Help keep servers running',
        'Contribute to student scholarships',
        'Support future development',
        'Developer love 💙'
      ]
    }
  ];

  const getPriceDisplay = (plan) => {
    if (plan.name === 'Free') return plan.price;
    if (plan.name === 'Donation') return plan.price;

    const duration = parseInt(activeDuration);
    const total = totals[duration][plan.id];

    const monthlyBreakdown = total / duration;
    const basePrice = monthlyBase[plan.id];
    const savings = Math.round((1 - (monthlyBreakdown / basePrice)) * 100);

    let durationLabel = '/ month';
    if (duration === 3) durationLabel = '/ 3 months';
    if (duration === 6) durationLabel = '/ 6 months';
    if (duration === 12) durationLabel = '/ year';

    return (
      <>
        ${total} <small style={{ fontSize: '1rem', fontWeight: 400 }}>{durationLabel}</small>
        {duration > 1 && savings > 0 && (
          <span style={{ fontSize: '0.9rem', color: '#22c55e', marginLeft: '8px' }}>Save {savings}%</span>
        )}
      </>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAppTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    changeTheme(nextTheme);
  };

  return (
    <div className={`premium-page-container ${isDarkMode ? 'dark' : 'light'}`}>
      <style>{`
        .premium-page-container {
          --bg: #000000;
          --text: #ffffff;
          --muted: #a1a1aa;
          --card: rgba(18, 18, 18, 0.9);
          --border: rgba(255, 255, 255, 0.1);
          --accent: #3b82f6;
          --green: #22c55e;
          --header-bg: rgba(0, 0, 0, 0.95);
          
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', -apple-system, sans-serif;
          min-height: 100vh;
          width: 100%;
          padding-top: 80px;
          padding-bottom: 80px;
          transition: all 0.3s ease;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }

        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .premium-page-container.dark {
          background: #000000;
        }

        /* Enforce white text for all critical elements in dark mode */
        .premium-page-container.dark h1,
        .premium-page-container.dark h2,
        .premium-page-container.dark h3,
        .premium-page-container.dark .plan-name,
        .premium-page-container.dark .price,
        .premium-page-container.dark .feature-item span,
        .premium-page-container.dark .section-title,
        .premium-page-container.dark .footer-note p,
        .premium-page-container.dark .plan-desc {
          color: #ffffff !important;
        }

        .premium-page-container.light {
          --bg: #f8fafc;
          --text: #0f172a;
          --muted: #64748b;
          --card: #ffffff;
          --border: rgba(0, 0, 0, 0.05);
          --accent: #2563eb;
          --header-bg: rgba(248, 250, 252, 0.8);
        }

        .premium-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: var(--header-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          border-bottom: 1px solid var(--border);
          z-index: 1000;
        }

        .header-left, .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .header-right { justify-content: flex-end; }

        .header-back-btn {
          width: 54px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: white !important;
        }

        .light .header-back-btn {
          background: #ffffff;
          border-color: #e2e8f0;
          color: #0f172a !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .dark .header-back-btn {
          background: rgba(30, 30, 30, 0.8);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff !important;
        }

        .header-back-btn:hover {
          background: var(--accent) !important;
          border-color: var(--accent);
          color: #ffffff !important;
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
        }

        .header-back-btn svg {
          stroke-width: 2.5px;
          transition: all 0.2s;
        }

        .header-back-btn:hover svg {
          stroke: #ffffff !important;
        }

        .btn-plus {
          background: #a855f7 !important;
          color: white !important;
        }

        .btn-plus:hover {
          background: #9333ea !important;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }

        .header-title {
          font-weight: 800;
          font-size: 1.25rem;
          background: linear-gradient(135deg, var(--text) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .dark .header-title {
          background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
          -webkit-background-clip: text;
        }

        .theme-toggle-btn {
          padding: 8px 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text);
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .theme-toggle-btn:hover {
          border-color: var(--accent);
          transform: translateY(-1px);
        }

        .inner-container { 
          max-width: 1440px; 
          margin: 0 auto; 
          padding: 0 40px; 
          width: 100%;
        }

        .hero-section {
          text-align: center;
          padding: 40px 0 20px;
        }

        h1 {
          font-size: clamp(3rem, 10vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          margin-bottom: 12px;
          line-height: 1;
          color: var(--text);
        }

        .dark h1 {
          color: #ffffff;
          background: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .light h1 {
          background: linear-gradient(135deg, #0f172a 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: var(--muted);
          font-size: 1.1rem;
          max-width: 800px;
          margin: 0 auto 32px;
        }

        .duration-selector {
          display: inline-flex;
          background: var(--card);
          padding: 6px;
          border-radius: 16px;
          border: 1px solid var(--border);
          margin-bottom: 48px;
        }

        .duration-btn {
          padding: 10px 20px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: var(--muted);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .duration-btn.active {
          background: var(--accent);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 100px;
          width: 100%;
        }

        .plan-card {
          background: var(--card);
          border-radius: 24px;
          border: 1px solid var(--border);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: relative;
          min-height: 520px;
        }

        .plan-card:hover {
          border-color: var(--accent);
        }

        .dark .plan-card:hover {
          background: rgba(30,30,30,0.95);
        }

        .light .plan-card:hover {
          background: #ffffff;
        }

        .plan-card.plus {
          border-top: 4px solid #a855f7;
        }

        .dark .plan-card.plus {
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.4);
        }

        .plan-card.plus .plan-name {
          color: #a855f7 !important;
        }

        .plan-card.popular:hover {
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.2);
        }

        .plan-card.popular::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 28px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          background-size: 200% 100%;
          animation: shine 3s infinite linear;
          pointer-events: none;
        }

        .plan-card.popular {
          border: 2px solid var(--accent);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: white;
          padding: 4px 16px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .plan-name {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .price {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 8px;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .plan-desc {
          color: var(--muted);
          font-size: 0.95rem;
          margin-bottom: 24px;
          min-height: 48px;
        }

        .btn {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          border: none;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }

        .btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.2);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }

        .btn:active {
          transform: translateY(0);
        }

        .btn-free { background: var(--border); color: var(--text); }
        .btn-basic { background: #22c55e; color: white; }
        .btn-plus { background: #10b981; color: white; }
        .btn-pro { background: var(--accent); color: white; }
        .btn-elite { background: #8b5cf6; color: white; }
        .btn-diamond { background: #ec4899; color: white; }
        .btn-titanium { background: #6366f1; color: white; }
        .btn-donate { background: #f59e0b; color: white; }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.95rem;
          color: var(--text);
        }

        .tick-icon {
          color: #22c55e;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 40px;
        }

        .services-toggle-btn {
          display: block;
          margin: 0 auto 32px;
          padding: 12px 32px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 999px;
          color: var(--text);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .services-toggle-btn:hover { background: var(--border); }

        .services-container {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }

        .services-container.active {
          max-height: 5000px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }

        .service-card {
          background: var(--card);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid var(--border);
        }

        .service-name {
          color: var(--accent);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .service-desc {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.5;
        }

        .footer-note {
          text-align: center;
          padding-top: 48px;
          border-top: 1px solid var(--border);
          color: var(--muted);
        }

        @media (max-width: 768px) {
          .premium-page-container { padding-top: 90px; }
          .header-title { display: none; }
          .header-left { display: none; }
          .header-right { flex: 1; }
          .hero-section { padding: 24px 0; }
          .plans-grid { grid-template-columns: 1fr; }
          .plan-card { padding: 24px; }
          .duration-selector { width: 100%; justify-content: space-between; gap: 4px; }
          .duration-btn { flex: 1; padding: 10px 8px; font-size: 0.8rem; }
        }
      `}</style>

      <header className="premium-header">
        <div className="header-left">
          <button className="header-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        </div>
        
        <div className="header-title">HAPPYY TALK PREMIUM</div>
        
        <div className="header-right">
          <button className="theme-toggle-btn" onClick={toggleAppTheme} style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0, justifyContent: 'center' }}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="inner-container">
        <div className="hero-section">
          <h1>Go Premium.</h1>
          <p className="subtitle">Master languages with AI-powered tools and global networking features.</p>

          <div className="duration-selector">
            {['1', '3', '6', '12'].map((d) => (
              <button
                key={d}
                className={`duration-btn ${activeDuration === d ? 'active' : ''}`}
                onClick={() => setActiveDuration(d)}
              >
                {d === '1' ? 'Monthly' : d === '12' ? 'Annual' : `${d} Months`}
              </button>
            ))}
          </div>
        </div>

        <div className="plans-grid">
          {plans.map((plan, idx) => (
            <div key={idx} className={`plan-card ${plan.popular ? 'popular' : ''} ${plan.id || ''}`}>
              {plan.popular && <div className="popular-badge">Best Value</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="price">{getPriceDisplay(plan)}</div>
              <p className="plan-desc">{plan.desc}</p>
              
              {plan.id === 'basic' ? (
                <>
                  {!isBasicSelected ? (
                    <button 
                      className={`btn ${plan.buttonClass}`} 
                      onClick={() => setIsBasicSelected(true)}
                    >
                      {plan.buttonText}
                    </button>
                  ) : (
                    <div className="razorpay-container" style={{ animation: 'fadeIn 0.3s ease' }}>
                      <RazorpayButton id="pl_SPRFaQYshHzTys" />
                      <button 
                        className="btn-link" 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: 'var(--muted)', 
                          fontSize: '0.8rem', 
                          cursor: 'pointer',
                          marginTop: '-10px',
                          marginBottom: '15px',
                          width: '100%',
                          textDecoration: 'underline'
                        }}
                        onClick={() => setIsBasicSelected(false)}
                      >
                        Change selection
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button className={`btn ${plan.buttonClass}`} onClick={() => {
                  if (plan.name === 'Donation') {
                    window.open('https://razorpay.me/@happyytalk', '_blank');
                  } else {
                    window.open('https://ko-fi.com/D1D41TKUCQ', '_blank');
                  }
                }}>
                  {plan.buttonText}
                </button>
              )}

              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <Check className="tick-icon" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="section-title">Exclusive Services</h2>
        <button className="services-toggle-btn" onClick={() => setShowServices(!showServices)}>
          {showServices ? 'Hide Details' : 'View Premium Catalog'}
        </button>

        <div className={`services-container ${showServices ? 'active' : ''}`}>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-name">Advanced Learning</div>
              <div className="service-desc">AI courses, Spoken English, IELTS/TOEFL prep, and 1:1 tutoring sessions.</div>
            </div>
            <div className="service-card">
              <div className="service-name">Global Mobility</div>
              <div className="service-desc">Study abroad support, SOP/LOR writing, and visa consultation services.</div>
            </div>
            <div className="service-card">
              <div className="service-name">Career Boost</div>
              <div className="service-desc">International CV design, interview preparation, and job guidance.</div>
            </div>
            <div className="service-card">
              <div className="service-name">Community</div>
              <div className="service-desc">Priority access to student groups, alumni networks, and weekly events.</div>
            </div>
          </div>
        </div>

        <div className="footer-note">
          <p>Cancel anytime. Secure payments powered by Razorpay & Ko-fi.</p>
          <p><strong>HAPPYY TALK 💙 — Connect Globally.</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
