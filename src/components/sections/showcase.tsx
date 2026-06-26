'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { tag: 'AI Campaign Visual', label: 'Nike', category: 'AI Campaign Creative', color: '#D4891A', aspect: '4/5', src: '/images/nike 1.png' },
  { tag: 'AI Brand Visual', label: 'Johnnie Walker', category: 'AI Brand Creative', color: '#ffffff', aspect: '9/16', src: '/images/jw 1.png' },
  { tag: 'AI Campaign Visual', label: 'Nike', category: 'AI Campaign Creative', color: '#888888', aspect: '4/5', src: '/images/nike 2.png' },
  { tag: 'AI Editorial', label: 'Prada', category: 'AI Editorial Creative', color: '#D4891A', aspect: '16/9', src: '/images/prada 1.png' },
  { tag: 'AI Brand Visual', label: 'Johnnie Walker', category: 'AI Brand Creative', color: '#ffffff', aspect: '9/16', src: '/images/jw 2.png' },
  { tag: 'AI Campaign Visual', label: 'Nike', category: 'AI Campaign Creative', color: '#666', aspect: '4/5', src: '/images/nike 3.png' },
  { tag: 'AI Brand Visual', label: 'Johnnie Walker', category: 'AI Brand Creative', color: '#D4891A', aspect: '9/16', src: '/images/jw 3.png' },
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
      {/* Image area */}
      <div
        ref={videoRef}
        className="relative overflow-hidden"
        style={{ aspectRatio: item.aspect }}
      >
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />
        {/* Tag chip */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-mono px-2 py-1 rounded"
            style={{ background: 'rgba(10,7,5,0.7)', color: item.color, border: `1px solid ${item.color}40`, backdropFilter: 'blur(4px)' }}
          >
            {item.tag}
          </span>
        </div>
        {/* Disclaimer */}
        <div
          className="absolute bottom-2 right-2 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <span className="text-[8px] font-mono text-white/40">AI concept · Not affiliated</span>
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
