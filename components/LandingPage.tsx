'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Keyboard,
  Lock,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from 'lucide-react'
import Auth from './Auth'
import { GlassCard } from '@/components/ui/GlassCard'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Join', href: '#why-join' },
  { label: 'FAQ', href: '#faq' },
]

const HOW_ITEMS = [
  {
    id: '01',
    title: 'Verify in seconds',
    description: 'Use your @uwaterloo.ca email. We keep it Warrior-only.',
    icon: Mail,
  },
  {
    id: '02',
    title: 'Sprint together',
    description: 'Jump into real-time typing battles with live stats.',
    icon: Zap,
  },
  {
    id: '03',
    title: 'Climb the board',
    description: 'Earn badges, bragging rights, and faculty dominance.',
    icon: Rocket,
  },
]

const FEATURE_CALLOUTS = [
  {
    title: 'Supabase security',
    description: 'Magic link auth keeps Waterloo-only battles secure.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-time stats',
    description: 'Track WPM, accuracy, streaks, and personal bests live.',
    icon: BarChart3,
  },
  {
    title: 'Badges & leaderboards',
    description: 'Unlock warrior-to-diamond badges and climb the ranks.',
    icon: Trophy,
  },
  {
    title: 'Share achievements',
    description: 'One-click share cards to challenge classmates.',
    icon: Sparkles,
  },
]

const WHY_ITEMS = [
  {
    title: 'Live Typing Sprints',
    description: 'Head-to-head battles tuned for the Waterloo grind.',
    icon: Zap,
  },
  {
    title: 'Badges & Rankings',
    description: 'Unlock Diamond, Gold, and more as you improve.',
    icon: Trophy,
  },
  {
    title: 'Track Performance',
    description: 'Monitor WPM, accuracy, streaks, and improvements.',
    icon: BarChart3,
  },
  {
    title: '100% Free & Secure',
    description: 'Supabase auth plus IAM best practices keep it safe.',
    icon: Lock,
  },
]

const FAQ_ITEMS = [
  {
    question: 'Who can join WaterlooType?',
    answer: 'Any University of Waterloo student with a valid @uwaterloo.ca email address.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'Nope. WaterlooType runs in the browser and is optimized for both desktop and mobile.',
  },
  {
    question: 'How do the badges work?',
    answer: 'Crush higher WPM and accuracy thresholds to climb from Warrior to Diamond tiers.',
  },
]

