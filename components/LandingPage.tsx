'use client'

import { useCallback, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import SignupForm from '@/components/SignupForm'
import WhyJoin from '@/components/WhyJoin'
import Testimonial from '@/components/Testimonial'
import Leaderboard from '@/components/Leaderboard'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'

export default function LandingPage(): JSX.Element {
  const signupRef = useRef<HTMLDivElement | null>(null)

  const scrollToSignup = useCallback(() => {
    if (signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[hsl(0_0%_4%)] text-white">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navigation onSignUpClick={scrollToSignup} />

      <main
        id="main-content"
        className="section-shell flex max-w-6xl flex-col items-center gap-24 pb-24 pt-28 text-center"
      >
        <Hero onSignUpClick={scrollToSignup} />
        <HowItWorks />
        <div ref={signupRef} className="w-full">
          <SignupForm />
        </div>
        <Features />
        <WhyJoin />
        <Testimonial />
        <section id="leaderboard" className="flex w-full flex-col items-center gap-8">
          <h2 className="text-title text-[42px]">Live Leaderboard</h2>
          <p className="text-subtitle max-w-3xl">
            Preview the top Warriors and faculty averages. Sign in to challenge them in real time.
          </p>
          <Leaderboard />
        </section>
        <Faq />
      </main>

      <Footer />
    </div>
  )
}

