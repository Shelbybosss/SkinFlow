import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/database';
import { IoAdd, IoTrash, IoReorderThree } from 'react-icons/io5';

function getToday() {
    return new Date().toISOString().split('T')[0];
}

export default function Routine() {
    const [activeTab, setActiveTab] = useState('suggested');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editRoutineType, setEditRoutineType] = useState('morning');
    const [newStep, setNewStep] = useState({ name: '', description: '', frequency: 'Daily' });

    const routineSteps = useLiveQuery(() => db.routineSteps.toArray());
    const today = getToday();
    const todayCompletions = useLiveQuery(() => db.routineCompletions.where('date').equals(today).toArray(), [today]);

    const morningSteps = (routineSteps || [])
        .filter(s => s.routineType === 'morning')
        .sort((a, b) => (a.stepOrder || 0) - (b.stepOrder || 0));
    const nightSteps = (routineSteps || [])
        .filter(s => s.routineType === 'night')
        .sort((a, b) => (a.stepOrder || 0) - (b.stepOrder || 0));

    const completedIds = new Set((todayCompletions || []).map(c => c.stepId));

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

    const addCustomStep = async () => {
        if (!newStep.name.trim()) return;
        const stepsOfType = routineSteps?.filter(s => s.routineType === editRoutineType) || [];
        await db.routineSteps.add({
            name: newStep.name.trim(),
            description: newStep.description.trim(),
            category: 'custom',
            routineType: editRoutineType,
            stepOrder: stepsOfType.length,
            isCustom: true,
            frequency: newStep.frequency
        });
        setNewStep({ name: '', description: '', frequency: 'Daily' });
        setShowAddModal(false);
    };

    const deleteStep = async (stepId) => {
        await db.routineSteps.delete(stepId);
        await db.routineCompletions.where('stepId').equals(stepId).delete();
    };

    const renderRoutineSection = (title, icon, steps) => (
        <div className="section">
            <div className="section-header">
                <h4>{icon} {title}</h4>
                <span className="text-sm text-secondary">
                    {steps.filter(s => completedIds.has(s.id)).length}/{steps.length}
                </span>
            </div>
            <div className="card">
                {steps.length === 0 ? (
                    <div className="empty-state" style={{ padding: 24 }}>
                        <p className="text-secondary">No steps yet. Add your first step!</p>
                    </div>
                ) : (
                    steps.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`checklist-item ${completedIds.has(step.id) ? 'completed' : ''}`}
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }} onClick={() => toggleStep(step)}>
                                <div className={`checkbox ${completedIds.has(step.id) ? 'checked' : ''}`} />
                                <div>
                                    <span className="checklist-text" style={{ fontWeight: 500 }}>{step.name}</span>
                                    {step.description && (
                                        <p className="text-xs text-secondary" style={{ marginTop: 2 }}>{step.description}</p>
                                    )}
                                    {step.frequency && step.frequency !== 'Daily' && (
                                        <span className="text-xs" style={{ color: 'var(--green-primary)', fontWeight: 500 }}>{step.frequency}</span>
                                    )}
                                </div>
                            </div>
                            {activeTab === 'custom' && step.isCustom && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteStep(step.id); }}
                                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: 4 }}
                                >
                                    <IoTrash size={16} />
                                </button>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="page">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="page-header">
                    <h1>Routine</h1>
                    <p>Your daily skincare steps</p>
                </div>

                {/* Tabs */}
                <div className="tab-bar">
                    <button className={`tab ${activeTab === 'suggested' ? 'active' : ''}`} onClick={() => setActiveTab('suggested')}>
                        Suggested
                    </button>
                    <button className={`tab ${activeTab === 'custom' ? 'active' : ''}`} onClick={() => setActiveTab('custom')}>
                        Custom
                    </button>
                </div>

                {activeTab === 'suggested' ? (
                    <>
                        {renderRoutineSection('Morning Routine', '☀️', morningSteps.filter(s => !s.isCustom))}
                        {renderRoutineSection('Night Routine', '🌙', nightSteps.filter(s => !s.isCustom))}
                    </>
                ) : (
                    <>
                        {renderRoutineSection('Morning Routine', '☀️', morningSteps)}
                        {renderRoutineSection('Night Routine', '🌙', nightSteps)}
                    </>
                )}
            </motion.div>

            {/* FAB to add step */}
            {activeTab === 'custom' && (
                <button className="fab" onClick={() => setShowAddModal(true)}>
                    <IoAdd size={28} />
                </button>
            )}

            {/* Add Step Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ y: 300 }}
                            animate={{ y: 0 }}
                            exit={{ y: 300 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>Add Custom Step</h3>
                                <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label className="text-sm" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Routine Type</label>
                                <div className="tab-bar" style={{ marginBottom: 0 }}>
                                    <button className={`tab ${editRoutineType === 'morning' ? 'active' : ''}`} onClick={() => setEditRoutineType('morning')}>
                                        ☀️ Morning
                                    </button>
                                    <button className={`tab ${editRoutineType === 'night' ? 'active' : ''}`} onClick={() => setEditRoutineType('night')}>
                                        🌙 Night
                                    </button>
                                </div>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label className="text-sm" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Step Name *</label>
                                <input
                                    placeholder="e.g., Vitamin C Serum"
                                    value={newStep.name}
                                    onChange={e => setNewStep(s => ({ ...s, name: e.target.value }))}
                                />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label className="text-sm" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Description (optional)</label>
                                <input
                                    placeholder="e.g., Apply after cleansing"
                                    value={newStep.description}
                                    onChange={e => setNewStep(s => ({ ...s, description: e.target.value }))}
                                />
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <label className="text-sm" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Frequency</label>
                                <div className="chip-group">
                                    {['Daily', '2x per week', '3x per week', 'Weekly'].map(freq => (
                                        <div
                                            key={freq}
                                            className={`chip ${newStep.frequency === freq ? 'active' : ''}`}
                                            onClick={() => setNewStep(s => ({ ...s, frequency: freq }))}
                                        >
                                            {freq}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="btn btn-primary" onClick={addCustomStep} disabled={!newStep.name.trim()}>
                                Add Step
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
