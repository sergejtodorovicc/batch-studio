import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono, Fraunces } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/smooth-scroll'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SÉANCE — AI Creative Production',
  description: 'We summon content that was never filmed. 30 ads in 72 hours. No cameras. No shoots. No contracts.',
  keywords: ['AI creative agency', 'AI ads', 'AI UGC', 'performance creative', 'AI commercials'],
  openGraph: {
    title: 'SÉANCE — AI Creative Production',
    description: 'We summon content that was never filmed. 30 ads in 72 hours. No cameras. No shoots. No contracts.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${fraunces.variable}`}>
      <body className="grain font-sans bg-bg text-text-primary antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
