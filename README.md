# Client Web Shell

Prototype environment for realtor.com PRO client web — 1280px desktop, persistent left sidebar nav.

## What's in the shell

- **Left sidebar** (220px, dark `#1C2733`) — brand mark, `NavSidebar` with 5 nav items, user identity footer
- **Top bar** — current page title, help link, avatar
- **Dashboard screen** — stat cards row (4 up), lead table with status badges
- Placeholder screens for My Leads, Team, Reports, Settings

The default persona context is **Beverly (buyer agent)** — all sample data and labels reflect an agent's view. To prototype the team-lead view (Teri), swap the dashboard content or switch to the client-native shell (which defaults to Teri).

## Start prototyping

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Set your browser to at least 1280px wide for accurate layout.

## How to add your prototype content

Edit `src/Shell.tsx`. The shell is organized into clear sections:

1. **`STAT_CARDS`** — replace values with your prototype's metrics
2. **`SAMPLE_LEADS`** — replace with your prototype's lead data
3. **`DashboardScreen`** — replace or extend the dashboard layout
4. **`PlaceholderContent`** — swap in your screen components for each nav item

Keep `NavSidebar`, `SidebarHeader`, `SidebarFooter`, and the top bar in place. Build inside each page's content component.

## Stack

- React 18 + TypeScript
- Tailwind CSS (layout, spacing, responsive)
- styled-components (`SidebarHeader`, `SidebarFooter` — dark background token usage)
- rdc-ui (`@rdc-npm/rdc-ui`) — `NavSidebar`, `NavSidebarLink` wrapped in `ThemeProvider` in `main.tsx`

## Surface rules

- **Min-width**: 1280px — client web is desktop-only, no mobile breakpoints
- **Sidebar**: always visible; never collapsed in prototype context; `NavSidebar` from rdc-ui handles active states and keyboard navigation
- **Density**: standard 56–64px row height for lead/data tables; use `py-3.5` Tailwind for consistent row padding
- **Typography**: body 14px, table headers 12px uppercase tracking-wide
- **Primary action**: top-right of page header (`bg-rdc-blue` button)
- Status badge pattern: `bg-blue-50 text-blue-700` (New), `bg-yellow-50 text-yellow-700` (Contacted), `bg-green-50 text-green-700` (Appointment Set)
- Color reference: `#006AFF` (blue), `#1C2733` (text / sidebar bg), `#55687A` (secondary), `#D6DEE6` (border)
