'use client'
import { create } from 'zustand'

export type AuthState = { code: string | null; userName: string | null; login: (code: string) => void; logout: () => void }

const STORAGE_KEY = 'preyan_auth_v1'

export const useAuthStore = create<AuthState>((set) => ({
  code: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')?.code ?? null : null,
  userName: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')?.userName ?? null : null,
  login: (code: string) => set(() => {
    const userName = code.slice(-3).toUpperCase()
    const payload = { code, userName }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return payload
  }),
  logout: () => set(() => {
    localStorage.removeItem(STORAGE_KEY)
    return { code: null, userName: null }
  })
}))
