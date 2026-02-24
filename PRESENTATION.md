# Wissen Seat Booking PPT Outline

**Slide 1: Title Slide**
- **Title**: Dynamic Seat Booking System
- **Subtitle**: A Modern Approach to Capacity & Schedule Management
- **Presenter**: Vaibhav Chaudhary

**Slide 2: Core Architecture & Allocation Logic**
- **The Challenge**: Managing 50 seats for 80 users (10 Batches) seamlessly over continuous 2-week rotations.
- **The Solution (Algorithm)**: 
  - Utilized a 14-day modulo cycle to map users accurately into "Office Days" and "WFH Days" indefinitely into the future.
  - Developed a scalable `SeatContext` (React) to manage dynamic states like `bookings`, `releases`, and `holidays`.
  - Implemented 10 base floaters, strictly calculated daily based on active vacations/leaves.

**Slide 3: Business Logic & Time Restrictions**
- **Strict Booking Rules:**
  - Users can **only** book unallocated floater seats for the absolute *next day*.
  - Handled the *Post 3:00 PM Check:* Used `date-fns` to validate the booking attempt strictly happens mathematically after 15:00 the prior day.
- **Vacation / Dynamic Floaters:**
  - When an allocated user releases their seat, the daily floater pool automatically increases `(+1)`.
- **Holiday System:** Explicit dates lock the calendar, preventing modifications and showing "Office Closed".

**Slide 4: UI/UX & The Simulation Environment**
- **Premium Design Concept**: Built a completely custom, glassmorphism-inspired dark mode UI. Used CSS variables for glowing accents, deep grays, and blur-filters. Replaced standard toggles with a responsive **Full Monthly Grid Calendar**.
- **Interactive Simulator**: Included a developer/reviewer control panel allowing you to hot-swap the `simulatedDateTime` and switch the Active User. This enables reviewing complex time-based edge cases without waiting for actual clocks to turn.

*(Note: Take 3-4 screenshots of the Dashboard, Calendar, Simulator dropdown, and Booking Modal to place on these slides).*
