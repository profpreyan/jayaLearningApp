'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

type Option = { label: string; value: string; icon?: React.ReactNode }
export default function QuestionScreen({ title, options, onSelect }: { title: string; options: Option[]; onSelect: (v: string) => void }) {
  return (
    <div className="w-full max-w-sm space-y-6 text-center">
      <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
      <div className="flex flex-col gap-3">
        {options.map(o => (
          <Button key={o.value} variant="outline" onClick={() => onSelect(o.value)} className="w-full justify-start gap-3 text-left">
            {o.icon && <span className="text-xl" aria-hidden>{o.icon}</span>}
            <span className="flex-1">{o.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
