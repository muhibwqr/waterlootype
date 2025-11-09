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
    if (rank === 1) return 'from-cyan-500/30 via-blue-500/20 to-purple-500/30 border-cyan-400/40 shadow-lg shadow-cyan-500/20'
    if (rank === 2) return 'from-yellow-500/30 via-amber-500/20 to-orange-500/30 border-yellow-400/40 shadow-lg shadow-yellow-500/20'
    if (rank === 3) return 'from-orange-500/30 via-red-500/20 to-pink-500/30 border-orange-400/40 shadow-lg shadow-orange-500/20'
    return 'from-gray-800/50 to-gray-900/50 border-gray-700/50'
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
      <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl shadow-blue-500/10">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500/30 border-t-blue-500"></div>
          <p className="mt-4 text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 md:p-8 shadow-2xl shadow-purple-500/10">
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
      
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Leaderboard
        </h2>
        <div className="flex gap-2 border-b border-gray-700/50">
          <button
            onClick={() => setActiveTab('individuals')}
            className={`relative px-6 py-3 font-semibold transition-all duration-300 ${
              activeTab === 'individuals'
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Top Individuals
            {activeTab === 'individuals' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('faculties')}
            className={`relative px-6 py-3 font-semibold transition-all duration-300 ${
              activeTab === 'faculties'
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Top Faculties
            {activeTab === 'faculties' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
            )}
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
                className={`relative bg-gradient-to-r ${getRankColor(entry.rank || 0)} rounded-2xl border backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl font-bold w-14 text-center drop-shadow-lg">
                      {getRankIcon(entry.rank || 0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold truncate text-lg">{entry.email}</div>
                      <div className="text-sm text-gray-400 truncate">{entry.program || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{entry.wpm}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">WPM</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">{entry.accuracy.toFixed(1)}%</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Accuracy</div>
                    </div>
                    <button
                      onClick={() => handleShare(entry)}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50"
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
                className={`relative bg-gradient-to-r ${getRankColor(entry.rank || 0)} rounded-2xl border backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl font-bold w-14 text-center drop-shadow-lg">
                      {getRankIcon(entry.rank || 0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">{entry.faculty}</div>
                      <div className="text-sm text-gray-400">{entry.count} participant{entry.count !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{entry.avgWpm}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Avg WPM</div>
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
