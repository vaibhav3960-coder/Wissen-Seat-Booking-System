import React, { useState } from 'react';
import { useSeatStore } from '../store/SeatContext';
import { formatDateStr } from '../utils/dateHelpers';
import {
    addMonths, subMonths, format, startOfMonth, endOfMonth,
    eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth,
    isToday
} from 'date-fns';
import DayCard from './DayCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FullCalendar = () => {
    // Start with the month corresponding to our simulatedDateTime
    const { simulatedDateTime } = useSeatStore();
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(simulatedDateTime));

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    // Calculate grid for the current month
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    const weekDaysHeader = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ marginBottom: 0 }}>Schedule & Actions</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="icon-btn" onClick={prevMonth}>
                        <ChevronLeft size={24} />
                    </button>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, minWidth: '150px', textAlign: 'center' }}>
                        {format(currentMonth, 'MMMM yyyy')}
                    </div>
                    <button className="icon-btn" onClick={nextMonth}>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div className="calendar-grid">
                    {/* Header Row */}
                    {weekDaysHeader.map(day => (
                        <div key={day} className="calendar-header-cell">
                            {day}
                        </div>
                    ))}

                    {/* Day Cells */}
                    {calendarDays.map(day => {
                        const isCurrentMonth = isSameMonth(day, currentMonth);
                        const isWeekendDay = day.getDay() === 0 || day.getDay() === 6;
                        const isSimulatedToday = isToday(day) || formatDateStr(day) === formatDateStr(simulatedDateTime);

                        return (
                            <div
                                key={formatDateStr(day)}
                                className={`calendar-cell ${!isCurrentMonth ? 'different-month' : ''} ${isSimulatedToday ? 'simulated-today' : ''}`}
                            >
                                <div className="cell-date">{format(day, 'd')}</div>
                                {isCurrentMonth && !isWeekendDay ? (
                                    <div className="cell-content">
                                        <DayCard date={day} compact={true} />
                                    </div>
                                ) : (
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3, fontSize: '0.8rem' }}>
                                        {isWeekendDay ? 'Weekend' : ''}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .icon-btn {
                    background: var(--bg-glass);
                    border: 1px solid var(--border-glass);
                    color: white;
                    border-radius: var(--radius-sm);
                    padding: 0.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .icon-btn:hover {
                    background: var(--bg-glass-hover);
                }
                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    border-collapse: collapse;
                }
                .calendar-header-cell {
                    padding: 1rem;
                    text-align: center;
                    font-weight: 600;
                    color: var(--text-secondary);
                    border-bottom: 1px solid var(--border-glass);
                    background: rgba(0,0,0,0.2);
                }
                .calendar-cell {
                    min-height: 160px;
                    border-right: 1px solid var(--border-glass);
                    border-bottom: 1px solid var(--border-glass);
                    padding: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    transition: background 0.2s;
                }
                .calendar-cell:nth-child(7n) {
                    border-right: none;
                }
                .calendar-cell:hover {
                    background: rgba(255,255,255,0.02);
                }
                .different-month {
                    opacity: 0.3;
                    background: rgba(0,0,0,0.1);
                }
                .simulated-today {
                    background: rgba(59, 130, 246, 0.05);
                    box-shadow: inset 0 0 0 2px var(--accent-primary);
                }
                .cell-date {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: var(--text-secondary);
                }
                .simulated-today .cell-date {
                    color: var(--accent-primary);
                }
                .cell-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </div>
    );
};

export default FullCalendar;
