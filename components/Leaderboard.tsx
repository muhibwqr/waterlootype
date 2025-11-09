'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { LeaderboardEntry, FacultyEntry } from '@/types/database'

export default function Leaderboard(): JSX.Element {
  const [individualEntries, setIndividualEntries] = useState<LeaderboardEntry[]>([])
  const [facultyEntries, setFacultyEntries] = useState<FacultyEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null)

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

  const fetchLeaderboard = async () => {
    try {
      // Fetch top 5 individuals
      const { data: individualData, error: individualError } = await supabase
        .from('leaderboard')
        .select('*')
        .order('wpm', { ascending: false })
        .limit(5)

      if (individualError) throw individualError

      // Add rank to individual entries
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

      // Aggregate by faculty
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

      // Calculate averages and sort
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

  const getBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
          💎 Diamond
        </span>
      )
    } else if (rank === 2) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
          🥇 Gold
        </span>
      )
    } else if (rank === 3) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-white">
          🥉 Bronze
        </span>
      )
    }
    return null
  }

  const handleShare = (entry: LeaderboardEntry) => {
    setSelectedEntry(entry)
    const shareText = entry.rank === 1
      ? `I'm the #1 typist at Waterloo! 💎 Diamond tier with ${entry.wpm} WPM! Beat me if you can! 🏆`
      : entry.rank === 2
      ? `I'm #2 on the WaterlooType leaderboard! 🥇 Gold tier with ${entry.wpm} WPM!`
      : entry.rank === 3
      ? `I'm #3 on the WaterlooType leaderboard! 🥉 Bronze tier with ${entry.wpm} WPM!`
      : `I'm ranked #${entry.rank} on the WaterlooType leaderboard with ${entry.wpm} WPM!`

    if (navigator.share) {
      navigator.share({
        title: 'WaterlooType Achievement',
        text: shareText,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText)
      alert('Achievement copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <div className="text-center py-8">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top 5 Faculties */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Top 5 Faculties</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4">Rank</th>
                <th className="text-left py-3 px-4">Faculty</th>
                <th className="text-right py-3 px-4">Avg WPM</th>
                <th className="text-right py-3 px-4">Participants</th>
              </tr>
            </thead>
            <tbody>
              {facultyEntries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No faculty data yet.
                  </td>
                </tr>
              ) : (
                facultyEntries.map((entry) => (
                  <tr
                    key={entry.faculty}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      entry.rank === 1 ? 'bg-gradient-to-r from-cyan-50 to-blue-50' :
                      entry.rank === 2 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100' :
                      entry.rank === 3 ? 'bg-gradient-to-r from-orange-50 to-orange-100' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">#{entry.rank}</span>
                        {getBadge(entry.rank || 0)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700 font-medium">{entry.faculty}</span>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold">
                      {entry.avgWpm}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {entry.count}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 5 Individuals */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Top 5 Individuals</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4">Rank</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Program</th>
                <th className="text-right py-3 px-4">WPM</th>
                <th className="text-right py-3 px-4">Accuracy</th>
                <th className="text-center py-3 px-4">Share</th>
              </tr>
            </thead>
            <tbody>
              {individualEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No entries yet. Be the first to complete a test!
                  </td>
                </tr>
              ) : (
                individualEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      entry.rank === 1 ? 'bg-gradient-to-r from-cyan-50 to-blue-50' :
                      entry.rank === 2 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100' :
                      entry.rank === 3 ? 'bg-gradient-to-r from-orange-50 to-orange-100' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">#{entry.rank}</span>
                        {getBadge(entry.rank || 0)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{entry.email}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600 text-sm">{entry.program || 'N/A'}</span>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold">
                      {entry.wpm}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {entry.accuracy.toFixed(1)}%
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleShare(entry)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Share
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

