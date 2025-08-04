import { Database } from '@/lib/supabase/types'

export type Person = Database['public']['Tables']['person']['Row']
export type Contact = Database['public']['Tables']['contact']['Row']
export type Address = Database['public']['Tables']['address']['Row']

export type ProviderInfo = Person & {
  contact: Contact[]
  address: Address[]
}
