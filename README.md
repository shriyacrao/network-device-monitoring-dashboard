# Network Device Monitoring Dashboard

A MERN stack application that simulates real-time monitoring of network infrastructure
(routers, switches, servers, firewalls, access points). Devices are checked on a schedule,
status changes are logged as alerts, and historical uptime is charted per device.

## Stack

- **MongoDB** (Atlas) — device, user, alert, and uptime-log storage
- **Express** — REST API
- **React** (Vite) — frontend, styled with Tailwind CSS
- **Node.js** — server + `node-cron` heartbeat job that simulates device status checks

## Features

- JWT auth with **admin** / **viewer** roles (admins can add/edit/delete devices)
- Live dashboard: total devices, up/down/warning counts, average uptime, alert count
- Device grid with per-device status badges
- Simulated heartbeat job (runs every minute) that randomly flips device status,
  weighted so devices mostly stay "up" but occasionally degrade or go down
- Alert feed generated automatically whenever a device's status changes, with
  acknowledge/dismiss
- Per-device history page with a step-line uptime chart (Recharts)
- Seed script to populate demo devices and demo admin/viewer accounts

## Project Structure

```
network-monitor/
├── backend/
│   ├── config/db.js
│   ├── models/          # Device, User, Alert, UptimeLog
│   ├── controllers/     # auth, device, alert, dashboard
│   ├── routes/
│   ├── middleware/auth.js
│   ├── jobs/heartbeat.js
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/api.js
    │   ├── context/AuthContext.jsx
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
    └── index.html
```

## Local Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGO_URI (MongoDB Atlas connection string) and JWT_SECRET
npm run seed     # populates sample devices + admin/viewer users
npm run dev      # starts server on http://localhost:5000
```

Demo accounts created by the seed script:
- Admin: `admin@example.com` / `admin123`
- Viewer: `viewer@example.com` / `viewer123`

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend runs somewhere other than localhost:5000
npm run dev      # starts Vite dev server on http://localhost:5173
```

Visit `http://localhost:5173` and log in with the seeded admin account.

## Deployment (same pattern as your Help Desk project)

1. **MongoDB Atlas** — create a free cluster, whitelist your deployment IPs (or `0.0.0.0/0`
   for simplicity while testing), and copy the connection string into `MONGO_URI`.
2. **Backend → Render**
   - New Web Service, root directory `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL), `PORT`
3. **Frontend → Vercel**
   - Root directory `frontend`
   - Framework preset: Vite
   - Add environment variable: `VITE_API_URL` = your Render backend URL + `/api`
4. Update the backend's `CLIENT_URL` env var to match your deployed Vercel URL so CORS allows it.

## Adjusting the simulation speed

By default the heartbeat job in `backend/jobs/heartbeat.js` runs every minute
(`'* * * * *'`). For a live demo where you want visible changes faster, or slower to
avoid overwhelming the alert feed, edit the cron expression in `startHeartbeatJob()`.

## Resume/portfolio notes

This project is designed to demonstrate:
- REST API design with role-based access control (JWT + middleware)
- MongoDB schema design across related collections (devices, alerts, logs, users)
- Background job scheduling (`node-cron`) — a pattern common in real infra monitoring tools
- Data visualization (Recharts) driven by time-series data
- Full deployment pipeline (MongoDB Atlas + Render + Vercel)
