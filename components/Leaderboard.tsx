'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import type { LeaderboardEntry, FacultyEntry } from '@/types/database'
import { ArrowRight, GraduationCap, Medal, Sparkles, Trophy, Users } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

export default function Leaderboard(): JSX.Element {
  const [individualEntries, setIndividualEntries] = useState<LeaderboardEntry[]>([])
  const [facultyEntries, setFacultyEntries] = useState<FacultyEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<'individuals' | 'faculties'>('individuals')

  useEffect(() => {
    fetchLeaderboard()

    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaderboard',
        },
        () => {
          fetchLeaderboard()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchLeaderboard = async (): Promise<void> => {
    try {
      const { data: individualData, error: individualError } = await supabase
        .from('leaderboard')
        .select('*')
        .order('wpm', { ascending: false })
        .limit(10)

      if (individualError) throw individualError

      const rankedIndividualData = (individualData || []).map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }))
      setIndividualEntries(rankedIndividualData)

      const { data: allData, error: allError } = await supabase
        .from('leaderboard')
        .select('faculty, wpm')
        .not('faculty', 'is', null)

      if (allError) throw allError

      const facultyMap = new Map<string, { totalWpm: number; count: number }>()

      ;(allData || []).forEach((entry) => {
        if (!entry.faculty) return
        const existing = facultyMap.get(entry.faculty) || { totalWpm: 0, count: 0 }
        facultyMap.set(entry.faculty, {
          totalWpm: existing.totalWpm + entry.wpm,
          count: existing.count + 1,
        })
      })

      const facultyArray: FacultyEntry[] = Array.from(facultyMap.entries()).map(([faculty, data]) => ({
        faculty,
        avgWpm: Math.round(data.totalWpm / data.count),
        count: data.count,
      }))

      facultyArray.sort((a, b) => b.avgWpm - a.avgWpm)
      const topFaculties = facultyArray.slice(0, 6).map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }))

      setFacultyEntries(topFaculties)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number): ReactNode => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-blue-200" />
    if (rank === 2) return <Medal className="h-5 w-5 text-sky-200" />
    if (rank === 3) return <Sparkles className="h-5 w-5 text-indigo-200" />
    return <span className="text-xs font-semibold text-slate-200">#{rank}</span>
  }

  const rankTone = (rank?: number): 'default' | 'primary' | 'accent' => {
    if (rank === 1) return 'primary'
    if (rank === 2) return 'accent'
    return 'default'
  }

  const handleShare = async (entry: LeaderboardEntry): Promise<void> => {
    const shareText =
      entry.rank === 1
        ? `I'm the #1 typist at Waterloo! ${entry.wpm} WPM — beat me if you can!`
        : `I'm ranked #${entry.rank} on the WaterlooType leaderboard with ${entry.wpm} WPM.`

    if (navigator.share) {
      await navigator.share({
        title: 'WaterlooType Leaderboard',
        text: shareText,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(shareText)
      alert('Achievement copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <GlassCard interactive={false} muted className="relative p-10 text-center text-slate-300 shadow-2xl shadow-blue-500/10">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-blue-500/40 border-t-blue-400" />
        <p className="mt-4 text-sm text-slate-400">Loading leaderboard…</p>
      </GlassCard>
    )
  }

  return (
    <GlassCard interactive={false} muted className="relative p-8 text-center text-slate-100 shadow-2xl shadow-blue-500/15">
      <div className="absolute inset-x-6 top-6 -z-10 h-32 rounded-3xl bg-gradient-to-r from-blue-600/20 via-blue-500/15 to-indigo-600/20 blur-3xl" aria-hidden />

      <header className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-200/80">
            <Trophy className="h-3.5 w-3.5 text-blue-300" />
            Leaderboard Live
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Warriors on top</h2>
          <p className="mt-2 text-sm text-slate-300">
            Track the fastest typists on campus and see which faculty is leading the charge.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setActiveTab(activeTab === 'individuals' ? 'faculties' : 'individuals')}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-blue-500/60 hover:text-white"
          >
            Toggle view
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        <button
          onClick={() => setActiveTab('individuals')}
          className={`rounded-full px-4 py-2 transition ${
            activeTab === 'individuals'
              ? 'bg-gradient-to-r from-blue-500/30 via-blue-600/20 to-indigo-500/30 text-white'
              : 'border border-slate-800 text-slate-300 hover:border-blue-500/50 hover:text-white'
          }`}
        >
          Top Individuals
        </button>
        <button
          onClick={() => setActiveTab('faculties')}
          className={`rounded-full px-4 py-2 transition ${
            activeTab === 'faculties'
              ? 'bg-gradient-to-r from-blue-500/30 via-blue-600/20 to-indigo-500/30 text-white'
              : 'border border-slate-800 text-slate-300 hover:border-blue-500/50 hover:text-white'
          }`}
        >
          Fastest Faculties
        </button>
      </div>

      {activeTab === 'individuals' ? (
        <div className="mt-8 space-y-4">
          {individualEntries.length === 0 ? (
            <EmptyState
              icon={<Sparkles className="h-5 w-5 text-blue-200" />}
              title="No scores yet"
              description="Run a test, submit your score, and claim the top spot."
            />
          ) : (
            individualEntries.map((entry) => (
              <GlassCard
                key={entry.id}
                tone={rankTone(entry.rank)}
                className="relative overflow-hidden p-5 transition hover:scale-[1.01]"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/70">
                      {getRankIcon(entry.rank || 0)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold text-white">{entry.email}</p>
                      <p className="truncate text-sm text-slate-300">
                        {entry.program || 'Program unknown'} • {entry.faculty || 'Faculty TBD'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-3xl font-semibold text-white">{entry.wpm}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">WPM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-blue-100">{entry.accuracy.toFixed(1)}%</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Accuracy</p>
                    </div>
                    <button
                      onClick={() => handleShare(entry)}
                      className="rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {facultyEntries.length === 0 ? (
            <EmptyState
              icon={<Users className="h-5 w-5 text-blue-200" />}
              title="No faculty data"
              description="Be the first from your faculty to log a score."
            />
          ) : (
            facultyEntries.map((entry) => (
              <GlassCard
                key={entry.faculty}
                tone={rankTone(entry.rank)}
                className="flex flex-col justify-between p-5 transition hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/80">
                    {getRankIcon(entry.rank || 0)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{entry.faculty}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      {entry.count} participant{entry.count === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-white">{entry.avgWpm}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Avg WPM</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                    <GraduationCap className="mr-2 inline h-4 w-4 align-text-bottom" />
                    Faculty pride
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      )}
    </GlassCard>
  )
}

function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <GlassCard interactive={false} muted className="flex flex-col items-center justify-center border-dashed border-white/10 p-12 text-center text-slate-300">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/70">
        {icon}
      </div>
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-slate-400">{description}</p>
    </GlassCard>
  )
}
