import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaShieldAlt, FaComments, FaLock, FaExclamationTriangle, FaHeart, FaUserSecret, FaGavel, FaLightbulb } from 'react-icons/fa';
import "../styles/OneToOneAbout.css"; // Reuse premium styles

function OneToOneRules() {
    const navigate = useNavigate();

    return (
        <div className="oto-about-container">
            <section className="oto-about-hero" style={{ height: '40vh' }}>
                <button className="back-to-oto" onClick={() => navigate('/one-to-one')}>
                    <FaHome /> Back to Chat
                </button>
                <div className="hero-content">
                    <h1 className="hero-title">Community Rules & Guidelines</h1>
                    <p className="hero-subtitle">Last Updated: March 25, 2026</p>
                </div>
            </section>

            <section className="oto-about-expanded">
                {/* OUR PROMISE */}
                <div className="expanded-block">
                    <h3>Our Promise to You</h3>
                    <p>At Happytalk, we believe in the power of genuine human connection. Our community is built on respect, kindness, and authenticity. These rules exist to protect every user and ensure that Happytalk remains a safe space for meaningful conversations.</p>
                </div>

                {/* 1. BE RESPECTFUL */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaHeart /> 1. Be Respectful</h3>
                    <p>Always treat fellow users with dignity and respect. Treat others the way you want to be treated.</p>
                    <ul className="oto-list">
                        <li>Be kind and considerate in your conversations</li>
                        <li>Respect differing opinions, backgrounds, and perspectives</li>
                        <li>Listen actively and engage in good faith</li>
                    </ul>
                </div>

                {/* 2. NO HARASSMENT */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaExclamationTriangle /> 2. No Harassment or Hate Speech</h3>
                    <p>Hate speech and harassment have no place on Happytalk. We define harassment as any unwanted behavior intended to annoy, threaten, or intimidate another person.</p>
                    <ul className="oto-list">
                        <li>Zero tolerance for mockery based on appearance, accent, or identity.</li>
                        <li>Immediate permanent ban for first violations of hate speech.</li>
                    </ul>
                </div>

                {/* 3. NO NUDITY */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaLock /> 3. No Nudity or Sexual Content</h3>
                    <p>Happytalk is not an adult platform. Sexually explicit content is strictly prohibited. This includes nudity, sexual acts, roleplay, or solicitation.</p>
                    <p><strong>Consequences:</strong> Immediate permanent ban without warning.</p>
                </div>

                {/* 4. SAFETY */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaShieldAlt /> 4. Keep It Safe & Appropriate</h3>
                    <p>Help us maintain a safe environment for all ages. Keep conversations appropriate and report suspicious behavior instantly.</p>
                    <p><strong>DO NOT</strong> share personal information like your address, phone number, or financial details.</p>
                </div>

                {/* 7. PRIVACY */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaUserSecret /> 7. Respect Privacy & Consent</h3>
                    <p>What happens in your chat stays between you and the other person — unless consent is given.</p>
                    <p><strong>DO NOT</strong> record, screenshot, or broadcast conversations without explicit consent. Legal consequences may apply.</p>
                </div>

                {/* 9. REPORTING */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaGavel /> 9. Reporting & Enforcement</h3>
                    <p>You are our partner in keeping the community safe. Use the <strong>Report</strong> button during or after a chat, or email <strong>report@happytalk.in</strong>.</p>
                    <p>Human moderators review all user reports within 24 hours. Decisions are final and at the discretion of Happytalk.</p>
                </div>

                {/* 14. TIPS */}
                <div className="expanded-block contact-card">
                    <h3 className="section-header"><FaLightbulb /> Tips for Positive Conversations</h3>
                    <ul className="oto-list">
                        <li><strong>Start with a smile:</strong> A friendly greeting sets the tone</li>
                        <li><strong>Trust your instincts:</strong> If something feels off, end the chat</li>
                        <li><strong>Use the block button:</strong> It's there for your safety</li>
                        <li><strong>Be open-minded:</strong> You might learn something new</li>
                    </ul>
                </div>

                {/* FOOTER SUMMARY */}
                <div className="expanded-block">
                    <h3>The Happytalk Promise</h3>
                    <div className="faq-item-v2">
                        <h4>Do ✅</h4>
                        <p>Be kind, protect your privacy, report violations, be yourself, and have fun!</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Don't ❌</h4>
                        <p>Harass others, share explicit content, give out personal info, or record without consent.</p>
                    </div>
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

export default OneToOneRules;
