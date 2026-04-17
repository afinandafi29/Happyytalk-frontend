import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Privacy Policy</h1>
                <div className="simple-long-text">
                    <p>
                        The Privacy Policy of HappyTalk.in reflects our deep commitment to protecting the 
                        personal information of our users, recognizing that trust is the foundation of 
                        any platform built on human connection. This policy provides a transparent, detailed 
                        account of how we collect, use, store, and safeguard user data across the entire ecosystem.
                    </p>
                    <p>
                        When users register, we collect essential information such as name, email address, 
                        phone number, and linguistic preferences. For users who choose to pursue Trusted Verification, 
                        we securely collect and process government-issued photo identification, handling this 
                        sensitive information with the highest level of encryption and security protocols. 
                        Throughout a user's journey, we also gather usage data—such as session metadata, 
                        partner ratings, and feature interactions—to improve the platform's performance.
                    </p>
                    <p>
                        Crucially, the Privacy Policy emphasizes the security measures that protect user 
                        data and communications at every level. All video and audio streams are protected by 
                        end-to-end encryption (DTLS-SRTP), meaning that conversations remain private and 
                        accessible only to the participants. Data storage is managed through secure 
                        infrastructure provided by Supabase and Redis, with robust access controls.
                    </p>
                    <p>
                        HappyTalk.in does not sell personal information to third parties. Limited data sharing 
                        occurs only when necessary to provide core services, comply with legal obligations, 
                        or protect the safety of the community. Users are given control over their own 
                        information through account settings, including the ability to update profiles, 
                        manage privacy preferences, and request account deletion.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <Eye size={24} className="text-blue-400" />
                    <span>Transparent Data Stewardship</span>
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

export default PrivacyPolicy;