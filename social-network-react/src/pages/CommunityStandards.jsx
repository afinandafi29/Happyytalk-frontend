import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const CommunityStandards = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Safety Guidelines</h1>
                <div className="simple-long-text">
                    <p>
                        The Safety Guidelines on HappyTalk.in are built upon a clear and actionable framework 
                        known as the "Green Zone vs. Red Zone" system, which defines acceptable behavior 
                        and empowers users to participate in the community with confidence.
                    </p>
                    <p>
                        The <strong>Green Zone</strong> represents the ideal HappyTalk.in experience: respectful, 
                        constructive, and focused on genuine human connection. In this zone, users engage 
                        in meaningful conversations, practice languages with patience and encouragement, 
                        respect cultural differences, and contribute positively to the community.
                    </p>
                    <p>
                        The <strong>Red Zone</strong>, by contrast, encompasses behaviors that are strictly 
                        prohibited and subject to immediate enforcement action. This includes any form 
                        of harassment, hate speech, nudity, violent content, solicitation, or behavior 
                        that makes others feel unsafe or uncomfortable.
                    </p>
                    <p>
                        HappyTalk.in maintains a zero-tolerance policy for violations of these guidelines, 
                        enforced through a combination of AI Sentinel real-time monitoring and user-initiated 
                        reporting. When Red Zone behavior is detected, the platform responds swiftly with 
                        consequences ranging from warnings and temporary restrictions to permanent account deactivation.
                    </p>
                    <p>
                        All users are required to be verified as real humans aged 18 or older, ensuring 
                        that the community remains a mature space free from bots or underage participants. 
                        By providing clear expectations, transparent enforcement, and accessible safety tools, 
                        the Safety Guidelines create a foundation of trust that allows users to focus 
                        on what matters most: learning, connecting, and growing.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <CheckCircle size={24} className="text-emerald-400" />
                    <span>Green Zone / Red Zone Protocol</span>
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

export default CommunityStandards;
