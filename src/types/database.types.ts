export type Json = string | number | boolean | null | {
  [key: string]: Json | undefined
} | Json[]

export type ProgramRole = "mentee" | "mentor" | "coordinator" | "admin"
export type ProfileStatus = "invited" | "active" | "inactive"
export type ProgramStatus = "draft" | "active" | "archived"

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          psu_email: string
          psu_id: string | null
          phone: string | null
          major: string | null
          class_year: number | null
          title: string | null
          bio: string | null
          avatar_path: string | null
          status: ProfileStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string
          last_name?: string
          psu_email: string
          psu_id?: string | null
          phone?: string | null
          major?: string | null
          class_year?: number | null
          title?: string | null
          bio?: string | null
          avatar_path?: string | null
          status?: ProfileStatus
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
        Relationships: []
      }
      programs: {
        Row: {
          id: string
          name: string
          term: string
          starts_on: string | null
          ends_on: string | null
          status: ProgramStatus
          mentor_reveal_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          term: string
          starts_on?: string | null
          ends_on?: string | null
          status?: ProgramStatus
          mentor_reveal_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["programs"]["Insert"]>
        Relationships: []
      }
      cohorts: {
        Row: {
          id: string
          program_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          program_id: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["cohorts"]["Insert"]>
        Relationships: []
      }
      program_memberships: {
        Row: {
          id: string
          program_id: string
          user_id: string
          role: ProgramRole
          cohort_id: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          program_id: string
          user_id: string
          role: ProgramRole
          cohort_id?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["program_memberships"]["Insert"]>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      program_role: ProgramRole
      profile_status: ProfileStatus
      program_status: ProgramStatus
    }
    CompositeTypes: Record<string, never>
  }
}
