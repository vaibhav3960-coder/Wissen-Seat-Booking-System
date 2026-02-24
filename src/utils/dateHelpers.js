import { addDays, format, isWeekend, startOfWeek, subDays, isAfter, isSameDay, setHours, setMinutes } from 'date-fns';

// Create a pseudo-calendar based on Week 1 Start
export const getWeekDays = (startDate) => {
    const days = [];
    let current = startDate;
    for (let i = 0; i < 7; i++) {
        if (!isWeekend(current)) {
            days.push(current);
        }
        current = addDays(current, 1);
    }
    return days; // Mon-Fri
};

// Check if a user's group is allocated on a specific date based on Week 1 or Week 2
// Week 1 (Mon-Wed) -> Group A
// Week 1 (Thu-Fri) -> Group B
// Week 2 (Mon-Wed) -> Group B
// Week 2 (Thu-Fri) -> Group A
export const isAllocated = (group, date, week1Start) => {
    // We'll calculate the day offset from week 1 start
    const diffTime = date.getTime() - week1Start.getTime();

    // Convert to days. We use Math.floor to handle positive/negative correctly.
    // If diffDays is negative, we still want the correct modulo behavior.
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (isWeekend(date)) return false; // Out of range or weekend

    // Find where we are in the 14-day cycle
    // We add 14000 to handle negative modulo correctly in JS
    const cycleDay = ((diffDays % 14) + 14) % 14;

    const isWeek2 = cycleDay >= 7;
    const dayOfWeek = date.getDay(); // 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri

    const isMonToWed = dayOfWeek >= 1 && dayOfWeek <= 3;
    const isThuToFri = dayOfWeek === 4 || dayOfWeek === 5;

    if (!isWeek2) {
        if (isMonToWed) return group === 'A';
        if (isThuToFri) return group === 'B';
    } else {
        // Week 2 is swapped
        if (isMonToWed) return group === 'B';
        if (isThuToFri) return group === 'A';
    }
    return false;
};

// Check if current/simulated time allows booking for targetDate
// Rule: Previous day, post 3 PM
export const canBookNonAllocated = (targetDate, simulatedDateTime) => {
    const previousDay = subDays(targetDate, 1);

    // Is simulatedDateTime exactly the previous day?
    if (!isSameDay(simulatedDateTime, previousDay)) {
        return { allowed: false, reason: 'Can only book on the previous day' };
    }

    // Set 3 PM on the previous day
    const threePM = setMinutes(setHours(previousDay, 15), 0);

    if (!isAfter(simulatedDateTime, threePM)) {
        return { allowed: false, reason: 'Can only book after 3:00 PM' };
    }

    return { allowed: true };
};

export const formatDateStr = (date) => format(date, 'yyyy-MM-dd');
