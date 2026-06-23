'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cases = [
  {
    index: '01',
    client: 'NOVAPURE',
    tag: 'Supplements · DTC',
    challenge: 'Their ads burned out every 3 weeks. By the time the agency delivered new ones, results had already dropped.',
    challengePoints: [
      'Ad ideas burned out every 3 weeks',
      'Agency batch took 3 weeks to arrive',
      'Sales dropping every single month',
      'Only 8 ads per month to test',
    ],
    solutionPoints: [
      '30 fresh ads delivered every month',
      '10 different angles tested at once',
      'AI trained on their specific products',
      'Weekly report on which ads are winning',
    ],
    results: [
      { value: '31%', label: 'cheaper to get a customer', direction: '↓' },
      { value: '2.4%', label: 'click rate (avg is 0.9%)', direction: '↑' },
      { value: '72h', label: 'delivery time', direction: '' },
      { value: '4×', label: 'more ad angles tested at once', direction: '↑' },
    ],
    adCards: [
      { tag: 'Static Ad', color: 'var(--accent)' },
      { tag: 'Video 15s', color: '#fff' },
      { tag: 'Creator Style', color: '#888' },
    ],
  },
  {
    index: '02',
    client: 'LUMÉ SKINCARE',
    tag: 'Beauty · Skincare',
    challenge: 'Content creators kept disappearing or missing deadlines. The brand looked different in every ad. They couldn\'t test enough concepts to find what actually worked.',
    challengePoints: [
      'Content creators going quiet last minute',
      'Brand looked different in every ad',
      'Could only test 8 ads per month',
      'Paying €31 to get each new customer',
    ],
    solutionPoints: [
      'AI video actors — no real people needed',
      '20 product scenes, zero photo shoots',
      'Fresh ads with performance data weekly',
      'Same brand look across every single ad',
    ],
    results: [
      { value: '44%', label: 'Viewers stopped scrolling', direction: '↑' },
      { value: '€18', label: 'to get a customer (was €31)', direction: '↓' },
      { value: '60', label: 'ads in the first month', direction: '' },
      { value: '0', label: 'photo shoots needed', direction: '' },
    ],
    adCards: [
      { tag: 'Product Photo', color: 'var(--accent)' },
      { tag: 'Reels Ad', color: '#f0a0c0' },
      { tag: 'Story Ad', color: '#888' },
    ],
  },
]

