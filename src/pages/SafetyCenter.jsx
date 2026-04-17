import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const SafetyCenter = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Safety Center</h1>
                <div className="simple-long-text">
                    <p>
                        The Safety Center is the centralized hub where HappyTalk.in consolidates all 
                        resources, tools, and information related to community safety and user protection. 
                        Designed as both an educational resource and an operational command center, the 
                        Safety Center provides users with a comprehensive understanding of how the 
                        platform protects them.
                    </p>
                    <p>
                        Here, users can explore detailed explanations of the platform's security-first 
                        architecture, including the end-to-end encryption (DTLS-SRTP) that protects 
                        every 1-to-1 video and audio stream from unauthorized access. The Safety Center 
                        also demystifies the AI Sentinel system, explaining how real-time scanning 
                        works to detect and flag inappropriate content without compromising user privacy.
                    </p>
                    <p>
                        Beyond technical safeguards, the Safety Center serves as a guide to proactive 
                        safety practices, empowering users to take control of their own experience. 
                        Interactive tutorials walk users through using one-click safety tools like 
                        Skip, Block, and Report, ensuring that every member knows exactly how to 
                        respond if they ever feel uncomfortable.
                    </p>
                    <p>
                        The Center also provides best practices for safe communication, such as protecting 
                        personal information, recognizing and avoiding scams, and understanding the 
                        boundaries of appropriate interaction within the "Green Zone" framework. By 
                        combining robust security infrastructure with user education, the Safety Center 
                        ensures that safety on HappyTalk.in is not just a set of features but a shared 
                        responsibility and a foundational value of the community.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <ShieldCheck size={24} className="text-emerald-400" />
                    <span>Centralized Security Command</span>
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

export default SafetyCenter;
