import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingBag, 
    ChevronLeft, 
    Star, 
    Zap, 
    ShieldCheck, 
    Clock, 
    ArrowRight
} from 'lucide-react';

const Store = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');

    const products = [
        {
            id: 'headphones',
            name: 'HappyTalk Aether Pro',
            description: 'Ultra-immersive spatial audio with hybrid active noise cancellation.',
            price: 299.99,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
            category: 'Audio',
            tag: 'Best Seller'
        },
        {
            id: 'watch',
            name: 'Nebula Orbital Watch',
            description: 'Futuristic wearable with holographic interface and health tracking.',
            price: 349.00,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
            category: 'Wearables',
            tag: 'New'
        },
        {
            id: 'vr',
            name: 'Vision VR Headset',
            description: 'The world\'s thinnest standalone VR experience with 8K resolution.',
            price: 599.00,
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=60',
            category: 'Devices',
            tag: 'Tech Gem'
        },
        {
            id: 'tee-1',
            name: 'HappyTalk Signature Tee',
            description: 'Ultra-soft premium cotton t-shirt with a minimalist reflective logo.',
            price: 35.00,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
            category: 'Clothing',
            tag: 'Essential'
        },
        {
            id: 'hoodie-1',
            name: '"Always Talking" Hoodie',
            description: 'High-density heavy fleece hoodie for ultimate comfort and style.',
            price: 75.00,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60',
            category: 'Clothing',
            tag: 'Trending'
        },
        {
            id: 'mug-1',
            name: 'Smart Thermal Mug',
            description: 'Keep your drinks at the perfect temperature with app-controlled heating.',
            price: 49.00,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=60',
            category: 'Gadgets',
            tag: 'Cool'
        },
        {
            id: 'backpack-1',
            name: 'Tech Nomad Backpack',
            description: 'Weatherproof urban backpack with integrated charging ports and modular storage.',
            price: 129.00,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60',
            category: 'Gadgets',
            tag: 'Premium'
        },
        {
            id: 'pad-1',
            name: 'Pro Gaming Mousepad',
            description: 'Extra-large microfiber surface with RGB edge lighting and wireless charging spot.',
            price: 55.00,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=60',
            category: 'Gadgets',
            tag: 'Gamer'
        },
        {
            id: 'cap-1',
            name: 'H-Logo Embroidered Cap',
            description: 'Classic 6-panel structured cap with high-quality 3D embroidery.',
            price: 28.00,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=60',
            category: 'Accessories',
            tag: 'New'
        },
        {
            id: 'tote-1',
            name: 'Eco-Canvas Tote Bag',
            description: 'Sustainable heavy-duty canvas bag for your daily essentials.',
            price: 22.00,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60',
            category: 'Accessories',
            tag: 'Eco'
        }
    ];

    const categories = ['All', 'Clothing', 'Gadgets', 'Accessories', 'Audio', 'Wearables', 'Devices'];

    const filteredProducts = activeCategory === 'All' 
        ? products 
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="store-page-container">
            {/* Immersive Background */}
            <div className="store-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            {/* Header */}
            <header className="store-header">
                <motion.button 
                    className="back-icon-btn-pill"
                    onClick={() => navigate('/')}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ChevronLeft size={18} />
                    <span>Back</span>
                </motion.button>
                <div className="store-title-group">
                    <h1 className="premium-gradient-text">HappyTalk Store</h1>
                    <p className="subtitle">Premium Collection for the Modern Socialite</p>
                </div>
                <div className="cart-badge-container">
                    <ShoppingBag size={24} />
                    <span className="cart-count">0</span>
                </div>
            </header>

            {/* Category Filter */}
            <nav className="category-tabs">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </nav>

            {/* Product Grid */}
            <main className="product-grid-container">
                <AnimatePresence mode="popLayout">
                    <div className="product-grid">
                        {filteredProducts.map((p, index) => (
                            <motion.div 
                                key={p.id}
                                className="product-card-wrapper"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="product-card">
                                    <div className="product-image-section">
                                        {p.tag && <span className="product-tag">{p.tag}</span>}
                                        <img src={p.image} alt={p.name} className="product-image" />
                                        <div className="image-overlay-glow"></div>
                                    </div>
                                    
                                    <div className="product-details">
                                        <div className="rating-row">
                                            <div className="stars">
                                                <Star size={12} fill="#FFD700" color="#FFD700" />
                                                <span>{p.rating}</span>
                                            </div>
                                            <span className="category-label">{p.category}</span>
                                        </div>
                                        
                                        <h3 className="product-title">{p.name}</h3>
                                        <p className="product-desc">{p.description}</p>
                                        
                                        <div className="product-footer">
                                            <div className="price-tag">
                                                <span className="currency">$</span>
                                                <span className="amount">{p.price.toFixed(2)}</span>
                                            </div>
                                            <motion.button 
                                                className="buy-now-btn"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span>Buy Now</span>
                                                <ArrowRight size={16} />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </main>

            {/* Features Banner */}
            <section className="store-perks">
                <div className="perk">
                    <ShieldCheck size={20} className="text-blue-400" />
                    <span>2 Year Warranty</span>
                </div>
                <div className="perk">
                    <Zap size={20} className="text-yellow-400" />
                    <span>Instant Shipping</span>
                </div>
                <div className="perk">
                    <Clock size={20} className="text-purple-400" />
                    <span>24/7 Support</span>
                </div>
            </section>

            <style>{`
                .store-page-container {
                    min-height: 100vh;
                    background: #020617;
                    color: white;
                    padding: 80px 24px 120px;
                    font-family: 'SF Pro Display', 'Inter', sans-serif;
                    position: relative;
                    overflow-x: hidden;
                    z-index: 1000;
                }

                .store-blobs {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                }

                .blob {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    filter: blur(120px);
                    opacity: 0.15;
                    border-radius: 50%;
                }

                .blob-1 { top: -10%; left: -10%; background: #3b82f6; }
                .blob-2 { bottom: -10%; right: -10%; background: #8b5cf6; }

                .store-header {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                    max-width: 1200px;
                    margin-inline: auto;
                }

                .back-icon-btn-pill {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    padding: 8px 20px;
                    border-radius: 99px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #fff;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    transition: background 0.3s;
                }
                .back-icon-btn-pill:hover {
                    background: rgba(255, 255, 255, 0.15);
                }

                .premium-gradient-text {
                    font-size: 32px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin: 0;
                    letter-spacing: -1px;
                }

                .subtitle {
                    margin: 4px 0 0;
                    font-size: 14px;
                    color: #64748b;
                }

                .cart-badge-container {
                    position: relative;
                    padding: 10px;
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: 12px;
                    color: #3b82f6;
                }

                .cart-count {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ef4444;
                    color: white;
                    font-size: 10px;
                    font-weight: 800;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #020617;
                }

                .category-tabs {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 40px;
                    justify-content: center;
                    position: relative;
                    z-index: 10;
                }

                .category-tab {
                    padding: 8px 18px;
                    border-radius: 99px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #94a3b8;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.3s;
                    cursor: pointer;
                }

                .category-tab:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }

                .category-tab.active {
                    background: #3b82f6;
                    color: white;
                    border-color: #3b82f6;
                    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 10;
                }

                .product-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 28px;
                    padding: 0;
                    overflow: hidden;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .product-card:hover {
                    border-color: rgba(59, 130, 246, 0.3);
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-10px);
                }

                .product-image-section {
                    position: relative;
                    padding: 20px;
                    background: rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 220px;
                }

                .product-image {
                    max-width: 100%;
                    height: 180px;
                    object-fit: contain;
                    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
                }

                .product-tag {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: rgba(59, 130, 246, 0.2);
                    color: #3b82f6;
                    font-size: 10px;
                    font-weight: 800;
                    padding: 4px 10px;
                    border-radius: 6px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    z-index: 2;
                }

                .product-details {
                    padding: 20px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .rating-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .stars {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(0,0,0,0.3);
                    padding: 4px 10px;
                    border-radius: 8px;
                    font-size: 11px;
                }

                .category-label {
                    font-size: 11px;
                    color: #64748b;
                    font-weight: 600;
                }

                .product-title {
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 8px;
                    color: #fff;
                }

                .product-desc {
                    font-size: 13px;
                    color: #94a3b8;
                    margin: 0 0 20px;
                    line-height: 1.5;
                    flex-grow: 1;
                }

                .product-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto;
                }

                .price-tag {
                    display: flex;
                    align-items: baseline;
                    gap: 2px;
                }

                .currency { font-size: 14px; font-weight: 600; color: #3b82f6; }
                .amount { font-size: 22px; font-weight: 800; }

                .buy-now-btn {
                    background: #3b82f6;
                    color: white;
                    border: none;
                    padding: 10px 18px;
                    border-radius: 14px;
                    font-size: 13px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
                    cursor: pointer;
                }

                .store-perks {
                    display: flex;
                    justify-content: center;
                    gap: 32px;
                    margin-top: 80px;
                    padding: 24px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    max-width: 800px;
                    margin-inline: auto;
                    position: relative;
                    z-index: 10;
                }

                .perk {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #94a3b8;
                }

                @media (max-width: 640px) {
                    .product-grid {
                        grid-template-columns: 1fr;
                    }
                    .store-header {
                        flex-direction: row;
                        text-align: left;
                        gap: 10px;
                        padding: 0 10px;
                    }
                    .premium-gradient-text { font-size: 24px; }
                    .store-perks {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                        margin-top: 40px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Store;
