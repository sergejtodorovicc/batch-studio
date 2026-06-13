import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Obsidian Studio — AI-Native Creative Agency',
  description: '30 launch-ready ad creatives. 72 hours. Built on your real ad data. 10–20× cheaper than traditional production.',
  keywords: ['AI creative agency', 'AI ads', 'AI UGC', 'performance creative', 'AI commercials'],
  openGraph: {
    title: 'Obsidian Studio — AI-Native Creative Agency',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`grain font-sans bg-bg text-text-primary antialiased ${spaceGrotesk.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
