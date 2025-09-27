import type { Metadata } from 'next'
import './globals.css'
import React from 'react'

export const metadata: Metadata = {
  title: 'Preyan Learner Dashboard',
  description: 'Mobile-first learner dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <main className="mx-auto flex min-h-screen max-w-md flex-col p-4">{children}</main>
      </body>
    </html>
  )
}
