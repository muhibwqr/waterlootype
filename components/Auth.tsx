'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const faculties: readonly string[] = [
  'Mathematics',
  'Engineering',
  'Arts',
  'Science',
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

  const validateEmail = (email: string) => {
    return email.endsWith('@uwaterloo.ca')
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!validateEmail(email)) {
      setMessage('Only @uwaterloo.ca emails are allowed!')
      return
    }

    if (isSignUp && (!program || !faculty)) {
      setMessage('Please select both program and faculty!')
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
              program,
              faculty,
            },
          },
        })

        if (error) throw error
        setMessage('Check your email to verify your account!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error
      }
    } catch (error: any) {
      setMessage(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          WaterlooType
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Typing test for UWaterloo students only
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email (@uwaterloo.ca)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@uwaterloo.ca"
              required
              className="w-full px-4 py-2.5 bg-gray-950/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2.5 bg-gray-950/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
            />
          </div>

          {isSignUp && (
            <>
              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-300 mb-1">
                  Program
                </label>
                <input
                  id="program"
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  placeholder="e.g., Computer Science, Software Engineering"
                  required={isSignUp}
                  className="w-full px-4 py-2.5 bg-gray-950/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label htmlFor="faculty" className="block text-sm font-medium text-gray-300 mb-1">
                  Faculty
                </label>
                <select
                  id="faculty"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  required={isSignUp}
                  className="w-full px-4 py-2.5 bg-gray-950/50 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-white"
                >
                  <option value="" className="bg-gray-900">Select your faculty</option>
                  {faculties.map((f) => (
                    <option key={f} value={f} className="bg-gray-900">
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {message && (
            <div className={`p-3 rounded-lg ${message.includes('Check your email') ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setMessage('')
              setProgram('')
              setFaculty('')
            }}
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}

