'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { typewriter } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const competitors = [
  { name: 'In-House Team', cost: '€25–40K/mo', assets: '15–25', time: 'Weeks', dataLoop: false, brandKit: false, pause: false },
  { name: 'Traditional Agency', cost: '€10–20K/mo', assets: '8–15', time: '3 weeks', dataLoop: false, brandKit: false, pause: false },
  { name: 'Creator Marketplace', cost: '€3–8K/mo', assets: '10–20', time: 'Varies', dataLoop: false, brandKit: false, pause: true },
  { name: 'Boutique Creative Agency', cost: '€2–6K/mo', assets: 'Varies', time: 'Unpredictable', dataLoop: false, brandKit: false, pause: false },
]

const advantages = [
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>', title: '72-Hour Delivery', body: 'Guaranteed. Every batch, every client. Miss it and you don\'t pay.' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/></svg>', title: 'Gets Better Each Month', body: 'Data-driven briefs mean every batch learns from the last. Month 3 outperforms month 1. Every time.' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M7 9H5m0 6h2m10-6h2m0 6h-2M9 7V5m6 0v2M9 17v2m6-2v2"/></svg>', title: 'Built Around Your Brand', body: 'We train our system on your brand once. After that, every batch is consistent — no briefing required from you.' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10m-6 10V4M6 20v-6"/></svg>', title: 'We Track What Works', body: 'We check your real ad results every week. The longer you stay, the better we get at making your specific customer click.' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>', title: 'Pause Anytime', body: 'No contracts. No minimum term. We earn retention — we don\'t enforce it.' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>', title: 'Your Results Drive Everything', body: 'We report your ad metrics, not our deliverables. Results, not receipts.' },
]

const CLOSING_STAT = 'Brands working with us test 4 times more creative angles than their competitors. That is 4 times more chances to find the ad that scales their business.'

function Check({ yes }: { yes: boolean }) {
  return (
    <span className={`font-mono text-sm ${yes ? 'text-accent' : 'text-border'}`}>
      {yes ? '✓' : '—'}
    </span>
  )
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const closingRef = useRef<HTMLParagraphElement>(null)
  const [visibleRows, setVisibleRows] = useState<number[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Table rows reveal one by one via scroll
      ScrollTrigger.create({
        trigger: '.comp-table',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: false,
        onUpdate: (self) => {
          const count = Math.floor(self.progress * (competitors.length + 2))
          setVisibleRows(Array.from({ length: Math.min(count, competitors.length) }, (_, i) => i))
        },
      })

      // Advantage cards
      gsap.fromTo('.adv-card',
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.adv-grid', start: 'top 75%' },
        }
      )

      // Closing stat typewriter
      ScrollTrigger.create({
        trigger: '.closing-stat',
        start: 'top 80%',
        onEnter: () => {
          const el = closingRef.current
          if (el && !el.textContent) {
            typewriter(el, CLOSING_STAT, 2.5)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section border-t border-border">
      <div className="container">
        <div className="flex items-center gap-3 mb-10">
          <span className="label">Why Us</span>
          <hr className="flex-1 border-none border-t border-border" />
        </div>

        {/* Headline */}
        <div className="mb-16">
          <h2
            style={{ fontSize: 'clamp(40px, 6vw, 90px)', letterSpacing: '-0.03em', lineHeight: '1' }}
            className="font-display font-bold"
          >
            Why founders switch
            <br />
            <span className="text-accent">to Batch.</span>
          </h2>
        </div>

        {/* Comparison table — rows start empty */}
        <div className="comp-table mb-20 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 pr-4 label">Alternative</th>
                <th className="text-left py-4 px-4 label">Cost/mo</th>
                <th className="text-left py-4 px-4 label">Assets</th>
                <th className="text-left py-4 px-4 label">Turnaround</th>
                <th className="text-center py-4 px-4 label">Learns Over Time</th>
                <th className="text-center py-4 px-4 label">Knows Your Brand</th>
                <th className="text-center py-4 px-4 label">Pause</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr
                  key={i}
                  className="border-b border-border text-text-muted text-sm transition-all duration-500"
                  style={{
                    opacity: visibleRows.includes(i) ? 1 : 0,
                    transform: visibleRows.includes(i) ? 'none' : 'translateX(-16px)',
                  }}
                >
                  <td className="py-4 pr-4">{c.name}</td>
                  <td className="py-4 px-4 font-mono">{c.cost}</td>
                  <td className="py-4 px-4 font-mono">{c.assets}</td>
                  <td className="py-4 px-4">{c.time}</td>
                  <td className="py-4 px-4 text-center"><Check yes={c.dataLoop} /></td>
                  <td className="py-4 px-4 text-center"><Check yes={c.brandKit} /></td>
                  <td className="py-4 px-4 text-center"><Check yes={c.pause} /></td>
                </tr>
              ))}
              {/* Obsidian row — always visible as the "goal" */}
              <tr className="border border-accent/30 bg-accent/5">
                <td className="py-4 pr-4 pl-4 font-semibold text-accent text-sm">Batch</td>
                <td className="py-4 px-4 font-mono font-bold text-text-primary text-sm">From €1,500/mo</td>
                <td className="py-4 px-4 font-mono font-bold text-text-primary text-sm">10–60</td>
                <td className="py-4 px-4 font-bold text-text-primary text-sm">72 hours</td>
                <td className="py-4 px-4 text-center"><Check yes={true} /></td>
                <td className="py-4 px-4 text-center"><Check yes={true} /></td>
                <td className="py-4 px-4 text-center"><Check yes={true} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Advantages grid */}
        <div className="adv-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {advantages.map((adv, i) => (
            <div key={i} className="adv-card opacity-0 glass rounded-xl p-6 hover:border-white/10 transition-colors duration-300">
              <div className="w-6 h-6 mb-4 text-accent" dangerouslySetInnerHTML={{ __html: adv.icon }} />
              <h3 className="font-semibold text-text-primary mb-2">{adv.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{adv.body}</p>
            </div>
          ))}
        </div>

        {/* Closing stat typewriter */}
        <div className="closing-stat glass rounded-2xl p-10 border border-border">
          <div className="label text-accent/60 mb-4">The compound effect</div>
          <p
            ref={closingRef}
            className="typewriter-cursor font-semibold text-text-primary leading-relaxed"
            style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.01em' }}
          />
        </div>
      </div>
    </section>
  )
}
