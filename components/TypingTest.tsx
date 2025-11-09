'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import type { TypedUser } from '@/types/supabase'

const texts: readonly string[] = [
  "Waterloo co-op is the ultimate hustle. Six work terms, endless applications, and the dream of landing that Cali or bust internship. We grind through LeetCode, polish our resumes, and type cover letters faster than we type code.",
  "California or bust! That's the Waterloo motto. Every CS and engineering student dreams of that Silicon Valley co-op. The rent might be insane, but the experience is priceless. Plus, you can always come back to Waterloo where geese are the only thing trying to attack you.",
  "The co-op hustle never stops at Waterloo. While other students are on break, we're applying to jobs, doing interviews, and preparing for our next work term. It's exhausting, but it's also how we graduate with two years of experience.",
  "Waterloo students don't sleep, we optimize. We optimize our study schedules, our co-op applications, and our typing speed. Because when you're juggling classes and job hunting, every second counts.",
  "San Francisco rent is higher than our GPAs, but that's the price of the Cali dream. Waterloo students know the grind: study hard, apply harder, and maybe one day you'll afford a studio apartment in the Bay Area.",
  "The internship hustle is real. We spend more time on LinkedIn than on Quest. We write cover letters, do technical interviews, and hope that this time, this application, will be the one that lands us that dream co-op.",
  "Waterloo co-op isn't just a program, it's a lifestyle. We live in four-month cycles: study term, work term, repeat. We pack our lives into suitcases and move cities every four months. It's chaotic, but it's also incredible.",
  "California or bust isn't just a phrase, it's a mindset. Every Waterloo student knows someone who made it to the Bay Area. We see the success stories, we read the blog posts, and we dream of being next.",
  "The co-op application season is more stressful than finals. We refresh our emails constantly, practice coding problems daily, and hope our resume stands out among thousands. But when you get that offer, it's all worth it.",
  "Waterloo geese are more aggressive than tech recruiters, but at least the recruiters pay you. We navigate campus dodging geese and navigate life chasing internships. Both require skill, determination, and a bit of luck.",
] as const

interface TypingTestProps {
  user: TypedUser
}

export default function TypingTest({ user }: TypingTestProps): JSX.Element {
  const [text, setText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isComplete, setIsComplete] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const randomText = texts[Math.floor(Math.random() * texts.length)]
    setText(randomText)
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    if (!testStarted) {
      setTestStarted(true)
      setStartTime(Date.now())
    }

    setUserInput(value)

    // Calculate accuracy
    let correctChars = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) {
        correctChars++
      }
    }
    const acc = value.length > 0 ? (correctChars / value.length) * 100 : 100
    setAccuracy(acc)

    // Calculate WPM
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 60000 // minutes
      const wordsTyped = value.trim().split(/\s+/).length
      const currentWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0
      setWpm(currentWpm)
    }

    // Check if complete
    if (value === text) {
      setIsComplete(true)
      saveResult()
    }
  }

  const saveResult = async () => {
    if (!startTime || !isComplete) return

    const timeElapsed = (Date.now() - startTime) / 60000
    const wordsTyped = userInput.trim().split(/\s+/).length
    const finalWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0

    // Get program and faculty from user metadata
    const program = user.user_metadata?.program || ''
    const faculty = user.user_metadata?.faculty || ''

    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert({
          user_id: user.id,
          email: user.email,
          program: program,
          faculty: faculty,
          wpm: finalWpm,
          accuracy: accuracy,
          created_at: new Date().toISOString(),
        })

      if (error) throw error
    } catch (error) {
      console.error('Error saving result:', error)
    }
  }

  const resetTest = () => {
    const randomText = texts[Math.floor(Math.random() * texts.length)]
    setText(randomText)
    setUserInput('')
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
    setTestStarted(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const getCharClass = (index: number): string => {
    if (index >= userInput.length) return 'text-gray-500'
    if (userInput[index] === text[index]) return 'text-emerald-400'
    return 'text-red-400 bg-red-500/20'
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 md:p-8 mb-8 shadow-2xl shadow-blue-500/10">
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg blur opacity-30 animate-pulse"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">WPM</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{wpm}</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-400 rounded-lg blur opacity-30 animate-pulse"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Accuracy</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">{accuracy.toFixed(1)}%</div>
            </div>
          </div>
        </div>
        <button
          onClick={resetTest}
          className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
        >
          <span className="relative z-10">New Test</span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 blur-xl transition-opacity"></div>
        </button>
      </div>

      <div className="mb-4">
        <div className="text-lg leading-relaxed p-6 bg-gray-950/70 backdrop-blur-sm rounded-2xl border border-gray-700/50 min-h-[150px] font-mono shadow-inner">
          {text.split('').map((char, index) => (
            <span key={index} className={getCharClass(index)}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInput}
        onPaste={(e) => e.preventDefault()}
        disabled={isComplete}
        placeholder={isComplete ? 'Test complete! Click "New Test" to try again.' : 'Start typing...'}
        className="w-full p-6 text-lg bg-gray-950/70 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none min-h-[120px] text-white placeholder-gray-500 font-mono transition-all duration-300 shadow-lg"
        autoFocus
      />

      {isComplete && (
        <div className="mt-4 p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl backdrop-blur-sm animate-pulse-glow">
          <p className="text-emerald-400 font-semibold flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span>Test Complete! Your score has been saved to the leaderboard.</span>
          </p>
        </div>
      )}
    </div>
  )
}

