'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const texts = [
  "Muhib is the coolest person at Waterloo, no cap! He types faster than light and codes like a wizard. When he's not busy being awesome, he's probably thinking about how cool he is.",
  "Waterloo is the best university in Canada, and we're not just saying that because we go here. The co-op program is legendary, and the geese are... well, they're geese. But hey, at least we're not in Toronto where everything costs a million dollars!",
  "San Francisco? More like San Fran-sisco where your rent is higher than your GPA! At least in Waterloo, we can afford to eat AND pay tuition. California is bust, but Waterloo is the best!",
  "Why did the Waterloo student cross the road? To get to the other side of the co-op term! Muhib would definitely approve of this joke because he's cool like that.",
  "Waterloo students don't just type fast, we type with purpose. We type assignments, we type code, we type emails to our co-op employers.",
  "California dreaming? More like California screaming when you see the rent prices! In Waterloo, we have affordable housing (totally not lying) and Muhib being cool. That's a win-win situation right there.",
  "The best typers in Waterloo know that speed isn't everything - it's about accuracy, style, and being as cool as Muhib. He's basically the typing equivalent of a rock star.",
  "San Francisco has the Golden Gate Bridge, but Waterloo has the Golden Typers. And the coolest one? You guessed it - Muhib! He's so cool, even the geese respect him.",
]

interface TypingTestProps {
  user: any
}

export default function TypingTest({ user }: TypingTestProps) {
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

    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert({
          user_id: user.id,
          email: user.email,
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

  const getCharClass = (index: number) => {
    if (index >= userInput.length) return 'text-gray-400'
    if (userInput[index] === text[index]) return 'text-green-500'
    return 'text-red-500 bg-red-100'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-6">
          <div>
            <div className="text-sm text-gray-600">WPM</div>
            <div className="text-2xl font-bold">{wpm}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Accuracy</div>
            <div className="text-2xl font-bold">{accuracy.toFixed(1)}%</div>
          </div>
        </div>
        <button
          onClick={resetTest}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          New Test
        </button>
      </div>

      <div className="mb-4">
        <div className="text-lg leading-relaxed p-4 bg-gray-50 rounded border-2 border-gray-200 min-h-[150px]">
          {text.split('').map((char, index) => (
            <span key={index} className={getCharClass(index)}>
              {char}
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
        className="w-full p-4 text-lg border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none resize-none min-h-[100px]"
        autoFocus
      />

      {isComplete && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 font-semibold">
            Test Complete! Your score has been saved to the leaderboard.
          </p>
        </div>
      )}
    </div>
  )
}

