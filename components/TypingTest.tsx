'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { TypedUser } from '@/types/supabase'
import { CheckCircle2, Shield, Trophy, Zap } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

const PASSAGES: readonly string[] = [
  "Waterloo co-op is the ultimate hustle. Six work terms, endless applications, and the dream of landing that Cali-or-bust internship. We grind through LeetCode, polish our resumes, and type cover letters faster than we type code.",
  "California or bust! That's the Waterloo rallying cry. Every CS and engineering student dreams of that Silicon Valley co-op. The rent might be wild, but the experience is priceless. Plus, you can always retreat to campus geese for humility.",
  'The co-op hustle never pauses. While other schools relax, Warriors submit applications, crush interviews, and prep for the next work term. It’s intense—but graduating with two years of experience hits different.',
  "Waterloo students don't sleep—we optimize. Schedules, co-op applications, typing speed. When you're juggling classes and job hunting, every second matters.",
  'San Francisco rent is higher than our GPAs, but that’s the price of the Cali dream. Study hard, apply harder, and maybe one day that studio apartment view is yours.',
  'The internship treadmill is real. We spend more time on WaterlooWorks than on Quest. Cover letters, coding challenges, coffee chats—repeat until you ship your dream co-op.',
  'Waterloo co-op isn’t just a program; it’s a lifestyle. Four-month cycles, new cities, suitcases packed like IKEA speedruns. Chaotic? Absolutely. Worth it? Completely.',
  "California or bust isn't a phrase—it’s a mindset. Warriors chase stories of alumni crushing it in the Bay. We see the success, read the Medium posts, and grind to be next.",
  'Application season is spicier than finals. Refresh inboxes, grind coding problems, hope the resume stands out. But when the offer hits, it’s goosebump city.',
  'Waterloo geese rival tech recruiters for aggression—but at least recruiters pay. We dodge geese on Ring Road and chase internships with the same relentless energy.',
] as const

interface TypingTestProps {
  user: TypedUser
}

