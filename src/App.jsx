import React, { useState } from 'react';
import { useSeatStore } from './store/SeatContext';
import { Calendar, Users, Briefcase, Settings, Clock, Home } from 'lucide-react';
import SimulatorControl from './components/SimulatorControl';
import DashboardOverview from './components/DashboardOverview';
import FullCalendar from './components/FullCalendar';

const Sidebar = () => {
    const { currentUser } = useSeatStore();

    return (
        <aside className="sidebar">
            <div className="mb-8 flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400">
                    <Briefcase size={28} />
                </div>
                <h2 style={{ marginBottom: 0 }}>SeatBook Pro</h2>
            </div>

            <div className="glass-card mb-8" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)' }}>
                <p className="text-sm" style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Logged in as</p>
                <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {currentUser.name.charAt(0)}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: 0 }}>{currentUser.name}</h3>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>Group {currentUser.group} | Batch {currentUser.batch}</p>
                    </div>
                </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#" className="nav-item active" style={navStyle(true)}><Home size={20} /> Dashboard</a>
                <a href="#" className="nav-item" style={navStyle(false)}><Calendar size={20} /> Schedule</a>
                <a href="#" className="nav-item" style={navStyle(false)}><Users size={20} /> Team</a>
                <a href="#" className="nav-item" style={navStyle(false)}><Settings size={20} /> Settings</a>
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <SimulatorControl />
            </div>
        </aside>
    );
};

const navStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    color: active ? 'white' : 'var(--text-secondary)',
    textDecoration: 'none',
    background: active ? 'var(--accent-glow)' : 'transparent',
    fontWeight: 500,
    transition: 'all 0.2s'
});

function App() {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1>Overview</h1>
                        <p>Manage your seat allocations and view availability.</p>
                    </div>
                </header>

                <DashboardOverview />

                <div style={{ marginTop: '3rem' }}>
                    <FullCalendar />
                </div>
            </main>
        </div>
    );
}

export default App;
