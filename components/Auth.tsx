'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, Loader2, Mail, Rocket, ShieldCheck, Sparkles, Ticket, Zap } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

export default function Auth(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [referral, setReferral] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageTone, setMessageTone] = useState<'success' | 'error'>('success')
  const [emailTouched, setEmailTouched] = useState<boolean>(false)

  const validateEmail = (value: string) => value.trim().toLowerCase().endsWith('@uwaterloo.ca')

  const emailError = useMemo(() => {
    if (!email) return ''
    return validateEmail(email) ? '' : 'Only @uwaterloo.ca emails are allowed.'
  }, [email])

  const isSubmitDisabled = loading || !email || (!!emailError && emailTouched)

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault()
    setEmailTouched(true)
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
      setEmailTouched(false)
    } catch (error: any) {
      setMessageTone('error')
      setMessage(error.message || 'Something went wrong sending your magic link. Try again shortly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#1a1a1a] px-4 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,179,0,0.18),transparent_60%)]" aria-hidden />
      <GlassCard interactive={false} className="relative w-full max-w-2xl overflow-hidden p-0 text-center">
        <div className="grid gap-0 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="flex flex-col items-center px-8 py-12">
            <header className="mb-10 space-y-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#2d2d2d] shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                <Sparkles className="h-6 w-6 text-[#ffb300]" />
              </div>
              <h1 className="text-title text-[40px]">
                Join the fastest students at <span className="gradient-text">Waterloo</span>
              </h1>
              <p className="text-subtitle text-[#e0e0e0]">
                Sign up with your @uwaterloo.ca email to enter real-time typing showdowns, unlock badges, and keep climbing the leaderboard.
              </p>
            </header>

            <StepProgress />

            <form onSubmit={handleSignUp} className="mt-8 w-full space-y-5">
              <Field label="Waterloo Email" htmlFor="email" helper="We’ll send a magic link to your @uwaterloo.ca inbox.">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a0a0a0]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    autoComplete="email"
                    required
                    aria-invalid={emailTouched && !!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    placeholder="you@uwaterloo.ca"
                    className={`focus-gold h-14 w-full rounded-[12px] border-2 bg-[#1a1a1a] pl-12 pr-4 text-sm text-white placeholder-[#6b6b6b] transition ${
                      emailTouched && emailError ? 'border-[#f44336]' : 'border-[#404040]'
                    } ${email && !emailError ? 'border-[#ffb300] shadow-[0_0_0_4px_rgba(255,179,0,0.15)]' : ''}`}
                  />
                </div>
                {emailTouched && emailError && (
                  <p id="email-error" className="mt-2 text-xs text-[#f44336]">
                    {emailError}
                  </p>
                )}
              </Field>

              <Field
                label="Referral Code"
                htmlFor="referral"
                helper="Optional: Enter a friend’s code to join their challenge."
              >
                <div className="relative">
                  <Ticket className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a0a0a0]" />
                  <input
                    id="referral"
                    type="text"
                    value={referral}
                    onChange={(event) => setReferral(event.target.value)}
                    placeholder="UW-ENG-143"
                    className="focus-gold h-14 w-full rounded-[12px] border-2 border-[#404040] bg-[#1a1a1a] pl-12 pr-4 text-sm text-white placeholder-[#6b6b6b] transition focus:border-[#ffb300]"
                  />
                </div>
              </Field>

              {message && (
                <div
                  className={`flex items-start gap-2 rounded-[12px] border px-4 py-3 text-sm ${
                    messageTone === 'success'
                      ? 'border-[#4caf50]/60 bg-[#4caf50]/15 text-[#c8e6c9]'
                      : 'border-[#f44336]/60 bg-[#f44336]/15 text-[#ffcdd2]'
                  }`}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                  <p>{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="btn-gold focus-gold flex w-full items-center justify-center text-base disabled:translate-y-0"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4 text-white" />}
                {loading ? 'Sending magic link…' : 'Sign Up with @uwaterloo.ca'}
              </button>
            </form>

            <div className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-[#a0a0a0]">
              Waterloo students only • Magic link authentication • Powered by Supabase
            </div>
          </div>

          <aside className="relative hidden overflow-hidden border-l border-[#404040] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0d0d0d] p-8 text-center lg:flex lg:flex-col lg:items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,179,0,0.18),transparent_60%)]" />
            <div className="absolute inset-4 rounded-[20px] border border-[#404040]" aria-hidden />

            <div className="relative z-10 flex w-full flex-col items-center gap-6">
              <h2 className="text-xl font-semibold text-white">Why join WaterlooType?</h2>
              <div className="space-y-3 text-sm text-[#e0e0e0]">
                <p>Compete in live typing sprints tailored to Waterloo life.</p>
                <p>Earn badges and flex your rankings with friends.</p>
                <p>Track accuracy, WPM, and reaction heatmaps.</p>
                <p>100% free for Warriors — magic link only, no password stress.</p>
              </div>

              <div className="rounded-[16px] border border-[#404040] bg-[#2d2d2d] p-4 text-xs leading-relaxed text-[#e0e0e0]">
                “WaterlooType turned our study sessions into a friendly competition. The leaderboard keeps us motivated — shoutout to the Diamond tier grinders in E7!”
              </div>

              <div className="text-xs uppercase tracking-[0.4em] text-[#a0a0a0]">Onboarding takes ~30 seconds</div>
            </div>
          </aside>
        </div>
      </GlassCard>
    </div>
  )
}

function StepProgress() {
  const steps: Array<{ label: string; icon: typeof Mail }> = [
    { label: 'Enter @uwaterloo.ca email', icon: Mail },
    { label: 'Receive instant magic link', icon: Zap },
    { label: 'Start racing on WaterlooType', icon: Rocket },
  ]

  return (
    <div className="rounded-[20px] border border-[#404040] bg-[#262626] p-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-3 text-left sm:max-w-[220px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-[#ffb300]">
              <step.icon className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#e0e0e0]">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  helper,
  children,
}: {
  label: string
  htmlFor: string
  helper?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2 text-left">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-white">
        {label}
      </label>
      {children}
      {helper && <p className="text-xs text-[#a0a0a0]">{helper}</p>}
    </div>
  )
}

