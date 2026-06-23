'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  // ── Particle starfield ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.6 + 0.1,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((s) => {
        s.y -= s.speed
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,194,255,${s.opacity})`
        ctx.fill()
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  // ── Scroll animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-line-red',
        { opacity: 0, y: 60, color: 'var(--danger)' },
        {
          opacity: 1, y: 0, color: 'var(--text-primary)',
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      gsap.fromTo('.cta-line-2',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      gsap.fromTo('.cta-sub',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      gsap.fromTo('.cta-buttons',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      gsap.fromTo('.cta-glow',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.06, scale: 1.3, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center border-t border-border overflow-hidden"
    >
      {/* Particle starfield canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Accent glow */}
      <div
        className="cta-glow absolute inset-0 opacity-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, var(--accent), transparent 60%)' }}
      />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container relative z-10 py-32">
        <div className="max-w-5xl">
          {/* Headline */}
          <div className="mb-8">
            <div className="overflow-hidden">
              <h2
                className="cta-line-red font-display font-bold opacity-0"
                style={{
                  fontSize: 'clamp(52px, 10vw, 150px)',
                  letterSpacing: '-0.04em',
                  lineHeight: '0.95',
                  color: 'var(--danger)',
                }}
              >
                Your Competitors
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="cta-line-2 font-display font-bold opacity-0 text-accent"
                style={{
                  fontSize: 'clamp(52px, 10vw, 150px)',
                  letterSpacing: '-0.04em',
                  lineHeight: '0.95',
                }}
              >
                Are Still Shooting.
              </h2>
            </div>
          </div>

          {/* Sub */}
          <p className="cta-sub opacity-0 text-text-muted text-xl md:text-2xl mb-12 max-w-xl leading-relaxed">
            We&apos;re already building. 30 creatives per month. Delivered in 72 hours. No shoots. No contracts. Pause anytime.
          </p>

          {/* Contact form */}
          <form
            className="cta-buttons opacity-0 flex flex-col gap-4 max-w-lg"
            onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will be in touch within 24 hours.') }}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                required
                className="bg-transparent border border-border text-text-primary px-4 py-3 text-sm placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Work email"
                required
                className="bg-transparent border border-border text-text-primary px-4 py-3 text-sm placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <select
              className="bg-bg border border-border text-text-muted px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors appearance-none"
            >
              <option value="">Monthly ad spend</option>
              <option value="<10k">Under €10K/month</option>
              <option value="10-50k">€10K – €50K/month</option>
              <option value="50-100k">€50K – €100K/month</option>
              <option value="100k+">€100K+ / month</option>
            </select>
            <button
              type="submit"
              className="ripple-container pulse-cta inline-flex items-center justify-center gap-3 px-8 py-5 bg-accent text-bg font-bold text-base hover:opacity-90 transition-opacity"
            >
              Book Free Strategy Call →
            </button>
            <p className="text-text-muted text-xs">Or email us directly: hello@batch.studio · We reply within 24h</p>
          </form>
        </div>
      </div>
    </section>
  )
}