export default function LandingPage(): JSX.Element {
  const [showAuth, setShowAuth] = useState<boolean>(false)

  if (showAuth) {
    return <Auth />
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-[#404040] bg-[rgba(26,26,26,0.85)] backdrop-blur">
        <div className="section-shell flex max-w-6xl items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#2d2d2d]">
              <Keyboard className="h-5 w-5 text-[#ffb300]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#ffb300]">WaterlooType</p>
              <p className="text-sm text-[#a0a0a0]">Typing battles for Warriors</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#e0e0e0] md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="focus-gold transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAuth(true)}
              className="hidden rounded-[12px] border border-[#404040] px-4 py-2 text-sm font-semibold text-[#e0e0e0] transition hover:border-[#ffb300] hover:text-white focus-gold md:inline-flex"
            >
              Sign In
            </button>
            <button onClick={() => setShowAuth(true)} className="btn-gold focus-gold px-5 py-2 text-sm">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="section-shell flex max-w-6xl flex-col gap-[120px] pb-[96px] pt-[120px]">
        <section
          id="hero"
          className="relative flex flex-col items-center gap-10 overflow-hidden rounded-[24px] border border-[#404040] bg-[#1f1f1f]/60 p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        >
          <div className="absolute -top-20 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#ffb300]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,179,0,0.12),transparent_70%)]" aria-hidden />
          <div className="relative flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#404040] bg-[#2d2d2d] px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[#e0e0e0]">
              <Sparkles className="h-4 w-4 text-[#ffb300]" />
              Exclusive to UWaterloo
            </div>
            <h1 className="text-[42px] font-extrabold leading-[1.1] text-white md:text-[56px] lg:text-[64px]">
              Join the Fastest Students at <span className="gradient-text">Waterloo</span>
            </h1>
            <p className="max-w-2xl text-lg text-[#e0e0e0]">
              Real-time typing battles, exclusive badges, and competitive leaderboards for UWaterloo students.
              Only @uwaterloo.ca emails invited.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setShowAuth(true)} className="btn-gold focus-gold text-base">
                Sign Up with Waterloo Email
              </button>
              <button
                onClick={() => setShowAuth(true)}
                className="focus-gold inline-flex items-center justify-center gap-2 rounded-[12px] border border-[#404040] px-6 py-3 text-base font-semibold text-[#e0e0e0] transition hover:border-[#ffb300] hover:text-white"
              >
                Explore the experience
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#a0a0a0]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#404040] bg-[#2d2d2d] px-3 py-1">
                <ShieldCheck className="h-4 w-4 text-[#ffb300]" />
                @uwaterloo.ca required
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#404040] bg-[#2d2d2d] px-3 py-1">
                <Sparkles className="h-4 w-4 text-[#ffb300]" />
                100% free
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#404040] bg-[#2d2d2d] px-3 py-1">
                <Rocket className="h-4 w-4 text-[#ffb300]" />
                Built for Warriors
              </span>
            </div>
          </div>
          <HeroShowcase />
        </section>

        <section id="how-it-works" className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[36px] font-bold text-white">How it works</h2>
          <p className="max-w-2xl text-[#a0a0a0]">
            Sign up, sprint, and climb the leaderboard—all in under a minute.
          </p>
          <div className="grid w-full gap-6 md:grid-cols-3">
            {HOW_ITEMS.map((item) => (
              <HowCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section id="features" className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[36px] font-bold text-white">Built for typists on a mission</h2>
          <p className="max-w-2xl text-[#a0a0a0]">
            Everything you need to compete, measure, and win—engineered for UW students.
          </p>
          <div className="grid w-full gap-6 md:grid-cols-2">
            {FEATURE_CALLOUTS.map((item) => (
              <WhyCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section id="why-join" className="flex flex-col items-center gap-10">
          <GlassCard interactive={false} className="w-full max-w-3xl bg-[#262626] p-12 text-center">
            <h2 className="text-[36px] font-bold text-white">Why Join WaterlooType?</h2>
            <p className="mt-4 text-lg text-[#e0e0e0]">
              Join hundreds of Warriors pushing their WPM, sharing wins, and unlocking badges—without leaving
              the browser.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {WHY_ITEMS.map((item) => (
                <BenefitCard key={item.title} {...item} />
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="testimonial" className="flex flex-col items-center gap-8 rounded-[24px] border border-[#404040] bg-[#1f1f1f] p-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <Sparkles className="h-8 w-8 text-[#ffb300]" />
          <p className="max-w-3xl text-[24px] italic text-[#e0e0e0]">
            “WaterlooType turned late-night study sessions into competitive typing sprints. We keep the leaderboard open in E7 just to see who can steal Diamond next.”
          </p>
          <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="h-5 w-5 fill-[#ffb300] text-[#ffb300]" />
            ))}
          </div>
          <p className="text-sm text-[#a0a0a0]">— Anonymous Diamond Tier Grinder, E7</p>
        </section>

        <section id="faq" className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-[36px] font-bold text-white">FAQ</h2>
          <div className="flex w-full flex-col gap-4">
            {FAQ_ITEMS.map((item) => (
              <GlassCard key={item.question} interactive={false} muted className="px-6 py-5 text-left">
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm text-[#a0a0a0]">{item.answer}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#404040] bg-[#0d0d0d] py-10">
        <div className="section-shell grid max-w-6xl gap-8 text-sm text-[#a0a0a0] md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#2d2d2d]">
                <Keyboard className="h-4 w-4 text-[#ffb300]" />
              </div>
              <span className="font-semibold text-white">WaterlooType</span>
            </div>
            <p className="text-xs text-[#7a7a7a]">Made with ⌨️ for Waterloo Warriors</p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">Links</span>
            <a href="#features" className="focus-gold transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="focus-gold transition hover:text-white">
              How It Works
            </a>
            <a href="#faq" className="focus-gold transition hover:text-white">
              FAQ
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">Legal</span>
            <a href="#" className="focus-gold transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="focus-gold transition hover:text-white">
              Terms
            </a>
            <a href="mailto:team@waterlootype.ca" className="focus-gold transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HeroShowcase() {
  return (
    <GlassCard tone="primary" className="relative w-full max-w-3xl overflow-hidden bg-[#262626] p-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#1a1a1a]">
          <Keyboard className="h-5 w-5 text-[#ffb300]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Live Test Spotlight</p>
          <p className="text-xs text-[#a0a0a0]">UW campus energy in 60 seconds</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[16px] border border-[#404040] bg-[#1a1a1a]">
        <div className="relative h-48">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[#a0a0a0]">Sample Run</p>
            <p className="text-lg font-semibold text-white">
              “Engineering squad peaked at <span className="gradient-text">143 WPM</span> with 98% accuracy.”
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-[#e0e0e0]">
        <Stat label="Peak WPM" value="143" />
        <Stat label="Accuracy" value="98%" />
        <Stat label="Badge" value="Diamond" />
      </div>
    </GlassCard>
  )
}

function HowCard({
  id,
  title,
  description,
  icon: Icon,
}: {
  id: string
  title: string
  description: string
  icon: typeof Mail
}) {
  return (
    <GlassCard muted className="flex flex-col items-center gap-4 bg-[#262626] p-6 text-center transition hover:border-[#ffb300]/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] text-[#ffb300]">
        {Icon ? <Icon className="h-5 w-5" /> : null}
      </div>
      <span className="text-sm font-semibold uppercase tracking-[0.4em] text-[#ffb300]">{id}</span>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-[#a0a0a0]">{description}</p>
    </GlassCard>
  )
}

function WhyCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: typeof Zap
}) {
  return (
    <GlassCard muted className="flex flex-col items-center gap-4 bg-[#262626] p-6 text-center transition hover:border-[#ffb300]/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] text-[#ffb300]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-[#a0a0a0]">{description}</p>
    </GlassCard>
  )
}

function BenefitCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: typeof Zap
}) {
  return (
    <GlassCard muted className="flex flex-col items-center gap-3 bg-[#2a2a2a] p-6 text-center transition hover:border-[#ffb300]/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] text-[#ffb300]">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="text-sm text-[#a0a0a0]">{description}</p>
    </GlassCard>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-[#404040] bg-[#1a1a1a] p-4">
      <p className="text-[11px] uppercase tracking-[0.4em] text-[#a0a0a0]">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  )
}
