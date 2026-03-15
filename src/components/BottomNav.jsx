import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoHome, IoWaterOutline, IoWater, IoBookOutline, IoBook, IoPersonOutline, IoPerson } from 'react-icons/io5';
import { HiOutlineSparkles, HiSparkles } from 'react-icons/hi2';

const tabs = [
    { path: '/', label: 'Home', icon: IoHomeOutline, activeIcon: IoHome },
    { path: '/routine', label: 'Routine', icon: HiOutlineSparkles, activeIcon: HiSparkles },
    { path: '/tracker', label: 'Tracker', icon: IoWaterOutline, activeIcon: IoWater },
    { path: '/learn', label: 'Learn', icon: IoBookOutline, activeIcon: IoBook },
    { path: '/profile', label: 'Profile', icon: IoPersonOutline, activeIcon: IoPerson },
];

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            {tabs.map(tab => (
                <NavLink
                    key={tab.path}
                    to={tab.path}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    end={tab.path === '/'}
                >
                    {({ isActive }) => {
                        const Icon = isActive ? tab.activeIcon : tab.icon;
                        return (
                            <>
                                <Icon className="nav-icon" />
                                <span>{tab.label}</span>
                            </>
                        );
                    }}
                </NavLink>
            ))}
        </nav>
    );
}
