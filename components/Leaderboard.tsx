'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface LeaderboardEntry {
  id: string
  email: string
  wpm: number
  accuracy: number
  created_at: string
  rank?: number
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
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
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('wpm', { ascending: false })
        .limit(100)

      if (error) throw error

      // Add rank to each entry
      const rankedData = data.map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }))

      setEntries(rankedData || [])
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
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4">Rank</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-right py-3 px-4">WPM</th>
              <th className="text-right py-3 px-4">Accuracy</th>
              <th className="text-center py-3 px-4">Share</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No entries yet. Be the first to complete a test!
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
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
  )
}

