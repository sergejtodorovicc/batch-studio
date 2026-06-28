'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cases = [
  {
    index: '01',
    client: 'NIKE',
    tag: 'Sportswear · Global Campaign',
    challenge: 'A global campaign across 12 markets. Traditional production couldn\'t keep pace with the number of creative variations needed to actually test what works.',
    challengePoints: [
      'Production agency: 6 weeks per campaign',
      '$180K+ per global shoot, one creative direction',
      '12 markets forced into the same visual',
      'No time to test angles before launch',
    ],
    solutionPoints: [
      '60 campaign variations delivered in 72 hours',
      'Market-specific creative, consistent brand identity',
      'AI trained on brand motion language and aesthetic',
      'Performance data fed back into every next séance',
    ],
    results: [
      { value: '60', label: 'campaign assets in 72h', direction: '' },
      { value: '12×', label: 'more creative variations tested', direction: '↑' },
      { value: '72h', label: 'vs 6-week agency turnaround', direction: '' },
      { value: '0', label: 'cameras, shoots, or travel needed', direction: '' },
    ],
    adCards: [
      { tag: 'Campaign Visual', src: '/images/nike 1.png' },
      { tag: 'Campaign Visual', src: '/images/nike 2.png' },
      { tag: 'Campaign Visual', src: '/images/nike 3.png' },
    ],
  },
  {
    index: '02',
    client: 'JOHNNIE WALKER',
    tag: 'Premium Spirits · Lifestyle',
    challenge: 'A heritage brand needing to speak to a new generation — without losing the premium aesthetic that took 200 years to build.',
    challengePoints: [
      'Premium production: slow and expensive',
      'New audience, same old creative playbook',
      'Agency content felt generic and off-brand',
      'Only 4–6 assets delivered per quarter',
    ],
    solutionPoints: [
      'AI-generated luxury visuals trained on the brand',
      'Brand language built in, not guessed at',
      '30 premium assets per month, not per quarter',
      'Consistent high-end look across every frame',
    ],
    results: [
      { value: '30', label: 'premium assets per month', direction: '' },
      { value: '5×', label: 'more content than before', direction: '↑' },
      { value: '72h', label: 'delivery per séance', direction: '' },
      { value: '0', label: 'off-brand assets in final delivery', direction: '' },
    ],
    adCards: [
      { tag: 'Brand Visual', src: '/images/jw 1.png' },
      { tag: 'Brand Visual', src: '/images/jw 2.png' },
      { tag: 'Brand Visual', src: '/images/jw 3.png' },
    ],
  },
]

export default function CaseStudies() {
  const wrapperRef = useRef<HTMLElement>(null)
  const [activeCase, setActiveCase] = useState(0)
  const [activeCheckmarks, setActiveCheckmarks] = useState<number[]>([])

  useEffect(() => {
    if (window.innerWidth < 768) return
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

                    {/* Creative concepts */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="label text-text-muted">Creative concepts</div>
                        <div className="label text-text-muted/50" style={{ fontSize: 9 }}>AI-generated · Concept only · Not affiliated with any brand shown</div>
                      </div>
                      <div className="flex gap-2">
                        {c.adCards.map((card, j) => (
                          <div key={j} className="flex-1 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                            <img
                              src={card.src}
                              alt={`AI-generated ${card.tag.toLowerCase()} for ${c.client} — concept only, not affiliated with ${c.client}`}
                              className="w-full h-auto block"
                            />
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
