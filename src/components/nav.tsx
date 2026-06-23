'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const links = ['Work', 'Services', 'Process', 'About']

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const letters = navRef.current?.querySelectorAll('.nav-letter')
    if (letters) {
      gsap.fromTo(letters,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out', delay: 0.3 }
      )
    }
    gsap.fromTo('.nav-links-item',
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.6 }
    )
    gsap.fromTo('.nav-cta',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.9 }
    )

    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logoText = 'BATCH'

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl border-b border-border bg-bg/80'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1 group">
            {logoText.split('').map((char, i) => (
              <span
                key={i}
                className="nav-letter text-sm font-bold tracking-widest text-text-primary opacity-0 transition-colors duration-200 group-hover:text-accent"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {char}
              </span>
            ))}
            <span className="nav-letter ml-1 accent-dot opacity-0" />
          </a>

          {/* Links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="nav-links-item opacity-0 text-sm text-text-muted hover:text-text-primary transition-colors duration-200 tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right side: hamburger (mobile) + CTA (desktop) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <span className={`w-5 h-px bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-px bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
            <a
              href="#contact"
              className="nav-cta opacity-0 text-sm font-medium px-5 py-2.5 border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200 tracking-wide"
            >
              Book a Call →
            </a>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl">
          <div className="container py-6 flex flex-col gap-6">
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-lg text-text-muted hover:text-text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center gap-2 px-5 py-3 border border-accent text-accent text-sm font-medium w-fit"
            >
              Book a Call →
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
