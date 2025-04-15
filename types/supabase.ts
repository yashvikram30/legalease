export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          conversation_id: string
          content: string
          role: "user" | "assistant"
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          content: string
          role: "user" | "assistant"
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          content?: string
          role?: "user" | "assistant"
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          original_name: string
          file_path: string
          file_type: string
          file_size: number
          simplified_content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          original_name: string
          file_path: string
          file_type: string
          file_size: number
          simplified_content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          original_name?: string
          file_path?: string
          file_type?: string
          file_size?: number
          simplified_content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cases: {
        Row: {
          id: string
          user_id: string
          case_number: string
          court: string
          type: string
          stage: "Filed" | "Hearing" | "Evidence" | "Arguments" | "Judgment" | "Closed"
          status: "Active" | "Pending" | "Delayed" | "Completed"
          progress: number
          next_hearing: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          case_number: string
          court: string
          type: string
          stage: "Filed" | "Hearing" | "Evidence" | "Arguments" | "Judgment" | "Closed"
          status: "Active" | "Pending" | "Delayed" | "Completed"
          progress: number
          next_hearing?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          case_number?: string
          court?: string
          type?: string
          stage?: "Filed" | "Hearing" | "Evidence" | "Arguments" | "Judgment" | "Closed"
          status?: "Active" | "Pending" | "Delayed" | "Completed"
          progress?: number
          next_hearing?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      case_events: {
        Row: {
          id: string
          case_id: string
          title: string
          description: string | null
          event_date: string
          status: "completed" | "current" | "upcoming"
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          title: string
          description?: string | null
          event_date: string
          status: "completed" | "current" | "upcoming"
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          title?: string
          description?: string | null
          event_date?: string
          status?: "completed" | "current" | "upcoming"
          created_at?: string
        }
      }
      rights_categories: {
        Row: {
          id: string
          title: string
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
      legal_rights: {
        Row: {
          id: string
          category_id: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      legal_help_providers: {
        Row: {
          id: string
          name: string
          type: "NGO" | "Lawyer" | "Clinic" | "Government"
          specialization: string[]
          location: string
          state: string
          languages: string[]
          rating: number
          contact: Json
          availability: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: "NGO" | "Lawyer" | "Clinic" | "Government"
          specialization: string[]
          location: string
          state: string
          languages: string[]
          rating: number
          contact: Json
          availability: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: "NGO" | "Lawyer" | "Clinic" | "Government"
          specialization?: string[]
          location?: string
          state?: string
          languages?: string[]
          rating?: number
          contact?: Json
          availability?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
