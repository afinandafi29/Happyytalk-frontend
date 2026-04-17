import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Play } from 'lucide-react';

const Games = () => {
    const navigate = useNavigate();
    const [bannerIndex, setBannerIndex] = useState(0);

    const bannerImages = [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80',
        'https://images.unsplash.com/photo-1580234811497-9bd7fd0f56ef?w=1600&q=80'
    ];

    const gameApps = [
        { id: 'fortnite', name: 'Fortnite', url: 'https://www.fortnite.com' },
        { id: 'roblox', name: 'Roblox', url: 'https://www.roblox.com' },
        { id: 'minecraft', name: 'Minecraft', url: 'https://www.minecraft.net' },
        { id: 'among-us', name: 'Among Us', url: 'https://poki.com/en/g/among-us' },
        { id: 'diep-io', name: 'Diep.io', url: 'https://diep.io' },
        { id: 'shell-shockers', name: 'Shell Shockers', url: 'https://shellshock.io' },
        { id: 'paper-io', name: 'Paper.io 2', url: 'https://paper-io.com' },
        { id: 'hole-io', name: 'Hole.io', url: 'https://hole-io.com' },
        { id: 'surviv-io', name: 'Surviv.io', url: 'https://surviv.io' },
        { id: 'zombs-royale', name: 'Zombs Royale', url: 'https://zombsroyale.io' },
        { id: 'worms-zone', name: 'Worms Zone', url: 'https://worms.zone' },
        { id: 'voxiom', name: 'Voxiom.io', url: 'https://voxiom.io' },
        { id: 'build-royale', name: 'BuildRoyale.io', url: 'https://buildroyale.io' },
        { id: 'smash-karts', name: 'Smash Karts', url: 'https://smashkarts.io' },
        { id: 'little-big-snake', name: 'Little Big Snake', url: 'https://littlebigsnake.com' },
        { id: 'taming-io', name: 'Taming.io', url: 'https://taming.io' },
        { id: 'colonist', name: 'Colonist.io', url: 'https://colonist.io' },
        { id: 'secret-hitler', name: 'Secret Hitler', url: 'https://secrethitler.io' },
        { id: 'drawize', name: 'Drawize', url: 'https://www.drawize.com' },
        { id: 'schedios', name: 'Schedios.io', url: 'https://schedios.io' },
        { id: 'wanderers', name: 'Wanderers.io', url: 'https://wanderers.io' },
        { id: 'wilds', name: 'Wilds.io', url: 'https://wilds.io' },
        { id: 'playingcards', name: 'PlayingCards.io', url: 'https://playingcards.io' },
        { id: 'tetris-99', name: 'Tetris 99', url: 'https://www.nintendo.com/games/detail/tetris-99-switch' },
        { id: 'jackbox', name: 'Jackbox Party', url: 'https://www.jackboxgames.com' },
        { id: 'quizizz', name: 'Quizizz', url: 'https://quizizz.com' },
        { id: 'kahoot', name: 'Kahoot!', url: 'https://kahoot.it' },
        { id: 'blooket', name: 'Blooket', url: 'https://www.blooket.com' },
        { id: 'geoguessr', name: 'GeoGuessr', url: 'https://www.geoguessr.com' },
        { id: 'tetrio', name: 'Tetr.io', url: 'https://tetr.io' },
        { id: 'destiny-2', name: 'Destiny 2', url: 'https://www.bungie.net/7/en/Destiny' },
        { id: 'rocket-league', name: 'Rocket League', url: 'https://www.rocketleague.com' },
        { id: 'fall-guys', name: 'Fall Guys', url: 'https://www.fallguys.com' },
        { id: 'brawlhalla', name: 'Brawlhalla', url: 'https://www.brawlhalla.com' },
        { id: 'warframe', name: 'Warframe', url: 'https://www.warframe.com' },
        { id: 'splatoon-3', name: 'Splatoon 3', url: 'https://splatoon.nintendo.com' },
        { id: 'overwatch-2', name: 'Overwatch 2', url: 'https://overwatch.blizzard.com' },
        { id: 'valorant', name: 'Valorant', url: 'https://playvalorant.com' },
        { id: 'apex-legends', name: 'Apex Legends', url: 'https://www.ea.com/games/apex-legends' },
        { id: 'warzone', name: 'Warzone', url: 'https://www.callofduty.com/warzone' },
        { id: 'genshin', name: 'Genshin Impact', url: 'https://genshin.hoyoverse.com' },
        { id: 'among-us-vr', name: 'Among Us VR', url: 'https://www.amongusvrgame.com' },
        { id: 'rec-room', name: 'Rec Room', url: 'https://recroom.com' },
        { id: 'beat-saber', name: 'Beat Saber', url: 'https://beatsaber.com' },
        { id: 'gorilla-tag', name: 'Gorilla Tag', url: 'https://gorillatagvr.com' },
        { id: 'vrchat', name: 'VRChat', url: 'https://vrchat.com' },
        { id: 'pokerstars-vr', name: 'PokerStars VR', url: 'https://www.pokerstars.com/vr' },
        { id: 'bigscreen', name: 'Bigscreen Beta', url: 'https://www.bigscreenvr.com' },
        { id: 'horizon-worlds', name: 'Horizon Worlds', url: 'https://www.meta.com/horizon-worlds' },
        { id: 'zenith', name: 'Zenith: The Last City', url: 'https://zenithmmo.com' },
        { id: 'pavlov-vr', name: 'Pavlov VR', url: 'https://pavlovvr.com' },
        { id: 'onward', name: 'Onward', url: 'https://www.onwardthegame.com' },
        { id: 'contractors', name: 'Contractor$', url: 'https://www.contractorsvr.com' },
        { id: 'blade-sorcery', name: 'Blade and Sorcery', url: 'https://warpfrog.com' },
        { id: 'ancient-dungeon', name: 'Ancient Dungeon', url: 'https://www.ancientdungeonvr.com' },
        { id: 'walkabout-golf', name: 'Walkabout Mini Golf', url: 'https://www.mightycoconut.com/mini-golf' },
        { id: 'eleven-tennis', name: 'Eleven Table Tennis', url: 'https://elevenvr.com' },
        { id: 'real-vr-fishing', name: 'Real VR Fishing', url: 'https://miragesoft.com' },
        { id: 'golf-plus', name: 'Golf+', url: 'https://www.golfplusvr.com' },
        { id: 'echo-vr', name: 'Echo VR', url: 'https://www.echo.games' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setBannerIndex(prev => (prev + 1) % bannerImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 pb-32">
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
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
                            alt="Banner"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 md:left-20">
                         <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Games Hub</h2>
                    </div>
                </section>

                {/* Text Grid */}
                <div className="px-6 md:px-20 mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {gameApps.map((game, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.open(game.url, '_blank')}
                                className="p-5 bg-white/5 border border-white/10 rounded-2xl text-left transition-all group flex items-center justify-between"
                            >
                                <span className="font-bold text-white/80 group-hover:text-white transition-colors">{game.name}</span>
                                <Play size={16} fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-all text-blue-500" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Games;
