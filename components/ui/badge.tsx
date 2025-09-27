import * as React from 'react'
export function Badge({ children, color = 'gray' }: { children: React.ReactNode; color?: 'gray'|'blue'|'green' }) {
  const map = { gray: 'badge badge-gray', blue: 'badge badge-blue', green: 'badge badge-green' } as const
  return <span className={map[color]}>{children}</span>
}
