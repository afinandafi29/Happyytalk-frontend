import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Play } from 'lucide-react';

const WatchParty = () => {
    const navigate = useNavigate();
    const [bannerIndex, setBannerIndex] = useState(0);

    const bannerImages = [
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80',
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&q=80',
        'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&q=80',
        'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1600&q=80'
    ];

    const streamingApps = [
        { id: 'netflix', name: 'Netflix', url: 'https://www.netflix.com' },
        { id: 'prime', name: 'Prime Video', url: 'https://www.primevideo.com' },
        { id: 'disney', name: 'Disney+', url: 'https://www.disneyplus.com' },
        { id: 'hulu', name: 'Hulu', url: 'https://www.hulu.com' },
        { id: 'max', name: 'Max', url: 'https://www.max.com' },
        { id: 'appletv', name: 'Apple TV+', url: 'https://tv.apple.com' },
        { id: 'paramount', name: 'Paramount+', url: 'https://www.paramountplus.com' },
        { id: 'peacock', name: 'Peacock', url: 'https://www.peacocktv.com' },
        { id: 'ytpremium', name: 'YouTube Premium', url: 'https://www.youtube.com' },
        { id: 'hotstar', name: 'Hotstar', url: 'https://www.hotstar.com' },
        { id: 'jiocinema', name: 'JioCinema', url: 'https://www.jiocinema.com' },
        { id: 'zee5', name: 'Zee5', url: 'https://www.zee5.com' },
        { id: 'sonyliv', name: 'SonyLIV', url: 'https://www.sonyliv.com' },
        { id: 'mxplayer', name: 'MX Player', url: 'https://www.mxplayer.in' },
        { id: 'altbalaji', name: 'ALTBalaji', url: 'https://www.altbalaji.com' },
        { id: 'erosnow', name: 'Eros Now', url: 'https://www.erosnow.com' },
        { id: 'aha', name: 'Aha', url: 'https://www.aha.video' },
        { id: 'sunnxt', name: 'Sun NXT', url: 'https://www.sunnxt.com' },
        { id: 'hoichoi', name: 'Hoichoi', url: 'https://www.hoichoi.tv' },
        { id: 'viu', name: 'Viu', url: 'https://www.viu.com' },
        { id: 'iqiyi', name: 'iQIYI', url: 'https://www.iq.com' },
        { id: 'wetv', name: 'WeTV', url: 'https://wetv.vip' },
        { id: 'viki', name: 'Viki', url: 'https://www.viki.com' },
        { id: 'crunchyroll', name: 'Crunchyroll', url: 'https://www.crunchyroll.com' },
        { id: 'hidive', name: 'HIDIVE', url: 'https://www.hidive.com' },
        { id: 'tubi', name: 'Tubi', url: 'https://tubitv.com' },
        { id: 'plutotv', name: 'Pluto TV', url: 'https://pluto.tv' },
        { id: 'freevee', name: 'Freevee', url: 'https://www.amazon.com/freevee' },
        { id: 'roku', name: 'Roku Channel', url: 'https://therokuchannel.roku.com' },
        { id: 'plex', name: 'Plex', url: 'https://www.plex.tv' },
        { id: 'crackle', name: 'Crackle', url: 'https://www.crackle.com' },
        { id: 'popcornflix', name: 'Popcornflix', url: 'https://www.popcornflix.com' },
        { id: 'kanopy', name: 'Kanopy', url: 'https://www.kanopy.com' },
        { id: 'hoopla', name: 'Hoopla', url: 'https://www.hoopladigital.com' },
        { id: 'sling', name: 'Sling TV', url: 'https://www.sling.com' },
        { id: 'youtubetv', name: 'YouTube TV', url: 'https://tv.youtube.com' },
        { id: 'hululive', name: 'Hulu Live', url: 'https://www.hulu.com/live-tv' },
        { id: 'fubotv', name: 'FuboTV', url: 'https://www.fubo.tv' },
        { id: 'direcstream', name: 'DirecTV Stream', url: 'https://www.directv.com/stream' },
        { id: 'philo', name: 'Philo', url: 'https://www.philo.com' },
        { id: 'frndly', name: 'Frndly TV', url: 'https://www.frndlytv.com' },
        { id: 'viaplay', name: 'Viaplay', url: 'https://viaplay.com' },
        { id: 'britbox', name: 'BritBox', url: 'https://www.britbox.com' },
        { id: 'acorntv', name: 'Acorn TV', url: 'https://acorn.tv' },
        { id: 'shudder', name: 'Shudder', url: 'https://www.shudder.com' },
        { id: 'amcplus', name: 'AMC+', url: 'https://www.amcplus.com' },
        { id: 'sundance', name: 'Sundance Now', url: 'https://www.sundancenow.com' },
        { id: 'criterion', name: 'Criterion', url: 'https://www.criterionchannel.com' },
        { id: 'mubi', name: 'Mubi', url: 'https://mubi.com' },
        { id: 'curiosity', name: 'Curiosity Stream', url: 'https://curiositystream.com' },
        { id: 'discovery', name: 'Discovery+', url: 'https://www.discoveryplus.com' },
        { id: 'espnplus', name: 'ESPN+', url: 'https://plus.espn.com' },
        { id: 'dazn', name: 'DAZN', url: 'https://www.dazn.com' },
        { id: 'nflplus', name: 'NFL+', url: 'https://www.nfl.com/plus' },
        { id: 'nba', name: 'NBA League Pass', url: 'https://www.nba.com/leaguepass' },
        { id: 'mlb', name: 'MLB.TV', url: 'https://www.mlb.com/tv' },
        { id: 'wwe', name: 'WWE Network', url: 'https://watch.wwe.com' },
        { id: 'ufc', name: 'UFC Fight Pass', url: 'https://ufcfightpass.com' },
        { id: 'starz', name: 'Starz', url: 'https://www.starz.com' },
        { id: 'betplus', name: 'BET+', url: 'https://www.bet.plus' },
        { id: 'allblk', name: 'ALLBLK', url: 'https://allblk.tv' },
        { id: 'hallmark', name: 'Hallmark Movies', url: 'https://www.hmnow.com' },
        { id: 'lifetimemovies', name: 'Lifetime Club', url: 'https://www.lifetimemovieclub.com' },
        { id: 'pureflix', name: 'Pure Flix', url: 'https://www.pureflix.com' },
        { id: 'faith', name: 'UP Faith & Family', url: 'https://upfaithandfamily.com' },
        { id: 'gaia', name: 'Gaia', url: 'https://www.gaia.com' },
        { id: 'magellantv', name: 'MagellanTV', url: 'https://www.magellantv.com' },
        { id: 'docubay', name: 'Docubay', url: 'https://www.docubay.com' },
        { id: 'history', name: 'History Vault', url: 'https://www.historyvault.com' },
        { id: 'mhz', name: 'MHz Choice', url: 'https://mhzchoice.com' },
        { id: 'topic', name: 'Topic', url: 'https://www.topic.com' },
        { id: 'ovid', name: 'Ovid.tv', url: 'https://www.ovid.tv' },
        { id: 'fandor', name: 'Fandor', url: 'https://www.fandor.com' },
        { id: 'broadway', name: 'BroadwayHD', url: 'https://www.broadwayhd.com' },
        { id: 'vix', name: 'ViX Premium', url: 'https://vix.com' },
        { id: 'canelatv', name: 'Canela.TV', url: 'https://www.canela.tv' },
        { id: 'telemundo', name: 'Telemundo', url: 'https://www.telemundo.com' },
        { id: 'univision', name: 'Univision', url: 'https://www.univision.com' },
        { id: 'blimtv', name: 'Blim TV', url: 'https://www.blim.com' },
        { id: 'shahid', name: 'Shahid', url: 'https://shahid.mbc.net' },
        { id: 'osn', name: 'OSN Streaming', url: 'https://stream.osn.com' },
        { id: 'lionsgateplay', name: 'Lionsgate Play', url: 'https://www.lionsgateplay.com' },
        { id: 'iflix', name: 'iflix', url: 'https://www.iflix.com' },
        { id: 'catchplay', name: 'CatchPlay', url: 'https://www.catchplay.com' },
        { id: 'bilibili', name: 'Bilibili', url: 'https://www.bilibili.com' },
        { id: 'youku', name: 'Youku', url: 'https://www.youku.com' },
        { id: 'mangotv', name: 'Mango TV', url: 'https://www.mgtv.com' },
        { id: 'trueid', name: 'TrueID', url: 'https://www.trueid.net' },
        { id: 'nowtv', name: 'Now TV', url: 'https://now.com' },
        { id: 'tvbanywhere', name: 'TVB Anywhere', url: 'https://www.tvbanywhere.com' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setBannerIndex(prev => (prev + 1) % bannerImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 pb-32">
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#000]/80 backdrop-blur-xl z-[1000] border-b border-white/5 px-6 flex items-center">
                <button onClick={() => navigate('/apps')} className="text-white/60 hover:text-white transition-all flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
                    <ChevronLeft size={24} /> Back
                </button>
            </header>

            <main className="pt-16">
                {/* Rolling Banner */}
                <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={bannerIndex}
                            src={bannerImages[bannerIndex]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
                            alt="Cinema"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 md:left-20">
                         <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Watch Party</h2>
                    </div>
                </section>

                {/* Text Grid */}
                <div className="px-6 md:px-20 mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {streamingApps.map((app, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.open(app.url, '_blank')}
                                className="p-5 bg-white/5 border border-white/10 rounded-2xl text-left transition-all group flex items-center justify-between"
                            >
                                <span className="font-bold text-white/80 group-hover:text-white transition-colors">{app.name}</span>
                                <Play size={16} fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-all text-red-500" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WatchParty;
