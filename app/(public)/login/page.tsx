'use client'
import React from 'react'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [code, setCode] = React.useState('')
  const login = useAuthStore(s => s.login)
  const router = useRouter()
  const valid = /^[A-Za-z0-9]{5}$/.test(code)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    login(code)
    router.push('/mood')
  }

  return (
    <div className="flex flex-1 items-center justify-center py-10">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-3xl font-semibold text-[color:var(--brand)]">Enter Access Code</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            inputMode="text"
            pattern="[A-Za-z0-9]{5}"
            maxLength={5}
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="e.g., AB12C"
            aria-label="Access code"
            className="w-full rounded-xl border border-black/10 p-3 text-center text-lg tracking-[0.4em] uppercase transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-opacity-40 focus:outline-none"
          />
          <button className="btn btn-primary w-full" disabled={!valid}>Login</button>
          {!valid && code.length > 0 && (
            <p className="text-center text-sm text-red-600">Code must be 5 letters or numbers.</p>
          )}
        </form>
      </div>
    </div>
  )
}