export default function TypingTest({ user }: TypingTestProps): JSX.Element {
  const [target, setTarget] = useState<string>(() => pickPassage())
  const [typed, setTyped] = useState<string>('')
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [endedAt, setEndedAt] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState<number>(0)
  const [bestWpm, setBestWpm] = useState<number>(0)
  const [saving, setSaving] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const fetchBest = async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('wpm')
        .eq('user_id', user.id)
        .order('wpm', { ascending: false })
        .limit(1)

      if (!error && data?.length) {
        setBestWpm(data[0].wpm)
      }
    }

    fetchBest().catch((err) => console.error('Error fetching best WPM:', err))
  }, [user.id])

  useEffect(() => {
    if (!startedAt || endedAt) return

    const tick = () => setElapsed(Date.now() - startedAt)
    const id = window.setInterval(tick, 75)
    tick()

    return () => window.clearInterval(id)
  }, [startedAt, endedAt])

  const correctChars = useMemo(() => {
    let count = 0
    for (let i = 0; i < Math.min(typed.length, target.length); i++) {
      if (typed[i] === target[i]) count++
      else break
    }
    return count
  }, [typed, target])

  const accuracy = clamp(calcAccuracy(target, typed))
  const wpm = clamp(calcWpm(correctChars, Math.max(elapsed, 1)))
  const progress = clamp((typed.length / target.length) * 100)
  const finished = endedAt !== null

  const minutes = Math.floor(elapsed / 1000 / 60)
  const seconds = Math.floor((elapsed / 1000) % 60)

  const tier = tierBadge(wpm)

  const handleInput = (value: string) => {
    setMessage(null)

    if (!startedAt) {
      const now = Date.now()
      setStartedAt(now)
    }

    if (finished) return

    let nextValue = value
    if (value.length > target.length) {
      nextValue = value.slice(0, target.length)
    }

    setTyped(nextValue)

    if (nextValue.length === target.length) {
      const now = Date.now()
      setEndedAt(now)
      setElapsed(now - (startedAt ?? now))
      setTyped(target)
    }
  }

  const submitScore = async () => {
    if (!finished || !startedAt || !endedAt) {
      setMessage('Finish the passage to submit your score.')
      return
    }

    setSaving(true)

    const payload = {
      user_id: user.id,
      email: user.email,
      program: user.user_metadata?.program ?? '',
      faculty: user.user_metadata?.faculty ?? '',
      wpm: Math.round(wpm),
      accuracy: Number(accuracy.toFixed(2)),
      created_at: new Date().toISOString(),
    }

    try {
      const { error } = await supabase.from('leaderboard').insert(payload)
      if (error) throw error
      setMessage('Score submitted! Check the leaderboard to see where you landed.')
      setBestWpm((prev) => Math.max(prev, payload.wpm))
    } catch (error) {
      console.error('Error saving result:', error)
      setMessage('Something went wrong saving your score. Try again shortly.')
    } finally {
      setSaving(false)
    }
  }

  const reset = () => {
    setTarget(pickPassage())
    setTyped('')
    setStartedAt(null)
    setEndedAt(null)
    setElapsed(0)
    setSaving(false)
    setMessage(null)
    inputRef.current?.focus()
  }

  return (
    <GlassCard
      tone="default"
      interactive={false}
      className="relative mb-12 flex flex-col items-center overflow-hidden p-6 text-center text-slate-100 shadow-2xl shadow-blue-500/15 md:p-10"
    >
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-600/15 blur-3xl" aria-hidden />
      <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" aria-hidden />

      <header className="relative mb-8 flex w-full flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#404040] bg-[#262626] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e0e0e0]">
            <Zap className="h-3.5 w-3.5 text-[#ffb300]" />
            Live Typing Test
          </div>
          <h2 className="text-title text-[40px]">WaterlooWorks Sprint</h2>
          <p className="text-subtitle max-w-2xl text-[#e0e0e0]">
            Lock in, focus on precision, and let speed follow. Scores update in real time—your next personal best is a reset away.
          </p>
        </div>
        <div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile label="Current WPM" value={Math.round(wpm)} accent="from-[#ffb300] to-[#ff8f00]" />
          <StatTile label="Accuracy" value={`${accuracy.toFixed(1)}%`} accent="from-[#ffd54f] to-[#ffb300]" />
          <StatTile label="Elapsed" value={`${pad(minutes)}:${pad(seconds)}`} accent="from-[#6d6d6d] to-[#ffb300]" />
          <StatTile label="Personal Best" value={bestWpm} accent="from-[#ffb300] to-[#ffd54f]" />
        </div>
      </header>

      <GlassCard interactive={false} muted className="relative w-full max-w-3xl p-6 shadow-inner shadow-slate-900">
        <div className="mb-4 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#a0a0a0] sm:flex-row sm:justify-between">
          <span>Waterloo-themed passage</span>
          <span className="inline-flex items-center gap-2 font-semibold text-[#ffb300]">
            <Shield className="h-4 w-4" />
            {tier.label} Tier
          </span>
        </div>
        <div className="min-h-[160px] rounded-2xl border border-[#404040] bg-[#262626] p-6 font-mono text-[15px] leading-relaxed text-[#e0e0e0]">
          {target.split('').map((char, index) => {
            const typedChar = typed[index]
            let className = 'text-[#7d7d7d]'

            if (typedChar != null) {
              className =
                typedChar === char
                  ? 'text-[#ffb300]'
                  : 'rounded bg-[#ff8f00]/20 px-[1px] text-white shadow-inner shadow-[#ffb300]/30'
            }

            return (
              <span key={index} className={className}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            )
          })}
        </div>

        <textarea
          ref={inputRef}
          value={typed}
          onChange={(event) => handleInput(event.target.value)}
          onPaste={(event) => event.preventDefault()}
          disabled={finished}
          placeholder={finished ? 'Great work! Reset to run it back.' : 'Start typing the passage above…'}
          className="focus-gold mt-6 w-full resize-none rounded-2xl border border-[#404040] bg-[#1a1a1a] p-5 font-mono text-base text-white shadow-lg shadow-[rgba(0,0,0,0.45)] transition focus:border-[#ffb300] md:text-lg"
          rows={5}
        />

        <div className="mt-6">
          <div className="relative h-2 overflow-hidden rounded-full bg-[#333333]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#ffb300] via-[#ffd54f] to-[#ff8f00] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-[#a0a0a0]">
            <span>Progress {Math.round(progress)}%</span>
            <span>
              {pad(minutes)}:{pad(seconds)}
            </span>
          </div>
        </div>
      </GlassCard>

      <footer className="relative mt-8 flex w-full max-w-3xl flex-col items-center gap-3 text-sm sm:flex-row sm:justify-between sm:gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={reset}
            className="focus-gold inline-flex items-center gap-2 rounded-2xl border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-[#e0e0e0] transition hover:border-[#ffb300] hover:text-white"
          >
            <Zap className="h-4 w-4" />
            New Passage
          </button>
          <button
            onClick={() => {
              setTyped('')
              setStartedAt(null)
              setEndedAt(null)
              setElapsed(0)
              setMessage(null)
              inputRef.current?.focus()
            }}
            className="focus-gold inline-flex items-center gap-2 rounded-2xl border border-[#404040] px-4 py-2 text-sm font-semibold text-[#e0e0e0] transition hover:border-[#ffb300] hover:text-white"
          >
            Reset Run
          </button>
          <button
            onClick={submitScore}
            disabled={saving}
            className="btn-gold focus-gold inline-flex items-center gap-2 px-5 py-2 text-sm disabled:translate-y-0"
          >
            <Trophy className="h-4 w-4" />
            {saving ? 'Submitting…' : 'Submit Score'}
          </button>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-sm text-[#e0e0e0]">
          <Shield className="h-4 w-4 text-[#ffb300]" />
          Stay relaxed, lead with accuracy. Speed follows focus.
        </div>
      </footer>

      {message && (
        <GlassCard tone="primary" interactive={false} className="relative mt-6 border-[#ffb300]/40 bg-[#ffb300]/10 p-4 text-sm text-[#ffecb3]">
          <CheckCircle2 className="mr-2 inline h-4 w-4 align-text-bottom" />
          {message}
        </GlassCard>
      )}
    </GlassCard>
  )
}

