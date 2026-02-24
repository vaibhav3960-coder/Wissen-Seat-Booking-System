import React from 'react';
import { useSeatStore } from '../store/SeatContext';
import { Users, Armchair, ShieldBan } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { TOTAL_SEATS, ALLOCATED_BATCHES_PER_DAY, SEATS_PER_BATCH } from '../data/mockData';

const DashboardOverview = () => {
    const { simulatedDateTime, getAvailableFloaters, isHoliday } = useSeatStore();

    const todayStr = format(simulatedDateTime, 'EEEE, MMMM d, yyyy');
    const availableFloaters = getAvailableFloaters(simulatedDateTime);
    const holidayToday = isHoliday(simulatedDateTime);

    const allocatedSeatsToday = holidayToday ? 0 : ALLOCATED_BATCHES_PER_DAY * SEATS_PER_BATCH;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>

            <StatCard
                title="Total Capacity"
                value={TOTAL_SEATS}
                icon={<Armchair size={24} color="var(--accent-primary)" />}
                subtitle="Seats available in office"
                color="var(--accent-primary)"
                glow="var(--accent-glow)"
            />

            <StatCard
                title="Today's Allocated Users"
                value={allocatedSeatsToday}
                icon={<Users size={24} color={holidayToday ? "var(--text-muted)" : "var(--success)"} />}
                subtitle={holidayToday ? "Holiday - Office Closed" : `${ALLOCATED_BATCHES_PER_DAY} batches expected today`}
                color={holidayToday ? "var(--text-muted)" : "var(--success)"}
                glow={holidayToday ? "transparent" : "var(--success-bg)"}
            />

            <StatCard
                title="Available Floater Seats"
                value={holidayToday ? 0 : availableFloaters}
                icon={<ShieldBan size={24} color={holidayToday ? "var(--text-muted)" : "var(--warning)"} />}
                subtitle={holidayToday ? "Holiday - Office Closed" : "Open for booking today"}
                color={holidayToday ? "var(--text-muted)" : "var(--warning)"}
                glow={holidayToday ? "transparent" : "rgba(245, 158, 11, 0.2)"}
            />

        </div>
    );
};

const StatCard = ({ title, value, icon, subtitle, color, glow }) => (
    <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>
        <div style={{
            background: glow,
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: `0 0 20px ${glow}`
        }}>
            {icon}
        </div>
    </div>
);

export default DashboardOverview;
