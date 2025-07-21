import { Database } from './types'

// Main generic for accessing database records
export type DBRecord<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

// Additional helper types if needed
export type DBInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type DBUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
export type DBEnum<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

// Example usage - team can create their own types as needed:
// type Person = DBRecord<'person'>
// type NewPatient = DBInsert<'patient'>
// type UserRole = DBEnum<'user_role'>
