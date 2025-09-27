'use client'
import React from 'react'
import { useDashboardStore } from '@/stores/dashboard'

export default function FooterProgress() {
  const { data } = useDashboardStore()
  const total = 5 + 1
  const submitted = data.daily.filter(d => d.status !== 'pending').length + (data.weekly.status !== 'pending' ? 1 : 0)
  const pct = Math.round((submitted / total) * 100)
  return (
    <footer className="mt-6">
      <div className="progress"><div style={{ width: `${pct}%` }} /></div>
      <div className="mt-2 text-sm">Progress: {pct}% • Coins {data.coins} • Badges {data.badges}</div>
    </footer>
  )
}
