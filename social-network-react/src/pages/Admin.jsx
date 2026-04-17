import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Trash2, Plus, Edit2, AlertCircle, Check, X, LayoutDashboard, MonitorPlay, AlertTriangle, Image as ImageIcon, MessageSquare } from 'lucide-react';
import BannerManagement from '../components/Admin/BannerManagement';
import { getBannersApi, updateBannerApi, uploadBannerApi, deleteBannerApi } from '../api/bannerApi';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    const [rooms, setRooms] = useState(() => {
        const savedRooms = localStorage.getItem('adminRooms');
        return savedRooms ? JSON.parse(savedRooms) : [];
    });

    const [reportedRooms, setReportedRooms] = useState(() => {
        const savedReports = localStorage.getItem('reportedRooms');
        return savedReports ? JSON.parse(savedReports) : [
            { id: 9991, title: 'Inappropriate Content', language: 'English', reason: 'Abusive language', reporter: 'User_442' },
            { id: 9992, title: 'Spam Room', language: 'Arabic', reason: 'Spamming links', reporter: 'Admin_Bot' }
        ];
    });

    const [showModal, setShowModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [roomForm, setRoomForm] = useState({ title: '', language: 'English', creator: '', category: 'General' });
    const [displayLimit, setDisplayLimit] = useState(10);
    const [banners, setBanners] = useState([]);
    const [isBannerLoading, setIsBannerLoading] = useState(false);

    useEffect(() => {
        const adminAuth = localStorage.getItem('isAdmin');
        if (adminAuth === 'true') {
            setIsAuthenticated(true);
            fetchBanners();
        }
        setIsLoading(false);
    }, []);

    const fetchBanners = async () => {
        const data = await getBannersApi();
        setBanners(data);
    };

    const handleBannerUpdate = async (banner, updates) => {
        const updatedBanner = { ...banner, ...updates };
        setBanners(banners.map(b => b.id === banner.id ? updatedBanner : b));
        await updateBannerApi(updatedBanner);
        fetchBanners();
    };

    useEffect(() => {
        localStorage.setItem('adminRooms', JSON.stringify(rooms));
    }, [rooms]);

    useEffect(() => {
        localStorage.setItem('reportedRooms', JSON.stringify(reportedRooms));
    }, [reportedRooms]);

    const handleLogin = (e) => {
        e.preventDefault();
        const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

        if (!adminUser || !adminPass) {
            setError('Admin credentials not configured in environment.');
            return;
        }
        
        if (username === adminUser && password === adminPass) {
            setIsAuthenticated(true);
            localStorage.setItem('isAdmin', 'true');
            setError('');
            fetchBanners();
        } else {
            setError('Invalid credentials. Access denied.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAdmin');
        navigate('/');
    };

    const handleDeleteRoom = (roomId) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            setRooms(rooms.filter(r => r.id !== roomId));
        }
    };

    const handleEditRoom = (room) => {
        setEditingRoom(room);
        setRoomForm({
            title: room.title,
            language: room.language,
            creator: room.profile?.username || room.creator || '',
            category: room.category || 'General'
        });
        setShowModal(true);
    };

    const handleSaveRoom = (e) => {
        e.preventDefault();
        if (editingRoom) {
            setRooms(rooms.map(r => r.id === editingRoom.id ? {
                ...r,
                title: roomForm.title,
                language: roomForm.language,
                category: roomForm.category,
                profile: { ...r.profile, username: roomForm.creator }
            } : r));
        } else {
            const newRoom = {
                id: Date.now(),
                title: roomForm.title,
                language: roomForm.language,
                category: roomForm.category,
                profile: { username: roomForm.creator, avatar: '/profiles/Abraham Baker.webp' },
                participantCount: 0
            };
            setRooms([newRoom, ...rooms]);
        }
        setShowModal(false);
        setEditingRoom(null);
        setRoomForm({ title: '', language: 'English', creator: '', category: 'General' });
    };

    const handleDismissReport = (reportId) => {
        setReportedRooms(reportedRooms.filter(r => r.id !== reportId));
    };

    const handleDeleteReportedRoom = (reportId) => {
        const report = reportedRooms.find(r => r.id === reportId);
        if (report && window.confirm(`Delete room "${report.title}"?`)) {
            setRooms(rooms.filter(r => r.id !== reportId));
            setReportedRooms(reportedRooms.filter(r => r.id !== reportId));
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/10 border-t-[#F15C53] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex flex-col justify-center items-center font-sans px-4">
                <div className="w-full max-w-md bg-[#0A0A0A] rounded-[32px] p-10 shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/5">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 text-white">
                            <ShieldCheck size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-white text-center tracking-tight">Admin Portal</h2>
                        <p className="text-gray-500 font-medium text-center mt-2">Secure access required</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Operator ID</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white text-white font-bold transition-all" placeholder="Username" required autoFocus />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Security Key</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white text-white font-bold transition-all" placeholder="Password" required />
                        </div>
                        {error && <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-white text-sm font-bold text-center">{error}</div>}
                        <button type="submit" className="w-full py-4 bg-white hover:bg-[#222222] text-white text-lg font-black rounded-2xl transition-all shadow-md mt-4">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'rooms', label: 'Rooms', icon: <MessageSquare size={20} /> },
        { id: 'apps', label: 'Apps', icon: <MonitorPlay size={20} /> },
        { id: 'banners', label: 'Banners', icon: <ImageIcon size={20} /> },
        { id: 'reports', label: 'Reports', icon: <AlertTriangle size={20} /> },
    ];

    return (
        <div className="min-h-screen w-full bg-[#000000] md:p-8 flex items-center justify-center font-sans overflow-hidden fixed inset-0">
            <div className="w-full max-w-[1440px] h-full md:h-[92vh] md:max-h-[850px] bg-[#0A0A0A] md:rounded-[40px]  flex overflow-hidden">
                
                {/* Sidebar */}
                <div className="w-[260px] bg-[#050505] flex flex-col pt-10 pb-8 px-6 relative shrink-0">
                    <div className="flex items-center gap-3 mb-10 pl-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            <ShieldCheck size={22} className="ml-0.5" />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">HappyTalk</h2>
                    </div>

                    <div className="flex flex-col items-center mb-10">
                        <img src="/profiles/Abraham Baker.webp" className="w-20 h-20 rounded-full mb-3 shadow-md object-cover border-4 border-white" alt="Admin avatar" onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Admin&background=random";}} />
                        <h3 className="text-lg font-bold text-white">System Admin</h3>
                        <p className="text-sm text-gray-500 font-medium">Administrator</p>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {navItems.map(item => {
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative ${isActive ? 'bg-[#0A0A0A] shadow-sm text-black font-extrabold' : 'text-gray-500 font-semibold hover:bg-white/5 hover:text-gray-200'}`}
                                >
                                    <div className={isActive ? 'text-white' : 'text-gray-600'}>
                                        {item.icon}
                                    </div>
                                    <span className="text-[15px]">{item.label}</span>
                                    {item.id === 'reports' && reportedRooms.length > 0 && (
                                        <div className="ml-auto w-5 h-5 rounded-full bg-[#f15c53] text-white text-[10px] flex items-center justify-center font-black shadow-sm">
                                            {reportedRooms.length}
                                        </div>
                                    )}
                                    {isActive && (
                                        <div className="absolute right-0 w-1.5 h-8 bg-[#f15c53] rounded-l-full"></div>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="mt-auto flex items-center gap-3 w-full px-4 py-3 text-gray-500 font-bold hover:bg-white/5 rounded-2xl transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center group-hover:bg-gray-300 transition-colors shrink-0">
                            <LogOut size={16} className="text-gray-200" />
                        </div>
                        <span>Log out</span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-[#0A0A0A] flex flex-col overflow-hidden relative border-l border-white/5">
                    
                    {/* Header Top Area */}
                    <div className="h-[90px] flex items-center justify-between px-10 shrink-0 border-b border-white/5 bg-[#0A0A0A] z-10">
                        <h1 className="text-4xl font-extrabold text-white capitalize tracking-tight">{activeTab}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-500 bg-[#161616] px-4 py-2 rounded-full hidden md:inline-block">System Online • {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-10 py-8 bg-[#050505]">
                        
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-[#0A0A0A] p-6 rounded-[24px] shadow-lg border border-white/5 border border-white/5 flex flex-col justify-center">
                                        <p className="text-gray-600 font-bold text-sm uppercase tracking-wide mb-1">Total Rooms</p>
                                        <div className="flex items-end gap-3">
                                            <h3 className="text-4xl font-black text-white">{rooms.length}</h3>
                                            <span className="text-green-500 text-sm font-bold flex items-center mb-1">Active</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#0A0A0A] p-6 rounded-[24px] shadow-lg border border-white/5 border border-white/5 flex flex-col justify-center">
                                        <p className="text-gray-600 font-bold text-sm uppercase tracking-wide mb-1">Reported Issues</p>
                                        <div className="flex items-end gap-3">
                                            <h3 className="text-4xl font-black text-white">{reportedRooms.length}</h3>
                                            {reportedRooms.length > 0 ? (
                                                <span className="text-white text-sm font-bold flex items-center mb-1">Needs attention</span>
                                            ) : (
                                                <span className="text-green-500 text-sm font-bold flex items-center mb-1">All clear</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-[24px] shadow-sm flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-shadow">
                                        <div className="z-10 relative">
                                            <p className="text-white font-black text-lg mb-1 leading-tight">System<br/>Status</p>
                                            <p className="text-white text-xs font-semibold pr-12 mt-2">All services operating normally without errors.</p>
                                        </div>
                                        <div className="absolute -right-4 -bottom-4 bg-[#0A0A0A]/40 w-24 h-24 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
                                    </div>
                                </div>

                                <div className="bg-[#0A0A0A] rounded-[32px] p-8 shadow-lg border border-white/5 border border-white/5 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                                    <p className="text-gray-500 font-bold z-10 bg-[#0A0A0A]/80 px-4 py-2 rounded-xl backdrop-blur-sm">Activity Chart (Placeholder)</p>
                                    <svg viewBox="0 0 500 150" className="absolute w-[90%] opacity-20" preserveAspectRatio="none">
                                        <path d="M0,75 C50,120 100,20 150,75 C200,130 250,50 300,75 C350,100 400,20 500,75" fill="none" stroke="#F1B598" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M0,100 C60,50 120,130 180,60 C240,-10 300,100 360,40 C420,-20 480,90 500,90" fill="none" stroke="#F15C53" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {activeTab === 'rooms' && (
                            <div className="animate-fade-in flex flex-col h-full bg-[#0A0A0A] rounded-[32px] shadow-lg border border-white/5 border border-white/5 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-white">Manage Rooms</h3>
                                    <div className="flex items-center gap-4">
                                        <select value={displayLimit} onChange={(e) => setDisplayLimit(Number(e.target.value))} className="bg-[#111111] border border-white/10 rounded-xl px-4 py-2 text-gray-200 font-bold outline-none focus:border-white">
                                            {[10, 20, 50, 100].map(limit => <option key={limit} value={limit}>{limit} Rooms</option>)}
                                        </select>
                                        <button onClick={() => { setEditingRoom(null); setRoomForm({ title: '', language: 'English', creator: '', category: 'General' }); setShowModal(true); }} className="px-5 py-2.5 bg-white hover:bg-[#222222] text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] text-sm flex items-center gap-2">
                                            <Plus size={18} />
                                            CREATE
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="overflow-auto max-h-[calc(100vh-320px)] border rounded-2xl border-white/5">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="sticky top-0 bg-[#0A0A0A] z-10 shadow-[0_2px_5px_rgba(0,0,0,0.02)]">
                                            <tr className="text-gray-600 text-xs font-extrabold uppercase tracking-wide border-b border-white/5">
                                                <th className="py-4 px-6">Room Details</th>
                                                <th className="py-4 px-6">Language</th>
                                                <th className="py-4 px-6">Creator</th>
                                                <th className="py-4 px-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {rooms.slice(0, displayLimit).map((room) => (
                                                <tr key={room.id} className="hover:bg-[#111111]/50 transition-colors group">
                                                    <td className="py-4 px-6 border-l-4 border-transparent group-hover:border-white transition-colors">
                                                        <p className="font-bold text-white">{room.title}</p>
                                                        <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">{room.category || 'General'}</p>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className="px-3 py-1 bg-[#161616] text-gray-600 rounded-lg text-[10px] font-black uppercase inline-block">{room.language}</span>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-600 font-semibold text-sm">{room.profile?.username || room.creator}</td>
                                                    <td className="py-4 px-6 text-right space-x-2">
                                                        <button onClick={() => handleEditRoom(room)} className="p-2.5 bg-[#111111] hover:bg-white/10 text-gray-600 hover:text-white rounded-xl transition-all inline-block"><Edit2 size={16} /></button>
                                                        <button onClick={() => handleDeleteRoom(room.id)} className="p-2.5 bg-[#111111] hover:bg-black/10 text-gray-600 hover:text-black rounded-xl transition-all inline-block"><Trash2 size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {rooms.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="py-12 text-center text-gray-600 font-medium">No rooms found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'apps' && (
                            <div className="animate-fade-in space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-white px-2">App Center</h3>
                                    <button onClick={() => { localStorage.removeItem('customApps'); localStorage.removeItem('hiddenApps'); window.location.reload(); }} className="px-4 py-2 bg-[#161616] hover:bg-[#222222] text-gray-200 font-bold rounded-xl transition-all text-xs">RESET ALL DEFAULTS</button>
                                </div>
                                
                                <div className="bg-[#0A0A0A] rounded-[24px] p-6 shadow-lg border border-white/5 border border-white/5">
                                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wide mb-4">Add Custom Shortcut</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <input type="text" id="app-name" placeholder="App Name" className="px-4 py-2.5 bg-[#111111] border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white" />
                                        <input type="text" id="app-icon" placeholder="Icon (Emoji/URL)" className="px-4 py-2.5 bg-[#111111] border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white" />
                                        <input type="text" id="app-url" placeholder="App URL" className="px-4 py-2.5 bg-[#111111] border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white" />
                                        <div className="flex gap-2">
                                            <input type="color" id="app-color" defaultValue="#4EB699" className="h-10 w-12 bg-transparent border-0 rounded-xl cursor-pointer mt-0.5" />
                                            <button onClick={() => {
                                                const name = document.getElementById('app-name').value;
                                                const icon = document.getElementById('app-icon').value;
                                                const url = document.getElementById('app-url').value;
                                                const color = document.getElementById('app-color').value;

                                                if (!name || !icon) return alert('Name and Icon required');

                                                const customApps = JSON.parse(localStorage.getItem('customApps') || '[]');
                                                customApps.push({
                                                    id: 'custom-' + Date.now(),
                                                    name, icon, url: url || null,
                                                    color: color,
                                                    isCustom: true, visible: true
                                                });
                                                localStorage.setItem('customApps', JSON.stringify(customApps));
                                                window.location.reload();
                                            }} className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-all">
                                                ADD APP
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                    {(() => {
                                        const defaultApps = [
                                            { id: 'calculator', icon: '🔢', name: 'Calculator', color: '#667eea' },
                                            { id: 'calendar', icon: '📅', name: 'Calendar', color: '#ff9500' },
                                            { id: 'clock', icon: '⏰', name: 'Clock', color: '#a2a2a2' },
                                            { id: 'notes', icon: '📝', name: 'Notes', color: '#ffcc00' },
                                            { id: 'reminders', icon: '✅', name: 'Reminders', color: '#5fc9f8' },
                                            { id: 'compass', icon: '🧭', name: 'Compass', color: '#f093fb' },
                                            { id: 'news', icon: '📰', name: 'News', color: '#ff4b2b' },
                                            { id: 'youtube', icon: '📺', name: 'YouTube', color: '#ff0000' },
                                            { id: 'live', icon: '📡', name: 'Live TV', color: '#6366f1' },
                                            { id: 'learning', icon: '🎓', name: 'Learning', color: '#10b981' },
                                            { id: 'music', icon: '🎵', name: 'Music', color: '#ec4899' },
                                            { id: 'chat', icon: '🤖', name: 'AI Chat', color: '#3b82f6' },
                                        ];
                                        const customApps = JSON.parse(localStorage.getItem('customApps') || '[]');
                                        const hiddenApps = JSON.parse(localStorage.getItem('hiddenApps') || '[]');
                                        return [...defaultApps, ...customApps].map((app) => {
                                            const isHidden = hiddenApps.includes(app.id);
                                            return (
                                                <div key={app.id} className={`bg-[#0A0A0A] rounded-2xl p-4 shadow-lg border border-white/5 border border-white/5 flex flex-col items-center text-center ${isHidden ? 'opacity-40 grayscale' : ''}`}>
                                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2 shadow-sm text-white" style={{ background: app.color.includes('gradient') ? app.color : `linear-gradient(135deg, ${app.color}, #00000020)` }}>
                                                        {typeof app.icon === 'string' && app.icon.startsWith('http') ? <img src={app.icon} alt="" className="w-full h-full object-cover rounded-xl" /> : app.icon}
                                                    </div>
                                                    <h5 className="font-bold text-white text-xs mb-1 truncate w-full">{app.name}</h5>
                                                    <div className="flex w-full gap-1 mt-2">
                                                        <button onClick={() => {
                                                            const hidden = JSON.parse(localStorage.getItem('hiddenApps') || '[]');
                                                            if (isHidden) localStorage.setItem('hiddenApps', JSON.stringify(hidden.filter(id => id !== app.id)));
                                                            else localStorage.setItem('hiddenApps', JSON.stringify([...hidden, app.id]));
                                                            window.location.reload();
                                                        }} className="flex-1 py-1 bg-[#111111] hover:bg-[#222222] text-gray-600 font-bold text-[10px] rounded-lg transition-colors">{isHidden ? 'Show' : 'Hide'}</button>
                                                        {app.isCustom && <button onClick={() => {
                                                            const apps = JSON.parse(localStorage.getItem('customApps') || '[]');
                                                            localStorage.setItem('customApps', JSON.stringify(apps.filter(a => a.id !== app.id)));
                                                            window.location.reload();
                                                        }} className="flex-1 py-1 bg-red-50 hover:bg-red-100 text-white font-bold text-[10px] rounded-lg transition-colors">Del</button>}
                                                    </div>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reports' && (
                            <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                                <div className="bg-[#0A0A0A] rounded-[24px] p-6 shadow-lg border border-white/5 border border-white/5 flex flex-col">
                                    <h3 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
                                        <AlertTriangle size={20} className="text-white" />
                                        Critical Alerts
                                    </h3>
                                    <div className="overflow-y-auto flex-1 pr-2 space-y-3">
                                        {reportedRooms.length === 0 ? (
                                            <div className="py-10 text-center text-gray-600 font-medium bg-[#111111] rounded-xl border border-dashed border-white/10">
                                                No reported content to review.
                                            </div>
                                        ) : reportedRooms.map(report => (
                                            <div key={report.id} className="p-4 bg-[#111111] border border-white/5 rounded-xl">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <p className="font-bold text-white">{report.title}</p>
                                                        <span className="text-[10px] font-black text-white uppercase inline-block mt-0.5">Reason: {report.reason}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleDeleteReportedRoom(report.id)} className="px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-white font-bold rounded-lg text-xs transition-colors">Delete Room</button>
                                                    <button onClick={() => handleDismissReport(report.id)} className="px-3 py-1.5 bg-[#222222] hover:bg-gray-300 text-gray-600 font-bold rounded-lg text-xs transition-colors">Dismiss</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#0A0A0A] rounded-[24px] p-6 shadow-lg border border-white/5 border border-white/5 flex flex-col">
                                    <h3 className="text-lg font-extrabold text-white mb-4">Activity Log</h3>
                                    <div className="space-y-3 overflow-y-auto pr-2">
                                        {[1, 2, 3, 4, 5].map((_, i) => (
                                            <div key={i} className="flex gap-3 p-3 bg-[#0A0A0A] rounded-xl border border-white/5 shadow-sm">
                                                <div className="w-1.5 h-1.5 mt-2 bg-[#4EB699] rounded-full shrink-0"></div>
                                                <div>
                                                    <p className="font-bold text-gray-200 text-sm">System check completed</p>
                                                    <p className="text-gray-600 text-[10px] uppercase font-bold tracking-wide mt-0.5">Automated | {new Date().toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'banners' && (
                            <div className="animate-fade-in h-full bg-[#0A0A0A] rounded-[32px] shadow-lg border border-white/5 border border-white/5 p-6 overflow-y-auto max-h-[calc(100vh-[180px])]">
                                <BannerManagement
                                    banners={banners}
                                    isBannerLoading={isBannerLoading}
                                    setIsBannerLoading={setIsBannerLoading}
                                    fetchBanners={fetchBanners}
                                    handleBannerUpdate={handleBannerUpdate}
                                    uploadBannerApi={uploadBannerApi}
                                    deleteBannerApi={deleteBannerApi}
                                />
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative w-full max-w-xl bg-[#0A0A0A] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] animate-scale-up">
                        <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors bg-[#161616] p-2 rounded-full"><X size={18} /></button>
                        <h2 className="text-2xl font-black mb-6 text-white">{editingRoom ? 'Edit Room Details' : 'Initialize New Room'}</h2>
                        <form onSubmit={handleSaveRoom} className="space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pl-1">Room Title</label>
                                    <input type="text" value={roomForm.title} onChange={(e) => setRoomForm({ ...roomForm, title: e.target.value })} className="w-full px-4 py-3 bg-[#111111] border border-white/10 rounded-xl focus:border-white focus:target outline-none transition-all text-sm font-bold text-white" placeholder="Title..." required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pl-1">Creator Username</label>
                                    <input type="text" value={roomForm.creator} onChange={(e) => setRoomForm({ ...roomForm, creator: e.target.value })} className="w-full px-4 py-3 bg-[#111111] border border-white/10 rounded-xl focus:border-white outline-none transition-all text-sm font-bold text-white" placeholder="ID..." required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pl-1">Language</label>
                                    <select value={roomForm.language} onChange={(e) => setRoomForm({ ...roomForm, language: e.target.value })} className="w-full px-4 py-3 bg-[#111111] border border-white/10 rounded-xl focus:border-white outline-none transition-all text-sm font-bold text-white">
                                        {['English', 'Arabic', 'Spanish', 'French', 'Hindi', 'Chinese', 'Portuguese', 'German'].map(lang => <option key={lang} value={lang}>{lang}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest pl-1">Category</label>
                                    <select value={roomForm.category} onChange={(e) => setRoomForm({ ...roomForm, category: e.target.value })} className="w-full px-4 py-3 bg-[#111111] border border-white/10 rounded-xl focus:border-white outline-none transition-all text-sm font-bold text-white">
                                        {['General', 'Gaming', 'Music', 'Education', 'Technology', 'Social'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-white hover:bg-[#222222] text-white text-sm font-black rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] uppercase tracking-wider mt-4">{editingRoom ? 'Save Changes' : 'Establish Room'}</button>
                        </form>
                    </div>
                </div>
            )}
            
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap');
                
                .font-sans {
                    font-family: 'Outfit', sans-serif;
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                
                .animate-scale-up {
                    animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleUp {
                    from { opacity: 0; transform: scale(0.97); }
                    to { opacity: 1; transform: scale(1); }
                }

                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: #E5E7EB;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #D1D5DB;
                }
            `}</style>
        </div>
    );
};

export default Admin;
