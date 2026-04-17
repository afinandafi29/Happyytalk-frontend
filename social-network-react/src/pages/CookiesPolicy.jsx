import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';

const CookiesPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Cookie Policy</h1>
                <div className="simple-long-text">
                    <p>
                        The Cookie Policy of HappyTalk.in provides a clear and comprehensive explanation of 
                        how the platform uses cookies and similar tracking technologies to enhance user 
                        experience, ensure functionality, and optimize performance.
                    </p>
                    <p>
                        On HappyTalk.in, cookies are employed primarily for essential operational purposes, 
                        such as maintaining secure user sessions after login, authenticating identity across 
                        the platform, and ensuring that the authentication and matching systems function 
                        seamlessly. These strictly necessary cookies are fundamental to the platform's 
                        operation and cannot be disabled.
                    </p>
                    <p>
                        In addition to essential cookies, HappyTalk.in uses performance and analytics 
                        cookies to understand how users interact with the platform. These tools collect 
                        aggregated, anonymized data about feature usage, page views, and user flows, helping 
                        the development team identify areas for enhancement. Preference cookies remember 
                        user settings such as language preferences, theme selections, and notification 
                        configurations, ensuring a personalized experience across visits.
                    </p>
                    <p>
                        The Cookie Policy provides users with clear options for managing their cookie 
                        preferences, typically through browser settings or a consent management tool. 
                        By being transparent about how and why cookies are used, HappyTalk.in ensures 
                        that users can make informed choices about their data while still enjoying a 
                        smooth, responsive platform experience.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <Cookie size={24} className="text-blue-400" />
                    <span>Optimized Session Connectivity</span>
                </div>
            </div>

            <style>{`
                .simple-black-page {
                    min-height: 100vh;
                    width: 100%;
                    background: #000000;
                    color: #ffffff;
                    padding: 80px 40px;
                    font-family: 'Inter', sans-serif;
                    position: relative;
                }
                .back-home-btn {
                    position: absolute;
                    top: 30px;
                    left: 30px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 10px 20px;
                    border-radius: 12px;
                    color: #94a3b8;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .back-home-btn:hover { background: rgba(255, 255, 255, 0.1); color: #ffffff; }
                
                .simple-container { max-width: 900px; margin: 0 auto; }
                .simple-title { font-size: 42px; font-weight: 800; margin-bottom: 30px; letter-spacing: -1px; }
                
                .simple-long-text p {
                    font-size: 19px;
                    color: #94a3b8;
                    line-height: 1.8;
                    margin-bottom: 30px;
                }
                
                .simple-footer-badge {
                    margin-top: 100px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    color: #64748b;
                    font-weight: 700;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }

                @media (max-width: 768px) {
                    .simple-black-page { padding: 80px 20px; }
                    .simple-title { font-size: 32px; }
                    .back-home-btn { position: static; margin-bottom: 40px; }
                }
            `}</style>
        </div>
    );
};

export default CookiesPolicy;
