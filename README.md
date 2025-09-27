# Preyan Learner Dashboard

Mobile-first learner dashboard per PRD.

## Tech
- Next.js 14, TypeScript, App Router
- Tailwind CSS
- Zustand for client state
- date-fns for formatting
- Deployed on Vercel

## Run
1) `pnpm i`
2) `pnpm dev`
3) Open `http://localhost:3000`

## Routes
- `/login` → access code (5 chars alphanumeric)
- `/mood` → Q1
- `/motivation` → Q2
- `/energy` → Q3
- `/dashboard` → main

## Notes
- Session persisted in `localStorage`
- Unlock rules at 05:00 IST for daily. Weekly unlock Saturday 05:00 IST.
- Status tags: gray=pending, blue=submitted, green=evaluated
- Coins: +10 daily, +30 weekly. First weekly submission adds 1 badge.