function pickPassage(seed = Math.random()): string {
  const index = Math.floor(seed * PASSAGES.length)
  return PASSAGES[index]
}

function clamp(value: number, min = 0, max = 240): number {
  return Math.min(max, Math.max(min, value))
}

function calcAccuracy(target: string, input: string): number {
  if (!target.length) return 0
  let correct = 0
  for (let i = 0; i < Math.min(target.length, input.length); i++) {
    if (target[i] === input[i]) correct++
  }
  return (correct / target.length) * 100
}

function calcWpm(correctChars: number, elapsedMs: number): number {
  const minutes = elapsedMs / 1000 / 60
  if (minutes <= 0) return 0
  return (correctChars / 5) / minutes
}

function tierBadge(wpm: number): { label: string } {
  if (wpm >= 140) return { label: 'Diamond' }
  if (wpm >= 110) return { label: 'Gold' }
  if (wpm >= 85) return { label: 'Bronze' }
  return { label: 'Warrior' }
}

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

function StatTile({
  label,
  value,
  accent,
}: {
  label: string
  value: number | string
  accent: string
}) {
  return (
    <GlassCard interactive={false} muted className="p-4 bg-[#262626]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a0a0a0]">{label}</p>
      <p
        className={`mt-2 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${accent}`}
      >
        {value}
      </p>
    </GlassCard>
  )
}

