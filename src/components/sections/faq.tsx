'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'How quickly do we get our first séance?',
    a: 'Your first séance arrives in 7 days. Day 0 is onboarding, Day 1 is hook mining, Day 2 is brief approval, Days 3–4 are production, Days 5–6 are polish, Day 7 is delivery. After the first séance, ongoing deliveries happen every 72 hours.',
  },
  {
    q: 'Do we need to do a photo shoot?',
    a: 'No. Zero shoots. We use AI to generate product photos, video ads, and creator-style content from your existing product images and brand assets. You provide a style guide and reference images — we do the rest.',
  },
  {
    q: 'What do you need from us to get started?',
    a: 'Product photos, your brand guidelines or style guide, and a 30-minute onboarding call. After that, we handle everything. You review the creative brief and approve the final séance.',
  },
  {
    q: 'What if we do not like the ads?',
    a: 'Every plan includes revision rounds. If something does not match the brief, we fix it. Sprint includes one revision round. Engine and Engine Pro include revisions on every séance.',
  },
  {
    q: 'Is there a contract or minimum commitment?',
    a: 'No contracts. No minimum term. Pause or cancel anytime. We earn your business month to month — we do not lock you in.',
  },
  {
    q: 'How is this different from a freelancer or agency?',
    a: 'Speed, consistency, and data. Most agencies take 3 weeks and deliver 10 ads. We deliver 30 ads in 72 hours — and every séance is built on real performance data from the last one. One team. No handoffs.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section border-t border-border">
      <div className="container">
        <div className="flex items-center gap-3 mb-10">
          <span className="label">FAQ</span>
          <hr className="flex-1 border-none border-t border-border" />
        </div>

        <div className="max-w-3xl">
          <h2
            className="font-display font-bold mb-12"
            style={{ fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Questions we get
            <br />
            <span className="text-accent">a lot.</span>
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-text-primary pr-8">{faq.q}</span>
                  <span
                    className="text-accent shrink-0 transition-transform duration-300 text-xl leading-none"
                    style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: open === i ? 300 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <p className="px-6 pb-5 text-text-muted text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
