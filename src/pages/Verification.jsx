import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck } from 'lucide-react';

const Verification = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Verification</h1>
                <div className="simple-long-text">
                    <p>
                        The verification system on HappyTalk.in is a sophisticated 3-tier structure 
                        designed to build trust, authenticate users, and create a safer environment 
                        for genuine human connection.
                    </p>

                    <h3 className="sub-header">Tier 1: Basic Verification</h3>
                    <p>
                        At the foundational level is Basic Verification, which is mandatory for all users. 
                        This tier requires SMS and email confirmation, ensuring that every account is tied 
                        to a real phone number and email address, effectively eliminating bots and 
                        anonymous bad actors from the platform. Basic Verification establishes that users 
                        are real humans aged 18 or older, creating a baseline of authenticity that underpins 
                        all interactions.
                    </p>

                    <h3 className="sub-header">Tier 2: Trusted Verification</h3>
                    <p>
                        The second tier, Trusted Verification, is an optional but highly encouraged step for 
                        users seeking to deepen their engagement and unlock premium benefits. This tier 
                        involves submitting a government-issued photo ID for secure verification. Users 
                        who complete Trusted Verification receive a prominent blue checkmark on their profile, 
                        signaling to the community that they have undergone additional identity confirmation. 
                        Trusted members also benefit from priority in the matching algorithm.
                    </p>

                    <h3 className="sub-header">Tier 3: Elite Status</h3>
                    <p>
                        The highest tier, Elite Status, is an invitation-only designation reserved for 
                        top-rated community members who consistently demonstrate exemplary behavior, 
                        positive partner ratings, and active, constructive participation. Elite members 
                        serve as community ambassadors, enjoying enhanced visibility, priority support, 
                        and recognition as leaders within the HappyTalk.in ecosystem.
                    </p>
                </div>

                <div className="simple-footer-badge">
                    <UserCheck size={24} className="text-blue-400" />
                    <span>Multi-Layered Trust Framework</span>
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
                
                .sub-header { font-size: 22px; font-weight: 700; margin: 40px 0 15px; color: #ffffff; }
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

export default Verification;
