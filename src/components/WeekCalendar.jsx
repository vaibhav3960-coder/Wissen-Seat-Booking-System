import React, { useState } from 'react';
import { useSeatStore } from '../store/SeatContext';
import { getWeekDays, formatDateStr } from '../utils/dateHelpers';
import { addDays, format } from 'date-fns';
import DayCard from './DayCard';

const WeekCalendar = () => {
    const { week1Start } = useSeatStore();
    const [isWeek2, setIsWeek2] = useState(false);

    // Get the start date for the selected week
    const currentWeekStart = isWeek2 ? addDays(week1Start, 7) : week1Start;
    const days = getWeekDays(currentWeekStart);

    return (
        <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ marginBottom: 0 }}>Schedule & Actions</h2>
                <div style={{ display: 'flex', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)', padding: '0.25rem', border: '1px solid var(--border-glass)' }}>
                    <button
                        className={`toggle-btn ${!isWeek2 ? 'active' : ''}`}
                        onClick={() => setIsWeek2(false)}
                    >
                        Week 1
                    </button>
                    <button
                        className={`toggle-btn ${isWeek2 ? 'active' : ''}`}
                        onClick={() => setIsWeek2(true)}
                    >
                        Week 2
                    </button>
                </div>
            </div>

            <div className="calendar-grid">
                {days.map(day => (
                    <DayCard key={formatDateStr(day)} date={day} />
                ))}
            </div>

            <style>{`
                .toggle-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    padding: 0.5rem 1.5rem;
                    border-radius: var(--radius-md);
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: inherit;
                }
                .toggle-btn.active {
                    background: var(--accent-primary);
                    color: white;
                    box-shadow: 0 4px 12px var(--accent-glow);
                }
                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                }
            `}</style>
        </div>
    );
};

export default WeekCalendar;
