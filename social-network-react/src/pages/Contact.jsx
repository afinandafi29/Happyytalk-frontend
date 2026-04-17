import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

const Contact = () => {
    const navigate = useNavigate();

    return (
        <div className="simple-black-page">
            <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </button>

            <div className="simple-container">
                <h1 className="simple-title">Contact Support</h1>
                <div className="simple-long-text">
                    <p>
                        For issues that require personalized, human-assisted resolution, HappyTalk.in 
                        offers a dedicated Contact Support channel that connects users directly with our 
                        experienced support team. This service is available to all users 24 hours a day, 
                        7 days a week, recognizing that our global community spans every time zone and 
                        that challenges can arise at any moment.
                    </p>
                    <p>
                        Whether a user is experiencing technical difficulties with video or audio 
                        connectivity, has questions about their account verification status, needs 
                        assistance with billing or premium features, or wishes to appeal a moderation 
                        decision, the support team is equipped to handle a wide range of inquiries with 
                        professionalism and empathy.
                    </p>
                    <p>
                        Users can submit requests through a secure form or via direct email, allowing the 
                        support team to provide efficient and accurate assistance. For urgent safety 
                        concerns, the Contact Support pathway also directs users to the encrypted 
                        Safety Channel, ensuring that critical issues receive immediate human attention 
                        without unnecessary delays.
                    </p>
                    <p>
                        The Contact Support experience is designed to be transparent and responsive. 
                        Upon submitting a request, users receive confirmation of receipt and estimated 
                        response times based on the nature and priority of their inquiry. HappyTalk.in 
                        views support not merely as a problem-solving function but as an integral part 
                        of the user experience, reflecting our commitment to building a platform where 
                        users feel heard, valued, and supported every step of the way.
                    </p>
                </div>

                <div className="contact-card-box">
                    <h3>Official Support Email</h3>
                    <div className="email-highlight">happyytalk@gmail.com</div>
                    <a href="mailto:happyytalk@gmail.com" className="contact-action-btn">Send Email Now</a>
                </div>

                <div className="simple-footer-badge">
                    <Mail size={24} className="text-blue-400" />
                    <span>Human-Assisted Resolution Hub</span>
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

                .contact-card-box {
                    background: #0a0a0a;
                    border: 1px solid #1a1a1a;
                    padding: 50px;
                    border-radius: 30px;
                    text-align: center;
                    margin-top: 50px;
                }
                .contact-card-box h3 { margin-bottom: 15px; font-size: 20px; color: #64748b; }
                .email-highlight { font-size: 32px; font-weight: 800; margin-bottom: 30px; color: #ffffff; }
                
                .contact-action-btn {
                    display: inline-block;
                    background: #ffffff;
                    color: #000000;
                    padding: 15px 40px;
                    border-radius: 15px;
                    font-weight: 800;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .contact-action-btn:hover { transform: scale(1.05); }

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
                    .email-highlight { font-size: 20px; }
                    .back-home-btn { position: static; margin-bottom: 40px; }
                }
            `}</style>
        </div>
    );
};

export default Contact;
