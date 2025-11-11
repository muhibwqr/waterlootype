export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leaderboard: {
        Row: {
          accuracy: number
          created_at: string
          faculty: string | null
          id: string
          program: string | null
          tier: string | null
          user_id: string
          email: string | null
          wpm: number
        }
        Insert: {
          accuracy: number
          created_at?: string
          faculty?: string | null
          id?: string
          program?: string | null
          tier?: string | null
          user_id: string
          email?: string | null
          wpm: number
        }
        Update: {
          accuracy?: number
          created_at?: string
          faculty?: string | null
          id?: string
          program?: string | null
          tier?: string | null
          user_id?: string | null
          email?: string | null
          wpm?: number
        }
        Relationships: [
          {
            foreignKeyName: 'leaderboard_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['user_id']
          },
          {
            foreignKeyName: 'leaderboard_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          badges: Json | null
          best_wpm: number | null
          display_name: string | null
          faculty: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          badges?: Json | null
          best_wpm?: number | null
          display_name?: string | null
          faculty?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          badges?: Json | null
          best_wpm?: number | null
          display_name?: string | null
          faculty?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


