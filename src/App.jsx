import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import db from './db/database';
import BottomNav from './components/BottomNav';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Routine from './pages/Routine';
import Tracker from './pages/Tracker';
import Learn from './pages/Learn';
import Profile from './pages/Profile';

export default function App() {
  const [hasProfile, setHasProfile] = useState(null);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const count = await db.profile.count();
    setHasProfile(count > 0);
  };

  // Loading state
  if (hasProfile === null) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--off-white)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌸</div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading SkinFlow...</p>
        </div>
      </div>
    );
  }

  // Onboarding
  if (!hasProfile) {
    return <Onboarding onComplete={() => setHasProfile(true)} />;
  }

  // Main App
  return (
    <Router>
      <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}
