'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '30', label: 'Creatives per month' },
  { value: '72h', label: 'Delivery guaranteed' },
  { value: '3×', label: 'Cheaper than an agency' },
  { value: '12mo', label: 'Average client stay' },
]

const adCards = [
  { tag: 'AI Product Photo', headline: 'Glow differently.', metric: '2.4%', metricLabel: 'Click rate', color: 'var(--accent)', rotate: '-4deg', delay: 0 },
  { tag: 'AI Video Ad :15s', headline: '30 ads. 72 hours.', metric: '-31%', metricLabel: 'Cost per customer', color: '#fff', rotate: '3deg', delay: 0.15 },
  { tag: 'AI Creator Video', headline: 'No cameras needed.', metric: '44%', metricLabel: 'Stopped scrolling', color: '#888', rotate: '-2deg', delay: 0.3 },
]

const cardGradients = [
  'linear-gradient(135deg, rgba(0,194,255,0.07), rgba(0,194,255,0.01))',
  'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
  'linear-gradient(135deg, rgba(107,143,168,0.05), rgba(107,143,168,0.01))',
]
const cardBorders = [
  '1px solid rgba(0,194,255,0.12)',
  '1px solid rgba(255,255,255,0.08)',
  '1px solid rgba(107,143,168,0.08)',
]
const metricColors = ['var(--accent)', 'var(--text-primary)', 'var(--text-muted)']
const dotColors = ['var(--accent)', 'var(--text-primary)', 'var(--text-muted)']

function CardMockVisual({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
        <div className="absolute top-2 right-2">
          <span className="text-[8px] font-mono font-bold" style={{ color: 'var(--accent)' }}>AI</span>
        </div>
        <div className="rounded-lg mb-2" style={{ width: 40, height: 40, background: 'var(--accent)', opacity: 0.8 }} />
        <div className="w-full flex flex-col gap-1 px-4">
          <div className="rounded" style={{ width: '100%', height: 4, background: 'rgba(0,194,255,0.15)' }} />
          <div className="rounded" style={{ width: '85%', height: 4, background: 'rgba(0,194,255,0.15)' }} />
          <div className="rounded" style={{ width: '60%', height: 4, background: 'rgba(0,194,255,0.15)' }} />
        </div>
      </div>
    )
  }
  if (i === 1) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute top-2 right-2">
          <span className="text-[8px] font-mono text-text-muted">0:15</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 4L16 10L6 16V4Z" fill="white" fillOpacity="0.6" />
        </svg>
        <div className="absolute bottom-2 left-2 right-2" style={{ height: 3, background: 'rgba(0,194,255,0.3)', borderRadius: 2 }}>
          <div style={{ width: '40%', height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
        </div>
      </div>
    )
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
      <div className="rounded-full" style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.1)' }} />
      <div className="w-full flex flex-col gap-1">
        <div className="rounded-full mx-auto" style={{ height: 3, width: '80%', background: 'rgba(136,136,136,0.2)' }} />
        <div className="rounded-full mx-auto" style={{ height: 3, width: '60%', background: 'rgba(136,136,136,0.15)' }} />
      </div>
    </div>
  )
}

