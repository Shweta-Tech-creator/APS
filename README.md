# APS — Fenrir Security Platform

A professional B2B SaaS security platform developed for the Fenrir Security technical screening.

## 🌐 Live Demo

**[https://aps-self.vercel.app](https://aps-self.vercel.app)**

> Navigate: Login → Dashboard → Click any scan row → Scan Detail

## 🗂️ Pages

| Route | Description |
|---|---|
| `/login` | Premium split-screen login with social auth |
| `/dashboard` | Scan list with stats, search, filters |
| `/scans/1` | Live scan detail with terminal console & findings |

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| **React 18 + Vite** | Core framework & build tool |
| **Vanilla CSS** | Custom design system (no Tailwind) |
| **Framer Motion** | Page transitions & micro-animations |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Icon library |
| **React Hot Toast** | Notification feedback |

## ✨ Features Implemented

### Core
- **Login Page** — Split-screen layout, dark cinematic gradient background (navy → teal → orange glow), social login buttons (Google, Meta), form validation
- **Dashboard** — Stats strip (Critical/High/Medium/Low), scan table with search, progress bars, vulnerability badges, pagination
- **Scan Detail** — Step tracker (Spidering → Reporting), circular progress ring, live terminal console with color-coded output, Finding Log panel

### Bonus ✅
- **Skeleton loaders** — shimmer loading states while mock data resolves
- **Staggered animations** — stats cards animate in sequence on page load
- **Reusable UI Library** — `SeverityBadge`, `StatusChip`, `Button` components at `src/components/ui/`
- **Keyboard navigation** — table rows focusable via Tab, activatable via Enter/Space
- **ARIA labels** — full accessibility support on all interactive elements
- **Dark / Light mode** — theme toggle with localStorage persistence

## 📦 Local Setup

```bash
# Clone the repo
git clone https://github.com/Shweta-Tech-creator/APS.git
cd APS

# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:5173
```

## � Design Decisions

- **Typography**: `Inter` for UI, `JetBrains Mono` for terminal simulation
- **Accent Color**: `#0CC8A8` teal across all CTAs and active states
- **Severity Colors**: Industry-standard — Red (Critical), Orange (High), Amber (Medium), Green (Low)
- **Dark Mode**: Deep navy `#0F1117` base — premium contrast, not a simple inversion
- **Scan Detail**: Always dark UI to simulate a real security console feel
