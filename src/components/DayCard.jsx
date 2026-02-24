import React, { useState } from 'react';
import { useSeatStore } from '../store/SeatContext';
import { format, isBefore, startOfDay, isSameDay } from 'date-fns';
import { CalendarX, CheckCircle, Coffee, Navigation } from 'lucide-react';
import BookingModal from './BookingModal';

const DayCard = ({ date, compact = false }) => {
    const { currentUser, simulatedDateTime, getUserDayStatus, getAvailableFloaters } = useSeatStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const status = getUserDayStatus(currentUser, date);
    const floaters = getAvailableFloaters(date);
    const isPast = isBefore(date, startOfDay(simulatedDateTime)) && !isSameDay(date, simulatedDateTime);

    const getStatusDetails = () => {
        switch (status) {
            case 'HOLIDAY':
                return { label: 'Office Closed', color: 'var(--text-muted)', icon: <CalendarX size={20} />, action: null };
            case 'ALLOCATED':
                return { label: 'Office Day', color: 'var(--accent-primary)', icon: <CheckCircle size={20} />, action: 'Release Seat', btnClass: 'btn-outline btn-danger' };
            case 'RELEASED':
                return { label: 'On Leave', color: 'var(--danger)', icon: <Coffee size={20} />, action: null };
            case 'BOOKED':
                return { label: 'Booked Extra', color: 'var(--success)', icon: <CheckCircle size={20} />, action: null };
            case 'NON_ALLOCATED':
                return { label: 'WFH Day', color: 'var(--text-secondary)', icon: <Navigation size={20} />, action: 'Book Seat', btnClass: 'btn-primary' };
            default:
                return { label: 'Unknown', color: 'gray', icon: null, action: null };
        }
    };

    const details = getStatusDetails();

    return (
        <>
            <div className="glass-card day-card" style={{
                opacity: isPast ? 0.6 : 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `4px solid ${details.color}`
            }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {format(date, 'EEEE')}
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                {format(date, 'MMM d')}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        margin: compact ? '0.5rem 0' : '1.5rem 0',
                        color: details.color,
                        fontWeight: 500,
                        fontSize: compact ? '0.85rem' : '1rem'
                    }}>
                        {React.cloneElement(details.icon, { size: compact ? 16 : 20 })}
                        <span>{details.label}</span>
                    </div>

                    {!compact && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            {status !== 'HOLIDAY' ? (
                                <>Floaters available: <strong>{floaters}</strong></>
                            ) : (
                                <>No bookings allowed</>
                            )}
                        </div>
                    )}
                </div>

                {details.action && !isPast && (
                    <button
                        className={`btn ${details.btnClass}`}
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            width: '100%',
                            marginTop: 'auto',
                            padding: compact ? '0.4rem' : '0.75rem 1.5rem',
                            fontSize: compact ? '0.75rem' : '0.95rem'
                        }}
                    >
                        {compact ? (details.action === 'Release Seat' ? 'Release' : 'Book') : details.action}
                    </button>
                )}
            </div>

            {isModalOpen && (
                <BookingModal
                    date={date}
                    actionType={details.action}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <style>{`
            .day-card {
                min-height: ${compact ? '100%' : '240px'};
                padding: ${compact ? '0.5rem' : '1.5rem'};
                border-radius: ${compact ? 'var(--radius-sm)' : 'var(--radius-lg)'};
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .day-card:hover {
                transform: translateY(-5px);
            }
        `}</style>
        </>
    );
};

export default DayCard;
