import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/smooth-scroll'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BATCH — AI-Native Creative Production',
  description: '30 launch-ready ads in 72 hours. Built on your real ad data. No cameras, no shoots, no contracts.',
  keywords: ['AI creative agency', 'AI ads', 'AI UGC', 'performance creative', 'AI commercials'],
  openGraph: {
    title: 'BATCH — AI-Native Creative Production',
    description: 'We build ads that don\'t need cameras.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className={`grain font-sans bg-bg text-text-primary antialiased ${spaceGrotesk.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
