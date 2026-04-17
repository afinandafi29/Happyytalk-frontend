import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, Youtube, BarChart2, Image as ImageIcon, FileText, Plus, Minus } from 'lucide-react';
import { createPostApi } from '../../api/postApi';

const inputStyle = {
    width: '100%',
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s, box-shadow 0.2s',
};

const focusStyle = (e) => {
    e.target.style.borderColor = '#0052ff';
    e.target.style.boxShadow = '0 0 0 3px rgba(0,82,255,0.15)';
};
const blurStyle = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.12)';
    e.target.style.boxShadow = 'none';
};

const extractYoutubeId = (url) => {
    if (!url) return null;
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
};

const TABS = [
    { id: 'text', label: 'Post', icon: FileText },
    { id: 'youtube', label: 'YouTube', icon: Youtube },
    { id: 'poll', label: 'Poll', icon: BarChart2 },
];

const CreatePostForm = ({ onClose, onPostCreated }) => {
    const [activeTab, setActiveTab] = useState('text');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const youtubeId = extractYoutubeId(youtubeUrl);

    const addPollOption = () => {
        if (pollOptions.length < 4) setPollOptions([...pollOptions, '']);
    };

    const removePollOption = (idx) => {
        if (pollOptions.length > 2) setPollOptions(pollOptions.filter((_, i) => i !== idx));
    };

    const updatePollOption = (idx, val) => {
        const updated = [...pollOptions];
        updated[idx] = val;
        setPollOptions(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (activeTab === 'text' && !content.trim() && !title.trim()) {
            setError('Please add a title or content.');
            return;
        }
        if (activeTab === 'youtube' && !youtubeId) {
            setError('Please enter a valid YouTube video URL.');
            return;
        }
        if (activeTab === 'poll') {
            if (!pollQuestion.trim()) { setError('Please add a poll question.'); return; }
            const filledOptions = pollOptions.filter(o => o.trim());
            if (filledOptions.length < 2) { setError('Please add at least 2 poll options.'); return; }
        }

        setIsLoading(true);
        setError(null);

        try {
            const postData = { title, content };
            if (activeTab === 'text' && imageUrl.trim()) postData.image_url = imageUrl.trim();
            if (activeTab === 'youtube' && youtubeId) {
                postData.youtube_url = `https://www.youtube.com/embed/${youtubeId}`;
                postData.content = content || `YouTube: ${youtubeUrl}`;
            }
            if (activeTab === 'poll') {
                postData.content = pollQuestion;
                postData.poll = JSON.stringify({
                    question: pollQuestion,
                    options: pollOptions.filter(o => o.trim()).map(o => ({ text: o, votes: 0 }))
                });
            }

            const newPost = await createPostApi(postData);
            onPostCreated(newPost);
        } catch (err) {
            setError(err.message || 'Failed to create post.');
        } finally {
            setIsLoading(false);
        }
    };

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.88)',
                backdropFilter: 'blur(14px)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 99999,
                animation: 'fadeIn 0.2s ease',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: '#111111',
                    width: '94%', maxWidth: '540px',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '0',
                    position: 'relative',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.95)',
                    animation: 'modalPop 0.35s cubic-bezier(0.175,0.885,0.32,1.275)',
                    overflow: 'hidden',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '22px 24px 18px',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                        Create New Post
                    </h3>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        type="button"
                        style={{
                            background: '#2a2a2a',
                            border: '2px solid rgba(255,255,255,0.15)',
                            color: '#ffffff',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            width: '38px', height: '38px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'background 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.3)'; e.currentTarget.style.borderColor = '#ef4444'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#2a2a2a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Tab Switcher */}
                <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setError(null); }}
                            type="button"
                            style={{
                                flex: 1, padding: '12px 8px',
                                background: 'none', border: 'none',
                                color: activeTab === tab.id ? '#ffffff' : '#666',
                                fontWeight: activeTab === tab.id ? '700' : '500',
                                fontSize: '13px', cursor: 'pointer',
                                borderBottom: activeTab === tab.id ? '2px solid #0052ff' : '2px solid transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                fontFamily: 'Inter, sans-serif', transition: 'color 0.2s',
                            }}
                        >
                            <tab.icon size={15} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} style={{ padding: '24px' }}>

                    {/* POST Tab */}
                    {activeTab === 'text' && (
                        <>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: '#aaa', fontWeight: '600', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title of your post" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: '#aaa', fontWeight: '600', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Content</label>
                                <textarea value={content} onChange={e => setContent(e.target.value)} rows="4" placeholder="What's on your mind?" style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusStyle} onBlur={blurStyle} />
                            </div>
                            <div style={{ marginBottom: '8px' }}>
                                <label style={{ color: '#aaa', fontWeight: '600', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <ImageIcon size={13} style={{ display: 'inline', marginRight: '4px' }} />
                                    Image URL <span style={{ color: '#555', fontWeight: '400', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                                </label>
                                <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                            </div>
                        </>
                    )}

                    {/* YOUTUBE Tab */}
                    {activeTab === 'youtube' && (
                        <>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: '#aaa', fontWeight: '600', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <Youtube size={13} style={{ display: 'inline', marginRight: '4px', color: '#ff0000' }} />
                                    YouTube Video URL
                                </label>
                                <input
                                    type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                                />
                            </div>

                            {/* YouTube Preview */}
                            {youtubeId && (
                                <div style={{ marginBottom: '16px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${youtubeId}`}
                                        style={{ width: '100%', height: '220px', border: 'none', display: 'block' }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="YouTube preview"
                                    />
                                </div>
                            )}
                            {youtubeUrl && !youtubeId && (
                                <p style={{ color: '#f59e0b', fontSize: '13px', marginBottom: '16px' }}>⚠️ Could not detect a valid YouTube video ID. Please paste a full YouTube URL.</p>
                            )}

                            <div style={{ marginBottom: '8px' }}>
                                <label style={{ color: '#aaa', fontWeight: '600', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Caption <span style={{ color: '#555', fontWeight: '400', textTransform: 'none' }}>(optional)</span></label>
                                <textarea value={content} onChange={e => setContent(e.target.value)} rows="2" placeholder="Say something about this video..." style={{ ...inputStyle, resize: 'none' }} onFocus={focusStyle} onBlur={blurStyle} />
                            </div>
                        </>
                    )}

                    {/* POLL Tab */}
                    {activeTab === 'poll' && (
                        <>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: '#aaa', fontWeight: '600', fontSize: '12px', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <BarChart2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                                    Poll Question
                                </label>
                                <input type="text" value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} placeholder="Ask your question..." style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                            </div>

                            <div style={{ marginBottom: '8px' }}>
                                <label style={{ color: '#aaa', fontWeight: '600', fontSize: '12px', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Options</label>
                                {pollOptions.map((opt, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
                                        <input
                                            type="text" value={opt}
                                            onChange={e => updatePollOption(i, e.target.value)}
                                            placeholder={`Option ${i + 1}`}
                                            style={{ ...inputStyle, flex: 1 }}
                                            onFocus={focusStyle} onBlur={blurStyle}
                                        />
                                        {pollOptions.length > 2 && (
                                            <button type="button" onClick={() => removePollOption(i)}
                                                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', width: '34px', height: '34px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Minus size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {pollOptions.length < 4 && (
                                    <button type="button" onClick={addPollOption}
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,82,255,0.1)', border: '1px dashed rgba(0,82,255,0.4)', borderRadius: '10px', color: '#6699ff', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', fontFamily: 'Inter, sans-serif', width: '100%', justifyContent: 'center' }}>
                                        <Plus size={14} /> Add Option ({pollOptions.length}/4)
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    {error && <p style={{ color: '#ef4444', fontSize: '13px', margin: '12px 0 0' }}>{error}</p>}

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <button type="button" onClick={onClose} disabled={isLoading}
                            style={{ padding: '11px 22px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading}
                            style={{ padding: '11px 26px', borderRadius: '12px', background: '#0052ff', border: 'none', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, fontFamily: 'Inter, sans-serif' }}
                            onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = '#0047e0'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#0052ff'; }}>
                            {isLoading ? 'Posting...' : activeTab === 'poll' ? '📊 Create Poll' : activeTab === 'youtube' ? '▶ Post Video' : 'Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default CreatePostForm;