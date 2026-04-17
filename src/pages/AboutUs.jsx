import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Product & Vision</h1>
                <div className="simple-long-text">
                    <p>
                        HappyTalk.in is a premium, 18+ social language learning and communication platform 
                        that fundamentally reimagines how people acquire new languages and build meaningful 
                        global connections. Unlike traditional language apps that rely on memorization, quizzes, 
                        and solitary study, HappyTalk.in is built on the core philosophy that languages are best 
                        learned through live, authentic human conversation.
                    </p>
                    <p>
                        It combines the spontaneity of instant video matchmaking with the depth of a full social 
                        network, creating a unique ecosystem where users from over 190 countries can connect, 
                        practice, and grow together. The platform is designed as a multi-service "digital life" hub, 
                        integrating immersive communication tools, AI-powered tutoring, cultural exchange features, 
                        and even productivity utilities—all within a sleek, minimalist interface. HappyTalk.in is 
                        strictly for adults aged 18 and over, ensuring a mature environment focused on genuine 
                        connection, confidence building, and overcoming social anxiety through real-time interaction.
                    </p>
                </div>

                <h1 className="simple-title" style={{ marginTop: '80px' }}>About Us</h1>
                <div className="simple-long-text">
                    <p>
                        HappyTalk.in is a premier global social and educational ecosystem born from a simple but 
                        profound belief: human connection is the most powerful tool for personal growth, cultural 
                        understanding, and language acquisition. In a world where digital interactions often feel 
                        shallow and transactional, HappyTalk.in was created to bring people closer together—not through 
                        algorithms designed to keep users scrolling, but through authentic, real-time conversations 
                        that bridge cultural and linguistic divides.
                    </p>
                    <p>
                        We are a community of learners, native speakers, and explorers from over 190 countries, 
                        united by a shared desire to communicate, connect, and grow. Whether you are practicing your 
                        first words in Spanish, seeking to overcome social anxiety, or looking to make a lifelong friend 
                        across the ocean, HappyTalk.in provides the environment, tools, and safety to make that 
                        connection possible.
                    </p>
                    <p>
                        Our mission extends beyond language instruction; we exist to foster empathy, cultural exchange, 
                        and the confidence that comes from being truly heard and understood. We believe that fluency is 
                        not measured by test scores but by the ability to laugh at a joke in another language, to share 
                        a story, or to comfort a friend on the other side of the world.
                    </p>
                    <p>
                        To support this vision, we have built HappyTalk.in on a security-first architecture, ensuring 
                        that every interaction is protected by end-to-end encryption, AI-driven moderation, and a 
                        transparent 3-tier verification system that guarantees you are always speaking with real, 
                        authenticated humans. Our commitment is to provide a space where creativity, vulnerability, 
                        and learning can flourish without fear. We are not just a platform; we are a movement 
                        dedicated to proving that in an increasingly digital world, the most meaningful technology 
                        is the one that brings us back to each other.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <Shield size={24} className="text-emerald-400" />
                    <span>Established 2026</span>
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
                
                .simple-container {
                    max-width: 900px;
                    margin: 0 auto;
                }
                .simple-title { font-size: 42px; font-weight: 800; margin-bottom: 30px; letter-spacing: -1px; }
                
                .simple-long-text p {
                    font-size: 19px;
                    color: #94a3b8;
                    line-height: 1.8;
                    margin-bottom: 30px;
                    font-weight: 400;
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
                    .simple-long-text p { font-size: 17px; }
                    .back-home-btn { position: static; margin-bottom: 40px; }
                }
            `}</style>
        </div>
    );
};

export default AboutUs;