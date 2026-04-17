import React from 'react';

const RoomModals = ({ 
    showDeleteConfirm, setShowDeleteConfirm, 
    handleDeleteRoom, isDeleting, title,
    showLoginModal, setShowLoginModal,
    showFullModal, setShowFullModal
}) => {
    return (
        <>
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={e => e.stopPropagation()}>
                    <div className="p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-white/10"
                        style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}>
                        <h3 className="text-lg font-black text-white mb-3">Delete Room?</h3>
                        <p className="text-gray-300 text-sm mb-5">This will permanently remove <strong>"{title}"</strong>. This action cannot be undone.</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}
                                className="px-4 py-2 text-gray-300 rounded-xl text-sm"
                                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                Cancel
                            </button>
                            <button onClick={handleDeleteRoom} disabled={isDeleting}
                                className="px-4 py-2 text-white rounded-xl text-sm font-bold"
                                style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}>
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLoginModal && (
                <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[100] p-4"
                    onClick={e => e.stopPropagation()}>
                    <div className="p-6 rounded-3xl shadow-2xl w-[95%] max-w-[400px] border border-white/10 text-center flex flex-col items-center"
                        style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.2)' }}>
                            <i className="fas fa-rocket text-3xl text-blue-400"></i>
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-white tracking-tight">Join the Conversation!</h3>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-[90%]">
                            Sign in to join rooms, speak with others, and make new connections.
                        </p>
                        <button onClick={() => { setShowLoginModal(false); window.location.href = '/in'; }}
                            className="w-full max-w-[280px] py-3 text-white text-base font-bold rounded-2xl"
                            style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}>
                            Sign In / Login
                        </button>
                        <button onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white p-2 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <i className="fas fa-times text-base"></i>
                        </button>
                    </div>
                </div>
            )}

            {showFullModal && (
                <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[100] p-4"
                    onClick={e => e.stopPropagation()}>
                    <div className="p-6 rounded-3xl shadow-2xl w-[95%] max-w-[400px] border border-white/10 text-center flex flex-col items-center relative"
                        style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.2)' }}>
                            <i className="fas fa-users-slash text-3xl text-red-500"></i>
                        </div>
                        <h3 className="text-xl font-black mb-2 text-white">Room is Full</h3>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">This room has reached its capacity. Please try another room.</p>
                        <button onClick={() => setShowFullModal(false)}
                            className="w-full max-w-[280px] py-3 text-white text-base font-bold rounded-2xl"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            Got it
                        </button>
                        <button onClick={() => setShowFullModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white p-2 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <i className="fas fa-times text-base"></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RoomModals;
