'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import TypingTest from '@/components/TypingTest'
import Leaderboard from '@/components/Leaderboard'
import LandingPage from '@/components/LandingPage'

export const dynamic = 'force-dynamic'

export default function Home() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Email Verification Required</h1>
          <p className="text-gray-600 mb-6">
            Please check your email and verify your account before continuing.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  if (!isUWaterlooEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            Only @uwaterloo.ca emails are allowed to use this app.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-center flex-1">WaterlooType</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Sign Out
        </button>
      </div>
      <TypingTest user={session.user} />
      <Leaderboard />
    </main>
  )
}