export default function CaseStudies() {
  const wrapperRef = useRef<HTMLElement>(null)
  const [activeCase, setActiveCase] = useState(0)
  const [activeCheckmarks, setActiveCheckmarks] = useState<number[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      // Panel 0: visible from scroll 0 → fades out at 44%-49%
      // GAP: 49%-50% — both panels invisible
      // Panel 1: slides in from 50% onward — solid background covers any remnant of panel 0
      gsap.set('.cs-panel-0', { autoAlpha: 1, x: 0 })
      gsap.set('.cs-panel-1', { autoAlpha: 0, x: '5%' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress
            const caseIdx = p < 0.5 ? 0 : 1
            setActiveCase(caseIdx)
            const caseProgress = caseIdx === 0 ? p / 0.5 : (p - 0.5) / 0.5
            const numChecks = Math.floor(caseProgress * 5)
            setActiveCheckmarks(Array.from({ length: Math.min(numChecks, 4) }, (_, i) => i))
          },
        },
      })

      // Panel 0 fades OUT — done by 0.49
      tl.to('.cs-panel-0', { autoAlpha: 0, x: '-3%', ease: 'power2.in', duration: 0.06 }, 0.43)

      // Panel 1 slides in FROM RIGHT — starts AFTER panel 0 is gone (0.50)
      // Solid bg on panel-1 means no bleed-through from panel-0 even on slow scroll
      tl.fromTo('.cs-panel-1',
        { autoAlpha: 0, x: '5%' },
        { autoAlpha: 1, x: 0, ease: 'power3.out', duration: 0.10 },
        0.50
      )
      tl.to('.cs-panel-1', { autoAlpha: 0, ease: 'none', duration: 0.04 }, 0.95)

      // Client name blur-clear on enter
      cases.forEach((_, i) => {
        const start = i * 0.5
        tl.fromTo(`.client-name-${i}`,
          { filter: 'blur(4px)', opacity: 0.5 },
          { filter: 'blur(0px)', opacity: 1, duration: 0.06 },
          start
        )
      })

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapperRef} className="sticky-section border-t border-border" style={{ height: '600vh' }}>
      <div className="sticky-inner">
        {/* Pinned header */}
        <div className="absolute top-0 left-0 right-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
          <div className="container flex items-center justify-between py-4">
            <span className="label">Results</span>
            <div className="flex items-center gap-2">
              {cases.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: activeCase === i ? 32 : 8,
                    background: activeCase === i ? 'var(--accent)' : 'var(--border)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Case panels — solid background prevents bleed-through during transition */}
        <div className="relative h-full overflow-hidden">
          {cases.map((c, i) => (
            <div
              key={i}
              className={`cs-panel-${i} absolute inset-0 flex items-center`}
              style={{ background: 'var(--bg)' }}
            >
              <div className="container w-full pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                  {/* LEFT: Challenge + Solution */}
                  <div>
                    <div className="mb-8">
                      <span className="label text-text-muted mb-2 block">{c.tag} · Case {c.index}</span>
                      <h2
                        className={`client-name-${i} glitch font-display font-bold text-text-primary`}
                        data-text={c.client}
                        style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', letterSpacing: '-0.03em' }}
                      >
                        {c.client}
                      </h2>
                    </div>

                    {/* The problem — crossed out as solution reveals */}
                    <div className="mb-8">
                      <div className="label text-red-400 mb-4">The Problem</div>
                      <div className="space-y-2">
                        {c.challengePoints.map((pt, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <span className="text-red-500/60 text-xs shrink-0">✗</span>
                            <span
                              className="text-sm text-text-muted"
                              style={{
                                textDecoration: activeCase === i && activeCheckmarks.includes(j) ? 'line-through' : 'none',
                                textDecorationColor: 'rgba(255,59,48,0.5)',
                                transition: 'text-decoration 0.3s',
                              }}
                            >
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Solution — reveals one by one as you scroll */}
                    <div>
                      <div className="label text-accent mb-4">What We Did</div>
                      <div className="space-y-2">
                        {c.solutionPoints.map((pt, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-3 transition-opacity duration-300"
                            style={{ opacity: activeCase === i && activeCheckmarks.includes(j) ? 1 : 0.15 }}
                          >
                            <span className="text-accent text-xs font-bold shrink-0">✓</span>
                            <span className="text-sm text-text-primary">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Results */}
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {c.results.map((r, j) => (
                        <div
                          key={j}
                          className="glass rounded-xl p-5 transition-opacity duration-300"
                          style={{ opacity: activeCase === i && activeCheckmarks.includes(j) ? 1 : 0.3 }}
                        >
                          <div className="font-mono font-bold text-2xl text-accent flex items-baseline gap-1">
                            {r.direction && <span className="text-sm text-text-muted">{r.direction}</span>}
                            {r.value}
                          </div>
                          <div className="text-xs text-text-muted mt-1 leading-relaxed">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Sample deliverables */}
                    <div>
                      <div className="label text-text-muted mb-3">Sample deliverables</div>
                      <div className="flex gap-3">
                        {c.adCards.map((card, j) => (
                          <div
                            key={j}
                            className="glass rounded-xl p-4 flex-1 transition-all duration-300"
                            style={{
                              borderColor: activeCase === i && activeCheckmarks.length > j
                                ? 'rgba(0,194,255,0.25)'
                                : 'var(--border)',
                            }}
                          >
                            <div
                              className="rounded-lg mb-3 flex items-center justify-center"
                              style={{ height: 80, background: j === 0 ? 'linear-gradient(135deg, rgba(0,194,255,0.06), transparent)' : j === 1 ? 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent)' : 'linear-gradient(135deg, rgba(107,143,168,0.04), transparent)' }}
                            >
                              <div className="w-8 h-8 rounded-lg" style={{ background: j === 0 ? 'rgba(0,194,255,0.12)' : j === 1 ? 'rgba(255,255,255,0.08)' : 'rgba(107,143,168,0.08)' }} />
                            </div>
                            <div className="text-[10px] font-mono text-text-muted">{card.tag}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
