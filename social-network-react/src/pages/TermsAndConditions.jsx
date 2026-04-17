import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';

const TermsAndConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Terms of Service</h1>
                <div className="simple-long-text">
                    <p>
                        The Terms of Service for HappyTalk.in constitute the binding legal agreement between 
                        the platform and its users, establishing the rules, responsibilities, and expectations 
                        that govern all interactions within the ecosystem. These terms are crafted to protect 
                        both the community and the individual, ensuring that HappyTalk.in remains a safe, 
                        respectful, and constructive space for language learning and social connection.
                    </p>
                    <p>
                        A foundational provision of the Terms is the strict 18+ age requirement, which 
                        mandates that all users must be adults. This policy is enforced through the 
                        verification system, and any attempt to use the platform by individuals under 18 
                        results in immediate account termination. The Terms also clearly define acceptable 
                        use, outlining the "Green Zone" behaviors that are encouraged while explicitly 
                        prohibiting "Red Zone" activities including harassment, hate speech, nudity, 
                        solicitation, and any form of illegal or harmful conduct.
                    </p>
                    <p>
                        Beyond behavioral guidelines, the Terms of Service address critical areas such 
                        as content ownership, account management, and liability. Users retain ownership of 
                        the content they create and share on the platform, while granting HappyTalk.in the 
                        necessary licenses to host, display, and facilitate sharing of that content within 
                        the community.
                    </p>
                    <p>
                        The Terms also detail the process for account suspension or termination, 
                        emphasizing that violations of safety guidelines or the 18+ policy may result in 
                        immediate and permanent deactivation. Additionally, the Terms outline the terms 
                        for premium services, including billing, cancellations, and refunds, ensuring 
                        transparency in all financial interactions. By providing clear, comprehensive, and 
                        enforceable rules, the Terms of Service establish the legal framework that allows 
                        HappyTalk.in to operate as a trusted platform.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <Scale size={24} className="text-blue-400" />
                    <span>Legally Protected Community Framework</span>
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

export default TermsAndConditions;