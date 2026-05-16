import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MoodBoard Pro - AI-Powered Mental Health Tracking',
  description: 'Professional mental health tracking platform with AI-powered insights for therapists and clients',
  keywords: ['mental health', 'mood tracking', 'therapy', 'AI insights', 'wellness'],
  authors: [{ name: 'MoodBoard Pro Team' }],
  openGraph: {
    title: 'MoodBoard Pro',
    description: 'AI-Powered Mental Health Tracking Platform',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          {children}
        </div>
      </body>
    </html>
  )
}

// Made with Bob
