import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import ProgressRing from '../components/ProgressRing';
import { getDailyTip, getDailyDietTip, getDayIndex } from '../data/tips';
import { calculateSkinScore, calculateDietScore, getScoreLabel } from '../logic/skinScoreCalculator';
import { detectMistakes } from '../logic/mistakeDetector';

function getToday() {
    return new Date().toISOString().split('T')[0];
}

export default function Home() {
    const today = getToday();
    const dayIndex = getDayIndex();

    const profile = useLiveQuery(() => db.profile.toCollection().first());
    const routineSteps = useLiveQuery(() => db.routineSteps.toArray());
    const todayCompletions = useLiveQuery(() => db.routineCompletions.where('date').equals(today).toArray(), [today]);
    const todayHabitLog = useLiveQuery(() => db.habitLogs.where('date').equals(today).first(), [today]);
    const allScores = useLiveQuery(() => db.skinScores.toArray());
    const allHabitLogs = useLiveQuery(() => db.habitLogs.toArray());

    const [warnings, setWarnings] = useState([]);

    const morningSteps = routineSteps?.filter(s => s.routineType === 'morning') || [];
    const nightSteps = routineSteps?.filter(s => s.routineType === 'night') || [];
    const completedIds = new Set((todayCompletions || []).map(c => c.stepId));

    const morningCompleted = morningSteps.filter(s => completedIds.has(s.id)).length;
    const nightCompleted = nightSteps.filter(s => completedIds.has(s.id)).length;
    const totalSteps = morningSteps.length + nightSteps.length;
    const totalCompleted = morningCompleted + nightCompleted;
    const routineCompletion = totalSteps > 0 ? totalCompleted / totalSteps : 0;

    const waterGlasses = todayHabitLog?.waterGlasses || 0;
    const sleepHours = todayHabitLog?.sleepHours || 0;
    const dietScore = calculateDietScore({
        fruits: todayHabitLog?.fruits || 0,
        vegetables: todayHabitLog?.vegetables || 0,
        junkFood: todayHabitLog?.junkFood || 0
    });

    const skinScore = calculateSkinScore({ routineCompletion, waterGlasses, sleepHours, dietScore });
    const scoreInfo = getScoreLabel(skinScore);

    // Calculate streak
    const [streak, setStreak] = useState(0);
    useEffect(() => {
        if (!allHabitLogs) return;
        let count = 0;
        const d = new Date();
        d.setDate(d.getDate() - 1);
        while (true) {
            const dateStr = d.toISOString().split('T')[0];
            const log = allHabitLogs.find(l => l.date === dateStr);
            if (log && log.routineCompleted) {
                count++;
                d.setDate(d.getDate() - 1);
            } else break;
        }
        if (routineCompletion >= 0.5) count++;
        setStreak(count);
    }, [allHabitLogs, routineCompletion]);

    // Check for mistakes
    useEffect(() => {
        if (routineSteps) {
            setWarnings(detectMistakes(routineSteps));
        }
    }, [routineSteps]);

    const toggleStep = async (step) => {
        const existing = todayCompletions?.find(c => c.stepId === step.id);
        if (existing) {
            await db.routineCompletions.delete(existing.id);
        } else {
            await db.routineCompletions.add({
                date: today,
                routineType: step.routineType,
                stepId: step.id
            });
        }
    };

    // Save today's score
    useEffect(() => {
        const saveScore = async () => {
            const existing = await db.skinScores.where('date').equals(today).first();
            if (existing) {
                await db.skinScores.update(existing.id, { score: skinScore });
            } else {
                await db.skinScores.add({ date: today, score: skinScore });
            }
        };
        if (routineSteps) saveScore();
    }, [skinScore, today, routineSteps]);

    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* Header */}
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p className="text-secondary text-sm" style={{ marginBottom: 4 }}>Good {getGreeting()} 🌿</p>
                        <h1>SkinFlow</h1>
                    </div>
                    {streak > 0 && (
                        <div className="streak-badge">
                            🔥 {streak} day{streak > 1 ? 's' : ''}
                        </div>
                    )}
                </div>

                {/* Warnings */}
                {warnings.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                        {warnings.slice(0, 2).map(w => (
                            <div key={w.id} className={`warning-banner ${w.severity}`}>
                                <span className="warning-icon">{w.icon}</span>
                                <div className="warning-content">
                                    <h4>{w.title}</h4>
                                    <p>{w.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Score & Progress */}
                <div className="grid-2" style={{ marginBottom: 16 }}>
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <ProgressRing progress={skinScore} size={90} strokeWidth={7} color={scoreInfo.color}>
                            <span className="progress-value" style={{ fontSize: 22 }}>{skinScore}</span>
                            <span className="progress-label" style={{ marginTop: 30 }}>Skin Score</span>
                        </ProgressRing>
                        <p style={{ fontSize: 12, color: scoreInfo.color, fontWeight: 600, marginTop: 8 }}>
                            {scoreInfo.emoji} {scoreInfo.label}
                        </p>
                    </div>
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <ProgressRing progress={Math.min(waterGlasses / 8 * 100, 100)} size={90} strokeWidth={7} color="var(--info)">
                            <span className="progress-value" style={{ fontSize: 22 }}>{waterGlasses}</span>
                            <span className="progress-label" style={{ marginTop: 30 }}>Glasses</span>
                        </ProgressRing>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>💧 Water Goal: 8</p>
                    </div>
                </div>

                {/* Routine Progress */}
                <div className="card" style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h4>Today's Routine</h4>
                        <span className="text-sm text-secondary">{totalCompleted}/{totalSteps} done</span>
                    </div>
                    <div style={{ height: 6, background: '#F0F2F5', borderRadius: 3, overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${routineCompletion * 100}%` }}
                            transition={{ duration: 0.5 }}
                            style={{ height: '100%', background: 'var(--green-primary)', borderRadius: 3 }}
                        />
                    </div>
                </div>

                {/* Morning Routine */}
                <div className="section">
                    <h4 style={{ marginBottom: 12 }}>☀️ Morning Routine</h4>
                    <div className="card">
                        {morningSteps.length === 0 ? (
                            <p className="text-sm text-secondary">No morning routine set up yet.</p>
                        ) : (
                            morningSteps.map(step => (
                                <div key={step.id} className={`checklist-item ${completedIds.has(step.id) ? 'completed' : ''}`} onClick={() => toggleStep(step)}>
                                    <div className={`checkbox ${completedIds.has(step.id) ? 'checked' : ''}`} />
                                    <div>
                                        <span className="checklist-text" style={{ fontWeight: 500 }}>{step.name}</span>
                                        {step.frequency && step.frequency !== 'Daily' && (
                                            <span className="text-xs text-secondary" style={{ marginLeft: 8 }}>({step.frequency})</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Night Routine */}
                <div className="section">
                    <h4 style={{ marginBottom: 12 }}>🌙 Night Routine</h4>
                    <div className="card">
                        {nightSteps.length === 0 ? (
                            <p className="text-sm text-secondary">No night routine set up yet.</p>
                        ) : (
                            nightSteps.map(step => (
                                <div key={step.id} className={`checklist-item ${completedIds.has(step.id) ? 'completed' : ''}`} onClick={() => toggleStep(step)}>
                                    <div className={`checkbox ${completedIds.has(step.id) ? 'checked' : ''}`} />
                                    <div>
                                        <span className="checklist-text" style={{ fontWeight: 500 }}>{step.name}</span>
                                        {step.frequency && step.frequency !== 'Daily' && (
                                            <span className="text-xs text-secondary" style={{ marginLeft: 8 }}>({step.frequency})</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Daily Tips */}
                <div className="grid-2">
                    <div className="card card-green">
                        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-dark)', marginBottom: 6 }}>💡 Skincare Tip</p>
                        <p className="text-sm text-secondary">{getDailyTip(dayIndex)}</p>
                    </div>
                    <div className="card card-peach">
                        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--peach-dark)', marginBottom: 6 }}>🥗 Diet Tip</p>
                        <p className="text-sm text-secondary">{getDailyDietTip(dayIndex)}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
}