export default function Hero() {
  const wrapperRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current

      gsap.fromTo('.hero-word',
        { opacity: 0, y: -50, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.3 }
      )
      gsap.fromTo('.hero-sub',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      )
      gsap.fromTo('.hero-cta',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 1.1 }
      )
      gsap.fromTo('.hero-stat',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 1.4 }
      )

      gsap.fromTo('.ad-card',
        { opacity: 0, x: 80, rotate: 10, scale: 0.88 },
        { opacity: 1, x: 0, rotate: 0, scale: 1, duration: 1, stagger: 0.14, ease: 'power4.out', delay: 0.7 }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      tl.to('.hero-text-block', { x: -40, scale: 0.97, ease: 'none' }, 0)
        .to('.hero-cards-block', { y: -60, x: 30, ease: 'none' }, 0)
        .to('.hero-grid-bg', { opacity: 0.06, ease: 'none' }, 0)
        .to('.hero-sub', { opacity: 0, ease: 'none' }, 0)
        .to('.ad-card', {
          x: (i) => [-120, 0, 120][i] ?? 0,
          y: (i) => [-40, 0, 40][i] ?? 0,
          scale: 0.85,
          opacity: 0.4,
          ease: 'none',
        }, 0.4)
        .to('.hero-overlay', { opacity: 1, ease: 'none' }, 0.7)

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapperRef} className="sticky-section" style={{ height: '300vh' }}>
      <div ref={stickyRef} className="sticky-inner flex items-start pt-24 pb-4">

        <div className="hero-grid-bg grid-bg absolute inset-0 opacity-[0.02] pointer-events-none" />

        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)' }} />

        <div className="hero-overlay absolute inset-0 bg-bg opacity-0 pointer-events-none z-20" />

        <div className="container relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* LEFT: Text */}
            <div className="hero-text-block" style={{ perspective: '1000px' }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="accent-dot animate-[pulse-slow_3s_ease-in-out_infinite]" />
                <span className="label">AI-Native Creative Production</span>
              </div>

              <div className="mb-5">
                {['We Build Ads', "That Don't", 'Need Cameras.'].map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <span
                      className="hero-word block font-display font-bold leading-none opacity-0"
                      style={{
                        fontSize: 'clamp(44px, 6.5vw, 100px)',
                        letterSpacing: '-0.04em',
                        color: i === 2 ? 'var(--accent)' : 'var(--text-primary)',
                      }}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              <p className="hero-sub opacity-0 text-text-muted text-base md:text-lg leading-relaxed max-w-md mb-7">
                30 launch-ready creatives. 72 hours. Built on your real ad data.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#contact" className="hero-cta opacity-0 inline-flex items-center gap-2 px-7 py-4 bg-accent text-bg font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity">
                  Book Free Strategy Call
                </a>
                <a href="#process" className="hero-cta opacity-0 inline-flex items-center gap-2 px-7 py-4 border border-border text-text-primary text-sm tracking-wide hover:border-text-muted transition-colors">
                  See How It Works →
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border">
                {stats.map((s) => (
                  <div key={s.label} className="hero-stat opacity-0">
                    <div className="font-mono font-bold text-xl text-text-primary">{s.value}</div>
                    <div className="label mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Floating ad cards */}
            <div className="hero-cards-block hidden md:block relative h-[480px]">
              {adCards.map((card, i) => (
                <div
                  key={i}
                  className="ad-card opacity-0 absolute glass rounded-2xl p-6 cursor-default"
                  style={{
                    width: 230,
                    top: i === 0 ? '4%' : i === 1 ? '36%' : '64%',
                    left: i === 0 ? '8%' : i === 1 ? '48%' : '4%',
                    '--rotate': card.rotate,
                    animation: `float ${4 + i * 0.8}s ease-in-out ${i * 0.7}s infinite`,
                    zIndex: 3 - i,
                  } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-text-muted tracking-wider">{card.tag}</span>
                    <span className="w-2 h-2 rounded-full" style={{ background: dotColors[i] }} />
                  </div>
                  {/* Mock visual */}
                  <div className="rounded-lg mb-4 relative overflow-hidden"
                    style={{ height: 110, background: cardGradients[i], border: cardBorders[i] }}>
                    <CardMockVisual i={i} />
                  </div>
                  <div className="font-semibold text-sm text-text-primary mb-1">{card.headline}</div>
                  <div className="flex gap-4 mt-3 pt-3 border-t border-border">
                    <div>
                      <div className="font-mono text-xs font-bold" style={{ color: metricColors[i] }}>{card.metric}</div>
                      <div className="text-[9px] text-text-muted">{card.metricLabel}</div>
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-text-primary">72h</div>
                      <div className="text-[9px] text-text-muted">Delivered</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute inset-0 rounded-full opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(circle at 60% 50%, var(--accent), transparent 60%)' }} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <span className="label text-[10px]">Scroll</span>
          <div className="w-px h-10 bg-text-muted animate-pulse" />
        </div>
      </div>
    </section>
  )
}
