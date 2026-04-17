import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const ReportIssue = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Report an Issue</h1>
                <div className="simple-long-text">
                    <p>
                        The Report Issue system on HappyTalk.in is engineered for speed, security, and 
                        effectiveness, recognizing that user safety and comfort are paramount in a 
                        real-time communication platform.
                    </p>
                    <p>
                        During any 1-to-1 call or group room interaction, users have access to a one-click 
                        reporting button prominently displayed in the call interface, allowing for immediate 
                        action without interrupting the user's sense of safety. When a report is filed, 
                        the system does not simply send a message to a queue; it initiates a sophisticated 
                        multi-stage process designed to ensure that every concern is properly evaluated and addressed.
                    </p>
                    <p>
                        The incident details, along with relevant session metadata, are first analyzed by AI Sentinel, 
                        which performs preliminary checks to verify the claim and flag any patterns of behavior 
                        that may require urgent attention. Following AI analysis, the report is escalated to 
                        the Human Review Team, a group of trained safety analysts who make the final determination 
                        based on the platform's community guidelines and terms of service.
                    </p>
                    <p>
                        Depending on the nature and severity of the incident, outcomes can range from a warning 
                        and educational guidance to temporary account suspension or permanent deactivation. 
                        Throughout this process, the reporting user receives appropriate updates without 
                        compromising the privacy or details of the investigation. This hybrid approach—combining 
                        the speed of AI with the nuance of human judgment—ensures that the reporting system is 
                        not just a reactive tool but an integral part of maintaining HappyTalk.in as a respectful, 
                        safe, and welcoming environment for all users aged 18 and over.
                    </p>
                </div>

                <div className="report-direct-action">
                    <h3>Urgent Support?</h3>
                    <p>For critical safety issues, you can also email us directly at:</p>
                    <a href="mailto:happyytalk@gmail.com" className="direct-link">happyytalk@gmail.com</a>
                </div>

                <div className="simple-footer-badge">
                    <Shield size={24} className="text-red-400" />
                    <span>Advanced Safety Protocol Activated</span>
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
                
                .report-direct-action {
                    background: rgba(239, 68, 68, 0.05);
                    border: 1px solid rgba(239, 68, 68, 0.1);
                    padding: 40px;
                    border-radius: 25px;
                    margin-top: 50px;
                    text-align: center;
                }
                .report-direct-action h3 { margin-bottom: 10px; font-size: 20px; }
                .report-direct-action p { color: #64748b; margin-bottom: 15px; }
                .direct-link { color: #ef4444; font-weight: 800; font-size: 24px; text-decoration: none; }

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

export default ReportIssue;
