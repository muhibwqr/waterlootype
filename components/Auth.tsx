'use client'

import { useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, CheckCircle2, Loader2, Mail, ShieldCheck, Sparkles, Ticket } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

export default function Auth(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [referral, setReferral] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageTone, setMessageTone] = useState<'success' | 'error'>('success')

  const validateEmail = (value: string) => value.trim().toLowerCase().endsWith('@uwaterloo.ca')

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage(null)

    if (!validateEmail(email)) {
      setMessageTone('error')
      setMessage('Only @uwaterloo.ca emails are allowed. Please try again with your UW address.')
      return
    }

    setLoading(true)

    try {
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}` : ''
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectUrl,
          data: referral ? { referral_code: referral.trim() } : undefined,
        },
      })

      if (error) {
        throw error
      }

      setMessageTone('success')
      setMessage(
        'Magic link sent! Check your inbox (and spam) for a WaterlooType sign-in link. The link expires in 5 minutes.'
      )
      setEmail('')
      setReferral('')
    } catch (error: any) {
      setMessageTone('error')
      setMessage(error.message || 'Something went wrong sending your magic link. Try again shortly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-slate-950 to-black px-4 py-16 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.2),transparent_55%)]" aria-hidden />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-b from-blue-600/15 via-blue-500/10 to-transparent blur-3xl lg:block" aria-hidden />

      <GlassCard
        interactive={false}
        className="relative w-full max-w-2xl overflow-hidden p-0 text-center shadow-[0_30px_80px_-20px_rgba(37,99,235,0.28)]"
      >
        <div className="grid gap-0 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="flex flex-col items-center px-8 py-12">
            <header className="mb-10 space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 shadow-lg shadow-blue-500/40">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                Join the fastest students at <span className="gradient-text">Waterloo</span>
              </h1>
              <p className="text-sm text-slate-300">
                Sign up with your @uwaterloo.ca email to enter real-time typing showdowns, unlock badges, and secure your spot on the leaderboard.
              </p>
            </header>

            <StepProgress />

            <form onSubmit={handleSignUp} className="mt-8 w-full space-y-5">
              <Field
                label="Waterloo Email"
                htmlFor="email"
                icon={<Mail className="h-4 w-4 text-blue-200" />}
                helper="We’ll send a magic link to your @uwaterloo.ca inbox."
              >
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-400/80 focus:outline-none focus:ring-2 focus:ring-blue-300/20"
                  placeholder="you@uwaterloo.ca"
                />
              </Field>

              <Field
                label="Referral (optional)"
                htmlFor="referral"
                icon={<Ticket className="h-4 w-4 text-blue-200" />}
                helper="Enter a referral or verification code if someone challenged you."
              >
                <input
                  id="referral"
                  type="text"
                  value={referral}
                  onChange={(event) => setReferral(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-400/80 focus:outline-none focus:ring-2 focus:ring-blue-300/20"
                  placeholder="UW-ENG-143"
                />
              </Field>

              {message && (
                <div
                  className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm ${
                    messageTone === 'success'
                      ? 'border-blue-400/40 bg-blue-500/10 text-blue-100'
                      : 'border-rose-400/40 bg-rose-500/10 text-rose-200'
                  }`}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                  <p>{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4 text-white" />}
                {loading ? 'Sending magic link…' : 'Sign Up with @uwaterloo.ca'}
              </button>
            </form>

            <div className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
              Waterloo students only • Magic link authentication • Powered by Supabase
            </div>
          </div>

          <aside className="relative hidden overflow-hidden border-l border-white/5 bg-gradient-to-br from-slate-950 via-slate-900 to-black/80 p-8 text-center lg:flex lg:flex-col lg:items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),transparent_60%)]" />
            <div className="absolute inset-4 rounded-3xl border border-white/10" aria-hidden />

            <div className="relative z-10 flex w-full flex-col items-center gap-6 text-center">
              <h2 className="text-xl font-semibold text-white">Why join WaterlooType?</h2>
              <div className="space-y-3 text-sm text-slate-300">
                <p>Compete in live typing sprints tailored to Waterloo life.</p>
                <p>Earn badges and flex your rankings with friends.</p>
                <p>Track accuracy, WPM, and reaction heatmaps.</p>
                <p>100% free for Warriors — magic link only, no password stress.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-200">
                “WaterlooType turned our study sessions into a friendly competition. The leaderboard keeps us motivated — shoutout to the Diamond tier grinders in E7!”
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                <span className="h-px flex-1 bg-slate-800" aria-hidden />
                Onboarding ~30 seconds
                <span className="h-px flex-1 bg-slate-800" aria-hidden />
              </div>
            </div>
          </aside>
        </div>
      </GlassCard>

      <button
        onClick={() => history.back()}
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-blue-400/60 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to landing
      </button>
    </div>
  )
}

function StepProgress() {
  const steps = [
    { id: '01', label: 'Enter @uwaterloo.ca email' },
    { id: '02', label: 'Receive instant magic link' },
    { id: '03', label: 'Start racing on WaterlooType' },
  ]

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/30 text-sm font-semibold text-blue-100">
              {step.id}
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-300">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  icon,
  helper,
  children,
}: {
  label: string
  htmlFor: string
  icon: ReactNode
  helper?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-100">{icon}</span>
        {label}
      </label>
      {children}
      {helper && <p className="text-xs text-slate-400">{helper}</p>}
    </div>
  )
}

