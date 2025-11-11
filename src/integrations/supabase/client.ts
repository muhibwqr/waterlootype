'use client'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

declare global {
  // eslint-disable-next-line no-var
  var __supabaseClient: SupabaseClient<Database> | undefined
}

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'placeholder-key'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] Missing configuration. Populate NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  )
}

const authOptions =
  typeof window !== 'undefined'
    ? {
        storage: window.localStorage,
        persistSession: true,
        autoRefreshToken: true,
      }
    : undefined

if (!globalThis.__supabaseClient) {
  globalThis.__supabaseClient = createClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    authOptions ? { auth: authOptions } : undefined
  )
}

export function getSupabaseClient(): SupabaseClient<Database> {
  return globalThis.__supabaseClient as SupabaseClient<Database>
}

export const supabase: SupabaseClient<Database> = getSupabaseClient()


