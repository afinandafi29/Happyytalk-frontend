import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, ArrowLeft, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CalendarApp = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('calendarEvents');
        return saved ? JSON.parse(saved) : [];
    });
    const [showEventModal, setShowEventModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', time: '12:00', color: '#3b82f6' });

    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }, [events]);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        return { 
            daysInMonth: lastDay.getDate(), 
            startingDayOfWeek: firstDay.getDay() 
        };
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    // Dropdown helpers
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

    const handleYearChange = (e) => setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth()));
    const handleMonthChange = (e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value)));
    const handleDateJump = (e) => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.value)));

    const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    
    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
    };

    const getEventsForDate = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.date === dateStr);
    };

    const handleAddEvent = () => {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        setEvents([...events, { ...newEvent, date: dateStr, id: Date.now() }]);
        setNewEvent({ title: '', time: '12:00', color: '#3b82f6' });
        setShowEventModal(false);
    };

    const handleDeleteEvent = (id) => setEvents(events.filter(e => e.id !== id));

    return (
        <div className="pro-calendar-container">
            <main className="pro-workspace">
                {/* Precision Black Navigation Bar */}
                <header className="pro-top-nav">
                    <div className="nav-group-left">
                        <motion.button 
                            className="pro-back-btn" 
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.1 }}
                        >
                            <ArrowLeft size={28} />
                        </motion.button>
                        <h1 className="pro-title">
                            {monthNames[currentDate.getMonth()]} <span className="text-[#3b82f6]">{currentDate.getFullYear()}</span>
                        </h1>
                    </div>
                </header>

                <div className="grid-viewport">
                    <div className="pro-grid-header">
                        {dayNames.map((day, i) => {
                            const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#4285F4', '#EA4335', '#FBBC05'];
                            return (
                                <div key={day} className="pro-grid-day" style={{ color: colors[i], opacity: 0.8 }}>
                                    {day}
                                </div>
                            );
                        })}
                    </div>

                    <div className="pro-grid">
                        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                            <div key={`empty-${i}`} className="pro-cell empty"></div>
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dayEvents = getEventsForDate(day);
                            const active = selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth();
                            
                            return (
                                <motion.div
                                    key={day}
                                    className={`pro-cell ${active ? 'active' : ''} ${isToday(day) ? 'today' : ''}`}
                                    onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="pro-cell-head">
                                        <span className="pro-day-num">{day}</span>
                                        {isToday(day) && <span className="today-chip">TODAY</span>}
                                    </div>
                                    <div className="pro-cell-body">
                                        {dayEvents.slice(0, 2).map((e, idx) => (
                                            <div key={idx} className="pro-event-tag" style={{ borderLeftColor: e.color }}>
                                                {e.title}
                                            </div>
                                        ))}
                                        {dayEvents.length > 2 && <div className="pro-more">+{dayEvents.length - 2}</div>}
                                    </div>
                                    {dayEvents.length > 0 && <div className="pro-indicator" style={{ background: '#3b82f6' }} />}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Navigation & Action */}
                <div className="pro-bottom-bar">
                    <button onClick={previousMonth} className="bottom-nav-arrow"><ChevronLeft size={24} /></button>
                    <motion.button 
                        className="pro-fab-btn"
                        onClick={() => setShowEventModal(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Plus size={28} />
                        <span>Add Event</span>
                    </motion.button>
                    <button onClick={nextMonth} className="bottom-nav-arrow"><ChevronRight size={24} /></button>
                </div>
            </main>

            <AnimatePresence>
                {showEventModal && (
                    <motion.div className="pro-modal-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="pro-modal-overlay" onClick={() => setShowEventModal(false)} />
                        <motion.div className="pro-modal-box" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}>
                            <h2>Create Planning</h2>
                            <div className="input-group">
                                <label>EVENT NAME</label>
                                <input type="text" placeholder="Design Review..." value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>TIME</label>
                                <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
                            </div>
                            <div className="pro-modal-actions">
                                <button className="cancel-trigger" onClick={() => setShowEventModal(false)}>Discard</button>
                                <button className="save-trigger" onClick={handleAddEvent}>Confirm Plan</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .pro-calendar-container {
                    position: fixed; inset: 0; background: #000; color: #fff;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    overflow: hidden;
                }
                .pro-workspace { display: flex; flex-direction: column; height: 100vh; }

                /* Premium Black/White/Blue Nav */
                .pro-top-nav {
                    height: 80px; padding: 0 25px; border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex; justify-content: space-between; align-items: center;
                    background: #000; z-index: 100;
                }
                .nav-group-left { display: flex; align-items: center; gap: 20px; }
                .pro-back-btn { 
                    width: 55px; height: 55px; border-radius: 18px; 
                    display: flex; align-items: center; justify-content: center; 
                    background: rgba(255,255,255,0.07); color: #fff; cursor: pointer; transition: 0.3s; 
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .pro-back-btn:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }
                .pro-title { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; }

                /* Bottom bar styling */
                .pro-bottom-bar {
                    height: 100px; background: rgba(0,0,0,0.8); backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255,255,255,0.05);
                    display: flex; align-items: center; justify-content: space-around;
                    padding: 0 20px; position: relative; z-index: 200;
                }
                .pro-fab-btn {
                    background: #3b82f6; color: #fff; padding: 15px 30px; border-radius: 100px;
                    display: flex; align-items: center; gap: 12px; font-weight: 900;
                    text-transform: uppercase; letter-spacing: 1px; border: none;
                    box-shadow: 0 15px 30px rgba(59,130,246,0.3);
                }
                .bottom-nav-arrow {
                    width: 50px; height: 50px; border-radius: 50%; background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1); color: #fff; display: flex;
                    align-items: center; justify-content: center; cursor: pointer;
                }

                /* Grid Architecture */
                .grid-viewport { flex: 1; padding: 10px; display: flex; flex-direction: column; min-height: 0; }
                .pro-grid-header { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 5px; }
                .pro-grid-day { text-align: center; font-size: 10px; font-weight: 900; letter-spacing: 0.5px; padding: 10px 0; }

                .pro-grid { flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); grid-template-rows: repeat(6, 1fr); gap: 4px; }
                .pro-cell {
                    background: #000; border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px; position: relative; overflow: hidden; display: flex; flex-direction: column; padding: 6px;
                }
                .pro-cell.active { border-color: #3b82f6; background: rgba(59,130,246,0.1); }
                .pro-cell.today { border-color: rgba(59,130,246,0.5); }

                .pro-cell-head { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
                .pro-day-num { font-size: 14px; font-weight: 900; color: #fff; }
                .today-chip { 
                    display: inline-block; background: #3b82f6; color: #fff; 
                    font-size: 7px; font-weight: 900; padding: 2px 5px; border-radius: 4px; 
                    letter-spacing: 0.5px;
                }

                .pro-cell-body { display: none; }

                /* Mobile/Responsive Perfection */
                @media (max-width: 768px) {
                    .pro-grid-day { font-size: 9px; }
                    .pro-cell { border-radius: 8px; }
                    .pro-day-num { font-size: 13px; }
                    .pro-bottom-bar { height: 80px; }
                    .pro-fab-btn { padding: 12px 20px; font-size: 12px; gap: 8px; }
                    .pro-fab-btn span { display: inline-block; }
                    .pro-title { font-size: 18px; }
                }
            `}</style>
        </div>
    );
};

export default CalendarApp;
