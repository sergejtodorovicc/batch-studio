'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    tag: 'Entry',
    name: 'Creative Sprint',
    priceNum: 1500,
    price: '€1,500',
    period: 'one-time',
    desc: 'Try us before committing to anything. 10 ads, 3 videos, delivered in 72h. If you don\'t love it, you\'ve learned something cheap.',
    deliverables: ['10 static ads', '3 video ads', '1 angle map', '72h delivery', '1 revision round', 'Keep everything'],
    cta: 'Start a Sprint',
    highlight: false,
  },
  {
    tag: 'Core',
    name: 'Creative Engine',
    priceNum: 4500,
    price: '€4,500',
    period: '/month',
    desc: '30 ads every month. Delivered in 72 hours. Gets better every batch.',
    deliverables: ['20 static ads', '6 video ads', '4 creator-style videos', 'Weekly drops', 'Monthly win report', 'Slack channel', 'We track what works'],
    cta: 'Start Engine',
    highlight: true,
  },
  {
    tag: 'Premium',
    name: 'Engine Pro',
    priceNum: 9000,
    price: '€9,000',
    period: '/month',
    desc: 'For brands spending over €100K/month on ads. More volume, a dedicated strategist, and weekly calls.',
    deliverables: ['60 assets/month', 'LP + CRO creative', 'Dedicated strategist', 'Creator-style video ads', 'Weekly strategy call', 'Priority turnaround'],
    cta: 'Apply for Pro',
    highlight: false,
  },
  {
    tag: 'Project',
    name: 'AI Commercial',
    priceNum: 12000,
    price: '€12–25K',
    period: 'per project',
    desc: 'A proper AI-made film for your brand. Launch videos, brand campaigns, big PR moments — looks real, costs a fraction.',
    deliverables: ['30–60s hero film', '15 platform cutdowns', 'Sound design', 'All formats included', '2 revision rounds', 'Portfolio asset'],
    cta: 'Discuss Project',
    highlight: false,
  },
  {
    tag: 'Enterprise',
    name: 'Systems Install',
    priceNum: 36000,
    price: '€36,000',
    period: '+ €7,500/mo',
    desc: 'We come in, build the whole AI creative system inside your company, train your team, and leave you with something that runs without us.',
    deliverables: ['8-week setup', 'Full AI creative system', 'Proven creative templates', 'Your brand trained into the system', 'Team training & documentation', '90-day support'],
    cta: 'Book Discovery Call',
    highlight: false,
  },
]

export default function Services() {
  const wrapperRef = useRef<HTMLElement>(null)
  const priceRef = useRef<HTMLSpanElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              services.length - 1,
              Math.floor(self.progress * services.length)
            )
            setActiveIdx(idx)
          },
        },
      })

      // Each card slides up, previous shrinks to tab
      services.forEach((_, i) => {
        const startAt = i / services.length

        // Boost z-index of incoming card so it always appears above all others during slide-in
        tl.set(`.service-card-full-${i}`, { zIndex: 100 }, startAt)

        // New card slides up fast — explicit short duration prevents long overlap window
        tl.fromTo(`.service-card-full-${i}`,
          { y: 60, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: 'power3.out', duration: 0.07 },
          startAt
        )

        // Previous card: body vanishes instantly, then card collapses to mini tab
        if (i > 0) {
          tl.to(`.service-card-body-${i - 1}`, { autoAlpha: 0, ease: 'none', duration: 0.03 }, startAt)
          tl.to(`.service-card-full-${i - 1}`, {
            y: -(i - 1) * 48,
            height: 44,
            scale: 1 - i * 0.015,
            opacity: 0.5,
            ease: 'power2.inOut',
            duration: 0.06,
          }, startAt + 0.02)
          // After collapse, restore z-index to original order so mini tabs stack correctly
          tl.set(`.service-card-full-${i - 1}`, { zIndex: services.length - (i - 1) }, startAt + 0.09)
        }
      })

      tl.to('.services-stack', { autoAlpha: 0, ease: 'none', duration: 0.03 }, 0.97)

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  // Count-up price animation when active service changes
  useEffect(() => {
    const target = services[activeIdx].priceNum
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (priceRef.current) {
          priceRef.current.textContent = `€${Math.round(obj.val).toLocaleString()}`
        }
      },
    })
  }, [activeIdx])

  const active = services[activeIdx]

  return (
    <section ref={wrapperRef} className="sticky-section border-t border-border" style={{ height: '600vh' }} id="services">
      <div className="sticky-inner flex flex-col">
        {/* Top header — always visible */}
        <div className="border-b border-border">
          <div className="container flex items-center justify-between py-4">
            <span className="label">Services</span>
            <div className="flex items-center gap-2">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="transition-all duration-300"
                  style={{
                    width: activeIdx === i ? 28 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: activeIdx === i ? 'var(--accent)' : 'var(--border)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="container w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* LEFT: pinned info */}
              <div>
                <p className="label mb-4 text-accent/70">One service. Five sizes. Start wherever makes sense.</p>
                <h2
                  className="font-display font-bold text-text-primary mb-6"
                  style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {active.tag}
                  <br />
                  <span className="text-accent">{active.name}</span>
                </h2>

                {/* Price count-up */}
                <div className="mb-4">
                  <span
                    ref={priceRef}
                    className="font-mono font-bold text-text-primary"
                    style={{ fontSize: 'clamp(44px, 6vw, 80px)', letterSpacing: '-0.04em' }}
                  >
                    €0
                  </span>
                  <span className="text-text-muted text-lg ml-2">{active.period}</span>
                </div>

                <p className="text-text-muted leading-relaxed mb-8 max-w-sm">{active.desc}</p>

                <div className="relative inline-block">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all duration-300"
                    style={{
                      background: active.highlight ? 'var(--accent)' : 'transparent',
                      color: active.highlight ? 'var(--bg)' : 'var(--text-primary)',
                      border: active.highlight ? 'none' : '1px solid var(--border)',
                    }}
                  >
                    {active.cta} →
                  </a>
                </div>

                {/* Ascension path */}
                <div className="mt-10 flex items-center gap-2 text-xs text-text-muted font-mono flex-wrap">
                  {services.map((s, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className={i === activeIdx ? 'text-accent font-bold' : ''}>{s.tag}</span>
                      {i < services.length - 1 && <span className="text-border">→</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: stacking cards */}
              <div className="services-stack relative" style={{ height: 400 }}>
                {services.map((s, i) => (
                  <div
                    key={i}
                    className={`service-card-full-${i} glass rounded-xl overflow-hidden mb-2 absolute inset-x-0 top-0`}
                    style={{
                      background: '#111111',
                      opacity: i === 0 ? 1 : 0,
                      transform: i === 0 ? 'none' : 'translateY(60px)',
                      zIndex: services.length - i,
                    }}
                  >
                    {/* Tab header — always shown when collapsed */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <span className="label text-text-muted">{s.tag}</span>
                        <span className="text-sm font-semibold text-text-primary">{s.name}</span>
                      </div>
                      <span className="font-mono text-sm font-bold" style={{ color: s.highlight ? 'var(--accent)' : 'var(--text-muted)' }}>
                        {s.price}
                      </span>
                    </div>

                    {/* Body — collapses when stacked */}
                    <div className={`service-card-body-${i} p-5`}>
                      <ul className="space-y-2">
                        {s.deliverables.map((d, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-text-muted">
                            <span className="text-accent">✓</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                      {s.highlight && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <span className="accent-dot" />
                            <span className="text-xs text-text-muted">Most popular · 40% of Sprint clients upgrade here</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
