import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaShieldAlt, FaUserSecret, FaLock, FaRobot, FaUsers, FaTools, FaEnvelope } from 'react-icons/fa';
import "../styles/OneToOneAbout.css"; // Reuse premium styles

function OneToOnePrivacy() {
    const navigate = useNavigate();

    return (
        <div className="oto-about-container">
            <section className="oto-about-hero" style={{ height: '40vh' }}>
                <button className="back-to-oto" onClick={() => navigate('/one-to-one')}>
                    <FaHome /> Back to Chat
                </button>
                <div className="hero-content">
                    <h1 className="hero-title">Privacy Policy</h1>
                    <p className="hero-subtitle">Last Updated: March 25, 2026</p>
                </div>
            </section>

            <section className="oto-about-expanded">
                {/* 1. INTRODUCTION */}
                <div className="expanded-block">
                    <h3>1. Introduction</h3>
                    <p>Welcome to Happytalk.in ("Happytalk," "we," "us," or "our"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, services, and applications (collectively, the "Service").</p>
                    <p>By using Happytalk, you consent to the data practices described in this policy. If you do not agree with any part of this policy, please do not use our Service.</p>
                </div>

                {/* 2. INFORMATION WE COLLECT */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaUsers /> 2. Information We Collect</h3>
                    <div className="faq-item-v2">
                        <h4>Account Information</h4>
                        <p>Username, profile preferences (language, interests), and email address (if you create an account).</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Device & Usage Information</h4>
                        <p>IP address, browser type, operating system, and anonymous usage patterns to provide and improve the Service.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Information We Do NOT Collect</h4>
                        <p><strong>Video chat recordings:</strong> We do not record or store your video conversations. Financial information (Service is free). Sensitive personal data.</p>
                    </div>
                </div>

                {/* 4. AI MODERATION */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaRobot /> 4. How We Use AI Moderation</h3>
                    <p>Happytalk uses artificial intelligence (AI) to help keep our community safe.</p>
                    <ul className="oto-list">
                        <li>Video, audio, and text streams are analyzed in real-time by automated systems.</li>
                        <li>AI models detect potentially prohibited content (nudity, hate speech, harassment).</li>
                        <li>High-risk content is flagged for human review or temporarily restricted.</li>
                        <li>AI moderation does NOT record or store your conversations.</li>
                    </ul>
                </div>

                {/* 6. DATA RETENTION */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaTools /> 6. Data Retention</h3>
                    <div className="faq-item-v2">
                        <h4>Video/Audio</h4>
                        <p>Not stored — processed in real-time only.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Chat Content</h4>
                        <p>Not stored — deleted immediately after conversation ends.</p>
                    </div>
                    <div className="faq-item-v2">
                        <h4>Account Information</h4>
                        <p>Until account deletion or inactivity (2+ years).</p>
                    </div>
                </div>

                {/* 11. DATA SECURITY */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaLock /> 11. Data Security</h3>
                    <p>We implement industry-standard security measures to protect your information, including encryption in transit (TLS/SSL), secure infrastructure with access controls, and regular security assessments.</p>
                </div>

                {/* 14. GRIEVANCE OFFICER */}
                <div className="expanded-block">
                    <h3>14. Grievance Officer (India)</h3>
                    <p>In compliance with the Information Technology Act, 2000, we have appointed a Grievance Officer to address privacy and data protection concerns.</p>
                    <ul className="contact-list">
                        <li><strong>Email:</strong> grievance@happytalk.in</li>
                        <li><strong>Hours:</strong> Monday–Friday, 10:00 AM – 6:00 PM IST</li>
                    </ul>
                    <p>We acknowledge complaints within 24 hours and resolve them within 15 days.</p>
                </div>

                {/* 16. CONTACT */}
                <div className="expanded-block contact-card">
                    <h3>Questions & Concerns?</h3>
                    <p>If you have questions about our data practices:</p>
                    <ul className="contact-list">
                        <li><strong>Privacy:</strong> privacy@happytalk.in</li>
                        <li><strong>Reports:</strong> report@happytalk.in</li>
                        <li><strong>DPO (EEA):</strong> dpo@happytalk.in</li>
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

export default OneToOnePrivacy;
