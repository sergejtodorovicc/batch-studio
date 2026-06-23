import GlobalParticles from '@/components/global-particles'
import Nav from '@/components/nav'
import Hero from '@/components/sections/hero'
import LogoRail from '@/components/sections/logo-rail'
import Problem from '@/components/sections/problem'
import Shift from '@/components/sections/shift'
import System from '@/components/sections/system'
import Process from '@/components/sections/process'
import CaseStudies from '@/components/sections/case-studies'
import Showcase from '@/components/sections/showcase'
import WhyUs from '@/components/sections/why-us'
import Services from '@/components/sections/services'
import SocialProof from '@/components/sections/social-proof'
import FAQ from '@/components/sections/faq'
import Founder from '@/components/sections/founder'
import FinalCTA from '@/components/sections/final-cta'
import Footer from '@/components/footer'
import MobileCTA from '@/components/mobile-cta'

export default function Home() {
  return (
    <>
      <GlobalParticles />
      <Nav />
      <main>
        <Hero />
        <LogoRail />
        <Problem />
        <Shift />
        <System />
        <Process />
        <CaseStudies />
        <Showcase />
        <WhyUs />
        <Services />
        <SocialProof />
        <FAQ />
        <Founder />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  )
}
