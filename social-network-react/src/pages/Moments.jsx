import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeedContent from '../components/Feed/FeedContent';

const MomentsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="moments-page-wrapper w-full min-h-screen bg-[#0f0f12]">
            <FeedContent 
                onHomeClick={() => navigate('/')} 
            />
        </div>
    );
};

export default MomentsPage;