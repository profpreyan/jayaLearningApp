'use client'
import React from 'react'
import { useDashboardStore } from '@/stores/dashboard'
import LockBadge from './lock-badge'
import { cn } from '@/components/ui/button'

export default function ActionCardWeekly() {
  const { data, submitWeekly } = useDashboardStore()
  const w = data.weekly
  const locked = data._locks?.week ?? false
  const statusColor = w.status === 'evaluated' ? 'badge-green' : w.status === 'submitted' ? 'badge-blue' : 'badge-gray'

  return (
    <div className={cn('card', locked && 'locked')}>
      <div className="card-body space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Week {w.weekNo} • {w.startISO} → {w.endISO}</h3>
          <span className={cn('badge', statusColor)}>{w.status[0].toUpperCase()+w.status.slice(1)}</span>
        </div>
        <p className="text-sm">{w.title}</p>
        <div className="flex items-center justify-between">
          <div />
          <LockBadge locked={locked} />
        </div>
        <button className="btn btn-primary w-full" disabled={locked || w.status !== 'pending'} onClick={() => submitWeekly()}>Submit Week Assignment</button>
      </div>
    </div>
  )
}
