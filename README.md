# 🏥 MyPatientHUB - Smart Healthcare Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

A modern, fully responsive, and feature-rich healthcare web application built with **React**, **Vite**, and **Tailwind CSS**. 

This platform bridges the gap between patients, doctors, and healthcare facilities by providing an intuitive space for appointment scheduling, finding clinics on interactive maps, and managing health records.

---

## ✨ Key Features (ویژگی‌های کلیدی)

*   🔐 **Secure Authentication:** Multi-step registration process (Patient, Doctor, Hospital) with real-time form validation.
*   📊 **Interactive Dashboard:** Dynamic data visualization using `Recharts` (Donut and Bar charts) for health indices and clinic promotions.
*   🗓️ **Smart Appointments:** A real-time interactive calendar with date validation (prevents booking in the past), and a dynamic booking modal that triggers global notifications.
*   🗺️ **Interactive Maps:** Find clinics in Kabul using `Leaflet`. Features real-time GPS location tracking (CURRENT) and automatic map flying to searched results.
*   🔍 **Global Smart Search:** A case-insensitive (`toLowerCase` & `trim`) search bar in the header that filters through all pages, doctors, and clinics instantly.
*   🌙 **Dark/Light Mode:** Fully integrated theme toggler with Dark Blue aesthetics, persisting user preference using `localStorage`.
*   🔔 **Real-time Notifications:** A dynamic notification system that updates the header bell icon when actions (like booking an appointment) occur.
*   📱 **Fully Responsive:** Optimized for mobile, tablet, and desktop views, complete with a collapsible sidebar.

---

## 🛠️ Tech Stack (تکنولوژی‌های استفاده شده)

*   **Framework:** React.js (v18+)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (v3)
*   **Routing:** React Router DOM (v6)
*   **Icons:** Lucide React
*   **Charts:** Recharts
*   **Maps:** React Leaflet & OpenStreetMap
*   **Version Control:** Git & GitHub
*   **Deployment:** Netlify

---

## 📁 Project Structure (ساختار پروژه)

```text
src/
│
├── assets/          # Images and static assets
├── components/      # Reusable UI components (Header, Sidebar, Cards, Charts, etc.)
├── context/         # React Context (Theme & Notification Providers)
├── data/            # Mock data (Doctors, Clinics, Appointments)
├── layouts/         # Layout wrappers (DashboardLayout)
├── pages/           # Main application pages (Login, Dashboard, FindDoctor, etc.)
│
├── App.jsx          # Main application routes
├── main.jsx         # Entry point
└── index.css        # Global styles and Tailwind directives




Follow these steps to run the project locally:
git clone https://github.com/sharifa448/PATIENT-HUB-REACT.git
cd PATIENT-HUB-REACT
npm install,npm run dev


🌐 Live Demo 
The project is deployed and live on Netlify! Check it out here:

Live URL: https://patient-hub-reac.netlify.app


👨‍💻 Authors 
Sharifa Rozgar Zada
GitHub: @sharifa448
Marjan Mohammedzia
Sahar Nazari


