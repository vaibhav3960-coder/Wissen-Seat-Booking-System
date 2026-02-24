import React from 'react';
import { useSeatStore } from '../store/SeatContext';
import { format } from 'date-fns';
import { Clock, UserCog } from 'lucide-react';
import { USERS } from '../data/mockData';

const SimulatorControl = () => {
    const { simulatedDateTime, setSimulatedDayAndHour, currentUser, setCurrentUser } = useSeatStore();

    const handleDateChange = (e) => {
        const dateStr = e.target.value; // YYYY-MM-DD
        const [year, month, day] = dateStr.split('-');

        const newDate = new Date(simulatedDateTime);
        newDate.setFullYear(year, month - 1, day);
        setSimulatedDayAndHour(newDate, simulatedDateTime.getHours());
    };

    const handleTimeChange = (e) => {
        const hour = parseInt(e.target.value, 10);
        setSimulatedDayAndHour(simulatedDateTime, hour);
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        const user = USERS.find(u => u.id === userId);
        if (user) setCurrentUser(user);
    };

    return (
        <div className="glass-card" style={{ padding: '1.25rem', marginTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
                <Clock size={16} /> Simulator Control
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={labelStyle}>Current Simulated Time</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="date"
                            value={format(simulatedDateTime, 'yyyy-MM-dd')}
                            onChange={handleDateChange}
                            style={inputStyle}
                        />
                        <select
                            value={simulatedDateTime.getHours()}
                            onChange={handleTimeChange}
                            style={inputStyle}
                        >
                            {Array.from({ length: 24 }).map((_, i) => (
                                <option key={i} value={i}>{i.toString().padStart(2, '0')}:00</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Switch User for Testing</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserCog size={16} color="var(--text-secondary)" />
                        <select
                            value={currentUser.id}
                            onChange={handleUserChange}
                            style={{ ...inputStyle, flex: 1 }}
                        >
                            {USERS.map(u => (
                                <option key={u.id} value={u.id}>
                                    {u.name} (Grp {u.group})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <p style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
                *Use this panel to test the 'previous day after 3 PM' rule and test different user groups easily.
            </p>
        </div>
    );
};

const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem'
};

const inputStyle = {
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid var(--border-color)',
    color: 'white',
    padding: '0.5rem',
    borderRadius: 'var(--radius-sm)',
    outline: 'none',
    fontFamily: 'inherit'
};

export default SimulatorControl;
