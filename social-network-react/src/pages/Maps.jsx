import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Search, Navigation, 
  Globe, Crosshair, Map as MapIcon,
  Wifi, Signal, Battery, ChevronLeft,
  Sparkles, Layers, Ruler, MapPin, Info,
  ExternalLink, MousePointer2, X
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RecenterMap = ({ coords, zoomLevel }) => {
    const map = useMap();
    useEffect(() => {
        if (coords) map.flyTo(coords, zoomLevel || map.getZoom(), { duration: 1.5 });
    }, [coords, zoomLevel, map]);
    return null;
};

// Distance Measurement Component
const DistanceTracker = ({ active, setPoints, points }) => {
    useMapEvents({
        click(e) {
            if (!active) return;
            const newPoints = [...points, e.latlng];
            if (newPoints.length > 2) setPoints([e.latlng]);
            else setPoints(newPoints);
        },
    });
    return null;
};

const Maps = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPos, setCurrentPos] = useState([20, 0]);
    const [isSearching, setIsSearching] = useState(false);
    const [mapLayer, setMapLayer] = useState('voyager');
    const [showLayers, setShowLayers] = useState(false);
    const [measureMode, setMeasureMode] = useState(false);
    const [measurePoints, setMeasurePoints] = useState([]);
    const [placeData, setPlaceData] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSearch = async (e) => {
        if (e.key === 'Enter' && searchQuery) {
            setIsSearching(true);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1`);
                const data = await response.json();
                if (data && data.length > 0) {
                    const first = data[0];
                    const pos = [parseFloat(first.lat), parseFloat(first.lon)];
                    setCurrentPos(pos);
                    
                    // "Together" - combine major components for the title
                    const addr = first.address;
                    const nameParts = [];
                    if (addr.city) nameParts.push(addr.city);
                    else if (addr.town) nameParts.push(addr.town);
                    else if (addr.state) nameParts.push(addr.state);
                    else if (addr.country) nameParts.push(addr.country);

                    setPlaceData({
                        name: first.display_name.split(',').slice(0, 2).join(', '),
                        address: first.display_name,
                        type: first.type,
                        details: first.address
                    });
                    setMeasurePoints([]);
                    setMeasureMode(false);
                }
            } catch (error) {
                console.error("Geocoding failed:", error);
            } finally {
                setIsSearching(false);
            }
        }
    };

    const calculateDistance = (p1, p2) => {
        if (!p1 || !p2) return 0;
        const lat1 = p1.lat, lon1 = p1.lng;
        const lat2 = p2.lat, lon2 = p2.lng;
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (R * c).toFixed(2);
    };

    const layers = {
        voyager: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    };

    return (
        <div className="maps-ultimate-container">
            <header className="maps-header" style={{ justifyContent: 'space-between', padding: '0 20px' }}>
                <button onClick={() => navigate('/apps')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft size={24} color="#000" />
                </button>
                <div className="header-clock" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div style={{ width: '24px' }}></div>
            </header>

            <div className="map-interaction-hub">
                {/* Search Bar */}
                <div className="search-box-container">
                    <motion.div className="main-search-bar" layout>
                        <Search size={20} className={isSearching ? 'animate-pulse text-blue-500' : 'text-gray-400'} />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <div className="search-actions-group">
                            <motion.button 
                                className="tool-icon-btn highlight"
                                onClick={() => handleSearch({ key: 'Enter' })}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Search size={24} color="#ffffff" strokeWidth={2.5} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Map Viewport */}
                <div className="map-view-wrapper">
                    <MapContainer 
                        center={currentPos} 
                        zoom={3} 
                        style={{ height: '100%', width: '100%', background: '#f5f5f5' }}
                        zoomControl={false}
                        attributionControl={false}
                    >
                        <TileLayer url={layers[mapLayer]} attribution='' />
                        <RecenterMap coords={currentPos} zoomLevel={placeData ? 14 : 3} />
                        <DistanceTracker active={measureMode} points={measurePoints} setPoints={setMeasurePoints} />
                        
                        {measurePoints.length === 2 && (
                            <>
                                <Polyline positions={measurePoints} color="#3b82f6" weight={4} dashArray="10, 10" />
                                <Marker position={measurePoints[1]} />
                            </>
                        )}
                        {measurePoints.length >= 1 && <Marker position={measurePoints[0]} />}
                    </MapContainer>
                </div>

                {/* Distance Measurement Result Label Overlay */}
                <AnimatePresence>
                    {measurePoints.length === 2 && (
                        <motion.div 
                            className="distance-result-overlay"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <div className="res-badge">
                                <Ruler size={16} />
                                <span>{calculateDistance(measurePoints[0], measurePoints[1])} km</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Controls */}
                <div className="side-tools">
                    <button className="float-tool" onClick={() => setShowLayers(!showLayers)}>
                        <Layers size={22} />
                    </button>
                    <AnimatePresence>
                        {showLayers && (
                            <motion.div 
                                className="layer-picker"
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            >
                                {Object.keys(layers).map(l => (
                                    <button 
                                        key={l}
                                        className={`layer-btn ${mapLayer === l ? 'active' : ''}`}
                                        onClick={() => {setMapLayer(l); setShowLayers(false);}}
                                    >
                                        <span className="capitalize">{l}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="tool-spacer"></div>

                    <button className="float-tool highlight" onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((pos) => {
                                const lat = pos.coords.latitude;
                                const lng = pos.coords.longitude;
                                setCurrentPos([lat, lng]);
                                setPlaceData({
                                    name: "Your Current Location",
                                    address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
                                    isLive: true
                                });
                            });
                        }
                    }}>
                        <Navigation size={22} />
                    </button>
                </div>

                {/* Place Info Card (Google Maps Style) */}
                <AnimatePresence>
                    {placeData && (
                        <motion.div 
                            className="place-info-card"
                            initial={{ y: 300 }}
                            animate={{ y: 0 }}
                            exit={{ y: 300 }}
                        >
                            <div className="card-handle"></div>
                            <div className="card-body" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '20px 25px 25px', width: '100%', boxSizing: 'border-box' }}>
                                <div className="card-left-section" style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                                    <div className="pin-icon-wrap" style={{ flexShrink: 0 }}><MapPin size={24} color="#ef4444" /></div>
                                    <div className="title-area" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h3 style={{ margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{placeData.name}</h3>
                                        <p style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{placeData.address}</p>
                                    </div>
                                </div>
                                <button className="maps-dir-btn primary" style={{ width: '90px', height: '54px', flexShrink: 0, marginLeft: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} onClick={() => {
                                    if (navigator.geolocation && currentPos && placeData) {
                                        navigator.geolocation.getCurrentPosition((pos) => {
                                            const start = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                                            const end = { lat: currentPos[0], lng: currentPos[1] };
                                            setMeasurePoints([start, end]);
                                        });
                                    }
                                }}>
                                    <Navigation size={20} color="#fff" />
                                    <span>Direction</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Distance Tool Active Indicator */}
                <AnimatePresence>
                    {measureMode && (
                        <motion.div 
                            className="measure-tip"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <div className="tip-content">
                                <MousePointer2 size={16} />
                                <span>Click two points to measure distance</span>
                                <button onClick={() => {setMeasureMode(false); setMeasurePoints([]);}}><X size={14}/></button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');

                .maps-ultimate-container {
                    position: fixed; inset: 0;
                    background: #fff; color: #000;
                    font-family: 'Outfit', sans-serif;
                    overflow: hidden;
                    display: flex; flex-direction: column;
                }

                .leaflet-control-attribution { display: none !important; }

                /* Back Button Style - Exact Match to User Image */
                .custom-back-btn {
                    position: absolute; top: 30px; left: 30px; z-index: 5000;
                    width: 60px; height: 60px; border-radius: 20px;
                    background: #0f1010; border: none;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: 0.3s;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                .custom-back-btn:hover { background: #1a1a1a; transform: scale(1.05); }

                .maps-header {
                    height: 50px; display: flex; align-items: center; justify-content: center;
                    background: rgba(255,255,255,0.8); backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0,0,0,0.05); z-index: 1000;
                }
                .header-clock { font-weight: 800; font-size: 15px; }

                .map-interaction-hub { position: relative; flex: 1; display: flex; flex-direction: column; }
                .map-view-wrapper { position: absolute; inset: 0; z-index: 0; }

                /* Search Bar */
                .search-box-container {
                    position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
                    width: 90%; max-width: 600px; z-index: 2000;
                }
                .main-search-bar {
                    background: #fff; border-radius: 50px; height: 56px;
                    display: flex; align-items: center; padding: 0 20px; gap: 12px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.05);
                }
                .main-search-bar input {
                    flex: 1; border: none; background: transparent; color: #000;
                    font-size: 16px; font-weight: 600; outline: none;
                }

                .search-actions-group {
                    display: flex; align-items: center; gap: 8px;
                }

                .clear-search {
                    background: #3b82f6; border: none; color: #fff; cursor: pointer;
                    width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    transition: 0.2s; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
                }
                .clear-search:hover { background: #2563eb; transform: scale(1.1); }

                .search-sep { width: 1px; height: 24px; background: #eee; margin: 0 4px; }
                .tool-icon-btn {
                    background: #3b82f6; border: none; color: #fff; cursor: pointer;
                    width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    transition: 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
                }
                .tool-icon-btn.active { background: #1d4ed8; color: #fff; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); transform: scale(0.95); }
                .tool-icon-btn:hover:not(.active) { background: #2563eb; transform: translateY(-1px); }

                /* Side Tools */
                .side-tools {
                    position: absolute; right: 20px; top: 100px; display: flex; flex-direction: column; gap: 12px; z-index: 2000;
                }
                .float-tool {
                    width: 50px; height: 50px; border-radius: 14px; background: #fff;
                    border: 1px solid rgba(59, 130, 246, 0.2); display: flex; align-items: center; justify-content: center;
                    cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: 0.2s; color: #3b82f6;
                }
                .float-tool:hover { background: #f0f7ff; transform: translateY(-2px); }
                .float-tool.highlight { background: #3b82f6; color: #fff; border: none; box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3); }

                .layer-picker {
                    position: absolute; right: 65px; top: 0; width: 120px;
                    background: #fff; border-radius: 12px; padding: 6px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 4px; border: 1px solid rgba(0,0,0,0.05);
                }
                .layer-btn {
                    width: 100%; padding: 10px; border: none; background: transparent;
                    text-align: left; font-weight: 700; font-size: 13px; border-radius: 8px; cursor: pointer; color: #333;
                }
                .layer-btn.active { background: #f0f7ff; color: #3b82f6; }
                .layer-btn:hover:not(.active) { background: #f9f9f9; }

                /* Place Info Card */
                .place-info-card {
                    position: absolute; bottom: 20px; left: 10px; right: 10px;
                    background: #fff; border-radius: 28px; z-index: 2000;
                    box-shadow: 0 -10px 40px rgba(0,0,0,0.15); padding: 5px;
                    max-width: 500px; margin: 0 auto; overflow: hidden;
                }
                .card-handle { width: 40px; height: 4px; background: #eee; border-radius: 2px; margin: 10px auto; }
                .card-body { padding: 15px 20px 25px; }
                .card-top { display: flex; gap: 15px; margin-bottom: 15px; }
                .pin-icon-wrap { width: 48px; height: 48px; border-radius: 16px; background: #fee2e2; color: #ef4444; display: flex; align-items: center; justify-content: center; }
                .title-area h3 { font-size: 20px; font-weight: 800; margin-bottom: 4px; color: #1a1a1a; }
                .title-area p { font-size: 13px; color: #666; font-weight: 500; }

                .card-tags { display: flex; gap: 8px; margin-bottom: 20px; }
                .tag { padding: 4px 12px; background: #f3f4f6; border-radius: 100px; font-size: 11px; font-weight: 700; color: #374151; }

                .card-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%; margin-top: 8px; }
                .maps-dir-btn { 
                    height: 54px; border-radius: 12px; border: none;
                    background: #3b82f6; color: #fff; font-weight: 800; font-size: 11px; 
                    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; 
                    cursor: pointer; transition: 0.2s; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
                }
                .maps-dir-btn:hover { background: #2563eb; transform: translateY(-2px); }
                .maps-dir-btn span { font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; }

                /* Measure Tip */
                .measure-tip {
                    position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); z-index: 2000;
                }
                .tip-content {
                    background: #3b82f6; color: #fff; padding: 12px 24px; border-radius: 100px;
                    display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 800;
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4); border: 2px solid #fff;
                }
                .tip-content button { background: transparent; border: none; color: #fff; opacity: 0.8; padding: 4px; cursor: pointer; display: flex; align-items: center; }

                .dist-label { 
                    background: #3b82f6; color: #fff; padding: 6px 12px; border-radius: 8px; 
                    font-size: 14px; font-weight: 800; border: 2px solid #fff;
                }

                .distance-result-overlay {
                    position: absolute; top: 100px; left: 50%; transform: translateX(-50%); z-index: 4000;
                }
                .res-badge {
                    background: #3b82f6; color: #fff; padding: 12px 24px; border-radius: 50px;
                    display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 800;
                    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4); border: 2px solid #fff;
                }

                @media (max-width: 768px) {
                    .search-box-container { width: 95%; top: 15px; }
                    .main-search-bar { height: 50px; }
                    .custom-back-btn { top: 20px; left: 15px; width: 50px; height: 50px; }
                    .side-tools { right: 15px; top: 120px; }
                    .place-info-card { bottom: 15px; }
                    .card-actions { gap: 6px; }
                    .maps-dir-btn { height: 48px; font-size: 10px; }
                    .maps-dir-btn span { font-size: 8px; }
                }
            `}</style>
        </div>
    );
};

export default Maps;
