import * as React from 'react'
export function Progress({ value }: { value: number }) {
  return <div className="progress"><div style={{ width: `${value}%` }} /></div>
}
