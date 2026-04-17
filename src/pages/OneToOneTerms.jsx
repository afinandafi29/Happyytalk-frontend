import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaShieldAlt, FaUserSecret, FaGavel, FaExclamationTriangle } from 'react-icons/fa';
import "../styles/OneToOneAbout.css"; // Reuse premium styles

function OneToOneTerms() {
    const navigate = useNavigate();

    return (
        <div className="oto-about-container">
            <section className="oto-about-hero" style={{ height: '40vh' }}>
                <button className="back-to-oto" onClick={() => navigate('/one-to-one')}>
                    <FaHome /> Back to Chat
                </button>
                <div className="hero-content">
                    <h1 className="hero-title">Terms of Service</h1>
                    <p className="hero-subtitle">Last Updated: March 25, 2026</p>
                </div>
            </section>

            <section className="oto-about-expanded">
                {/* 1. ACCEPTANCE */}
                <div className="expanded-block">
                    <h3>1. Acceptance of Terms</h3>
                    <p>Welcome to Happytalk.in ("Happytalk," "we," "us," or "our"). By accessing or using our website, services, or applications (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.</p>
                    <p>By using Happytalk, you represent that you are at least 13 years of age. If you are between 13 and 18, you represent that you have parental or guardian consent to use the Service.</p>
                </div>

                {/* 2. DESCRIPTION */}
                <div className="expanded-block">
                    <h3>2. Description of Service</h3>
                    <p>Happytalk provides a random video chat platform that connects users with strangers from around the world for real-time conversations. The Service is designed to facilitate genuine human connection through video, audio, and text-based interactions.</p>
                    <p>We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.</p>
                </div>

                {/* 3. USER CONDUCT */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaExclamationTriangle /> 3. User Conduct</h3>
                    <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You are solely responsible for your conduct and any content you share during conversations.</p>
                    <p><strong>Prohibited Conduct includes:</strong></p>
                    <ul className="oto-list">
                        <li>Harassment, bullying, or intimidation of other users</li>
                        <li>Hate speech, discrimination, or content promoting violence</li>
                        <li>Nudity, sexually explicit content, or any form of sexual solicitation</li>
                        <li>Spam, scams, or fraudulent activity</li>
                        <li>Impersonation of another person or entity</li>
                        <li>Sharing personal information of others without consent</li>
                        <li>Recording or broadcasting conversations without the other party's consent</li>
                    </ul>
                </div>

                {/* 4. SAFETY & MODERATION */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaShieldAlt /> 4. Safety & Moderation</h3>
                    <p>Happytalk employs automated AI moderation systems and human moderators to monitor the Service for violations of these Terms. While we strive to maintain a safe environment, we cannot guarantee that all users will comply with our guidelines.</p>
                    <p>You acknowledge that your conversations may be subject to real-time AI analysis for safety purposes, and we may suspend or terminate accounts that violate these Terms.</p>
                </div>

                {/* 5. PRIVACY */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaUserSecret /> 5. Privacy</h3>
                    <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Service, you consent to the collection and use of your information as described in the Privacy Policy.</p>
                </div>

                {/* 6. INTELLECTUAL PROPERTY */}
                <div className="expanded-block">
                    <h3>6. Intellectual Property</h3>
                    <p>All content, trademarks, logos, and intellectual property displayed on the Service are owned by Happytalk or our licensors. You may not copy, modify, distribute, or create derivative works without our express written permission.</p>
                </div>

                {/* 9. DISCLAIMER */}
                <div className="expanded-block">
                    <h3 className="section-header"><FaGavel /> 9. Disclaimer of Warranties</h3>
                    <p>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, HAPPYTALK DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
                    <p>YOU USE THE SERVICE AT YOUR OWN RISK. HAPPYTALK DOES NOT GUARANTEE THAT YOU WILL HAVE POSITIVE OR MEANINGFUL CONNECTIONS, AND WE ARE NOT RESPONSIBLE FOR THE CONDUCT OF OTHER USERS.</p>
                </div>

                {/* 10. LIMITATION OF LIABILITY */}
                <div className="expanded-block">
                    <h3>10. Limitation of Liability</h3>
                    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, HAPPYTALK AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, PERSONAL INJURY OR EMOTIONAL DISTRESS.</p>
                </div>

                {/* 17. CONTACT */}
                <div className="expanded-block contact-card">
                    <h3>Questions?</h3>
                    <p>If you have any questions about these Terms, please contact us:</p>
                    <ul className="contact-list">
                        <li><strong>Email:</strong> legal@happytalk.in</li>
                        <li><strong>Help Center:</strong> help.happytalk.in</li>
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

export default OneToOneTerms;
