'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { LeaderboardEntry, FacultyEntry } from '@/types/database'

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
      // Fetch top 5 individuals
      const { data: individualData, error: individualError } = await supabase
        .from('leaderboard')
        .select('*')
        .order('wpm', { ascending: false })
        .limit(5)

      if (individualError) throw individualError

      const rankedIndividualData = (individualData || []).map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }))
      setIndividualEntries(rankedIndividualData)

      // Fetch all entries for faculty aggregation
      const { data: allData, error: allError } = await supabase
        .from('leaderboard')
        .select('faculty, wpm')
        .not('faculty', 'is', null)

      if (allError) throw allError

      const facultyMap = new Map<string, { totalWpm: number; count: number }>()
      
      ;(allData || []).forEach((entry) => {
        if (entry.faculty) {
          const existing = facultyMap.get(entry.faculty) || { totalWpm: 0, count: 0 }
          facultyMap.set(entry.faculty, {
            totalWpm: existing.totalWpm + entry.wpm,
            count: existing.count + 1,
          })
        }
      })

      const facultyArray: FacultyEntry[] = Array.from(facultyMap.entries()).map(
        ([faculty, data]) => ({
          faculty,
          avgWpm: Math.round(data.totalWpm / data.count),
          count: data.count,
        })
      )

      facultyArray.sort((a, b) => b.avgWpm - a.avgWpm)
      const topFaculties = facultyArray.slice(0, 5).map((entry, index) => ({
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

  const getRankIcon = (rank: number): string => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const getRankColor = (rank: number): string => {
    if (rank === 1) return 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30'
    if (rank === 2) return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
    if (rank === 3) return 'from-orange-500/20 to-red-500/20 border-orange-500/30'
    return 'from-gray-800 to-gray-900 border-gray-700'
  }

  const handleShare = async (entry: LeaderboardEntry): Promise<void> => {
    const shareText = entry.rank === 1
      ? `I'm the #1 typist at Waterloo! 🥇 ${entry.wpm} WPM! Beat me if you can! 🏆`
      : entry.rank === 2
      ? `I'm #2 on the WaterlooType leaderboard! 🥈 ${entry.wpm} WPM!`
      : entry.rank === 3
      ? `I'm #3 on the WaterlooType leaderboard! 🥉 ${entry.wpm} WPM!`
      : `I'm ranked #${entry.rank} on the WaterlooType leaderboard with ${entry.wpm} WPM!`

    if (navigator.share) {
      await navigator.share({
        title: 'WaterlooType Achievement',
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
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Leaderboard</h2>
        <div className="flex gap-2 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('individuals')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'individuals'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Top Individuals
          </button>
          <button
            onClick={() => setActiveTab('faculties')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'faculties'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Top Faculties
          </button>
        </div>
      </div>

      {activeTab === 'individuals' ? (
        <div className="space-y-3">
          {individualEntries.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No entries yet.</p>
              <p className="text-sm mt-2">Be the first to complete a test!</p>
            </div>
          ) : (
            individualEntries.map((entry) => (
              <div
                key={entry.id}
                className={`bg-gradient-to-r ${getRankColor(entry.rank || 0)} rounded-xl border p-4 transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl font-bold w-12 text-center">
                      {getRankIcon(entry.rank || 0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">{entry.email}</div>
                      <div className="text-sm text-gray-400 truncate">{entry.program || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{entry.wpm}</div>
                      <div className="text-xs text-gray-400">WPM</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-300">{entry.accuracy.toFixed(1)}%</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <button
                      onClick={() => handleShare(entry)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {facultyEntries.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No faculty data yet.</p>
            </div>
          ) : (
            facultyEntries.map((entry) => (
              <div
                key={entry.faculty}
                className={`bg-gradient-to-r ${getRankColor(entry.rank || 0)} rounded-xl border p-4 transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl font-bold w-12 text-center">
                      {getRankIcon(entry.rank || 0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">{entry.faculty}</div>
                      <div className="text-sm text-gray-400">{entry.count} participant{entry.count !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{entry.avgWpm}</div>
                    <div className="text-xs text-gray-400">Avg WPM</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
