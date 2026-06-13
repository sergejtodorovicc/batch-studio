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
  { tag: 'AI Product Photo', headline: 'Glow differently.', metric: '2.4%', metricLabel: 'Click rate', color: '#C8FF00', rotate: '-4deg', delay: 0 },
  { tag: 'AI Video Ad :15s', headline: '30 ads. 72 hours.', metric: '-31%', metricLabel: 'Cost per customer', color: '#fff', rotate: '3deg', delay: 0.15 },
  { tag: 'AI Creator Video', headline: 'No cameras needed.', metric: '44%', metricLabel: 'Stopped scrolling', color: '#888', rotate: '-2deg', delay: 0.3 },
]

export default function Hero() {
  const wrapperRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current

      // ── LOAD IN: words fall FROM ABOVE ──
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

      // ── CARDS: enter from right ──
      gsap.fromTo('.ad-card',
        { opacity: 0, x: 80, rotate: 10, scale: 0.88 },
        { opacity: 1, x: 0, rotate: 0, scale: 1, duration: 1, stagger: 0.14, ease: 'power4.out', delay: 0.7 }
      )

      // ── SCROLL 0→40%: text moves LEFT + shrinks, cards parallax ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      // Text block: slight parallax shift only — NO opacity change so text + CTAs stay readable
      tl.to('.hero-text-block', { x: -40, scale: 0.97, ease: 'none' }, 0)
        .to('.hero-cards-block', { y: -60, x: 30, ease: 'none' }, 0)
        .to('.hero-grid-bg', { opacity: 0.06, ease: 'none' }, 0)
        // Sub-line fades early (just the sub-paragraph, not the headline/CTAs)
        .to('.hero-sub', { opacity: 0, ease: 'none' }, 0)
        // 40-70%: cards converge to center
        .to('.ad-card', {
          x: (i) => [-120, 0, 120][i] ?? 0,
          y: (i) => [-40, 0, 40][i] ?? 0,
          scale: 0.85,
          opacity: 0.4,
          ease: 'none',
        }, 0.4)
        // 70-100%: full overlay fade — this is the section exit
        .to('.hero-overlay', { opacity: 1, ease: 'none' }, 0.7)

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    // Wrapper = 300vh (scroll space)
    <section ref={wrapperRef} className="sticky-section" style={{ height: '300vh' }}>
      {/* Sticky inner = 100vh always visible */}
      <div ref={stickyRef} className="sticky-inner flex items-start pt-24 pb-4">

        {/* Grid bg — reveals on scroll */}
        <div className="hero-grid-bg grid-bg absolute inset-0 opacity-[0.02] pointer-events-none" />

        {/* Accent glow */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C8FF00, transparent 70%)' }} />

        {/* Fade to black on scroll out */}
        <div className="hero-overlay absolute inset-0 bg-bg opacity-0 pointer-events-none z-20" />

        <div className="container relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT: Text */}
            <div className="hero-text-block" style={{ perspective: '1000px' }}>
              {/* Overline */}
              <div className="flex items-center gap-3 mb-5">
                <span className="accent-dot animate-[pulse-slow_3s_ease-in-out_infinite]" />
                <span className="label">AI-Native Creative Production · Est. 2026</span>
              </div>

              {/* Headline — each word falls from above */}
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

              {/* Sub */}
              <p className="hero-sub opacity-0 text-text-muted text-base md:text-lg leading-relaxed max-w-md mb-7">
                30 launch-ready creatives. 72 hours. Built on your real ad data.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#work" className="hero-cta opacity-0 inline-flex items-center gap-2 px-7 py-4 bg-accent text-bg font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity">
                  See Our Work
                </a>
                <a href="#contact" className="hero-cta opacity-0 inline-flex items-center gap-2 px-7 py-4 border border-border text-text-primary text-sm tracking-wide hover:border-text-muted transition-colors">
                  Get a Free Creative Review →
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
                {stats.map((s) => (
                  <div key={s.label} className="hero-stat opacity-0">
                    <div className="font-mono font-bold text-xl text-text-primary">{s.value}</div>
                    <div className="label mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Floating ad cards */}
            <div className="hero-cards-block hidden lg:block relative h-[480px]">
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
                    <span className="w-2 h-2 rounded-full" style={{ background: card.color }} />
                  </div>
                  {/* Mock visual */}
                  <div className="rounded-lg mb-4 flex items-center justify-center"
                    style={{ height: 110, background: `linear-gradient(135deg, ${card.color}12, ${card.color}03)`, border: `1px solid ${card.color}18` }}>
                    <div className="flex flex-col items-center gap-2 opacity-25">
                      <div className="rounded-xl" style={{ width: 40, height: 40, background: card.color }} />
                      <div className="rounded" style={{ width: 70, height: 5, background: card.color }} />
                    </div>
                  </div>
                  <div className="font-semibold text-sm text-text-primary mb-1">{card.headline}</div>
                  <div className="flex gap-4 mt-3 pt-3 border-t border-border">
                    <div>
                      <div className="font-mono text-xs font-bold" style={{ color: card.color }}>{card.metric}</div>
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
                style={{ background: 'radial-gradient(circle at 60% 50%, #C8FF00, transparent 60%)' }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <span className="label text-[10px]">Scroll</span>
          <div className="w-px h-10 bg-text-muted animate-pulse" />
        </div>
      </div>
    </section>
  )
}
