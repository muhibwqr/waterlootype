import type { User } from '@supabase/supabase-js'

export interface UserMetadata {
  program?: string
  faculty?: string
}

export type TypedUser = User & {
  user_metadata?: UserMetadata
}

