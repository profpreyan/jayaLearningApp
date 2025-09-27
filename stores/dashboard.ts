'use client'
import { create } from 'zustand'
import type { DashboardState, DayStatus } from '@/lib/seed'
import { seedWeek } from '@/lib/seed'

const STORAGE_KEY = 'preyan_dashboard_v1'

type DashboardSlice = {
  data: DashboardState
  initWeek: () => void
  submitDaily: (dayNo: 1|2|3|4|5) => void
  submitWeekly: () => void
  setStatus: (kind: 'day'|'week', id: number, status: DayStatus) => void
  addCoins: (n: number) => void
  addBadge: () => void
}

export const useDashboardStore = create<DashboardSlice>((set, get) => ({
  data: load() ?? seedWeek(),
  initWeek: () => {
    const existing = load()
    if (!existing) {
      const seeded = seedWeek(); set({ data: seeded }); persist(seeded)
    } else {
      // recompute locks for current week when user opens dashboard
      const fresh = seedWeek()
      const merged: DashboardState = { ...existing, _locks: fresh._locks, weekly: { ...existing.weekly, lockedUntilISO: fresh.weekly.lockedUntilISO } }
      set({ data: merged }); persist(merged)
    }
  },
  submitDaily: (dayNo) => {
    const state = get().data
    const idx = state.daily.findIndex(d => d.dayNo === dayNo)
    if (idx === -1) return
    if (state.daily[idx].status !== 'pending') return
    const copy = structuredClone(state)
    copy.daily[idx].status = 'submitted'
    copy.coins += 10
    // streak logic: increment if submission on a weekday not yet counted
    copy.streakDays = Math.min(5, copy.streakDays + 1)
    copy.onStreak = copy.streakDays >= 2
    set({ data: copy }); persist(copy)
  },
  submitWeekly: () => {
    const state = get().data
    if (state.weekly.status !== 'pending') return
    const copy = structuredClone(state)
    copy.weekly.status = 'submitted'
    copy.coins += 30
    if (copy.badges === 0) copy.badges += 1 // first weekly submission badge
    set({ data: copy }); persist(copy)
  },
  setStatus: (kind, id, status) => {
    const state = get().data
    const copy = structuredClone(state)
    if (kind === 'day') {
      const idx = copy.daily.findIndex(d => d.dayNo === id)
      if (idx !== -1) copy.daily[idx].status = status
    } else {
      copy.weekly.status = status
    }
    set({ data: copy }); persist(copy)
  },
  addCoins: (n) => { const s = get().data; const copy = { ...s, coins: s.coins + n }; set({ data: copy }); persist(copy) },
  addBadge: () => { const s = get().data; const copy = { ...s, badges: s.badges + 1 }; set({ data: copy }); persist(copy) },
}))

function load(): DashboardState | null {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') } catch { return null }
}
function persist(state: DashboardState) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {} }
