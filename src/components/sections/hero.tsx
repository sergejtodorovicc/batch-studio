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

const conceptImages = [
  { src: '/images/concept-miumiu.jpg', aspect: '4/3' },
  { src: '/images/concept-givenchy.jpg', aspect: '3/4' },
  { src: '/images/concept-croc.jpg', aspect: '4/3' },
]


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

      gsap.fromTo('.hero-images-block',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
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
                <span className="label">AI Creative Production · No Cameras</span>
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
                        fontStyle: i === 2 ? 'italic' : 'normal',
                      }}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              <p className="hero-sub opacity-0 text-text-muted text-base md:text-lg leading-relaxed max-w-md mb-7">
                We summon 30 launch-ready ads in 72 hours. No cameras. No shoots. No contracts.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#contact" className="hero-cta opacity-0 inline-flex items-center gap-2 px-7 py-4 bg-accent text-bg font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity">
                  Book a Session
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

            {/* RIGHT: Concept images */}
            <div className="hero-cards-block hero-images-block hidden md:flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="rounded-xl overflow-hidden flex-1" style={{ aspectRatio: '4/3' }}>
                  <img src={conceptImages[0].src} alt="AI concept" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '3/4', width: 140 }}>
                  <img src={conceptImages[1].src} alt="AI concept" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="rounded-xl overflow-hidden w-full" style={{ aspectRatio: '16/7' }}>
                <img src={conceptImages[2].src} alt="AI concept" className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] font-mono text-text-muted text-right">
                Creative concepts · AI-generated · Not affiliated with any brand shown
              </p>
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
