import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import db from '../db/database';
import { generateRoutine } from '../logic/routineGenerator';

const steps = [
    'welcome', 'age-gender', 'skin-type', 'concerns', 'lifestyle', 'diet', 'summary'
];

const ageRanges = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+'];
const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];
const skinConcerns = ['Acne', 'Pimples', 'Dark spots', 'Pigmentation', 'Dull skin', 'Dryness', 'Oiliness', 'Large pores', 'Uneven tone'];
const stressLevels = ['Low', 'Medium', 'High'];
const dietTypes = ['Vegetarian', 'Vegan', 'Non-vegetarian'];

const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
};

export default function Onboarding({ onComplete }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [profile, setProfile] = useState({
        ageRange: '',
        gender: '',
        skinType: '',
        concerns: [],
        sleepHours: 7,
        waterIntake: 6,
        stressLevel: 'Medium',
        dietType: 'Vegetarian'
    });

    const currentStep = steps[stepIndex];

    const next = () => {
        if (stepIndex < steps.length - 1) {
            setDirection(1);
            setStepIndex(stepIndex + 1);
        }
    };

    const prev = () => {
        if (stepIndex > 0) {
            setDirection(-1);
            setStepIndex(stepIndex - 1);
        }
    };

    const toggleConcern = (concern) => {
        setProfile(p => ({
            ...p,
            concerns: p.concerns.includes(concern)
                ? p.concerns.filter(c => c !== concern)
                : [...p.concerns, concern]
        }));
    };

    const handleComplete = async () => {
        // Save profile
        await db.profile.clear();
        await db.profile.add({
            ...profile,
            createdAt: new Date().toISOString()
        });

        // Generate and save routine
        const routine = generateRoutine(profile.skinType, profile.concerns);
        await db.routineSteps.clear();

        for (const step of routine.morning) {
            await db.routineSteps.add({
                ...step,
                routineType: 'morning',
                isCustom: false
            });
        }
        for (const step of routine.night) {
            await db.routineSteps.add({
                ...step,
                routineType: 'night',
                isCustom: false
            });
        }

        onComplete();
    };

    const canProceed = () => {
        switch (currentStep) {
            case 'age-gender': return profile.ageRange !== '';
            case 'skin-type': return profile.skinType !== '';
            case 'concerns': return profile.concerns.length > 0;
            default: return true;
        }
    };

    return (
        <div className="onboarding">
            {/* Step Indicators */}
            {stepIndex > 0 && (
                <div className="step-indicator">
                    {steps.slice(1).map((_, i) => (
                        <div
                            key={i}
                            className={`step-dot ${i + 1 === stepIndex ? 'active' : ''} ${i + 1 < stepIndex ? 'completed' : ''}`}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="onboarding-content"
                >
                    {/* Welcome */}
                    {currentStep === 'welcome' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 64, marginBottom: 24 }}>🌸</div>
                            <h1 style={{ marginBottom: 12 }}>Welcome to SkinFlow</h1>
                            <p className="text-secondary" style={{ fontSize: 16, lineHeight: 1.6 }}>
                                Your personal skincare companion. Let's start by understanding your skin to create the perfect routine for you.
                            </p>
                        </div>
                    )}

                    {/* Age & Gender */}
                    {currentStep === 'age-gender' && (
                        <div>
                            <h2 style={{ marginBottom: 8 }}>About You</h2>
                            <p className="text-secondary" style={{ marginBottom: 24 }}>Help us personalize your experience</p>

                            <h4 style={{ marginBottom: 12 }}>Age Range</h4>
                            <div className="chip-group" style={{ marginBottom: 24 }}>
                                {ageRanges.map(age => (
                                    <div
                                        key={age}
                                        className={`chip ${profile.ageRange === age ? 'active' : ''}`}
                                        onClick={() => setProfile(p => ({ ...p, ageRange: age }))}
                                    >
                                        {age}
                                    </div>
                                ))}
                            </div>

                            <h4 style={{ marginBottom: 12 }}>Gender (Optional)</h4>
                            <div className="chip-group">
                                {['Female', 'Male', 'Non-binary', 'Prefer not to say'].map(g => (
                                    <div
                                        key={g}
                                        className={`chip ${profile.gender === g ? 'active' : ''}`}
                                        onClick={() => setProfile(p => ({ ...p, gender: g }))}
                                    >
                                        {g}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skin Type */}
                    {currentStep === 'skin-type' && (
                        <div>
                            <h2 style={{ marginBottom: 8 }}>Your Skin Type</h2>
                            <p className="text-secondary" style={{ marginBottom: 24 }}>Select the type that best describes your skin</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {skinTypes.map(type => (
                                    <div
                                        key={type}
                                        className={`card ${profile.skinType === type ? 'card-green' : ''}`}
                                        onClick={() => setProfile(p => ({ ...p, skinType: type }))}
                                        style={{
                                            cursor: 'pointer',
                                            border: profile.skinType === type ? '2px solid var(--green-primary)' : '2px solid transparent',
                                            marginBottom: 0,
                                            padding: '16px 20px'
                                        }}
                                    >
                                        <h4>{type}</h4>
                                        <p className="text-sm text-secondary">
                                            {type === 'Oily' && 'Shiny T-zone, enlarged pores, prone to breakouts'}
                                            {type === 'Dry' && 'Tight feeling, flaky patches, dull complexion'}
                                            {type === 'Combination' && 'Oily T-zone but dry cheeks'}
                                            {type === 'Sensitive' && 'Easily irritated, redness, reacts to products'}
                                            {type === 'Normal' && 'Balanced, few breakouts, comfortable skin'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Concerns */}
                    {currentStep === 'concerns' && (
                        <div>
                            <h2 style={{ marginBottom: 8 }}>Skin Concerns</h2>
                            <p className="text-secondary" style={{ marginBottom: 24 }}>Select all that apply to you</p>

                            <div className="chip-group">
                                {skinConcerns.map(concern => (
                                    <div
                                        key={concern}
                                        className={`chip ${profile.concerns.includes(concern) ? 'active' : ''}`}
                                        onClick={() => toggleConcern(concern)}
                                    >
                                        {concern}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lifestyle */}
                    {currentStep === 'lifestyle' && (
                        <div>
                            <h2 style={{ marginBottom: 8 }}>Your Lifestyle</h2>
                            <p className="text-secondary" style={{ marginBottom: 24 }}>These factors affect your skin health</p>

                            <div style={{ marginBottom: 24 }}>
                                <h4 style={{ marginBottom: 8 }}>Average Sleep (hours)</h4>
                                <div className="slider-container">
                                    <input
                                        type="range"
                                        min={3}
                                        max={12}
                                        value={profile.sleepHours}
                                        onChange={(e) => setProfile(p => ({ ...p, sleepHours: Number(e.target.value) }))}
                                    />
                                    <div style={{ textAlign: 'center', marginTop: 8, fontWeight: 600, fontSize: 18 }}>
                                        {profile.sleepHours} hours
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <h4 style={{ marginBottom: 8 }}>Daily Water Intake (glasses)</h4>
                                <div className="slider-container">
                                    <input
                                        type="range"
                                        min={1}
                                        max={15}
                                        value={profile.waterIntake}
                                        onChange={(e) => setProfile(p => ({ ...p, waterIntake: Number(e.target.value) }))}
                                    />
                                    <div style={{ textAlign: 'center', marginTop: 8, fontWeight: 600, fontSize: 18 }}>
                                        {profile.waterIntake} glasses
                                    </div>
                                </div>
                            </div>

                            <h4 style={{ marginBottom: 12 }}>Stress Level</h4>
                            <div className="chip-group">
                                {stressLevels.map(level => (
                                    <div
                                        key={level}
                                        className={`chip ${profile.stressLevel === level ? 'active' : ''}`}
                                        onClick={() => setProfile(p => ({ ...p, stressLevel: level }))}
                                    >
                                        {level === 'Low' && '😌'} {level === 'Medium' && '😐'} {level === 'High' && '😰'} {level}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Diet */}
                    {currentStep === 'diet' && (
                        <div>
                            <h2 style={{ marginBottom: 8 }}>Diet Preference</h2>
                            <p className="text-secondary" style={{ marginBottom: 24 }}>This helps us suggest skin-friendly foods</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {dietTypes.map(diet => (
                                    <div
                                        key={diet}
                                        className={`card ${profile.dietType === diet ? 'card-green' : ''}`}
                                        onClick={() => setProfile(p => ({ ...p, dietType: diet }))}
                                        style={{
                                            cursor: 'pointer',
                                            border: profile.dietType === diet ? '2px solid var(--green-primary)' : '2px solid transparent',
                                            marginBottom: 0,
                                            padding: '16px 20px'
                                        }}
                                    >
                                        <h4>
                                            {diet === 'Vegetarian' && '🥬'} {diet === 'Vegan' && '🌱'} {diet === 'Non-vegetarian' && '🍗'} {diet}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Summary */}
                    {currentStep === 'summary' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 64, marginBottom: 24 }}>✨</div>
                            <h1 style={{ marginBottom: 12 }}>You're All Set!</h1>
                            <p className="text-secondary" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                                Based on your {profile.skinType.toLowerCase()} skin type and concerns, we've created a personalized skincare routine just for you.
                            </p>
                            <div className="card card-green" style={{ textAlign: 'left' }}>
                                <p><strong>Skin Type:</strong> {profile.skinType}</p>
                                <p><strong>Concerns:</strong> {profile.concerns.join(', ')}</p>
                                <p><strong>Sleep:</strong> {profile.sleepHours}h</p>
                                <p><strong>Diet:</strong> {profile.dietType}</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <div className="onboarding-footer">
                <div style={{ display: 'flex', gap: 12 }}>
                    {stepIndex > 0 && (
                        <button className="btn btn-secondary" onClick={prev} style={{ flex: 0.4 }}>
                            Back
                        </button>
                    )}
                    {currentStep === 'summary' ? (
                        <button className="btn btn-primary" onClick={handleComplete} style={{ flex: 1 }}>
                            🌿 Start Your Journey
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={next}
                            disabled={!canProceed()}
                            style={{ flex: 1, opacity: canProceed() ? 1 : 0.5 }}
                        >
                            {currentStep === 'welcome' ? "Let's Begin" : 'Continue'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
