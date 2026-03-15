import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import ProgressRing from '../components/ProgressRing';

function getToday() {
    return new Date().toISOString().split('T')[0];
}

export default function Tracker() {
    const today = getToday();
    const todayLog = useLiveQuery(() => db.habitLogs.where('date').equals(today).first(), [today]);

    const [log, setLog] = useState({
        waterGlasses: 0,
        sleepHours: 7,
        fruits: 0,
        vegetables: 0,
        junkFood: 0,
        sunExposure: 0
    });

    useEffect(() => {
        if (todayLog) {
            setLog({
                waterGlasses: todayLog.waterGlasses || 0,
                sleepHours: todayLog.sleepHours || 7,
                fruits: todayLog.fruits || 0,
                vegetables: todayLog.vegetables || 0,
                junkFood: todayLog.junkFood || 0,
                sunExposure: todayLog.sunExposure || 0
            });
        }
    }, [todayLog]);

    const saveLog = async (updates) => {
        const newLog = { ...log, ...updates };
        setLog(newLog);

        const existing = await db.habitLogs.where('date').equals(today).first();
        if (existing) {
            await db.habitLogs.update(existing.id, { ...newLog, date: today });
        } else {
            await db.habitLogs.add({ ...newLog, date: today });
        }
    };

    const waterProgress = Math.min(log.waterGlasses / 8 * 100, 100);

    const sleepMessage = () => {
        if (log.sleepHours >= 7 && log.sleepHours <= 9) return { text: 'Great sleep! Supports skin repair.', color: 'var(--success)' };
        if (log.sleepHours >= 6) return { text: 'Almost there! Try to get 7+ hours.', color: 'var(--warning)' };
        return { text: 'Too little sleep. Aim for 7–9 hours for skin recovery.', color: 'var(--danger)' };
    };

    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="page-header">
                    <h1>Tracker</h1>
                    <p>Log your daily habits</p>
                </div>

                {/* Water Tracker */}
                <div className="card" style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div>
                            <h4>💧 Hydration</h4>
                            <p className="text-sm text-secondary">Goal: 8 glasses</p>
                        </div>
                        <ProgressRing progress={waterProgress} size={64} strokeWidth={5} color="var(--info)">
                            <span style={{ fontSize: 16, fontWeight: 700 }}>{log.waterGlasses}</span>
                        </ProgressRing>
                    </div>
                    <div className="water-glasses">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div
                                key={i}
                                className={`water-glass ${i < log.waterGlasses ? 'filled' : ''}`}
                                onClick={() => saveLog({ waterGlasses: i + 1 === log.waterGlasses ? i : i + 1 })}
                            >
                                {i < log.waterGlasses ? '💧' : ''}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sleep Tracker */}
                <div className="card" style={{ marginBottom: 16 }}>
                    <h4 style={{ marginBottom: 12 }}>😴 Sleep</h4>
                    <div className="slider-container">
                        <input
                            type="range"
                            min={0}
                            max={12}
                            step={0.5}
                            value={log.sleepHours}
                            onChange={e => saveLog({ sleepHours: Number(e.target.value) })}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                            <span style={{ fontSize: 24, fontWeight: 700 }}>{log.sleepHours}h</span>
                            <span className="text-sm" style={{ color: sleepMessage().color, fontWeight: 500 }}>
                                {sleepMessage().text}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Diet Tracker */}
                <div className="card" style={{ marginBottom: 16 }}>
                    <h4 style={{ marginBottom: 16 }}>🥗 Diet</h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <TrackerRow
                            label="🍎 Fruits"
                            value={log.fruits}
                            onChange={v => saveLog({ fruits: v })}
                            max={10}
                        />
                        <TrackerRow
                            label="🥬 Vegetables"
                            value={log.vegetables}
                            onChange={v => saveLog({ vegetables: v })}
                            max={10}
                        />
                        <TrackerRow
                            label="🍔 Junk Food"
                            value={log.junkFood}
                            onChange={v => saveLog({ junkFood: v })}
                            max={10}
                        />
                    </div>

                    {log.junkFood >= 2 && (
                        <div className="warning-banner medium" style={{ marginTop: 16, marginBottom: 0 }}>
                            <span className="warning-icon">⚠️</span>
                            <div className="warning-content">
                                <h4>High Junk Food Intake</h4>
                                <p>Processed foods can trigger inflammation and breakouts. Try swapping for healthier options.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sun Exposure */}
                <div className="card">
                    <h4 style={{ marginBottom: 12 }}>☀️ Sun Exposure</h4>
                    <div className="slider-container">
                        <input
                            type="range"
                            min={0}
                            max={240}
                            step={15}
                            value={log.sunExposure}
                            onChange={e => saveLog({ sunExposure: Number(e.target.value) })}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                            <span style={{ fontSize: 20, fontWeight: 700 }}>
                                {log.sunExposure < 60 ? `${log.sunExposure} min` : `${(log.sunExposure / 60).toFixed(1)}h`}
                            </span>
                        </div>
                    </div>
                    {log.sunExposure > 60 && (
                        <div className="warning-banner medium" style={{ marginTop: 12, marginBottom: 0 }}>
                            <span className="warning-icon">🧴</span>
                            <div className="warning-content">
                                <h4>Remember Sunscreen!</h4>
                                <p>With {log.sunExposure}+ minutes of sun exposure, make sure to reapply sunscreen every 2 hours.</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

function TrackerRow({ label, value, onChange, max }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 500, fontSize: 14 }}>{label}</span>
            <div className="counter">
                <button className="counter-btn" onClick={() => onChange(Math.max(0, value - 1))}>−</button>
                <span className="counter-value">{value}</span>
                <button className="counter-btn" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
            </div>
        </div>
    );
}
