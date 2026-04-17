import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LifeBuoy } from 'lucide-react';

const FAQ = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Support</h1>
                <div className="simple-long-text">
                    <p>
                        The HappyTalk.in support ecosystem is designed to be comprehensive, accessible, 
                        and responsive to the needs of our global community. We understand that users 
                        may encounter a variety of needs—from technical troubleshooting and account 
                        management to questions about language learning tools and safety features.
                    </p>
                    <p>
                        Our Help & FAQ section serves as a central knowledge base, offering detailed guides 
                        and step-by-step articles that cover every aspect of the platform, including how to 
                        navigate the 3-tier verification system, optimize call quality, use the AI chat 
                        tutor effectively, and understand the "Green Zone vs. Red Zone" behavioral framework. 
                        This self-service resource is available 24/7 and is continuously updated to reflect 
                        new features and common user inquiries, empowering users to find answers quickly and independently.
                    </p>
                </div>

                <h1 className="simple-title" style={{ marginTop: '80px' }}>Help & FAQ</h1>
                <div className="simple-long-text">
                    <p>
                        The Help & FAQ section of HappyTalk.in serves as the comprehensive knowledge hub 
                        for the platform, designed to empower users with the information they need to 
                        navigate, learn, and connect with confidence. This resource is structured to 
                        address the full spectrum of user inquiries, from foundational topics like 
                        account setup and profile customization to more advanced features such as the 
                        AI chat tutor, collaborative media players, and the 3-tier verification system.
                    </p>
                    <p>
                        Users can find detailed explanations of how the matching algorithm works, tips for 
                        improving call quality based on their internet connection and device, and guidance 
                        on using the "Digital Life" utility suite of productivity tools. The FAQ also 
                        provides clear, accessible information about the platform's safety architecture, 
                        including how end-to-end encryption protects conversations, how AI Sentinel 
                        monitors interactions, and what the "Green Zone vs. Red Zone" behavioral 
                        framework means for daily use.
                    </p>
                    <p>
                        In addition to standard help articles, the Help & FAQ section is continuously updated 
                        to reflect new features, community feedback, and emerging user needs. Language learners 
                        can access specialized guides on making the most of the 20+ language tracks, utilizing 
                        real-time translation during calls, and transitioning from the AI tutor to live human 
                        conversations. By providing this extensive, self-service knowledge base, HappyTalk.in 
                        ensures that users can spend less time searching for answers and more time doing 
                        what matters most: connecting, practicing, and growing through real conversations.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <LifeBuoy size={24} className="text-blue-400" />
                    <span>24/7 Global Help Desk</span>
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

export default FAQ;