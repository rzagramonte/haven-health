import { Address } from '@/lib/types/provider'

export interface PatientInfo extends Address {
  fullName: {
    firstName: string
    lastName: string
  }
  phone: string
  email: string
  address: Omit<Address, 'id' | 'person_id' | 'created_at' | 'updated_at'>
  emergencyContact: JSON
  insurance_flag: boolean
}
