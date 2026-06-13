'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { typewriter } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const BRIEF_TEXT = `CLIENT: Brand X — Supplements
---
Hook: "What if your product sold itself?"
Visual: AI avatar · natural lighting · creator-style feel
Claim: 3× more clicks than static image
CTA: "Shop now" · limited stock
Format: 9:16 vertical · 15 sec · subtitles
─────────────────────────────
Status: APPROVED ✓`

const stages = [
  { num: '01', title: 'Finding Your Hooks', detail: '2h · Strategist' },
  { num: '02', title: 'Creative Brief', detail: '1h · Strategist' },
  { num: '03', title: 'Build Everything', detail: '3h · AI Stack + Editor' },
  { num: '04', title: 'Human Touch', detail: '4h · Editor' },
  { num: '05', title: 'Live & Learning', detail: '1h · PM + Strategist' },
]

export default function System() {
  const wrapperRef = useRef<HTMLElement>(null)
  const typewriterRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      // All tweens default to tiny duration so stages NEVER overlap.
      // Each stage: fade IN fast → hold → fade OUT fast → GAP → next stage.
      const tl = gsap.timeline({
        defaults: { ease: 'none', duration: 0.03 },
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // ── STAGE 01 (0 → 20%) ────────────────────────────
      // Fade in: 0→0.04 | Hold | Fade OUT: 0.16→0.20 → then NOTHING is visible
      tl.fromTo('.stage-01-content',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.04 },
        0
      )
      tl.fromTo('.angle-card',
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.011, duration: 0.022, ease: 'power2.out' },
        0.03
      )
      tl.to('.stage-01-content', { autoAlpha: 0, duration: 0.04 }, 0.16)

      // GAP: 0.20 — completely blank (both stages at autoAlpha:0 = visibility:hidden)

      // ── STAGE 02 (0.21 → 38%) ─────────────────────────
      tl.fromTo('.stage-02-content', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.21)
      tl.to('.stage-02-content', { autoAlpha: 0, duration: 0.03 }, 0.37)

      // GAP: 0.40

      // ── STAGE 03 (0.41 → 57%) ─────────────────────────
      tl.fromTo('.stage-03-content', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.41)
      tl.fromTo('.shimmer-bar',
        { scaleX: 1 },
        { scaleX: 0, stagger: 0.02, ease: 'power2.inOut', duration: 0.04, transformOrigin: 'right' },
        0.44
      )
      tl.fromTo('.gen-card',
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, stagger: 0.025, ease: 'back.out', duration: 0.03 },
        0.49
      )
      tl.to('.stage-03-content', { autoAlpha: 0, duration: 0.03 }, 0.57)

      // GAP: 0.60

      // ── STAGE 04 (0.61 → 77%) ─────────────────────────
      tl.fromTo('.stage-04-content', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.61)
      tl.fromTo('.wipe-overlay-04',
        { scaleX: 1 },
        { scaleX: 0, ease: 'power3.inOut', duration: 0.10, transformOrigin: 'left' },
        0.65
      )
      tl.to('.stage-04-content', { autoAlpha: 0, duration: 0.03 }, 0.77)

      // GAP: 0.80

      // ── STAGE 05 (0.81 → end) ─────────────────────────
      tl.fromTo('.stage-05-content', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.81)
      tl.fromTo('.graph-bar',
        { scaleY: 0 },
        { scaleY: 1, stagger: 0.02, ease: 'power3.out', duration: 0.03, transformOrigin: 'bottom' },
        0.85
      )
      tl.fromTo('.notif-card',
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, ease: 'back.out', duration: 0.04 },
        0.88
      )

      // Sidebar: fill track + label highlights
      tl.to('.stage-dot-fill', { height: '100%', ease: 'none', duration: 0.95 }, 0)

      const stagePositions = [0, 0.21, 0.41, 0.61, 0.81]
      stagePositions.forEach((pos, i) => {
        tl.to(`.stage-num-${i}`, { color: 'var(--accent)', fontWeight: 700, duration: 0.01 }, pos)
        if (i > 0) {
          tl.to(`.stage-num-${i - 1}`, { color: 'var(--text-muted)', fontWeight: 400, duration: 0.01 }, pos)
        }
      })

      // Typewriter: only fires when stage 02 is active
      ScrollTrigger.create({
        trigger: wrapper,
        start: '21% top',
        end: '37% top',
        onEnter: () => {
          const el = typewriterRef.current
          if (el && !el.textContent) typewriter(el, BRIEF_TEXT, 2.5)
        },
      })

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  const angles = [
    '① "You won\'t believe…" — curiosity hook',
    '② "I tested 30 brands — here\'s the winner"',
    '③ Before / After transformation',
    '④ Founder story — from nothing to €2M',
    '⑤ Social proof — 1,400 five-star reviews',
    '⑥ Competitor breakdown',
    '⑦ "Stop buying X until you see this"',
    '⑧ Day-in-the-life creator style',
    '⑨ Problem-first — relatable pain point',
    '⑩ Seasonal urgency — limited time offer',
  ]

  const genCards = [
    { tag: 'Static Ads', count: 24 },
    { tag: 'Video 15s', count: 18 },
    { tag: 'Creator Video', count: 12 },
    { tag: 'Stories', count: 16 },
  ]

  const graphData = [40, 55, 48, 70, 62, 88, 95]

  return (
    <section ref={wrapperRef} className="sticky-section" style={{ height: '500vh' }}>
      <div className="sticky-inner">
        <div className="h-full flex">

          {/* ── LEFT SIDEBAR ── */}
          <div className="hidden lg:flex flex-col justify-center w-48 shrink-0 px-8 border-r border-border">
            <div className="label mb-6 text-accent/60">Our System</div>
            <div className="relative">
              <div className="absolute left-[7px] top-0 w-px bg-border" style={{ height: '100%' }}>
                <div className="stage-dot-fill w-full bg-accent origin-top" style={{ height: '0%' }} />
              </div>
              <div className="space-y-8 pl-6">
                {stages.map((s, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full border border-border bg-bg" />
                    <div className={`stage-num-${i} text-xs font-mono text-text-muted`}>
                      {s.num} — {s.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: stage content ── */}
          <div className="relative flex-1 overflow-hidden">

            {/* Pinned top label — always visible */}
            <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
              <h2 className="font-display font-bold text-text-primary" style={{ fontSize: 'clamp(28px, 3vw, 48px)', letterSpacing: '-0.02em' }}>
                Here&apos;s how we do it.
              </h2>
              <span className="label hidden md:block">5 steps · 72 hours · 30 ads</span>
            </div>

            {/* ── STAGE 01: Research ── */}
            <div
              className="stage-01-content absolute inset-0 flex flex-col justify-center px-12 pt-24"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              <div className="label text-accent/70 mb-3">Step 1 · Finding Your Hooks</div>
              <h3 className="font-semibold text-2xl text-text-primary mb-2">
                10 reasons your product will make someone stop scrolling. Ranked.
              </h3>
              <p className="text-sm text-text-muted mb-5 max-w-md">
                We go through your reviews, your old ads, and your competitors. We come up with 10 specific angles — ranked by what&apos;s most likely to get people to click and buy.
              </p>
              <div className="space-y-1.5 max-w-lg">
                {angles.map((a, i) => (
                  <div
                    key={i}
                    className="angle-card glass rounded-lg px-4 py-2.5 text-sm text-text-muted font-mono"
                    style={{ opacity: 0 }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* ── STAGE 02: Brief ── */}
            <div
              className="stage-02-content absolute inset-0 flex flex-col justify-center px-12 pt-24"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              <div className="label text-accent/70 mb-3">Step 2 · Creative Brief</div>
              <h3 className="font-semibold text-2xl text-text-primary mb-2">
                You see the plan before we build anything.
              </h3>
              <p className="text-sm text-text-muted mb-5 max-w-md">
                One page per concept. Hook, visual style, what we&apos;re claiming, call to action. You approve it. No surprises, no wasted work.
              </p>
              <div className="glass rounded-xl p-6 max-w-lg font-mono text-xs leading-relaxed border border-border">
                <pre ref={typewriterRef} className="typewriter-cursor whitespace-pre-wrap text-accent/80" />
              </div>
            </div>

            {/* ── STAGE 03: Production ── */}
            <div
              className="stage-03-content absolute inset-0 flex flex-col justify-center px-12 pt-24"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              <div className="label text-accent/70 mb-3">Step 3 · Build Everything</div>
              <h3 className="font-semibold text-2xl text-text-primary mb-2">
                We build 4× more than you need. Only the best 30 reach you.
              </h3>
              <p className="text-sm text-text-muted mb-5 max-w-md">
                We over-produce on purpose — more versions means a better chance of finding one that actually wins. You only see the ones that passed our filter.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {genCards.map((card, i) => (
                  <div key={i} className="gen-card glass rounded-xl p-5 relative overflow-hidden" style={{ opacity: 0 }}>
                    <div className="shimmer-bar shimmer absolute inset-0 rounded-xl" />
                    <div className="relative z-10">
                      <div className="label text-text-muted mb-2">{card.tag}</div>
                      <div className="font-mono font-bold text-2xl text-accent">{card.count}</div>
                      <div className="text-xs text-text-muted mt-1">versions made</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 label text-text-muted">70 versions made → best 30 delivered to you</div>
            </div>

            {/* ── STAGE 04: Quality Check ── */}
            <div
              className="stage-04-content absolute inset-0 flex flex-col justify-center px-12 pt-24"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              <div className="label text-accent/70 mb-3">Step 4 · Human Touch</div>
              <h3 className="font-semibold text-2xl text-text-primary mb-2">
                AI generates. Humans make it perfect.
              </h3>
              <p className="text-sm text-text-muted mb-5 max-w-md">
                AI makes the raw material. Our editor makes it look right. Colour, sound, captions, format — this is what separates a professional ad from generic AI output.
              </p>
              <div className="grid grid-cols-2 gap-6 max-w-lg">
                <div className="relative rounded-xl overflow-hidden border border-border">
                  <div style={{ height: 180, background: 'linear-gradient(135deg, #1a1a1a, #111)' }}
                    className="flex items-center justify-center">
                    <span className="text-text-muted text-xs font-mono">Raw AI output</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-surface">
                    <div className="label text-text-muted">Before</div>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-accent/30">
                  <div style={{ height: 180, background: 'linear-gradient(135deg, #0d1a05, #0a120a)' }}
                    className="flex items-center justify-center">
                    <span className="text-accent text-xs font-mono">Human-polished ✓</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3" style={{ background: 'rgba(200,255,0,0.05)' }}>
                    <div className="label text-accent/70">After</div>
                  </div>
                  <div className="wipe-overlay-04 wipe-overlay rounded-xl" style={{ transformOrigin: 'left' }} />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-text-muted font-mono">
                {['Color grading', 'Subtitles', 'Sound design', 'Every format included'].map(t => (
                  <span key={t} className="px-3 py-1.5 border border-border rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* ── STAGE 05: Delivery ── */}
            <div
              className="stage-05-content absolute inset-0 flex flex-col justify-center px-12 pt-24"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              <div className="label text-accent/70 mb-3">Step 5 · Live & Learning</div>
              <h3 className="font-semibold text-2xl text-text-primary mb-2">
                Each month gets smarter.
              </h3>
              <p className="text-sm text-text-muted mb-6 max-w-md">
                30 ads in 72 hours. After a week live, we check which ones worked. That data goes into next month&apos;s ads — so results keep improving automatically.
              </p>

              <div
                className="notif-card glass rounded-xl p-4 max-w-xs mb-6 border border-accent/20 flex items-start gap-4"
                style={{ opacity: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">Delivery complete</div>
                  <div className="text-xs text-text-muted mt-1">30 creatives delivered · 68 hours</div>
                  <div className="text-xs text-accent mt-1">We check results in 7 days and improve ↗</div>
                </div>
              </div>

              <div>
                <div className="label text-text-muted mb-3">Click rate improvement — batch over batch</div>
                <div className="flex items-end gap-2" style={{ height: 110 }}>
                  {graphData.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="graph-bar w-full rounded-t"
                        style={{
                          height: `${h}%`,
                          background: i === graphData.length - 1 ? 'var(--accent)' : 'rgba(200,255,0,0.25)',
                          transform: 'scaleY(0)',
                          transformOrigin: 'bottom',
                        }}
                      />
                      <span className="text-[9px] font-mono text-text-muted">M{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
