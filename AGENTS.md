# why-tvk — TVK Manifesto Website

## Purpose

Data-driven, statistic-backed political manifesto platform explaining why TVK (Tamilaga Vettri Kazhagam) is the right choice for Tamil Nadu.

## Mental Model

A bold, fire-fueled website presenting TVK's vision and manifesto with government-sourced data. Shows what went wrong under DMK, ADMK, BJP, and Congress with real statistics. Compares Tamil Nadu's state before and after each ruling term. Every statistic links to a government source (data.gov.in, TN government portals, NCRB, UDISE+). Bilingual Tamil/English. Mobile-first — most users are on mobile. Deployed as GitHub Pages from main branch (AllSetLabs org).

## Where Things Go

```
why-tvk/
├── web/       # React + Vite (GSAP + Three.js animated, mobile-first)
├── mobile/    # Reserved for future mobile app
├── backend/   # Reserved for API/data layer if needed
├── .agents/   # AI agent definitions (CEO, Developer, Analyst, etc.)
└── .board/    # Agent communication hub (JSON documents)
```

Stack: React + Vite + TypeScript, GSAP (ScrollTrigger), Three.js / React Three Fiber, Recharts or D3.js for charts, react-i18next, `@allsetlabs/forge` from `../../forge`. Dev port: 4006.

## Development Commands

- `make setup` — check system dependencies
- `make install` — install web dependencies
- `make start` — start Vite on port 4006
- `npm run type-check` from `web/` — verify TypeScript
- `npm run test` from `web/` — run Vitest
- `npm run build` from `web/` — build the Vite app

## Current Capabilities

Agent-managed project. Web frontend is in active development.

## Testing Expectations

Run `npm run type-check`, `npm run test`, and `npm run build` from `web/` after code changes. Use the super repo root `npm run lint` for centralized lint/format checks. For visual/animation changes, inspect mobile and desktop, test sourced-stat interactions, and check the browser console.

## Brand Identity

- **Colors**: TVK Blue (#1B4FD8), Gold (#F5C518), white. Red fire accents for corruption/anger sections
- **Tone**: Angry, raw, honest — furious at bribery, delayed welfare, crumbling roads, failing schools, politicians getting rich
- **Style**: Highly animated — GSAP scroll animations, Three.js 3D elements, animated avatars

## Agent-Managed Project

Built and maintained by autonomous AI agents via `.board/`. See `.agents/CONVENTIONS.md` for all agent behavior rules.

**To give feedback:** Add entries to `.board/user-feedback.json` or `.board/investor-feedback.json`. The CEO picks them up on next run.

## Key Design Decisions

- Every statistic must have a source — clicking any stat opens a modal with raw data and government URL
- Atrocities section — factual, sourced documentation of governance failures under current/past parties
- Before/After comparisons — slider or split-view for Tamil Nadu metrics per ruling term
- No news channels or blogs as sources — only government portals, NCRB, UDISE+, PRS India, official census data
