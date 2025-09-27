'use client'
import React from 'react'
import { useDashboardStore } from '@/stores/dashboard'
import LockBadge from './lock-badge'
import { cn } from '@/components/ui/button'

export default function ActionCardDaily({ dayNo }: { dayNo: 1|2|3|4|5 }) {
  const { data, submitDaily } = useDashboardStore()
  const d = data.daily.find(x => x.dayNo === dayNo)!
  const locked = data._locks?.[`day${dayNo}`] ?? false

  const statusColor = d.status === 'evaluated' ? 'badge-green' : d.status === 'submitted' ? 'badge-blue' : 'badge-gray'

  return (
    <div className={cn('card', locked && 'locked')}>
      <div className="card-body space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Day {d.dayNo} • {d.dayName} • {d.dateISO}</h3>
          <span className={cn('badge', statusColor)}>{d.status[0].toUpperCase()+d.status.slice(1)}</span>
        </div>
        <p className="text-sm text-neutral-300">{d.title}</p>
        <div className="flex items-center justify-between">
          <div className="space-x-2 text-sm text-neutral-300">
            <a className="underline" href={d.links.customGptUrl} target="_blank" rel="noreferrer">Custom GPT</a>
            <a className="underline" href={d.links.notebookLmUrl} target="_blank" rel="noreferrer">NotebookLM</a>
          </div>
          <LockBadge locked={locked} />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex-1" disabled={locked || d.status !== 'pending'} onClick={() => submitDaily(dayNo)}>Submit Assignment</button>
          <button className="btn btn-ghost" disabled={locked} onClick={() => alert('Hint shown')}>Hint</button>
        </div>
        <button className="btn btn-ghost w-full" disabled>{d.extraVideosLocked ? 'Unlock extra videos' : 'Extra videos'}</button>
      </div>
    </div>
  )
}
