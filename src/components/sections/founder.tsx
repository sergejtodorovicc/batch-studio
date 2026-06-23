'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { typewriter } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const quoteLines = [
  'The brands that will win the next decade',
  "aren't the ones with the biggest budgets.",
  '',
  "They're the ones who learn to move faster",
  'than their competitors can react.',
]

const FOUNDER_NOTE = "I built Batch because I watched great products lose to inferior ones — just because the competitor had more creative volume and faster production. AI changed what is possible. We built the system to make sure the right brands win."

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null)
  const noteRef = useRef<HTMLParagraphElement>(null)
  const linesTriggered = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // True mask reveal: lines come UP from below (yPercent 100 → 0, with overflow hidden wrapper)
      document.querySelectorAll('.founder-mask').forEach((wrapper, i) => {
        const inner = wrapper.querySelector('.founder-line')
        if (!inner) return
        gsap.fromTo(inner,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: 'power4.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: '.founder-quote',
              start: 'top 75%',
              onEnter: () => {
                if (linesTriggered.current) return
              },
            },
          }
        )
      })

      // Typewriter for founder note
      ScrollTrigger.create({
        trigger: '.founder-note-block',
        start: 'top 80%',
        onEnter: () => {
          const el = noteRef.current
          if (el && !el.textContent) {
            typewriter(el, FOUNDER_NOTE, 3.5)
          }
        },
      })

      // Background parallax
      gsap.to('.founder-bg', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section border-t border-border relative overflow-hidden">
      {/* Background accent radial */}
      <div
        className="founder-bg absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 40% 60%, var(--accent), transparent 65%)' }}
      />

      <div className="container relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="label">The Founder</span>
          <hr className="flex-1 border-none border-t border-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px_300px] gap-16 items-start">
          {/* Large quote with mask reveal */}
          <div className="founder-quote">
            <div className="text-text-muted mb-6 font-serif leading-none" style={{ fontSize: 72 }}>&ldquo;</div>
            {quoteLines.map((line, i) => (
              line === '' ? (
                <div key={i} style={{ height: '0.8em' }} />
              ) : (
                <div key={i} className="founder-mask overflow-hidden">
                  <span
                    className="founder-line block font-display font-bold"
                    style={{
                      fontSize: 'clamp(24px, 3.5vw, 52px)',
                      letterSpacing: '-0.025em',
                      lineHeight: '1.2',
                      color: i >= 3 ? 'var(--text-muted)' : 'var(--text-primary)',
                      transform: 'translateY(110%)',
                    }}
                  >
                    {line}
                  </span>
                </div>
              )
            ))}
          </div>

          {/* Founder note — typewriter */}
          <div className="founder-note-block pt-4 lg:pt-16">
            <div className="label mb-6">From the founder</div>
            <p
              ref={noteRef}
              className="typewriter-cursor text-text-muted text-sm leading-relaxed"
            />
            <div className="mt-10 pt-6 border-t border-border">
              <div className="text-sm font-semibold text-text-primary">Sergej Todorovic</div>
              <div className="label mt-1">Founder &amp; Creative Director, Batch</div>
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="hidden lg:flex glass rounded-2xl items-center justify-center" style={{ width: 300, height: 320 }}>
            <span className="label">PHOTO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
