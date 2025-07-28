export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      address: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city_province_region: string | null
          created_at: string
          id: string
          person_id: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city_province_region?: string | null
          created_at?: string
          id?: string
          person_id?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city_province_region?: string | null
          created_at?: string
          id?: string
          person_id?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'address_person_id_fkey'
            columns: ['person_id']
            isOneToOne: false
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
        ]
      }
      appointment: {
        Row: {
          'check-in_time': string | null
          created_at: string
          date_time: string
          doctor_id: string | null
          duration: Database['public']['Enums']['appt_duration'] | null
          id: string
          patient_id: string | null
          status: Database['public']['Enums']['appt_status'] | null
          updated_at: string | null
        }
        Insert: {
          'check-in_time'?: string | null
          created_at?: string
          date_time?: string
          doctor_id?: string | null
          duration?: Database['public']['Enums']['appt_duration'] | null
          id?: string
          patient_id?: string | null
          status?: Database['public']['Enums']['appt_status'] | null
          updated_at?: string | null
        }
        Update: {
          'check-in_time'?: string | null
          created_at?: string
          date_time?: string
          doctor_id?: string | null
          duration?: Database['public']['Enums']['appt_duration'] | null
          id?: string
          patient_id?: string | null
          status?: Database['public']['Enums']['appt_status'] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'appointment_doctor_id_fkey'
            columns: ['doctor_id']
            isOneToOne: false
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'appointment_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
        ]
      }
      contact: {
        Row: {
          created_at: string
          id: string
          type: Database['public']['Enums']['contact_type'] | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          type?: Database['public']['Enums']['contact_type'] | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database['public']['Enums']['contact_type'] | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'contact_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
        ]
      }
      medical_visit: {
        Row: {
          allergies: string | null
          created_at: string
          follow_up_date: string
          id: string
          patient_id: string | null
          prescriptions: string | null
          provider_id: string | null
          summary_notes: string | null
          updated_at: string | null
        }
        Insert: {
          allergies?: string | null
          created_at?: string
          follow_up_date: string
          id?: string
          patient_id?: string | null
          prescriptions?: string | null
          provider_id?: string | null
          summary_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          allergies?: string | null
          created_at?: string
          follow_up_date?: string
          id?: string
          patient_id?: string | null
          prescriptions?: string | null
          provider_id?: string | null
          summary_notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'medical_visit_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'medical_visit_provider_id_fkey'
            columns: ['provider_id']
            isOneToOne: false
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
        ]
      }
      messages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          recipient_id: string | null
          sender_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          recipient_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          recipient_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'messages_recipient_id_fkey'
            columns: ['recipient_id']
            isOneToOne: false
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
        ]
      }
      patient: {
        Row: {
          created_at: string
          dob: string | null
          emergency_contact: Json | null
          id: string
          insurance: boolean | null
          sex: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          dob?: string | null
          emergency_contact?: Json | null
          id?: string
          insurance?: boolean | null
          sex?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          dob?: string | null
          emergency_contact?: Json | null
          id?: string
          insurance?: boolean | null
          sex?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'patient_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'person'
            referencedColumns: ['id']
          },
        ]
      }
      person: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database['public']['Enums']['role'] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database['public']['Enums']['role'] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database['public']['Enums']['role'] | null
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
      appt_duration: '30' | '20' | '15' | '45' | '25'
      appt_status:
        | 'scheduled'
        | 'cancelled'
        | 'no-show'
        | 'late'
        | 'rescheduled'
        | 'completed'
      appt_type:
        | 'General Checkup'
        | 'Chronic Condition Follow-Up'
        | 'Vaccination'
        | 'Mental Health Visit'
        | 'Sick Visit'
      contact_type: 'phone' | 'e-mail'
      role: 'patient' | 'provider' | 'admin'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appt_duration: ['30', '20', '15', '45', '25'],
      appt_status: [
        'scheduled',
        'cancelled',
        'no-show',
        'late',
        'rescheduled',
        'completed',
      ],
      appt_type: [
        'General Checkup',
        'Chronic Condition Follow-Up',
        'Vaccination',
        'Mental Health Visit',
        'Sick Visit',
      ],
      contact_type: ['phone', 'e-mail'],
      role: ['patient', 'provider', 'admin'],
    },
  },
} as const
