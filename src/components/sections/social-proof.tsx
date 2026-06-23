'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: 31, suffix: '%', label: 'Average cost-per-customer reduction' },
  { value: 72, suffix: 'h', label: 'Guaranteed delivery time' },
  { value: 4, suffix: '×', label: 'More ad angles tested' },
  { value: 12, suffix: 'mo', label: 'Average client relationship' },
]

const testimonials = [
  {
    quote: 'We went from 8 creatives per month to 30. CAC dropped 31% in six weeks. Our old agency still hasn\'t replied to our last email.',
    author: 'Head of Growth',
    company: 'Supplement Brand — €4M ARR',
    initials: 'MT',
  },
  {
    quote: 'Batch shipped our first ads before our old agency replied to our brief. Not joking.',
    author: 'Founder',
    company: 'Beauty DTC Brand',
    initials: 'SK',
  },
  {
    quote: 'We ran a blind test. 500 votes. Nobody could tell which ads were AI. That ended the internal debate.',
    author: 'CMO',
    company: 'E-commerce Brand — €8M ARR',
    initials: 'AK',
  },
  {
    quote: 'The Brand AI Kit was the game changer. Every batch looks exactly like us. We stopped briefing and started approving.',
    author: 'Creative Director',
    company: 'Wellness Brand',
    initials: 'CR',
  },
  {
    quote: '72-hour SLA sounds impossible. They\'ve never missed it. We\'ve been clients for 8 months.',
    author: 'Media Buyer',
    company: 'Performance DTC Agency',
    initials: 'DB',
  },
]

function CountUpMetric({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      onEnter: () => {
        if (animated.current) return
        animated.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix
          },
        })
      },
    })
  }, [value, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const dotGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Metrics reveal
      gsap.fromTo('.sp-headline',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: '.sp-headline', start: 'top 85%' },
        }
      )

      gsap.fromTo('.metric-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.metrics-grid', start: 'top 80%' },
        }
      )

      // Dot grid parallax
      gsap.to(dotGridRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section border-t border-border relative overflow-hidden">
      {/* Dot grid parallax background */}
      <div
        ref={dotGridRef}
        className="dot-grid absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ top: '-20%', height: '140%' }}
      />

      <div className="container relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="label">Proof</span>
          <hr className="flex-1 border-none border-t border-border" />
        </div>

        {/* Headline */}
        <div className="sp-headline mb-16 opacity-0">
          <h2
            style={{ fontSize: 'clamp(40px, 6vw, 90px)', letterSpacing: '-0.03em', lineHeight: '1' }}
            className="font-display font-bold"
          >
            The Numbers
            <br />
            <span className="text-accent">Don&apos;t Negotiate.</span>
          </h2>
        </div>

        {/* Metrics */}
        <div className="metrics-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {metrics.map((m, i) => (
            <div key={i} className="metric-card opacity-0 glass rounded-2xl p-8 text-center">
              <div className="font-mono font-bold text-text-primary mb-2" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                <CountUpMetric value={m.value} suffix={m.suffix} />
              </div>
              <div className="label">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials marquee — hover pauses (CSS: .marquee-track:hover) */}
        <div>
          <div className="label mb-6">What clients say · hover to pause</div>
          <div className="overflow-hidden">
            {/* marquee-track:hover { animation-play-state: paused } is in globals.css */}
            <div className="marquee-track cursor-default">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 glass rounded-2xl p-8 mr-4 border border-border"
                  style={{ width: 380 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-mono font-bold text-accent">{t.initials}</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-text-primary">{t.author}</div>
                      <div className="text-[10px] text-text-muted">{t.company}</div>
                    </div>
                  </div>
                  <p className="text-text-primary text-sm leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
