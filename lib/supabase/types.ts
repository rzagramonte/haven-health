export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      address: {
        Row: {
          address_state: string | null
          city: string | null
          created_at: string | null
          id: number
          person_id: number | null
          streeta: string | null
          streetb: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address_state?: string | null
          city?: string | null
          created_at?: string | null
          id?: number
          person_id?: number | null
          streeta?: string | null
          streetb?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address_state?: string | null
          city?: string | null
          created_at?: string | null
          id?: number
          person_id?: number | null
          streeta?: string | null
          streetb?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_address_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
        ]
      }
      appointment_booking: {
        Row: {
          appointment_time: string | null
          appointment_type:
            | Database["public"]["Enums"]["appointment_type_enums"]
            | null
          created_at: string | null
          date_of_birth: string | null
          date_paid: string | null
          emergency_contact: Json | null
          id: number
          insurance_flag: boolean | null
          person_id: number | null
          sex: string | null
          status: Database["public"]["Enums"]["appointment_status_enum"] | null
          updated_at: string | null
        }
        Insert: {
          appointment_time?: string | null
          appointment_type?:
            | Database["public"]["Enums"]["appointment_type_enums"]
            | null
          created_at?: string | null
          date_of_birth?: string | null
          date_paid?: string | null
          emergency_contact?: Json | null
          id?: number
          insurance_flag?: boolean | null
          person_id?: number | null
          sex?: string | null
          status?: Database["public"]["Enums"]["appointment_status_enum"] | null
          updated_at?: string | null
        }
        Update: {
          appointment_time?: string | null
          appointment_type?:
            | Database["public"]["Enums"]["appointment_type_enums"]
            | null
          created_at?: string | null
          date_of_birth?: string | null
          date_paid?: string | null
          emergency_contact?: Json | null
          id?: number
          insurance_flag?: boolean | null
          person_id?: number | null
          sex?: string | null
          status?: Database["public"]["Enums"]["appointment_status_enum"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact: {
        Row: {
          contact_type: Database["public"]["Enums"]["contact_type"] | null
          contact_value: string | null
          created_at: string | null
          id: number
          person_id: number | null
          updated_at: string | null
        }
        Insert: {
          contact_type?: Database["public"]["Enums"]["contact_type"] | null
          contact_value?: string | null
          created_at?: string | null
          id?: number
          person_id?: number | null
          updated_at?: string | null
        }
        Update: {
          contact_type?: Database["public"]["Enums"]["contact_type"] | null
          contact_value?: string | null
          created_at?: string | null
          id?: number
          person_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_contact_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_visit: {
        Row: {
          allergies: string[] | null
          created_at: string | null
          doctor_id: number | null
          followup_needed: string | null
          id: number
          patient_id: number | null
          prescriptions: string[] | null
          summary_notes: string | null
          updated_at: string | null
        }
        Insert: {
          allergies?: string[] | null
          created_at?: string | null
          doctor_id?: number | null
          followup_needed?: string | null
          id?: number
          patient_id?: number | null
          prescriptions?: string[] | null
          summary_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          allergies?: string[] | null
          created_at?: string | null
          doctor_id?: number | null
          followup_needed?: string | null
          id?: number
          patient_id?: number | null
          prescriptions?: string[] | null
          summary_notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_visit_doctor"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_visit_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient"
            referencedColumns: ["id"]
          },
        ]
      }
      patient: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          emergency_contact: Json | null
          id: number
          insurance_flag: boolean | null
          person_id: number | null
          sex: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact?: Json | null
          id?: number
          insurance_flag?: boolean | null
          person_id?: number | null
          sex?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact?: Json | null
          id?: number
          insurance_flag?: boolean | null
          person_id?: number | null
          sex?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_patient_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
        ]
      }
      person: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: number
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
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
      appointment_status_enum:
        | "scheduled"
        | "completed"
        | "canceled"
        | "no-show"
      appointment_type_enums:
        | "General Checkup"
        | "Chronic Condition Follow-Up"
        | "Vaccination & Immunization"
        | "Mental Health Consultation"
      contact_type: "phone" | "email"
      user_role: "patient" | "admin" | "provider"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_status_enum: [
        "scheduled",
        "completed",
        "canceled",
        "no-show",
      ],
      appointment_type_enums: [
        "General Checkup",
        "Chronic Condition Follow-Up",
        "Vaccination & Immunization",
        "Mental Health Consultation",
      ],
      contact_type: ["phone", "email"],
      user_role: ["patient", "admin", "provider"],
    },
  },
} as const
