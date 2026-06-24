'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { tag: 'AI Product Photo', label: 'Supplement Line', category: 'AI Product Photography', color: '#D4891A', aspect: '4/5', hasVideo: false },
  { tag: 'AI Video Ad :15s', label: 'Beauty Brand', category: 'AI Video Ads', color: '#ffffff', aspect: '9/16', hasVideo: true },
  { tag: 'AI Creator Video', label: 'D2C Skincare', category: 'Creator Video Ads', color: '#888888', aspect: '9/16', hasVideo: true },
  { tag: 'AI Commercial :30s', label: 'Hero Film', category: 'AI Commercials', color: '#D4891A', aspect: '16/9', hasVideo: true },
  { tag: 'AI Static Ad', label: 'Fashion Drop', category: 'AI Performance Creative', color: '#ffffff', aspect: '1/1', hasVideo: false },
  { tag: 'AI Product Photo', label: 'Wellness Brand', category: 'AI Product Photography', color: '#666', aspect: '4/5', hasVideo: false },
  { tag: 'AI Landing Page', label: 'E-commerce Hero', category: 'AI Performance Creative', color: '#D4891A', aspect: '16/9', hasVideo: false },
]

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinWrapRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState(items[0].category)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const pinWrap = pinWrapRef.current
      if (!track || !pinWrap) return

      const totalWidth = track.scrollWidth - pinWrap.offsetWidth

      // Horizontal scroll driven by pin
      const st = ScrollTrigger.create({
        trigger: pinWrap,
        start: 'top top',
        end: () => `+=${totalWidth + 500}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update category label based on scroll position
          const idx = Math.min(
            items.length - 1,
            Math.floor(self.progress * items.length)
          )
          setActiveCategory(items[idx].category)
          // Translate track
          gsap.set(track, { x: -self.progress * totalWidth })
        },
      })

      return () => st.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-border hidden md:block" id="work">
      <div ref={pinWrapRef} className="flex h-screen overflow-hidden pt-20">
        {/* LEFT: pinned headline */}
        <div className="w-72 shrink-0 flex flex-col justify-center px-10 border-r border-border">
          <div className="label mb-4 text-accent/60">Our Work</div>
          <h2
            className="font-display font-bold text-text-primary mb-6"
            style={{ fontSize: 'clamp(32px, 3.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            What We
            <br />
            <span className="text-accent">Actually Build.</span>
          </h2>

          {/* Category label — changes as you scroll */}
          <div className="transition-all duration-300">
            <div className="label text-text-muted mb-1">Currently showing</div>
            <div className="text-sm font-semibold text-text-primary">{activeCategory}</div>
          </div>

          <div className="mt-auto pt-10">
            <div className="label text-text-muted">Scroll to explore →</div>
          </div>
        </div>

        {/* RIGHT: horizontal scrolling cards */}
        <div className="flex-1 overflow-hidden flex items-center">
          <div
            ref={trackRef}
            className="flex items-end gap-4 pl-8 pr-20"
            style={{ width: 'max-content' }}
          >
            {items.map((item, i) => (
              <ShowcaseCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ShowcaseCard({ item }: { item: typeof items[0] }) {
  const videoRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const width = item.aspect === '16/9' ? 400 : item.aspect === '9/16' ? 180 : item.aspect === '1/1' ? 240 : 220

  return (
    <div
      className="flex-shrink-0 glass rounded-2xl overflow-hidden cursor-pointer"
      style={{ width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview area */}
      <div
        ref={videoRef}
        className="relative flex items-center justify-center transition-all duration-500"
        style={{
          aspectRatio: item.aspect,
          background: hovered
            ? `linear-gradient(135deg, ${item.color}18, ${item.color}08)`
            : `linear-gradient(135deg, ${item.color}0d, transparent)`,
          borderBottom: `1px solid ${item.color}15`,
        }}
      >
        {/* Placeholder content */}
        <div className="flex flex-col items-center gap-3 opacity-40">
          <div className="rounded-xl" style={{ width: 44, height: 44, background: item.color }} />
          <div className="rounded" style={{ width: 72, height: 6, background: item.color }} />
          <div className="rounded" style={{ width: 52, height: 4, background: item.color, opacity: 0.5 }} />
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center' }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: item.color, opacity: 0.5 }}>
            {item.label}
          </span>
        </div>

        {/* Hover video autoplay indicator */}
        {item.hasVideo && (
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              {/* Animated play bars (simulate playing) */}
              <div className="flex items-end gap-0.5 h-4">
                {[3, 5, 4, 6, 3].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-white"
                    style={{
                      height: hovered ? `${h * 3}px` : '6px',
                      transition: `height ${0.2 + i * 0.05}s ease-in-out`,
                      transitionDelay: hovered ? `${i * 0.08}s` : '0s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tag chip */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-mono px-2 py-1 rounded"
            style={{ background: `${item.color}1a`, color: item.color, border: `1px solid ${item.color}28` }}
          >
            {item.tag}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <div className="font-medium text-sm text-text-primary">{item.label}</div>
          <div className="text-[10px] font-mono text-text-muted mt-0.5">72h delivery</div>
        </div>
        <span
          className="text-xs text-accent transition-transform duration-200"
          style={{ transform: hovered ? 'translateX(3px)' : 'none' }}
        >
          →
        </span>
      </div>
    </div>
  )
}
