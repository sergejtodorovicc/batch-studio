import { gsap } from 'gsap'

export const ease = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const slowEase = 'cubic-bezier(0.4, 0, 0.2, 1)'

export const textReveal = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0 },
  duration: 0.8,
  stagger: 0.08,
  ease: 'power4.out',
}

export const cardEnter = {
  from: { opacity: 0, y: 60, scale: 0.96 },
  to: { opacity: 1, y: 0, scale: 1 },
  duration: 0.6,
  ease: 'power4.out',
}

export const maskReveal = {
  from: { yPercent: 100 },
  to: { yPercent: 0 },
  duration: 0.9,
  ease: 'power4.out',
}

export const counter = {
  duration: 1.4,
  ease: 'power2.out',
}

export function splitLetters(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent || ''
  el.textContent = ''
  return text.split('').map((char) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? ' ' : char
    span.style.display = 'inline-block'
    el.appendChild(span)
    return span
  })
}

export function typewriter(el: HTMLElement, text: string, duration = 1.5): gsap.core.Tween {
  el.textContent = ''
  const chars = text.split('')
  let i = 0
  return gsap.to({}, {
    duration,
    onUpdate: function () {
      const progress = this.progress()
      const charIndex = Math.floor(progress * chars.length)
      if (charIndex !== i) {
        i = charIndex
        el.textContent = chars.slice(0, i).join('')
      }
    },
  })
}
