import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaHome, 
    FaGlobe, 
    FaShieldAlt, 
    FaUsers, 
    FaMagic, 
    FaVideo, 
    FaComments, 
    FaLock, 
    FaRobot,
    FaHeart
} from 'react-icons/fa';
import "../styles/OneToOneAbout.css"

function OneToOneAbout() {
    const navigate = useNavigate();

    return (
        <div className="oto-about-container">
            {/* HERO SECTION */}
            <section className="oto-about-hero">
                <button className="back-to-oto" onClick={() => navigate('/one-to-one')}>
                    <FaHome /> Back to Chat
                </button>
                <div className="hero-content">
                    <h1 className="hero-title">Happytalk 1-to-1 Chat</h1>
                    <p className="hero-subtitle">Real Connections, Real People. One-on-One.</p>
                    <p className="hero-description">
                        Experience the magic of spontaneous 1-to-1 video chats. Connect deeply, share stories, and make friends in a safe, private environment.
                    </p>
                    <button className="hero-cta" onClick={() => navigate('/one-to-one')}>Start Chatting</button>
                </div>
            </section>

            {/* STATS BAR */}
            <div className="stats-bar">
                <div className="stat-item"><strong>5M+</strong> <span>Connections Made</span></div>
                <div className="stat-item"><strong>180+</strong> <span>Countries</span></div>
                <div className="stat-item"><strong>99.9%</strong> <span>Uptime</span></div>
                <div className="stat-item"><strong>24/7</strong> <span>Moderation</span></div>
            </div>

            {/* MISSION SECTION */}
            <section className="oto-about-mission">
                <div className="section-header">
                    <span className="section-tag">OUR MISSION</span>
                    <h2>Breaking Barriers, Building Bridges</h2>
                </div>
                <p className="mission-text">
                    In a world of curated feeds and echo chambers, Happytalk offers something refreshingly different: genuine, unfiltered human connection. Every day, thousands of people find friends, practice languages, share stories, and discover new perspectives. We're not just a platform — we're a movement.
                </p>
                <div className="mission-highlight">
                    <FaGlobe /> <span>Active in 180+ Countries</span>
                </div>
            </section>

            {/* VALUES SECTION */}
            <section className="oto-about-values" id="values">
                <div className="section-header center">
                    <h2>Our Values</h2>
                </div>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-num">01</div>
                        <h3>Human Connection</h3>
                        <p>We believe in the power of authentic human interaction. Every conversation has the potential to change lives.</p>
                        <FaHeart className="value-icon" />
                    </div>
                    <div className="value-card">
                        <div className="value-num">02</div>
                        <h3>Safety First</h3>
                        <p>Your security is our priority. Advanced AI moderation, 24/7 monitoring, and instant reporting keep our community safe and welcoming.</p>
                        <FaShieldAlt className="value-icon" />
                    </div>
                    <div className="value-card">
                        <div className="value-num">03</div>
                        <h3>Global Community</h3>
                        <p>Break down borders and discover perspectives from every corner of the world. 180+ Countries | 50+ Languages</p>
                        <FaUsers className="value-icon" />
                    </div>
                    <div className="value-card">
                        <div className="value-num">04</div>
                        <h3>Serendipity</h3>
                        <p>The magic of unexpected encounters. You never know who you'll meet next.</p>
                        <FaMagic className="value-icon" />
                    </div>
                </div>
                <div className="quote-box">
                    <blockquote>"Every stranger is a friend you haven't met yet."</blockquote>
                </div>
            </section>

            {/* JOURNEY SECTION */}
            <section className="oto-about-journey" id="journey">
                <div className="section-header">
                    <h2>Our Journey</h2>
                </div>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-year">2023</div>
                        <div className="timeline-content">
                            <h3>The Spark</h3>
                            <p>An idea was born — recreating the magic of chance encounters in the digital age with a focus on positivity and respect.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-year">2024</div>
                        <div className="timeline-content">
                            <h3>Building Dreams</h3>
                            <p>Months of coding, designing, and testing. Prioritizing safety without sacrificing spontaneity.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-year">2025</div>
                        <div className="timeline-content">
                            <h3>Launch & Growth</h3>
                            <p>Happytalk goes live. The first connections are made, and our community begins to flourish.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-year">Future</div>
                        <div className="timeline-content">
                            <h3>Beyond Horizons</h3>
                            <p>Continuous innovation. New features, better connections, and a growing global family.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="oto-about-features">
                <div className="section-header center">
                    <span className="section-tag">BUILT FOR CONNECTION</span>
                    <h2>Platform Features</h2>
                </div>
                <div className="features-grid">
                    <div className="feature-item">
                        <FaVideo />
                        <h3>HD Video</h3>
                        <p>Crystal clear video quality</p>
                    </div>
                    <div className="feature-item">
                        <FaComments />
                        <h3>Live Chat</h3>
                        <p>Real-time messaging with zero lag</p>
                    </div>
                    <div className="feature-item">
                        <FaLock />
                        <h3>Privacy First</h3>
                        <p>Your data stays yours</p>
                    </div>
                    <div className="feature-item">
                        <FaRobot />
                        <h3>AI Safety</h3>
                        <p>Smart moderation for worry-free conversations</p>
                    </div>
                </div>
            </section>

            {/* EXPANDED CONTENT */}
            <section className="oto-about-expanded">
                <div className="expanded-block">
                    <h3>About Happytalk</h3>
                    <p>Happytalk was founded with a simple belief: the best conversations happen when you least expect them.</p>
                </div>
                <div className="expanded-block">
                    <h3>What Makes Us Different</h3>
                    <p>We connect you with real people randomly, authentically, and without judgment.</p>
                </div>
                <div className="expanded-block">
                    <h3>Our Commitment to Safety</h3>
                    <p>Advanced AI moderation 24/7. Your safety is our foundation.</p>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="final-cta">
                <h2>Ready to Meet Someone New?</h2>
                <p>Your next great conversation is one click away.</p>
                <button className="hero-cta large" onClick={() => navigate('/one-to-one')}>Start Free</button>
            </section>

            {/* EXPANDED FOOTER */}
            <footer className="expanded-footer">
                <div className="footer-cols">
                    <div className="f-col brand">
                        <h3>Happytalk</h3>
                        <p>Where strangers become friends.</p>
                    </div>
                    <div className="f-col">
                        <h4>PRODUCT</h4>
                        <ul>
                            <li>How It Works</li>
                            <li>Features</li>
                            <li>Safety & Security</li>
                            <li>AI Moderation</li>
                            <li onClick={() => navigate('/privacy')}>Privacy Policy</li>
                            <li onClick={() => navigate('/terms')}>Terms of Service</li>
                        </ul>
                    </div>
                    <div className="f-col">
                        <h4>SUPPORT</h4>
                        <ul>
                            <li onClick={() => navigate('/faq')}>Help Center</li>
                            <li>Contact Us</li>
                            <li>Report an Issue</li>
                            <li>Feedback</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom-bar">
                    <div className="f-copy">&copy; 2026 Happytalk.in — All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}

export default OneToOneAbout;
