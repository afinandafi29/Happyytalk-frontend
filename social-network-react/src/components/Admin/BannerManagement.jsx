import React from 'react';
import { Settings, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const BannerManagement = ({ 
    banners, 
    isBannerLoading, 
    setIsBannerLoading, 
    fetchBanners, 
    handleBannerUpdate, 
    uploadBannerApi, 
    deleteBannerApi 
}) => {
    return (
        <div className="w-full flex flex-col h-full bg-[#0A0A0A] relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Banner Management</h3>
                <button
                    onClick={async () => {
                        if (window.confirm('Delete ALL banners from data storage?')) {
                            for (const b of banners) {
                                await deleteBannerApi(b);
                            }
                            fetchBanners();
                        }
                    }}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-white font-bold rounded-xl transition-all text-xs border border-red-100"
                >
                    CLEAR ALL BANNERS
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {/* Upload Files (Image/Video) */}
                <div className={`bg-[#111111] rounded-2xl border border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center transition-all ${isBannerLoading ? 'opacity-50 pointer-events-none' : 'hover:bg-[#161616] hover:border-gray-400'}`}>
                    <div className="w-12 h-12 bg-[#222222] rounded-full flex items-center justify-center mb-3">
                        {isBannerLoading ? <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" /> : <Settings size={20} className="text-gray-600" />}
                    </div>
                    <h4 className="text-sm font-bold mb-3 text-white">Upload Media</h4>
                    <input
                        type="file"
                        id="banner-upload"
                        className="hidden"
                        multiple
                        accept="image/*,video/mp4"
                        onChange={async (e) => {
                            const files = Array.from(e.target.files);
                            if (files.length === 0) return;

                            setIsBannerLoading(true);
                            try {
                                for (const file of files) {
                                    await uploadBannerApi(file);
                                }
                                await fetchBanners();
                            } catch (err) {
                                alert('Upload failed: ' + err.message);
                            } finally {
                                setIsBannerLoading(false);
                                e.target.value = '';
                            }
                        }}
                    />
                    <label htmlFor="banner-upload" className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl cursor-pointer transition-all text-[11px] uppercase tracking-wider">
                        {isBannerLoading ? 'UPLOADING...' : 'SELECT FILES'}
                    </label>
                </div>

                {/* Add Text Banner */}
                <div className="bg-[#111111] rounded-2xl border border-dashed border-white/20 p-6 flex flex-col transition-all hover:bg-[#161616] hover:border-gray-400 xl:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#FAEEE8] rounded-full flex items-center justify-center">
                            <Edit2 size={16} className="text-[#F1B598]" />
                        </div>
                        <h4 className="text-sm font-bold text-white">Add Text Banner</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                        <input
                            type="text"
                            id="new-text-banner-content"
                            placeholder="Banner Text Content..."
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:border-white outline-none"
                        />
                        <input
                            type="text"
                            id="new-text-banner-link"
                            placeholder="Banner Link (URL)..."
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:border-white outline-none"
                        />
                        <button
                            onClick={async () => {
                                const text = document.getElementById('new-text-banner-content').value;
                                const link = document.getElementById('new-text-banner-link').value;
                                if (!text) return alert('Please enter text content');

                                setIsBannerLoading(true);
                                try {
                                    await uploadBannerApi({ text, link, type: 'text' });
                                    await fetchBanners();
                                    document.getElementById('new-text-banner-content').value = '';
                                    document.getElementById('new-text-banner-link').value = '';
                                } catch (err) {
                                    alert('Failed: ' + err.message);
                                } finally {
                                    setIsBannerLoading(false);
                                }
                            }}
                            className="sm:col-span-2 w-full mt-1 py-2 mb-0 bg-[#F1B598] hover:bg-white text-white font-bold rounded-xl cursor-pointer transition-all text-[11px] uppercase tracking-wider"
                        >
                            ADD TEXT BANNER
                        </button>
                    </div>
                </div>
            </div>
            
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wide mb-4">Current Banners</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {banners.map((banner) => (
                    <div key={banner.id} className="relative group bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="aspect-video relative bg-[#111111] border-b border-white/5">
                            {banner.type === 'video' ? (
                                <video src={banner.url} className="w-full h-full object-cover" muted autoPlay playsInline />
                            ) : banner.type === 'text' ? (
                                <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 text-center">
                                    <span className="text-sm font-bold text-white uppercase line-clamp-3">{banner.text}</span>
                                </div>
                            ) : (
                                <img src={banner.url} alt="Banner" className="w-full h-full object-cover" />
                            )}

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleBannerUpdate(banner, { visible: !banner.visible })}
                                    className={`p-2 rounded-xl ${banner.visible !== false ? 'bg-[#0A0A0A] text-white hover:bg-[#161616]' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                                    title={banner.visible !== false ? 'Hide Banner' : 'Show Banner'}
                                >
                                    {banner.visible !== false ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                                <button
                                    onClick={async () => {
                                        if (window.confirm('Delete this banner from data storage?')) {
                                            await deleteBannerApi(banner);
                                            fetchBanners();
                                        }
                                    }}
                                    className="p-2 bg-white hover:bg-red-600 text-white rounded-xl"
                                    title="Delete Banner"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            {!banner.visible && (
                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-800 text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-sm">Hidden</div>
                            )}
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#0A0A0A]/80 backdrop-blur-sm text-[9px] text-white rounded uppercase font-extrabold tracking-widest">{banner.type}</div>
                        </div>
                        <div className="p-3 bg-[#0A0A0A] space-y-2">
                            <div className="space-y-1">
                                <label className="text-[9px] font-extrabold text-gray-600 uppercase tracking-widest pl-1">Display Text</label>
                                <input
                                    type="text"
                                    defaultValue={banner.text || ''}
                                    onBlur={(e) => handleBannerUpdate(banner, { text: e.target.value })}
                                    placeholder="Add banner text..."
                                    className="w-full bg-[#111111] border border-transparent hover:border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:border-white focus:bg-[#0A0A0A] outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-extrabold text-gray-600 uppercase tracking-widest pl-1">Action Link (Optional)</label>
                                <input
                                    type="text"
                                    defaultValue={banner.link || ''}
                                    onBlur={(e) => handleBannerUpdate(banner, { link: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full bg-[#111111] border border-transparent hover:border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:border-white focus:bg-[#0A0A0A] outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {banners.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-600 font-medium border border-dashed border-white/10 rounded-2xl bg-[#111111]">
                        No banners configured. Add one above.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerManagement;
