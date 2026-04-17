import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket } from 'lucide-react';

const CoreFeatures = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Core Features</h1>
                <div className="simple-long-text">
                    <p>
                        HappyTalk.in is built upon five powerful pillars that together create a comprehensive 
                        ecosystem for language learning, social connection, and personal growth.
                    </p>

                    <h3 className="sub-header">1. Communication & Connectivity</h3>
                    <p>
                        This pillar forms the heart of the platform, featuring ultra-low latency 1-to-1 video 
                        and audio matching that connects users in under two seconds based on language compatibility, 
                        interests, and geographical proximity. Beyond one-on-one interactions, users can join or 
                        create themed group rooms—spaces dedicated to topics like "Spanish Cooking," "Tech Talk," 
                        or "Business English"—where multiple participants can engage in high-definition conversations. 
                        Integrated collaborative media players allow users to watch YouTube videos or listen to 
                        music together during calls, transforming language practice into a shared social experience 
                        that feels natural and engaging.
                    </p>

                    <h3 className="sub-header">2. Immersive Language Learning</h3>
                    <p>
                        This pillar provides structured educational tools that complement spontaneous conversation. 
                        A comprehensive quiz suite offers dedicated learning tracks for over 20 languages, testing 
                        grammar, vocabulary, and listening comprehension. The AI Chat Tutor serves as an always-available 
                        conversational partner, allowing users to build confidence and practice new phrases without 
                        the pressure of a live human interaction. Real-time translation tools help bridge severe 
                        language gaps during calls, while specialized modules guide users through learning new 
                        writing systems such as Kanji, Cyrillic, or Devanagari from the ground up.
                    </p>

                    <h3 className="sub-header">3. Social Presence & Engagement</h3>
                    <p>
                        This pillar transforms the platform into a full social network, complete with a dynamic 
                        feed for sharing "Moments," photos, and updates with a global following. Short-form vertical 
                        videos ("Shorts") enable quick cultural exchanges and language tips, while an integrated 
                        global map allows users to visually explore where their connections are located. Rich user 
                        profiles display earned achievement badges and verification status, fostering a sense of 
                        community identity and accomplishment.
                    </p>

                    <h3 className="sub-header">4. Digital Life Utility Suite</h3>
                    <p>
                        Completing the ecosystem are two additional pillars that set HappyTalk.in apart. The 
                        "Digital Life" Utility Suite integrates a collection of productivity tools directly into 
                        the platform, including a calculator, calendar, notes, reminders, maps, compass, and world 
                        clocks—allowing users to manage their daily tasks without ever leaving the environment.
                    </p>

                    <h3 className="sub-header">5. Trust & Safety</h3>
                    <p>
                        Finally, the Trust & Safety pillar underpins the entire experience with a robust 3-tier 
                        verification system (Basic, Trusted, Elite), end-to-end encryption for all communications, 
                        AI Sentinel real-time moderation that scans for inappropriate behavior 24/7, and one-click 
                        safety tools that empower users to instantly skip, block, or report any concerning interaction. 
                        Together, these pillars create a holistic platform where language learning, social networking, 
                        and personal safety coexist seamlessly.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <Rocket size={24} className="text-yellow-400" />
                    <span>Next-Gen Connection Pillars</span>
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
                
                .sub-header { font-size: 24px; font-weight: 700; margin: 50px 0 20px; color: #ffffff; }
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

export default CoreFeatures;
