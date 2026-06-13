'use client'

export default function MobileCTA() {
  return (
    <div className="mobile-cta-bar safe-area-bottom">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-text-primary">30 ads · 72 hours</div>
          <div className="text-[10px] text-text-muted font-mono">No contracts. Pause anytime.</div>
        </div>
        <a
          href="#contact"
          className="shrink-0 px-5 py-3 bg-accent text-bg text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Book Call →
        </a>
      </div>
    </div>
  )
}
