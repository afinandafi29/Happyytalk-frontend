import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaQuestionCircle, FaShieldAlt, FaRocket, FaUsers, FaTools, FaLock, FaEnvelope } from 'react-icons/fa';
import "../styles/OneToOneAbout.css"; // Reuse premium styles

function OneToOneFAQ() {
    const navigate = useNavigate();

    return (
        <div className="oto-about-container">
            <section className="oto-about-hero" style={{ height: '40vh' }}>
                <button className="back-to-oto" onClick={() => navigate('/one-to-one')}>
                    <FaHome /> Back to Chat
                </button>
                <div className="hero-content">
                    <h1 className="hero-title">Frequently Asked Questions</h1>
                    <p className="hero-subtitle">Everything you need to know about Happytalk.in</p>
                </div>
            </section>

            <section className="oto-about-expanded">
                {/* GETTING STARTED */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaRocket /> Getting Started</h3>
                    <div className="faq-item-v2">
                        <h4>Q: What is Happytalk?</h4>
                        <p>A: Happytalk is a random video chat platform that connects you with strangers from around the world for genuine, unfiltered conversations. No algorithms, no curated feeds — just real human connection.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: Do I need to create an account?</h4>
                        <p>A: You can start chatting instantly without an account. However, creating a free account allows you to save preferences, report issues, and access additional features like language filters and chat history.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: Is Happytalk free to use?</h4>
                        <p>A: Yes! Happytalk is completely free to use. We believe genuine connection should be accessible to everyone. There are no premium tiers or hidden fees.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: Do I need to download an app?</h4>
                        <p>A: Happytalk works directly in your browser on desktop and mobile. No downloads or installations required. Just click "Start Chatting" and you're ready to go.</p>
                    </div>
                </div>

                {/* SAFETY & MODERATION */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaShieldAlt /> Safety & Moderation</h3>
                    <div className="faq-item-v2">
                        <h4>Q: Is Happytalk safe?</h4>
                        <p>A: Safety is our top priority. We use advanced AI moderation that works 24/7 to detect and prevent inappropriate behavior. Every chat is monitored for violations of our community guidelines, and users can instantly report or block anyone who makes them uncomfortable.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: What happens if I encounter someone behaving inappropriately?</h4>
                        <p>A: You can instantly end the chat with one click. We also provide a "Report" button that flags the user for our moderation team. Repeat offenders are permanently banned from the platform.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: Is my personal information kept private?</h4>
                        <p>A: Absolutely. We never share your personal information with other users. Your chats are anonymous by default, and we don't sell your data to third parties. Privacy is built into every layer of Happytalk.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: Do you record video chats?</h4>
                        <p>A: We do not record or store your video chats. Our AI moderation works in real-time to ensure safety without storing personal conversations. Your privacy matters to us.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: Can I block someone?</h4>
                        <p>A: Yes. You can block any user instantly with a single click. Once blocked, you will never be matched with that person again.</p>
                    </div>
                </div>

                {/* FEATURES & TECHNOLOGY */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaTools /> Features & Technology</h3>
                    <div className="faq-item-v2">
                        <h4>Q: How does the matching work?</h4>
                        <p>A: Happytalk connects you with random users from around the world. You can also use optional filters to match by language, region, or interests. The experience is designed to be spontaneous and serendipitous.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: Can I choose who I want to talk to?</h4>
                        <p>A: By default, matches are random to encourage authentic encounters. However, with a free account, you can set preferences such as language, country, or shared interests to find more relevant connections.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: What is the video and audio quality?</h4>
                        <p>A: We support HD video and crystal-clear audio. The quality adjusts automatically based on your internet connection to ensure smooth conversations.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: Is there text chat available?</h4>
                        <p>A: Yes! In addition to video chat, we offer real-time text messaging. You can switch between video, audio-only, or text-only modes depending on your comfort level.</p>
                    </div>
                </div>

                {/* COMMUNITY & GUIDELINES */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaUsers /> Community & Guidelines</h3>
                    <div className="faq-item-v2">
                        <h4>Q: What are the community guidelines?</h4>
                        <p>A: Our community guidelines are simple: be respectful, be kind, and be yourself. Harassment, hate speech, nudity, and spam are strictly prohibited. We're building a space where everyone feels safe and welcome.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Q: What languages are supported?</h4>
                        <p>A: Happytalk supports over 50 languages. You can filter matches by language to practice speaking or connect with people who share your native tongue.</p>
                    </div>
                </div>

                {/* STILL HAVE QUESTIONS */}
                <div className="expanded-block contact-card">
                    <h3>Still Have Questions?</h3>
                    <p>We're here to help! Reach out to us:</p>
                    <ul className="contact-list">
                        <li><FaEnvelope /> <strong>Email:</strong> hello@happytalk.in</li>
                        <li><FaQuestionCircle /> <strong>Help Center:</strong> help.happytalk.in</li>
                    </ul>
                </div>
            </section>

            <footer className="expanded-footer">
                <div className="footer-bottom-bar" style={{ marginTop: 0 }}>
                    <div className="f-copy">&copy; 2026 Happytalk.in — All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}

export default OneToOneFAQ;
