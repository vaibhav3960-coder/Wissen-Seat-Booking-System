// Setup Users (10 batches of 8 = 80 total)
export const USERS = Array.from({ length: 80 }, (_, i) => {
  const batchId = Math.floor(i / 8) + 1; // 1 to 10
  const group = batchId <= 5 ? 'A' : 'B';
  return {
    id: `u${i + 1}`,
    name: `Employee ${i + 1}`,
    batch: batchId,
    group: group // Group A or Group B
  };
});

// For demonstration, let's hardcode a known "Start of Week 1" date
// Let's say Week 1 starts on Monday, March 2, 2026
export const WEEK_1_START = new Date('2026-03-02T00:00:00');

// Initial explicitly blocked holidays
export const INITIAL_HOLIDAYS = [
  '2026-03-11', // Example holiday (Wednesday Week 2)
];

// Base Floaters
export const TOTAL_SEATS = 50;
export const BASE_FLOATERS = 10;
export const SEATS_PER_BATCH = 8;
export const ALLOCATED_BATCHES_PER_DAY = 5; // 40 seats allocated per day
