import React from 'react'
export default function StatBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="badge border border-white/10 bg-white/10 text-white">{label}: {value}</div>
  )
}
