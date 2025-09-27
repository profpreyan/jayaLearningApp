import React from 'react'
export default function StatBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="badge bg-black text-white">{label}: {value}</div>
  )
}
