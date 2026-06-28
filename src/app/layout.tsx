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

const BASE_URL = 'https://seance.studio'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SÉANCE | AI Creative Production — 30 Ads in 72 Hours',
    template: '%s | SÉANCE',
  },
  description:
    'SÉANCE delivers 30 AI-generated ads in 72 hours. No cameras, no shoots, no contracts. Campaign visuals, video ads, and brand content at scale.',
  keywords: [
    'AI creative production studio',
    'AI ad creative agency',
    'AI generated ads',
    'AI video ads',
    'performance creative AI',
    'AI product photography',
    'no shoot ad production',
    'DTC ad creative',
    'AI brand content',
    'creative production at scale',
  ],
  authors: [{ name: 'SÉANCE', url: BASE_URL }],
  creator: 'SÉANCE',
  publisher: 'SÉANCE',
  category: 'Creative Production',
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'SÉANCE | AI Creative Production — 30 Ads in 72 Hours',
    description:
      'SÉANCE delivers 30 AI-generated ads in 72 hours. No cameras, no shoots, no contracts. Campaign visuals, video ads, and brand content at scale.',
    type: 'website',
    url: BASE_URL,
    siteName: 'SÉANCE',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SÉANCE — AI Creative Production Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SÉANCE | AI Creative Production — 30 Ads in 72 Hours',
    description:
      'SÉANCE delivers 30 AI-generated ads in 72 hours. No cameras, no shoots, no contracts.',
    images: ['/og-image.jpg'],
  },
}

const schemaOrg = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'SÉANCE',
    alternateName: 'Seance Studio',
    url: BASE_URL,
    email: 'hello@seance.studio',
    description:
      'AI creative production studio. 30 launch-ready ads in 72 hours. No cameras, no shoots, no contracts.',
    foundingDate: '2024',
    knowsAbout: [
      'AI creative production',
      'performance advertising',
      'AI video ads',
      'AI product photography',
      'DTC brand marketing',
      'AI brand content',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'SÉANCE — AI Creative Production Studio',
    publisher: { '@id': `${BASE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#service`,
    name: 'AI Creative Production',
    provider: { '@id': `${BASE_URL}/#organization` },
    description:
      'AI-generated campaign visuals, video ads, product photos, and creator-style content. 30 assets delivered in 72 hours. No cameras, no shoots.',
    serviceType: 'Creative Production',
    areaServed: 'Worldwide',
    offers: [
      {
        '@type': 'Offer',
        name: 'Creative Sprint',
        description:
          'One-time AI creative production. 10 static ads, 3 video ads, delivered in 72 hours.',
        price: '1500',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'Creative Engine',
        description:
          'Monthly AI creative production. 20 static ads, 6 video ads, 4 creator-style videos per month.',
        price: '4500',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '4500',
          priceCurrency: 'EUR',
          unitCode: 'MON',
        },
      },
      {
        '@type': 'Offer',
        name: 'Engine Pro',
        description:
          'High-volume AI creative production for brands spending over €100K/month on ads. Dedicated strategist, weekly calls, unlimited revisions.',
        price: '9000',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '9000',
          priceCurrency: 'EUR',
          unitCode: 'MON',
        },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How quickly do we get our first séance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your first séance arrives in 7 days. Day 0 is onboarding, Day 1 is hook mining, Day 2 is brief approval, Days 3–4 are production, Days 5–6 are polish, Day 7 is delivery. After the first séance, ongoing deliveries happen every 72 hours.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do we need to do a photo shoot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Zero shoots. We use AI to generate product photos, video ads, and creator-style content from your existing product images and brand assets. You provide a style guide and reference images — we do the rest.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do you need from us to get started?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Product photos, your brand guidelines or style guide, and a 30-minute onboarding call. After that, we handle everything. You review the creative brief and approve the final séance.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if we do not like the ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every plan includes revision rounds. If something does not match the brief, we fix it. Sprint includes one revision round. Engine and Engine Pro include revisions on every séance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a contract or minimum commitment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No contracts. No minimum term. Pause or cancel anytime. We earn your business month to month — we do not lock you in.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is this different from a freelancer or agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Speed, consistency, and data. Most agencies take 3 weeks and deliver 10 ads. We deliver 30 ads in 72 hours — and every séance is built on real performance data from the last one. One team. No handoffs.',
        },
      },
    ],
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${fraunces.variable}`}>
      <body className="grain font-sans bg-bg text-text-primary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
