import React, { useState } from 'react';
import { useSeatStore } from '../store/SeatContext';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const BookingModal = ({ date, actionType, onClose }) => {
    const { currentUser, releaseSeat, bookSeat } = useSeatStore();
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const formattedDate = format(date, 'EEEE, MMMM d, yyyy');

    const handleConfirm = () => {
        setStatus('loading');

        setTimeout(() => {
            if (actionType === 'Release Seat') {
                releaseSeat(date);
                setStatus('success');
            } else if (actionType === 'Book Seat') {
                const result = bookSeat(date);
                if (result.success) {
                    setStatus('success');
                } else {
                    setErrorMessage(result.reason);
                    setStatus('error');
                }
            }
        }, 600);
    };

    return (
        <div className="modal-backdrop">
            <div className="glass-card modal-content">

                {status === 'idle' && (
                    <div className="animate-fade-in">
                        <h2 style={{ marginBottom: '0.5rem' }}>{actionType}</h2>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            Are you sure you want to <strong>{actionType.toLowerCase()}</strong> for <br />
                            <span style={{ color: 'white', fontWeight: 600 }}>{formattedDate}</span>?
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                            <button className="btn btn-outline" onClick={onClose} disabled={status === 'loading'}>
                                Cancel
                            </button>
                            <button className={`btn btn-primary ${actionType === 'Release Seat' ? 'btn-danger' : ''}`} onClick={handleConfirm} disabled={status === 'loading'}>
                                Confirm
                            </button>
                        </div>
                    </div>
                )}

                {status === 'loading' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
                        <div className="spinner"></div>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Processing request...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ background: 'var(--success-bg)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                            <CheckCircle2 size={48} color="var(--success)" />
                        </div>
                        <h2>Success!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Your request for <strong>{formattedDate}</strong> has been confirmed.
                        </p>
                        <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>Done</button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ background: 'var(--danger-bg)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                            <AlertCircle size={48} color="var(--danger)" />
                        </div>
                        <h2>Request Rejected</h2>
                        <p style={{ color: 'var(--danger)', marginBottom: '2rem', padding: '1rem', background: 'var(--danger-bg)', borderRadius: 'var(--radius-md)' }}>
                            {errorMessage}
                        </p>
                        <button className="btn btn-outline" onClick={onClose} style={{ width: '100%' }}>Close</button>
                    </div>
                )}
            </div>

            <style>{`
                .modal-backdrop {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    animation: fadeIn 0.2s ease;
                }
                .modal-content {
                    width: 100%;
                    max-width: 450px;
                    background: var(--bg-secondary);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid var(--border-glass);
                    border-top-color: var(--accent-primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default BookingModal;
