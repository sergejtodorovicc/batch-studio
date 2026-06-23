'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const days = [
  {
    day: 'Day 0',
    title: 'Onboarding',
    body: 'We learn your brand: product photos, style guide, and a 30-minute onboarding call. That is all we need from you.',
    icon: '01',
  },
  {
    day: 'Day 1',
    title: 'Finding Your Hooks',
    body: 'We analyse your ad history, customer reviews, and competitors. You get 10 ranked creative angles — the specific reasons people will buy your product.',
    icon: '02',
  },
  {
    day: 'Day 2',
    title: 'Briefs Approved',
    body: 'One-page brief per concept. You review via a short video walkthrough and approve with a comment. No calls required.',
    icon: '03',
  },
  {
    day: 'Day 3–4',
    title: 'Generation',
    body: 'AI batch production from your trained brand models. We generate 4× more than needed, then filter to the best 30.',
    icon: '04',
  },
  {
    day: 'Day 5–6',
    title: 'Polish',
    body: 'Human editing layer — colour, sound, captions, ratio crops. Taste is the last moat.',
    icon: '05',
  },
  {
    day: 'Day 7',
    title: 'Delivered',
    body: '30 launch-ready creatives delivered to a shared workspace. Your first performance data arrives in 7 days — and we use it to improve the next batch.',
    icon: '06',
    flip: true,
  },
]

export default function Process() {
  const wrapperRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      // Horizontal line draws left → right
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'left' },
        0
      )

      // Each milestone circle fills + card appears
      days.forEach((_, i) => {
        const start = i / days.length
        tl.fromTo(`.process-dot-${i}`,
          { scale: 0 },
          { scale: 1, ease: 'back.out(2)' },
          start
        )
        tl.fromTo(`.process-dot-fill-${i}`,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          start + 0.02
        )
        tl.fromTo(`.process-card-${i}`,
          { opacity: 0, y: i % 2 === 0 ? -30 : 30 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          start
        )
      })

      // Day 7 card flip at 90% scrub
      ScrollTrigger.create({
        trigger: wrapper,
        start: '85% top',
        onEnter: () => setFlipped(true),
        onLeaveBack: () => setFlipped(false),
      })

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapperRef} className="sticky-section border-t border-border" style={{ height: '400vh' }}>
      <div className="sticky-inner flex flex-col justify-center">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <span className="label">Process</span>
            <hr className="flex-1 border-none border-t border-border" />
          </div>

          {/* Headline */}
          <div className="mb-16">
            <p className="label mb-4 text-accent/70">From brief to live ads</p>
            <h2
              className="font-display font-bold text-text-primary"
              style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              7 Days.
              <br />
              <span className="text-text-muted">Start to Shipped.</span>
            </h2>
          </div>

          {/* Timeline track */}
          <div className="relative">
            {/* Cards above (even indices) */}
            <div className="flex justify-between mb-8">
              {days.map((d, i) =>
                i % 2 === 0 ? (
                  <div
                    key={i}
                    className={`process-card-${i} opacity-0`}
                    style={{ width: `${100 / days.length - 2}%` }}
                  >
                    {d.flip ? (
                      <FlipCard d={d} flipped={flipped} />
                    ) : (
                      <MilestoneCard d={d} above />
                    )}
                  </div>
                ) : (
                  <div key={i} style={{ width: `${100 / days.length - 2}%` }} />
                )
              )}
            </div>

            {/* Horizontal line + dots */}
            <div className="relative flex items-center" style={{ height: 32 }}>
              {/* Background track */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                <div className="w-full h-px bg-border relative">
                  {/* Animated fill */}
                  <div
                    ref={lineRef}
                    className="absolute inset-0 bg-accent origin-left"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              </div>

              {/* Dots */}
              <div className="relative w-full flex justify-between">
                {days.map((_, i) => (
                  <div key={i} className={`process-dot-${i} relative scale-0`}>
                    <div className="w-5 h-5 rounded-full border-2 border-border bg-bg flex items-center justify-center">
                      <div className={`process-dot-fill-${i} w-2.5 h-2.5 rounded-full bg-accent scale-0 opacity-0`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards below (odd indices) */}
            <div className="flex justify-between mt-8">
              {days.map((d, i) =>
                i % 2 !== 0 ? (
                  <div
                    key={i}
                    className={`process-card-${i} opacity-0`}
                    style={{ width: `${100 / days.length - 2}%` }}
                  >
                    <MilestoneCard d={d} above={false} />
                  </div>
                ) : (
                  <div key={i} style={{ width: `${100 / days.length - 2}%` }} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MilestoneCard({ d, above }: { d: typeof days[0]; above: boolean }) {
  return (
    <div className="glass rounded-xl p-4" style={{ borderColor: 'var(--border)' }}>
      <div className="text-xs font-mono text-accent mb-1">{d.day}</div>
      <div className="text-sm font-semibold text-text-primary mb-2">{d.title}</div>
      <p className="text-xs text-text-muted leading-relaxed">{d.body}</p>
    </div>
  )
}

function FlipCard({ d, flipped }: { d: typeof days[0]; flipped: boolean }) {
  return (
    <div style={{ perspective: 800, height: 140 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}
      >
        {/* Front */}
        <div className="glass rounded-xl p-4 absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          <div className="text-xs font-mono text-accent mb-1">{d.day}</div>
          <div className="text-sm font-semibold text-text-primary mb-2">{d.title}</div>
          <p className="text-xs text-text-muted leading-relaxed">{d.body}</p>
        </div>
        {/* Back */}
        <div
          className="rounded-xl p-4 absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(212,137,26,0.08)',
            border: '1px solid rgba(212,137,26,0.3)',
          }}
        >
          <div className="text-xl mb-2 text-accent font-bold">✓</div>
          <div className="text-sm font-bold text-accent">30 ads live.</div>
          <div className="text-xs text-text-muted mt-1">72 hours ahead of schedule.</div>
        </div>
      </div>
    </div>
  )
}
