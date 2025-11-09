'use client'

import { useState } from 'react'
import Auth from './Auth'

export default function LandingPage(): JSX.Element {
  const [showAuth, setShowAuth] = useState<boolean>(false)

  if (showAuth) {
    return <Auth />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            WaterlooType
          </h1>
          <p className="text-2xl text-blue-200 mb-2">
            The Typing Test for UWaterloo Warriors
          </p>
          <p className="text-lg text-blue-300">
            Test your speed. Compete on the leaderboard. Represent your faculty.
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-16">
          <button
            onClick={() => setShowAuth(true)}
            className="bg-white text-blue-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            Get Started - It's Free! 🚀
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Test Your Speed</h3>
            <p className="text-blue-200">
              Practice with Waterloo-themed texts about co-op, internships, and the Cali or bust grind.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">Compete & Climb</h3>
            <p className="text-blue-200">
              See where you rank among Waterloo students. Top 3 get Diamond, Gold, and Bronze badges!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-white mb-2">Faculty Pride</h3>
            <p className="text-blue-200">
              Represent your faculty! See which faculty has the fastest typers on average.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 flex items-start gap-4">
              <div className="text-3xl font-bold text-blue-300 flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Sign Up</h3>
                <p className="text-blue-200">
                  Create an account with your @uwaterloo.ca email. Tell us your program and faculty.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 flex items-start gap-4">
              <div className="text-3xl font-bold text-blue-300 flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Type & Test</h3>
                <p className="text-blue-200">
                  Type Waterloo-themed texts about co-op applications, internship hustle, and the California dream.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 flex items-start gap-4">
              <div className="text-3xl font-bold text-blue-300 flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Climb the Leaderboard</h3>
                <p className="text-blue-200">
                  See your WPM and accuracy. Compete for the top spots and represent your faculty!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats/Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Why WaterlooType?
          </h3>
          <p className="text-blue-200 text-lg mb-6">
            We know you're already fast at typing code, cover letters, and LeetCode solutions. 
            Now prove it and see how you stack up against other Warriors!
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">💎</div>
              <div className="text-blue-200 mt-2">Diamond Tier</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">🥇</div>
              <div className="text-blue-200 mt-2">Gold Tier</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">🥉</div>
              <div className="text-blue-200 mt-2">Bronze Tier</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Typing Now! ⌨️
          </button>
          <p className="text-blue-300 mt-4 text-sm">
            Only @uwaterloo.ca emails allowed • Free forever
          </p>
        </div>
      </div>
    </div>
  )
}

