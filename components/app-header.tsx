'use client'
import React from 'react'
import { useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'
import { nowIST, greetForIST } from '@/lib/time'
import StatBadge from './stat-badge'

export default function AppHeader() {
  const userName = useAuthStore(s => s.userName)
  const { coins, badges, streakDays } = useDashboardStore(s => s.data)
  const greeting = greetForIST(nowIST())
  return (
    <header className="mb-4 space-y-2">
      <h2 className="text-xl font-semibold">{greeting}, {userName}</h2>
      <div className="flex gap-2">
        <StatBadge label="Coins" value={coins} />
        <StatBadge label="Badges" value={badges} />
        <StatBadge label="Streak" value={streakDays} />
      </div>
    </header>
  )
}
