'use client'
import React from 'react'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'next/navigation'

export default function Guard({ children }: { children: React.ReactNode }) {
  const code = useAuthStore(s => s.code)
  const router = useRouter()
  React.useEffect(() => { if (!code) router.replace('/login') }, [code, router])
  if (!code) return null
  return <>{children}</>
}
