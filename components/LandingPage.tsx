'use client'

import { useState, type ReactNode } from 'react'
import {
  ArrowRight,
  GraduationCap,
  Keyboard,
  Medal,
  Rocket,
  Shield,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react'
import Auth from './Auth'

const FEATURES = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Test Your Speed',
    description:
      'Practice with Waterloo-themed prompts about co-op, internships, and the Cali grind.',
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: 'Compete & Climb',
    description:
      'Chase the leaderboard and unlock Diamond, Gold, and Bronze bragging rights.',
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: 'Faculty Pride',
    description:
      'See which faculty is topping the charts in real time and represent your crew.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Sign Up',
    description:
      'Create an account with your @uwaterloo.ca email. Add your program and faculty in seconds.',
  },
  {
    number: '02',
    title: 'Type & Track',
    description:
      'Fly through Waterloo-themed texts and get instant WPM, accuracy, and tier updates.',
  },
  {
    number: '03',
    title: 'Claim Your Spot',
    description:
      'Submit your score and watch the leaderboard react live. Flex your faculty dominance.',
  },
]

const TIERS = [
  { icon: <Shield className="h-5 w-5" />, title: 'Warrior', caption: 'Every typist starts here.' },
  { icon: <Medal className="h-5 w-5" />, title: 'Bronze', caption: '85+ WPM with solid accuracy.' },
  { icon: <Trophy className="h-5 w-5" />, title: 'Gold', caption: '110+ WPM and near-perfect focus.' },
  { icon: <Sparkles className="h-5 w-5" />, title: 'Diamond', caption: '140+ WPM, untouchable reflexes.' },
]

export default function LandingPage(): JSX.Element {
  const [showAuth, setShowAuth] = useState<boolean>(false)

  if (showAuth) {
    return <Auth />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-blue-500/30">
              <Keyboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
                WaterlooType
              </p>
              <p className="text-sm text-slate-400">The typing test for UWaterloo Warriors</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAuth(true)}
              className="hidden rounded-full border border-slate-700/60 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500/60 hover:text-white sm:block"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:scale-[1.02]"
            >
              <Rocket className="h-4 w-4" />
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-24 pt-16 lg:pt-24">
        <section className="grid items-center gap-12 lg:grid-cols-[1.3fr,1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300/70">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              Built for Warriors
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Prove your typing speed, conquer the leaderboard, flex your faculty.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              WaterlooType blends competitive typing with co-op energy. Sharpen your skills, climb the live
              leaderboard, and show Silicon Valley why Warriors lead the pack.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-purple-500/40 transition hover:scale-[1.02]"
              >
                <Rocket className="h-5 w-5" />
                Start Typing — it’s free
              </button>
              <button
                onClick={() => setShowAuth(true)}
                className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-700/60 px-6 py-3 text-base font-semibold text-slate-300 transition hover:border-blue-500/60 hover:text-white"
              >
                Preview the test
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1">
                <Shield className="h-4 w-4 text-blue-300" />
                @uwaterloo.ca required
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1">
                <Sparkles className="h-4 w-4 text-purple-300" />
                Free forever
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1">
                <Rocket className="h-4 w-4 text-pink-300" />
                Built by Warriors
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-500/40 via-purple-500/30 to-pink-500/30 blur-3xl"></div>
            <div className="relative rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl shadow-blue-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900">
                    <Keyboard className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Live Test Preview</p>
                    <p className="text-xs text-slate-400">WaterlooWorks edition</p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                  Demo run
                </span>
              </div>
              <p className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm leading-relaxed text-slate-300">
                Your co-op advisor said apply early, apply often. You open WaterlooWorks and start the Cali or
                bust grind. Fingers fly, focus locked, Warriors rise.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
                <Stat label="WPM" value="132" />
                <Stat label="Accuracy" value="98%" />
                <Stat label="Time" value="00:57" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-2xl shadow-blue-500/10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300/70">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Launch in three quick steps</h2>
            <p className="mt-3 max-w-xl text-base text-slate-300">
              Log in with your UWaterloo email, crush a typing test, and share your spot with teammates.
              We’ll handle the stats, you bring the speed.
            </p>
            <div className="mt-10 space-y-6">
              {STEPS.map((step) => (
                <StepCard key={step.number} {...step} />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-purple-500/10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-300/70">Tiers</p>
            <h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Earn your badge</h3>
            <p className="mt-3 text-base text-slate-300">
              Every score unlocks a new tier. Keep improving to climb from Warrior to Diamond and make your
              faculty proud.
            </p>
            <div className="mt-8 space-y-4">
              {TIERS.map((tier) => (
                <TierCard key={tier.title} {...tier} />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-12 text-center shadow-2xl shadow-blue-500/20">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to out-type every co-op hopeful on campus?
            </h3>
            <p className="mt-3 text-lg text-slate-200">
              Join the typing sprint Waterloo students talk about on the walk between E7 and DC. It’s fast,
              free, and fuelled by competition.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => setShowAuth(true)}
                className="flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Rocket className="h-5 w-5" />
                Start Typing Now
              </button>
              <button
                onClick={() => setShowAuth(true)}
                className="flex min-w-[220px] items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-white/40 hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
                See Leaderboard
              </button>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-300/70">
              Only @uwaterloo.ca emails accepted • Free forever
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/60 bg-black/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} WaterlooType • Built by Waterloo Warriors</span>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-700" aria-hidden />
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-7 transition hover:border-blue-500/50 hover:bg-slate-900/70">
      <div className="absolute inset-0 -z-10 opacity-0 blur-3xl transition group-hover:opacity-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-blue-200">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-blue-500/40 hover:bg-slate-900/80">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 text-sm font-semibold text-blue-200">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="mt-2 text-sm text-slate-300">{description}</p>
      </div>
    </div>
  )
}

function TierCard({
  icon,
  title,
  caption,
}: {
  icon: ReactNode
  title: string
  caption: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-purple-500/40 hover:bg-slate-900/80">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/70 text-purple-200">
        {icon}
      </div>
      <div>
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="text-sm text-slate-300">{caption}</p>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-semibold text-white">{value}</div>
    </div>
  )
}

