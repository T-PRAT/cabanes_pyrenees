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
      hut: {
        Row: {
          altitude: number | null
          city: string | null
          created_at: string
          description: string | null
          hut_type: Database["public"]["Enums"]["hut_type"] | null
          id: number
          latitude: number | null
          longitude: number | null
          name: string | null
          summer_capacity: number | null
          winter_capacity: number | null
        }
        Insert: {
          altitude?: number | null
          city?: string | null
          created_at?: string
          description?: string | null
          hut_type?: Database["public"]["Enums"]["hut_type"] | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          summer_capacity?: number | null
          winter_capacity?: number | null
        }
        Update: {
          altitude?: number | null
          city?: string | null
          created_at?: string
          description?: string | null
          hut_type?: Database["public"]["Enums"]["hut_type"] | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          summer_capacity?: number | null
          winter_capacity?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      hut_type:
        | "cabane ouverte"
        | "cabane fermee"
        | "cabane occupee en ete"
        | "ruine"
        | "orri / abri en pierre"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
