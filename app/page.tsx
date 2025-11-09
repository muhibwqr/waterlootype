'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import TypingTest from '@/components/TypingTest'
import Leaderboard from '@/components/Leaderboard'
import LandingPage from '@/components/LandingPage'
import type { Session } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default function Home(): JSX.Element {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return <LandingPage />
  }

  // Check if email is verified and is a uwaterloo.ca email
  const email = session.user.email || ''
  const isVerified = session.user.email_confirmed_at !== null
  const isUWaterlooEmail = email.endsWith('@uwaterloo.ca')

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Email Verification Required</h1>
          <p className="text-gray-400 mb-6">
            Please check your email and verify your account before continuing.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  if (!isUWaterlooEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            Only @uwaterloo.ca emails are allowed to use this app.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            WaterlooType
          </h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Sign Out
          </button>
        </div>
        <TypingTest user={session.user as import('@/types/supabase').TypedUser} />
        <Leaderboard />
      </div>
    </main>
  )
}

