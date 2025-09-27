import React from 'react'
import { Lock } from 'lucide-react'
export default function LockBadge({ locked }: { locked: boolean }) {
  if (!locked) return null
  return (
    <span className="badge badge-gray inline-flex items-center"><Lock size={14} className="mr-1"/> Locked</span>
  )
}
