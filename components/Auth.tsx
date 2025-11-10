'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Loader2, Lock, Mail, School, Sparkles, User } from 'lucide-react'

const FACULTIES: readonly string[] = [
  'Engineering',
  'Mathematics',
  'Science',
  'Arts',
  'Environment',
  'Health',
  'Applied Health Sciences',
]

export default function Auth(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [program, setProgram] = useState<string>('')
  const [faculty, setFaculty] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const buttonLabel = useMemo(() => (isSignUp ? 'Create Account' : 'Sign In'), [isSignUp])

  const validateEmail = (value: string) => value.trim().toLowerCase().endsWith('@uwaterloo.ca')

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage('')

    if (!validateEmail(email)) {
      setMessage('Only @uwaterloo.ca emails are allowed.')
      return
    }

    if (isSignUp && (!program.trim() || !faculty)) {
      setMessage('Tell us your program and faculty to continue.')
      return
    }

    setLoading(true)

    try {
      if (isSignUp) {
        const redirectUrl = typeof window !== 'undefined' ? window.location.origin : ''
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              program: program.trim(),
              faculty,
            },
          },
        })

        if (error) throw error
        setMessage('Check your @uwaterloo.ca inbox to verify your account.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error
      }
    } catch (error: any) {
      setMessage(error.message || 'Something went wrong. Try again shortly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-slate-950 to-slate-900 px-4 py-12 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_55%)]" aria-hidden />
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-blue-500/10 sm:p-12">
        <header className="mb-8 flex flex-col gap-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/40">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">WaterlooType Access</h1>
          <p className="text-sm text-slate-300">
            Sign in with your @uwaterloo.ca email to run the typing gauntlet, save your scores, and flex on the leaderboard.
          </p>
        </header>

        <div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          <span className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-200" />
            @uwaterloo.ca required
          </span>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-200" />
            Free forever
          </span>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <Field
            label="Waterloo Email"
            htmlFor="email"
            icon={<Mail className="h-4 w-4 text-blue-300" />}
            helper="Use your official @uwaterloo.ca address."
          >
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:border-blue-500/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="you@uwaterloo.ca"
            />
          </Field>

          <Field
            label="Password"
            htmlFor="password"
            icon={<Lock className="h-4 w-4 text-purple-300" />}
            helper="Minimum 6 characters."
          >
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              minLength={6}
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:border-purple-500/70 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              placeholder="••••••••"
            />
          </Field>

          {isSignUp && (
            <>
              <Field
                label="Program"
                htmlFor="program"
                icon={<User className="h-4 w-4 text-emerald-300" />}
                helper="Tell us where you grind. Example: Computer Science."
              >
                <input
                  id="program"
                  type="text"
                  value={program}
                  onChange={(event) => setProgram(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="e.g., Computer Engineering"
                />
              </Field>

              <Field
                label="Faculty"
                htmlFor="faculty"
                icon={<School className="h-4 w-4 text-amber-300" />}
                helper="We’ll use this for faculty leaderboards."
              >
                <select
                  id="faculty"
                  value={faculty}
                  onChange={(event) => setFaculty(event.target.value)}
                  required
                  className="w-full appearance-none rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white transition focus:border-amber-500/70 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="" disabled>
                    Select your faculty
                  </option>
                  {FACULTIES.map((item) => (
                    <option key={item} value={item} className="bg-slate-900 text-white">
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}

          {message && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                message.includes('verify')
                  ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                  : 'border-rose-400/40 bg-rose-500/10 text-rose-200'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? 'Hold tight…' : buttonLabel}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          <button
            onClick={() => {
              setIsSignUp((prev) => !prev)
              setMessage('')
              setProgram('')
              setFaculty('')
            }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-4 py-2 text-slate-300 transition hover:border-blue-500/50 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {isSignUp ? 'Have an account? Sign in' : 'Need an account? Sign up'}
          </button>
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
            Waterloo students only • Supabase secured
          </p>
        </div>
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
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900/80 text-blue-200">{icon}</span>
        {label}
      </label>
      {children}
      {helper && <p className="text-xs text-slate-400">{helper}</p>}
    </div>
  )
}

