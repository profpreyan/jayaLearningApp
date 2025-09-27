'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

type Option = { label: string; value: string; icon?: React.ReactNode }
export default function QuestionScreen({ title, options, onSelect }: { title: string; options: Option[]; onSelect: (v: string) => void }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="grid grid-cols-1 gap-3">
        {options.map(o => (
          <Button key={o.value} variant="outline" onClick={() => onSelect(o.value)} className="justify-start">
            <span className="mr-2" aria-hidden>{o.icon}</span> {o.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
