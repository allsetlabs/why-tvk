# why-tvk — TVK Manifesto Website

## What This Project Is

A bold, fire-fueled political manifesto website for **TVK (Tamilaga Vettri Kazhagam)**, Vijay's political party in Tamil Nadu. This is NOT a fan site — it is a **data-driven, statistic-backed manifesto platform** that:

- Presents TVK's vision and manifesto across every governance domain
- Shows what went WRONG under DMK, ADMK, BJP, and Congress with real data
- Compares Tamil Nadu's state BEFORE and AFTER the current ruling term
- Backs every statistic with government sources (data.gov.in, TN government portals, NCRB, UDISE+, etc.)
- Deploys as a GitHub Page from `main` branch at allsetlabs org

**Bilingual**: Tamil and English. Mobile-first design — most users are on mobile.

## Brand Identity

- **TVK Flag Colors**: Blue (#1B4FD8) and Gold/Yellow (#F5C518) with white
- **Tone**: Angry, raw, honest. Red fire accents for anger/corruption sections
- **Style**: Highly animated — GSAP for scroll animations, Three.js for 3D elements, animated avatars
- **CEO Character**: Karthik — an angry young Tamil man, furious at bribery, delayed welfare, crumbling roads, failing public schools, and politicians getting rich while the common man suffers

## Tech Stack (Web)

- **Framework**: React + Vite + TypeScript
- **Animation**: GSAP (ScrollTrigger, timelines), Three.js / React Three Fiber
- **Components**: `@modules/component` (shared component library from `modules/component`)
- **Charts**: Recharts or D3.js for data visualization
- **i18n**: react-i18next for Tamil/English
- **Deployment**: GitHub Pages from `main` branch, allsetlabs org repo

## Project Structure

- `web/` — React website (mobile-first, GSAP + Three.js animated)
- `mobile/` — Reserved for future mobile app
- `backend/` — Reserved for API / data layer if needed
- `.agents/` — AI agent definitions (CEO, Developer, Analyst, etc.)
- `.board/` — Agent communication hub (JSON documents)

## Agent-Managed Project

This project is built and maintained by autonomous AI agents orchestrated through DevBot. Agents communicate through JSON documents in `.board/`. See `.agents/CONVENTIONS.md` for all agent behavior rules.

**To give feedback**: Add entries to `.board/user-feedback.json` or `.board/investor-feedback.json`. The CEO picks them up on next run.

## Key Design Decisions

- **Every statistic must have a source** — clicking any stat opens a modal with the raw data and government URL
- **Atrocities section** — factual, sourced documentation of governance failures under current/past parties
- **Before/After comparisons** — slider or split-view showing Tamil Nadu metrics at start vs. end of each term
- **No news channels or blogs as sources** — only government portals, official census data, NCRB, UDISE+, PRS India, etc.
- **GitHub Pages deployment** — `gh-pages` branch or configured to deploy from `main`

## Ports

| Service | Port |
|---------|------|
| Web Dev Server | 4006 |
