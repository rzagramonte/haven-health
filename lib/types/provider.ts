import { Json } from '../supabase/types'
import { Address, Person } from './auth'

export interface ProviderAccountSettings extends Person {
  address: Address
  emergencyContact: Json | undefined
}
