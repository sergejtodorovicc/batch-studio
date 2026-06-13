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
        ctx.fillStyle = `rgba(200,255,0,${s.opacity})`
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
      // "Your Competitors" — starts red, transitions to white
      gsap.fromTo('.cta-line-red',
        { opacity: 0, y: 60, color: '#ff3b30' },
        {
          opacity: 1, y: 0, color: '#F5F5F5',
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

  // ── Ripple click handler ──
  function handleRipple(e: React.MouseEvent<HTMLAnchorElement>) {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top = `${e.clientY - rect.top}px`
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
  }

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
        style={{ background: 'radial-gradient(ellipse at 50% 100%, #C8FF00, transparent 60%)' }}
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
                  color: '#ff3b30',
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

          {/* CTAs — pulse + ripple */}
          <div className="cta-buttons opacity-0 flex flex-wrap gap-4 mb-12">
            <a
              href="mailto:hello@obsidian.studio"
              onClick={handleRipple}
              className="ripple-container pulse-cta inline-flex items-center gap-3 px-8 py-5 bg-accent text-bg font-bold text-base hover:opacity-90 transition-opacity"
            >
              Book a Free Strategy Call →
            </a>
            <a
              href="mailto:hello@obsidian.studio"
              className="inline-flex items-center gap-3 px-8 py-5 border border-border text-text-primary text-base hover:border-text-muted transition-colors"
            >
              hello@obsidian.studio
            </a>
          </div>

          {/* Footnote */}
          <p className="cta-sub opacity-0 text-text-muted text-sm mb-20">
            No contracts. No retainers. Start with a €1,500 Sprint.
            <br />
            Judge the results. Then decide.
          </p>
        </div>
      </div>
    </section>
  )
}
