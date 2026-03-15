import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import ProgressRing from '../components/ProgressRing';
import { achievementDefinitions } from '../data/achievements';
import { generateInsights } from '../logic/insightGenerator';
import { IoCamera, IoChevronBack, IoSettingsOutline } from 'react-icons/io5';

export default function Profile() {
    const [view, setView] = useState('main');
    const [showPhotoCapture, setShowPhotoCapture] = useState(false);
    const [photoNote, setPhotoNote] = useState('');
    const fileInputRef = useRef(null);

    const profile = useLiveQuery(() => db.profile.toCollection().first());
    const achievements = useLiveQuery(() => db.achievements.toArray());
    const progressPhotos = useLiveQuery(() => db.progressPhotos.orderBy('date').reverse().toArray());
    const habitLogs = useLiveQuery(() => db.habitLogs.toArray());
    const skinScores = useLiveQuery(() => db.skinScores.toArray());
    const allCompletions = useLiveQuery(() => db.routineCompletions.toArray());

    const unlockedIds = (achievements || []).map(a => a.achievementId);

    // Calculate stats for achievements
    const stats = {
        totalRoutinesCompleted: allCompletions?.length || 0,
        currentStreak: calculateStreak(habitLogs),
        waterGoalStreak: calculateGoalStreak(habitLogs, 'waterGlasses', 8),
        goodSleepStreak: calculateGoalStreak(habitLogs, 'sleepHours', 7),
        articlesRead: 0,
        ingredientsChecked: 0,
        photosTaken: progressPhotos?.length || 0,
        highestScore: skinScores ? Math.max(0, ...skinScores.map(s => s.score)) : 0,
        healthyDietStreak: 0,
        sunscreenStreak: 0
    };

    const insights = generateInsights(habitLogs || [], skinScores || []);

    const handlePhotoCapture = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const photoData = event.target.result;
            await db.progressPhotos.add({
                date: new Date().toISOString().split('T')[0],
                photo: photoData,
                note: photoNote,
                timestamp: new Date().toISOString()
            });
            setPhotoNote('');
            setShowPhotoCapture(false);
        };
        reader.readAsDataURL(file);
    };

    const handleResetProfile = async () => {
        if (window.confirm('Are you sure? This will delete all your data.')) {
            await db.delete();
            window.location.reload();
        }
    };

    if (view === 'photos') {
        return <PhotoTimeline photos={progressPhotos || []} onBack={() => setView('main')} />;
    }

    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="page-header">
                    <h1>Profile</h1>
                </div>

                {/* User Card */}
                {profile && (
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                        <div className="avatar">{profile.gender === 'Male' ? '👨' : '👩'}</div>
                        <div>
                            <h3>{profile.skinType} Skin</h3>
                            <p className="text-sm text-secondary">{profile.concerns?.join(', ')}</p>
                            <p className="text-xs text-light">Age: {profile.ageRange} · {profile.dietType}</p>
                        </div>
                    </div>
                )}

                {/* Stats Row */}
                <div className="grid-3" style={{ marginBottom: 16 }}>
                    <div className="card" style={{ textAlign: 'center', padding: 12 }}>
                        <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--green-primary)' }}>{stats.currentStreak}</p>
                        <p className="text-xs text-secondary">Day Streak</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: 12 }}>
                        <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--info)' }}>{stats.photosTaken}</p>
                        <p className="text-xs text-secondary">Photos</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: 12 }}>
                        <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--peach-dark)' }}>{stats.highestScore}</p>
                        <p className="text-xs text-secondary">Best Score</p>
                    </div>
                </div>

                {/* Achievements */}
                <div className="section">
                    <h4 style={{ marginBottom: 12 }}>🏆 Achievements</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                        {achievementDefinitions.slice(0, 9).map(ach => {
                            const isUnlocked = unlockedIds.includes(ach.id) || ach.condition(stats);
                            return (
                                <div key={ach.id} className={`badge-card ${!isUnlocked ? 'locked' : ''}`}>
                                    <span className="badge-icon">{ach.icon}</span>
                                    <span className="badge-name">{ach.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Photos */}
                <div className="section">
                    <div className="section-header">
                        <h4>📸 Progress Photos</h4>
                        <button className="btn btn-small btn-secondary" onClick={() => setView('photos')}>
                            View All
                        </button>
                    </div>

                    {progressPhotos && progressPhotos.length > 0 ? (
                        <div className="photo-grid">
                            {progressPhotos.slice(0, 6).map(photo => (
                                <div key={photo.id} className="photo-thumb">
                                    <img src={photo.photo} alt={`Progress ${photo.date}`} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card" style={{ textAlign: 'center' }}>
                            <p className="text-secondary text-sm">No progress photos yet</p>
                        </div>
                    )}

                    <button
                        className="btn btn-outline"
                        style={{ marginTop: 12 }}
                        onClick={() => setShowPhotoCapture(true)}
                    >
                        <IoCamera /> Take Progress Photo
                    </button>
                </div>

                {/* Insights */}
                <div className="section">
                    <h4 style={{ marginBottom: 12 }}>📊 Habit Insights</h4>
                    {insights.map((insight, i) => (
                        <div key={i} className={`insight-card ${insight.type}`}>
                            <span className="insight-icon">{insight.icon}</span>
                            <span className="insight-text">{insight.text}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="section">
                    <button className="btn btn-secondary" onClick={handleResetProfile} style={{ marginBottom: 8 }}>
                        <IoSettingsOutline /> Reset Profile & Data
                    </button>
                </div>
            </motion.div>

            {/* Photo Capture Modal */}
            <AnimatePresence>
                {showPhotoCapture && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowPhotoCapture(false)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ y: 300 }}
                            animate={{ y: 0 }}
                            exit={{ y: 300 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>📸 Progress Photo</h3>
                                <button className="modal-close" onClick={() => setShowPhotoCapture(false)}>✕</button>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label className="text-sm" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Notes (optional)</label>
                                <textarea
                                    placeholder="How does your skin look today?"
                                    value={photoNote}
                                    onChange={e => setPhotoNote(e.target.value)}
                                    rows={3}
                                    style={{ resize: 'none' }}
                                />
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                capture="user"
                                onChange={handlePhotoCapture}
                                style={{ display: 'none' }}
                            />

                            <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
                                <IoCamera /> Capture Photo
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function PhotoTimeline({ photos, onBack }) {
    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: 'var(--green-primary)', fontWeight: 600, marginBottom: 16, fontFamily: 'inherit', fontSize: 15 }}>
                    <IoChevronBack size={20} /> Back
                </button>
                <h2 style={{ marginBottom: 20 }}>Progress Timeline</h2>

                {photos.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📸</div>
                        <p>No photos yet. Start capturing your progress!</p>
                    </div>
                ) : (
                    photos.map(photo => (
                        <div key={photo.id} className="card" style={{ marginBottom: 16 }}>
                            <img
                                src={photo.photo}
                                alt={`Progress ${photo.date}`}
                                style={{ width: '100%', borderRadius: 12, marginBottom: 12 }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="text-sm" style={{ fontWeight: 600 }}>{formatDate(photo.date)}</p>
                            </div>
                            {photo.note && (
                                <p className="text-sm text-secondary" style={{ marginTop: 6 }}>{photo.note}</p>
                            )}
                        </div>
                    ))
                )}
            </motion.div>
        </div>
    );
}

function calculateStreak(logs) {
    if (!logs || logs.length === 0) return 0;
    const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    const d = new Date();
    d.setDate(d.getDate() - 1);
    for (let i = 0; i < 365; i++) {
        const dateStr = d.toISOString().split('T')[0];
        const log = sorted.find(l => l.date === dateStr);
        if (log) {
            streak++;
            d.setDate(d.getDate() - 1);
        } else break;
    }
    return streak;
}

function calculateGoalStreak(logs, field, goal) {
    if (!logs || logs.length === 0) return 0;
    const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    const d = new Date();
    d.setDate(d.getDate() - 1);
    for (let i = 0; i < 365; i++) {
        const dateStr = d.toISOString().split('T')[0];
        const log = sorted.find(l => l.date === dateStr);
        if (log && (log[field] || 0) >= goal) {
            streak++;
            d.setDate(d.getDate() - 1);
        } else break;
    }
    return streak;
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
