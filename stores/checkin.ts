'use client'
import { create } from 'zustand'
import { nowIST, formatISO } from '@/lib/time'

type Checkin = { mood?: string; motivation?: string; energy?: string }

type CheckinState = Checkin & { saveCheckin: (partial: Partial<Checkin>) => void }
const STORAGE_KEY = 'preyan_checkin_v1'

export const useCheckinStore = create<CheckinState>((set, get) => ({
  ...load(),
  saveCheckin: (partial) => {
    const merged = { ...get(), ...partial }
    set(merged)
    const keyDate = formatISO(nowIST())
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    all[`checkin_${keyDate}`] = merged
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  }
}))

function load(): Checkin {
  if (typeof window === 'undefined') return {}
  try { const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); const today = all[`checkin_${formatISO(nowIST())}`] || {}; return today }
  catch { return {} }
}
