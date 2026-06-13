'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const shifts = [
  {
    num: '01',
    title: 'AI Ads Actually Look Good Now',
    body: 'AI-generated ads now look better than most studio shoots. What took a film crew 2 days now takes 3 hours — at a fraction of the cost.',
    stat: '10–20×',
    statLabel: 'Cost reduction vs traditional production',
  },
  {
    num: '02',
    title: 'The Ad Itself Is Now 56% of Whether It Works',
    body: 'The algorithm finds your customer. Your creative closes the sale. Brands running 30+ new creatives per month consistently outperform those running 5.',
    stat: '56%',
    statLabel: 'Of your result is the creative itself',
  },
  {
    num: '03',
    title: 'Most Brands Are Left Behind',
    body: 'Everyone knows AI is changing creative production. Almost no brand has figured out how to use it consistently at volume. That gap is exactly where we operate.',
    stat: '24mo',
    statLabel: 'Before this becomes table stakes',
  },
  {
    num: '04',
    title: 'First Ones In Win The Most',
    body: 'The brands moving first are pulling ahead. By the time the rest catch up, they\'ll have 18 months of learnings, lower costs, and stronger creative.',
    stat: '18mo',
    statLabel: 'Head start for early movers',
  },
]

function ParticleCanvas({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) {
  return <canvas ref={canvasRef} className="particle-canvas" />
}

export default function Shift() {
  const wrapperRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  // ── Particle network ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const COUNT = 60

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200,255,0,0.5)'
        ctx.fill()
      })

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(200,255,0,${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // ── GSAP scroll animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      // Track active card index
      let activeIndex = -1

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            const newIndex = Math.min(3, Math.floor(progress * 4.5))
            if (newIndex !== activeIndex && newIndex >= 0) {
              activeIndex = newIndex
            }
          },
        },
      })

      // Each card enters from LEFT at its scroll position
      shifts.forEach((_, i) => {
        const startAt = i * 0.22

        // Incoming card slides from left
        tl.fromTo(`.shift-card-${i}`,
          { x: -120, opacity: 0, scale: 0.94 },
          { x: 0, opacity: 1, scale: 1, ease: 'power3.out' },
          startAt
        )

        // Previous card collapses to mini tab
        if (i > 0) {
          tl.to(`.shift-card-${i - 1}`, {
            height: 52,
            scale: 0.96,
            opacity: 0.5,
            ease: 'power2.inOut',
          }, startAt + 0.05)
          tl.to(`.shift-card-body-${i - 1}`, { opacity: 0, ease: 'none' }, startAt)
        }
      })

      // Final fade out
      tl.to('.shift-stack', { opacity: 0, y: -20, ease: 'none' }, 0.95)

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapperRef} className="sticky-section" style={{ height: '300vh' }}>
      <div className="sticky-inner">
        {/* Particle canvas bg */}
        <ParticleCanvas canvasRef={canvasRef} />

        {/* Dark overlay so canvas doesn't overpower */}
        <div className="absolute inset-0 bg-bg/70 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="container">
            <div className="flex items-center gap-3 mb-10">
              <span className="label">The Shift</span>
              <hr className="flex-1 border-none border-t border-border" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Left: pinned headline */}
              <div>
                <p className="label mb-4 text-accent/70">Why right now is the right time</p>
                <h2
                  style={{ fontSize: 'clamp(40px, 5vw, 80px)', letterSpacing: '-0.03em', lineHeight: '1' }}
                  className="font-display font-bold text-text-primary mb-8"
                >
                  Your Creative
                  <br />
                  <span className="text-accent">Is The Product.</span>
                </h2>
                <p className="text-text-muted text-base leading-relaxed max-w-sm">
                  Why your ad creative is now the most important variable in your business.
                </p>
              </div>

              {/* Right: stacking cards */}
              <div className="shift-stack relative" style={{ minHeight: 420 }}>
                {shifts.map((item, i) => (
                  <div
                    key={i}
                    className={`shift-card-${i} glass rounded-2xl overflow-hidden mb-3 origin-top`}
                    style={{
                      background: '#0d0d0d',
                      opacity: i === 0 ? 1 : 0,
                      transform: i === 0 ? 'none' : 'translateX(-120px) scale(0.94)',
                      position: i === 0 ? 'relative' : 'relative',
                      zIndex: shifts.length - i,
                    }}
                  >
                    {/* Mini tab header — always visible */}
                    <div className="flex items-center justify-between px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-text-muted">{item.num}</span>
                        <span className="font-semibold text-sm text-text-primary">{item.title}</span>
                      </div>
                      <span className="font-mono text-sm font-bold text-accent">{item.stat}</span>
                    </div>

                    {/* Expandable body */}
                    <div className={`shift-card-body-${i} px-6 pb-6`}>
                      <p className="text-text-muted text-sm leading-relaxed mb-4">{item.body}</p>
                      <div className="label text-text-muted/60">{item.statLabel}</div>
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
