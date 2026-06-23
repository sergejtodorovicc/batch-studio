'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitLetters } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const oldItems = [
  { price: '€4,200', label: 'Brand shoot (1 day)' },
  { price: '€2,800', label: 'Video production' },
  { price: '€3,500', label: 'Retouching / editing' },
  { price: '€6,000', label: 'Agency creative fee' },
  { price: '€4,200', label: 'Ad management fee' },
  { price: '€9,300', label: 'Paid for but never used' },
]

const newItems = [
  { label: 'AI product photos', unit: '50 images' },
  { label: 'AI video ads', unit: '15 × :15s' },
  { label: 'AI creator avatars', unit: '10 variants' },
  { label: 'Copywriting', unit: 'All formats' },
  { label: 'Performance testing', unit: 'Included' },
  { label: 'Revisions', unit: 'Unlimited' },
]

export default function Problem() {
  const wrapperRef = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      // ── Letter-by-letter headline reveal ──
      const headlineEl = headlineRef.current
      if (headlineEl) {
        const letters = splitLetters(headlineEl)
        gsap.set(letters, { opacity: 0, y: -20 })

        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(letters, {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              duration: 0.5,
              ease: 'power3.out',
            })
          },
        })
      }

      // ── Scroll scrub timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // 0-30%: left side items appear
      oldItems.forEach((_, i) => {
        tl.fromTo(`.old-item-${i}`,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, ease: 'power2.out' },
          i * 0.05
        )
        tl.fromTo(`.old-strike-${i}`,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none' },
          i * 0.05 + 0.025
        )
      })

      // 30-60%: right side items appear
      newItems.forEach((_, i) => {
        tl.fromTo(`.new-item-${i}`,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, ease: 'power2.out' },
          0.3 + i * 0.05
        )
      })

      // 25-65%: counter animation €30,000 → €300
      const counterObj = { value: 30000 }
      tl.to(counterObj, {
        value: 1500,
        ease: 'power2.inOut',
        onUpdate: function () {
          if (counterRef.current) {
            const val = Math.round(counterObj.value)
            counterRef.current.textContent = `€${val.toLocaleString()}`
          }
        },
      }, 0.25)

      // 60%+: right side highlight
      tl.to('.problem-right', { borderColor: 'rgba(0,194,255,0.25)', ease: 'none' }, 0.6)
      tl.to('.savings-badge', { opacity: 1, scale: 1, ease: 'back.out' }, 0.65)

      // 85-100%: fade out
      tl.to('.problem-content', { opacity: 0, ease: 'none' }, 0.85)

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapperRef} className="sticky-section" style={{ height: '400vh' }}>
      <div className="sticky-inner">
        <div className="problem-content h-full grid grid-cols-2">

          {/* ── LEFT: The Old Way ── */}
          <div className="problem-left relative flex flex-col justify-center px-14 border-r border-border"
            style={{ background: 'linear-gradient(135deg, #1a0505 0%, #0d0d0d 100%)' }}>
            <div className="absolute top-8 left-8 label text-red-500/60">The Old Way</div>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-px bg-red-500/50" />
              <span className="label text-red-400/70">Traditional Creative Agency</span>
            </div>

            {/* Headline — letter by letter */}
            <div className="mb-10">
              <div
                ref={headlineRef}
                className="font-display font-bold leading-[1.05] text-text-primary"
                style={{ fontSize: 'clamp(28px, 3.5vw, 58px)', letterSpacing: '-0.03em' }}
              >
                {"You're paying €30K for 3 ads."}
              </div>
            </div>

            {/* Animated counter */}
            <div className="mb-10">
              <div className="label text-text-muted mb-2">Total invoice</div>
              <div className="relative inline-block">
                <span
                  ref={counterRef}
                  className="font-display font-bold text-red-400"
                  style={{ fontSize: 'clamp(44px, 6vw, 84px)', letterSpacing: '-0.04em' }}
                >
                  €30,000
                </span>
              </div>
              <div className="label text-text-muted mt-1">Per quarterly campaign</div>
            </div>

            {/* Old items with red strikethrough */}
            <div className="space-y-3">
              {oldItems.map((item, i) => (
                <div key={i} className={`old-item-${i} opacity-0 flex items-center justify-between`}>
                  <div className="relative">
                    <span className="text-text-muted text-sm">{item.label}</span>
                    <span
                      className={`old-strike-${i} absolute left-0 top-1/2 h-px bg-red-500 origin-left`}
                      style={{ width: '100%', transform: 'scaleX(0)' }}
                    />
                  </div>
                  <span className="font-mono text-sm text-red-400/70 line-through">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: The New Way ── */}
          <div
            className="problem-right relative flex flex-col justify-center px-14 border border-l-0 border-border transition-colors duration-700"
            style={{ background: 'linear-gradient(135deg, #060C14 0%, #0a1520 100%)' }}
          >
            <div className="absolute top-8 left-8 label text-accent/60">The Batch Way</div>

            {/* Savings badge */}
            <div
              className="savings-badge absolute top-8 right-8 opacity-0 scale-90 px-4 py-2 rounded-full"
              style={{ background: 'rgba(0,194,255,0.1)', border: '1px solid rgba(0,194,255,0.3)' }}
            >
              <span className="text-accent text-xs font-semibold tracking-wide">Save 90%</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-px bg-accent/50" />
              <span className="label text-accent/70">AI-Native Production</span>
            </div>

            {/* New price */}
            <div className="mb-10">
              <div className="label text-text-muted mb-2">Starts at</div>
              <div className="font-display font-bold text-accent" style={{ fontSize: 'clamp(44px, 6vw, 84px)', letterSpacing: '-0.04em' }}>
                €1,500
              </div>
              <div className="label text-text-muted mt-1">Full creative production, delivered in 72 hours</div>
            </div>

            {/* New items */}
            <div className="space-y-3">
              {newItems.map((item, i) => (
                <div key={i} className={`new-item-${i} opacity-0 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-accent/40 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-text-primary text-sm">{item.label}</span>
                  </div>
                  <span className="font-mono text-xs text-accent/70">{item.unit}</span>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 pt-8 border-t border-border">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-sm text-text-primary hover:text-accent transition-colors"
              >
                <span>Start saving today</span>
                <span className="text-accent">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
