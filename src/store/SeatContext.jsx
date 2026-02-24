import { createContext, useContext, useState } from 'react';
import { USERS, INITIAL_HOLIDAYS, WEEK_1_START, BASE_FLOATERS } from '../data/mockData';
import { isAllocated, canBookNonAllocated, formatDateStr } from '../utils/dateHelpers';
import { isSameDay, addDays } from 'date-fns';

const SeatContext = createContext();

export const useSeatStore = () => {
    return useContext(SeatContext);
};

export const SeatProvider = ({ children }) => {
    // Global State
    const [currentUser, setCurrentUser] = useState(USERS[0]);
    const [simulatedDateTime, setSimulatedDateTime] = useState(new Date('2026-03-02T10:00:00'));

    // Maps dateStr to array of user IDs who released a seat
    const [releases, setReleases] = useState({});

    // Maps dateStr to array of user IDs who booked an extra seat
    const [bookings, setBookings] = useState({});

    // We can treat INITIAL_HOLIDAYS as a set of dates
    const [holidays, setHolidays] = useState(new Set(INITIAL_HOLIDAYS));

    // Accessors
    const getReleasesCount = (dateStr) => releases[dateStr]?.length || 0;
    const getBookingsCount = (dateStr) => bookings[dateStr]?.length || 0;

    // 10 base floaters + any released seats - seats booked today
    const getAvailableFloaters = (date) => {
        const dateStr = formatDateStr(date);
        if (holidays.has(dateStr)) return 0;
        const available = BASE_FLOATERS + getReleasesCount(dateStr) - getBookingsCount(dateStr);
        return Math.max(0, available);
    };

    const isHoliday = (date) => {
        return holidays.has(formatDateStr(date));
    };

    // Check user status for a day
    const getUserDayStatus = (user, date) => {
        const dateStr = formatDateStr(date);

        if (isHoliday(date)) return 'HOLIDAY';

        const allocated = isAllocated(user.group, date, WEEK_1_START);

        // If they are allocated but they released
        if (allocated) {
            if (releases[dateStr]?.includes(user.id)) return 'RELEASED';
            return 'ALLOCATED'; // "must attend"
        }

        // Non-allocated day
        if (bookings[dateStr]?.includes(user.id)) return 'BOOKED';

        return 'NON_ALLOCATED';
    };

    // Actions
    const releaseSeat = (date) => {
        const dateStr = formatDateStr(date);
        setReleases((prev) => ({
            ...prev,
            [dateStr]: [...(prev[dateStr] || []), currentUser.id]
        }));
    };

    const bookSeat = (date) => {
        const dateStr = formatDateStr(date);

        const { allowed, reason } = canBookNonAllocated(date, simulatedDateTime);
        if (!allowed) {
            return { success: false, reason };
        }

        if (getAvailableFloaters(date) <= 0) {
            return { success: false, reason: 'No floater seats available.' };
        }

        setBookings((prev) => ({
            ...prev,
            [dateStr]: [...(prev[dateStr] || []), currentUser.id]
        }));

        return { success: true };
    };

    const setSimulatedDayAndHour = (date, hour) => {
        const newTime = new Date(date);
        newTime.setHours(hour, 0, 0, 0);
        setSimulatedDateTime(newTime);
    }

    const value = {
        currentUser,
        setCurrentUser,
        simulatedDateTime,
        setSimulatedDateTime,
        setSimulatedDayAndHour,
        getAvailableFloaters,
        getUserDayStatus,
        isHoliday,
        releaseSeat,
        bookSeat,
        week1Start: WEEK_1_START,
    };

    return (
        <SeatContext.Provider value={value}>
            {children}
        </SeatContext.Provider>
    );
};
