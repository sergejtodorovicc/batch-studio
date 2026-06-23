const logos = ['NOVAPURE', 'LUMÉ', 'VELTARA', 'ARCFORM', 'MERIDIAN']

export default function LogoRail() {
  return (
    <div className="border-b border-border">
      <div className="container py-8 flex items-center justify-between">
        <span className="label hidden md:block">Trusted by DTC brands spending €500K–€5M/month on ads</span>

        {/* Mobile: marquee */}
        <div className="md:hidden w-full overflow-hidden">
          <div className="marquee-track gap-3">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="glass rounded px-4 py-2 flex-shrink-0 mr-3">
                <span className="text-xs font-bold tracking-widest text-text-muted">{logo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: static flex */}
        <div className="hidden md:flex items-center gap-3">
          {logos.map((logo) => (
            <div key={logo} className="glass rounded px-4 py-2">
              <span className="text-xs font-bold tracking-widest text-text-muted">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
