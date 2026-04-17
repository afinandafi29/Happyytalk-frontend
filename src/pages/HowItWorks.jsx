import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';

const HowItWorks = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">How It Works</h1>
                <div className="simple-long-text">
                    <p>
                        The HappyTalk.in experience begins with a secure authentication process where users 
                        register via a unified system powered by Supabase. Upon entry, every user must 
                        complete mandatory SMS or email verification to establish a "human-only" environment, 
                        forming the foundation of the platform's Basic Tier. Users then define their linguistic 
                        profile by selecting their native language and target language, which feeds directly into 
                        the platform's intelligent matching algorithm. For those seeking greater trust and priority 
                        matching, an optional photo-ID verification unlocks the Trusted Tier, granting a verified 
                        blue checkmark and signaling authenticity to the community. This multi-layered identity 
                        system ensures that every interaction begins with a foundation of trust and transparency.
                    </p>
                    <p>
                        Once onboarded, users enter the live connection ecosystem, which operates on a hybrid 
                        matchmaking model. The platform's Socket.io server continuously monitors "Looking for Partner" 
                        signals, enabling ultra-low latency matching that typically completes in under two seconds. 
                        Users can engage in spontaneous Omegle-style 1-to-1 video calls or browse themed interest-based 
                        rooms from the Home Feed, where they can join group conversations around topics like language 
                        practice, cultural exchange, or shared hobbies.
                    </p>
                    <p>
                        Every video and audio stream is secured with industry-standard DTLS-SRTP encryption, ensuring 
                        complete privacy. During calls, users have access to a suite of real-time tools including 
                        on-screen translation assistance, shared YouTube and music players for collaborative 
                        entertainment, and built-in ice-breaker games like Truth or Dare to ease into conversation. 
                        The platform also features an AI chat tutor, allowing users to practice in a low-pressure 
                        environment before connecting with human partners. After each call, users can provide feedback 
                        on their partner, which influences trust scores and refines future match quality, creating a 
                        continuously improving experience.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <Globe size={24} className="text-blue-400" />
                    <span>Real-time Global Connectivity</span>
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

export default HowItWorks;
