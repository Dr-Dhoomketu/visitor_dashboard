# Visitor Management System (VMS)

A modern, full-featured Visitor Management System built with **React**, **Vite**, and **Tailwind CSS**. Manage visitor check-ins, pre-registrations, employee directories, departments, designations, and system users — all in one clean UI.

## Features

- **Home Page** — Three entry points: Schedule Appointment, Previous Visits Log, Walk-in Check-In
- **Check-In Flow** — Multi-step visitor registration form (Name, National ID, Gender, Host, Phone, Email, Purpose, Address) → Webcam capture
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
- **pnpm workspaces** monorepo structure

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm --filter @workspace/vms-ui run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
artifacts/
└── vms-ui/
    └── src/
        ├── pages/          # All page components
        │   ├── home.tsx
        │   ├── checkin.tsx
        │   ├── webcam.tsx
        │   ├── approval.tsx
        │   ├── schedule.tsx
        │   ├── previous-visits.tsx
        │   ├── login.tsx
        │   ├── dashboard.tsx
        │   ├── department.tsx
        │   ├── designation.tsx
        │   ├── employee.tsx
        │   ├── visitor.tsx
        │   ├── pre-visitor.tsx
        │   └── administrator.tsx
        ├── components/
        │   └── layout.tsx   # Blue sidebar navigation layout
        ├── hooks/
        │   └── use-visitors.tsx  # Global visitor state (React Context)
        └── App.tsx           # Routing
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
