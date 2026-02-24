# Wissen Seat Booking System

A fully interactive, glassmorphism-inspired Seat Booking web application developed as an interview task. Built with **React** and **Vite**.

![App Screenshot](./public/screenshots/dashboard.jpeg) <!-- ⚠️ IMPORTANT: PLACE A SCREENSHOT OF THE APP HERE -->

## 🚀 Features Core Logic
- **Capacity Management**: Handles 50 total office seats (40 assigned batches + 10 floaters).
- **Two-Week Infinite Rotation**: 80 users split into two main 40-person groups (A and B). The app algorithm perfectly rotates Group A (Mon-Wed) and Group B (Thu-Fri) indefinitely across a standard monthly calendar view.
- **Vacation / Seat Release**: Users can release their seat for a day. This action intelligently increases the daily "Available Floaters" pool by 1.
- **Strict Booking Rules:**
  - Users can ONLY book unallocated floater seats.
  - Users can ONLY book seats for the next immediate day.
  - Users MUST book after 3:00 PM on the previous day. The system will actively reject requests made before 3:00 PM.
  - Booking on Holidays is strictly disabled.
- **Simulator Panel**: A built-in time and user simulator on the sidebar to easily test time-based rules without waiting 24 hours.

## 🎨 UI/UX Highlights
- **Premium Glassmorphism Design**: Frosted glass cards, blur backdrops, and interactive hover scales.
- **Custom Dark Theme**: No generic colors. Utilizes sleek slate backgrounds with vibrant accent glows.
- **Full Monthly Calendar**: A responsive CSS Grid calendar that displays daily status dynamically ("Office Day", "WFH Day", "On Leave").
- **Interactive Modals**: Smooth micro-animations for booking confirmations and error rejections.

## ⚙️ Quick Start Setup
Ensure you have [Node.js](https://nodejs.org/) installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/vaibhav3960-coder/Wissen-Seat-Booking-System.git
   cd Wissen-Seat-Booking-System
   ```![831DFB8B-35B3-4D84-A44B-CF1CCAE61976_1_201_a](https://github.com/user-attachments/assets/ced5eb74-e0a0-43f7-b7f8-4d64554f237f)


2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5174/`. Use the Simulator Control to test booking logic!
