# Visitor Management System (VMS)

A modern, full-featured Visitor Management System built with **React**, **Vite**, and **Tailwind CSS**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dr-Dhoomketu/visitor_dashboard)

## Features

- **Home Page** — Three entry points: Schedule Appointment, Previous Visits Log, Walk-in Check-In
- **Check-In Flow** — Multi-step visitor registration form → Webcam/camera photo capture
- **Approval Dashboard** — Approve or reject visitor requests with live pending/approved/rejected counts
- **Schedule Appointment** — Pre-book visits; visitors receive confirmation
- **Been Here Before** — Returning visitor lookup by mobile number
- **Login** — Secure admin login with user ID and password
- **Dashboard** — Real-time stats: Total Visitors, Today's Visitors, Total Check-In, Total Check-Out, Pre-Visitor count — with bar chart and pie chart
- **Department** — Add, edit, delete departments with Active/Inactive status
- **Designation** — Add, edit, delete designations with Active/Inactive status
- **Employee** — Full staff directory with email, phone, status, and Edit/Delete actions
- **Visitor** — Complete visitor records grouped by day
- **Pre-Visitor** — Date-range search to pull pre-registered visitor reports
- **Administrator** — Manage system users with User ID, Name, Email, Department, Designation, and Edit/Delete actions

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast development builds
- **Tailwind CSS** for styling
- **Wouter** for client-side routing
- **Recharts** for dashboard charts
- **React Context** for all state (no backend required)
- **Capacitor** for iOS & Android native builds
- **pnpm workspaces** monorepo structure

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm --filter @workspace/vms-ui run dev
```

The app will be available at `http://localhost:5173`.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects settings from `vercel.json` — just click **Deploy**

Or use the button above.

## Mobile (iOS & Android)

See [`artifacts/vms-ui/MOBILE_SETUP.md`](artifacts/vms-ui/MOBILE_SETUP.md) for Capacitor setup instructions.

## Project Structure

```
artifacts/
└── vms-ui/
    └── src/
        ├── pages/          # All page components
        ├── components/     # Layout, sidebar
        ├── hooks/          # use-visitors (global state)
        └── App.tsx         # Routing
```

## Pages & Navigation

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/checkin` | Check-In Form | Public |
| `/webcam` | Webcam Capture | Public |
| `/schedule` | Schedule Appointment | Public |
| `/previous-visits` | Been Here Before | Public |
| `/login` | Admin Login | Public |
| `/dashboard` | Dashboard | Admin |
| `/department` | Department | Admin |
| `/designation` | Designation | Admin |
| `/employee` | Employee | Admin |
| `/visitor` | Visitor Records | Admin |
| `/pre-visitor` | Pre-Visitor Report | Admin |
| `/administrator` | User Management | Admin |

## License

MIT