import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Globe, Users, 
  MapPin, Wind, Info, Wifi, Signal, 
  Battery, ChevronLeft
} from 'lucide-react';

const Countries = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState('');
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,subregion,capital,population,cca3');
                const data = await response.json();
                // Sort by name
                const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching countries:", error);
                setLoading(false);
            }
        };
        fetchCountries();
        return () => clearInterval(timer);
    }, []);

    const filteredCountries = countries.filter(c => 
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="countries-pro-container">
            {/* System Status Bar - Matching Ecosystem Aesthetic */}
            <header className="system-status-bar">
                <div className="status-left">
                    <motion.button 
                        className="pro-back-btn" 
                        onClick={() => navigate('/apps')}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft size={24} />
                    </motion.button>
                </div>

                <div className="status-center">
                    <div className="system-clock-stack">
                        <span className="system-time">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="system-date">{time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>

                <div className="status-right">
                    <Signal size={16} />
                    <Wifi size={16} />
                    <Battery size={20} />
                </div>
            </header>

            <main className="countries-main-content">
                <header className="content-intro-header">
                    <div className="brand-section">
                        <h1>World Explorer</h1>
                        <p>Discover demographics and cultures from <strong>{countries.length}</strong> nations.</p>
                    </div>

                    <div className="search-station">
                        <div className="glass-pill-search">
                            <Search size={20} className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                <div className="culture-grid-viewport">
                    {loading ? (
                        <div className="explorer-loading">
                            <div className="spinner-ring"></div>
                            <p>Analyzing Global Data...</p>
                        </div>
                    ) : (
                        <div className="culture-grid">
                            <AnimatePresence>
                                {filteredCountries.map((country, idx) => (
                                    <motion.div 
                                        key={country.cca3} 
                                        className="country-pro-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: Math.min(idx * 0.05, 1) }}
                                        whileHover={{ y: -8 }}
                                    >
                                        <div className="card-flag-station">
                                            <img src={country.flags.svg} alt={country.name.common} />
                                            <div className="flag-overlay"></div>
                                        </div>
                                        <div className="card-info-station">
                                            <div className="info-top">
                                                <h3>{country.name.common}</h3>
                                                <span className="region-tag">{country.region}</span>
                                            </div>
                                            <p className="country-desc">
                                                Located in {country.subregion || country.region}, {country.name.common} is governed from {country.capital?.[0] || 'N/A'}. 
                                                It has a vibrant population of over {(country.population / 1000000).toFixed(1)} million.
                                            </p>
                                            <div className="quick-metrics">
                                                <div className="metric">
                                                    <MapPin size={12} />
                                                    <span>{country.capital?.[0] || '-'}</span>
                                                </div>
                                                <div className="metric">
                                                    <Users size={12} />
                                                    <span>{(country.population / 1000000).toFixed(1)}M</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>

            <style>{`
                .countries-pro-container {
                    position: fixed; inset: 0;
                    background: #000; color: #fff;
                    font-family: -apple-system, BlinkMacSystemFont, "SF Pro", sans-serif;
                    overflow: hidden;
                }

                /* Status Bar - System Native */
                .system-status-bar {
                    position: absolute; top: 0; left: 0; right: 0;
                    height: 50px; display: flex; justify-content: space-between; align-items: center;
                    padding: 0 40px; z-index: 3000; font-size: 13px; font-weight: 600;
                    background: rgba(0,0,0,0.3); backdrop-filter: blur(25px);
                    border-bottom: 0.5px solid rgba(255,255,255,0.08);
                }
                .status-left { flex: 1; display: flex; align-items: center; }
                .status-center { flex: 1; display: flex; justify-content: center; }
                .status-right { flex: 1; display: flex; gap: 18px; align-items: center; justify-content: flex-end; }
                
                .pro-back-btn { 
                    width: 50px; height: 50px; border-radius: 15px; 
                    display: flex; align-items: center; justify-content: center; 
                    background: rgba(255,255,255,0.07); color: #fff; cursor: pointer; transition: 0.3s; 
                    border: 1px solid rgba(255,255,255,0.05); margin-left: 10px;
                }
                .pro-back-btn:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }
                .system-clock-stack { display: flex; align-items: center; gap: 12px; }
                .system-time { color: #fff; }
                .system-date { color: rgba(255,255,255,0.4); }

                /* Main Content Area */
                .countries-main-content {
                    height: 100vh; padding: 50px 0 0;
                    display: flex; flex-direction: column;
                }

                .content-intro-header {
                    padding: 60px 7% 40px; 
                    display: flex; justify-content: space-between; align-items: flex-end;
                    background: linear-gradient(to bottom, rgba(59,130,246,0.05) 0%, transparent 100%);
                }
                .brand-section h1 { font-size: 42px; font-weight: 900; margin: 0; letter-spacing: -1px; }
                .brand-section p { color: rgba(255,255,255,0.4); margin: 10px 0 0; font-size: 16px; }
                .brand-section p strong { color: #3b82f6; }

                .search-station { width: 400px; }
                .glass-pill-search {
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 20px; height: 56px; display: flex; align-items: center;
                    padding: 0 20px; gap: 15px; transition: 0.3s;
                }
                .glass-pill-search:focus-within { border-color: #3b82f6; background: rgba(255,255,255,0.08); }
                .glass-pill-search input { flex: 1; background: transparent; border: none; color: #fff; font-size: 16px; outline: none; }
                .search-icon { color: rgba(255,255,255,0.3); }

                /* Culture Grid */
                .culture-grid-viewport { flex: 1; overflow-y: auto; padding: 20px 7% 120px; scrollbar-width: none; }
                .culture-grid-viewport::-webkit-scrollbar { display: none; }

                .culture-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }

                .country-pro-card {
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 24px; overflow: hidden; display: flex; flex-direction: column;
                    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .country-pro-card:hover { border-color: #3b82f6; background: rgba(255,255,255,0.06); }

                .card-flag-station { position: relative; height: 160px; overflow: hidden; }
                .card-flag-station img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
                .country-pro-card:hover .card-flag-station img { transform: scale(1.05); }
                .flag-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%); }

                .card-info-station { padding: 25px; display: flex; flex-direction: column; flex: 1; }
                .info-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .info-top h3 { font-size: 19px; font-weight: 800; margin: 0; }
                .region-tag { font-size: 10px; font-weight: 950; text-transform: uppercase; background: rgba(59,130,246,0.15); color: #3b82f6; padding: 4px 10px; border-radius: 6px; }

                .country-desc { font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.4); margin-bottom: 25px; flex: 1; }
                
                .quick-metrics { display: flex; gap: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); }
                .metric { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #fff; }
                .metric span { opacity: 0.8; }

                .explorer-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 400px; gap: 20px; color: rgba(255,255,255,0.4); }
                .spinner-ring { width: 40px; height: 40px; border: 3px solid rgba(59,130,246,0.1); border-top-color: #3b82f6; border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }

                @media (max-width: 768px) {
                    .system-status-bar { padding: 0 15px; }
                    .status-center { display: none; }
                    .content-intro-header { flex-direction: column; align-items: flex-start; gap: 30px; padding-top: 40px; }
                    .brand-section h1 { font-size: 32px; }
                    .search-station { width: 100%; }
                    .culture-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Countries;
