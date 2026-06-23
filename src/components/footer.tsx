const links: Record<string, { label: string; href: string }[]> = {
  Services: [
    { label: 'AI Ads', href: '#work' },
    { label: 'Creator Video Ads', href: '#work' },
    { label: 'AI Commercials', href: '#work' },
    { label: 'AI Photography', href: '#work' },
    { label: 'Systems Install', href: '#services' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="font-bold tracking-widest text-sm mb-4">
              BATCH<span className="text-accent">.</span>
            </div>
            <p className="text-text-muted text-sm max-w-sm">
              We make ads that don&apos;t need cameras.
            </p>
            <p className="text-text-muted text-sm max-w-sm mt-3">
              30 creatives. 72 hours. No shoots, no contracts.
            </p>
            <a
              href="mailto:hello@batch.studio"
              className="inline-block mt-6 text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              hello@batch.studio
            </a>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="label mb-5">{category}</div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © 2026 Batch. Built with AI. Delivered faster than your current agency responds to email.
          </p>
        </div>
      </div>
    </footer>
  )
}
