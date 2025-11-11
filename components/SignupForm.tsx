'use client'

import { type ReactNode, useMemo, useState } from 'react'
import { CheckCircle2, Loader2, Mail, Sparkles, Ticket } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { GlassCard } from '@/components/ui/GlassCard'

type MessageTone = 'success' | 'error'

export default function SignupForm(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [referral, setReferral] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageTone, setMessageTone] = useState<MessageTone>('success')
  const [emailTouched, setEmailTouched] = useState<boolean>(false)

  const validateEmail = (value: string) => value.trim().toLowerCase().endsWith('@uwaterloo.ca')

  const emailError = useMemo(() => {
    if (!email) return ''
    return validateEmail(email) ? '' : 'Only @uwaterloo.ca emails are allowed.'
  }, [email])

  const isSubmitDisabled = loading || !email || (!!emailError && emailTouched)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <section
      id="signup"
      className="flex w-full flex-col items-center gap-10 rounded-[24px] border border-[hsl(0_0%_25%)] bg-[hsla(0_0%_6%_/_0.85)] p-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(0_0%_25%)] bg-[hsl(0_0%_10%)] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-[hsl(0_0%_88%)]">
        <Sparkles className="h-3.5 w-3.5 text-[hsl(51_100%_50%)]" />
        Early Access
      </div>
      <div className="space-y-4">
        <h2 className="text-title text-[42px]">Join the fastest students at Waterloo</h2>
        <p className="text-subtitle max-w-2xl text-[hsl(0_0%_85%)]">
          Sign up with your @uwaterloo.ca email to enter real-time typing showdowns, unlock badges, and secure your spot on
          the leaderboard.
        </p>
      </div>

      <GlassCard interactive={false} className="w-full max-w-3xl bg-[hsl(0_0%_10%)] p-8 text-left">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Field
            label="Waterloo Email"
            htmlFor="email"
            icon={<Mail className="h-5 w-5 text-[hsl(51_100%_50%)]" />}
            helper="We’ll send a magic link to your @uwaterloo.ca inbox."
            error={emailTouched && !!emailError ? emailError : ''}
          >
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setEmailTouched(true)}
              autoComplete="email"
              required
              className="focus-gold h-14 w-full rounded-[12px] border-2 border-[hsl(0_0%_25%)] bg-[hsl(0_0%_4%)] px-5 py-3 text-base text-white placeholder-[hsl(0_0%_47%)] transition focus:border-[hsl(51_100%_50%)] focus:shadow-gold"
              placeholder="you@uwaterloo.ca"
            />
          </Field>

          <Field
            label="Referral (optional)"
            htmlFor="referral"
            icon={<Ticket className="h-5 w-5 text-[hsl(51_100%_50%)]" />}
            helper="Enter a friend's code to join their challenge."
          >
            <input
              id="referral"
              type="text"
              value={referral}
              onChange={(event) => setReferral(event.target.value)}
              className="focus-gold h-14 w-full rounded-[12px] border-2 border-[hsl(0_0%_25%)] bg-[hsl(0_0%_4%)] px-5 py-3 text-base text-white placeholder-[hsl(0_0%_47%)] transition focus:border-[hsl(51_100%_50%)] focus:shadow-gold"
              placeholder="UW-ENG-143"
            />
          </Field>

          {message && (
            <div
              className={`flex items-start gap-2 rounded-[12px] border px-4 py-3 text-sm ${
                messageTone === 'success'
                  ? 'border-[hsla(142_71%_45%_/_0.4)] bg-[hsla(142_71%_45%_/_0.1)] text-[hsl(142_71%_55%)]'
                  : 'border-[hsla(0_84%_60%_/_0.4)] bg-[hsla(0_84%_60%_/_0.1)] text-[hsl(0_84%_70%)]'
              }`}
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4" />
              <p>{message}</p>
            </div>
          )}

          <button type="submit" disabled={isSubmitDisabled} className="btn-gold focus-gold h-14 w-full text-lg">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {loading ? 'Sending magic link…' : 'Sign Up with Waterloo Email'}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3 rounded-[16px] border border-[hsl(0_0%_18%)] bg-[hsl(0_0%_6%)] p-5 text-sm text-[hsl(0_0%_75%)]">
          <div className="text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(0_0%_50%)]">
            Waterloo students only
          </div>
          <p>Magic link authentication • Secure Supabase backend • Leaderboard updates in real time</p>
        </div>
      </GlassCard>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  icon,
  helper,
  error,
  children,
}: {
  label: string
  htmlFor: string
  icon: ReactNode
  helper?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-3">
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-[hsl(0_0%_4%)] text-[hsl(51_100%_50%)]">
          {icon}
        </span>
        {label}
      </label>
      {children}
      {helper && <p className="text-xs text-[hsl(0_0%_60%)]">{helper}</p>}
      {error && <p className="text-xs text-[hsl(0_84%_65%)]">{error}</p>}
    </div>
  )
}

