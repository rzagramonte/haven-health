import { IconType } from 'react-icons'

import { Database } from '@/lib/supabase/types'

export type Person = Database['public']['Tables']['person']['Row']
export type Patient = Database['public']['Tables']['patient']['Row']
export type Address = Database['public']['Tables']['address']['Row']
export type Contact = Database['public']['Tables']['contact']['Row']

export type PatientInfo = Person & {
  contact: Contact[]
  address: Address[]
  patient: Patient[]
}

export interface PatientProfile {
  id: number
  authId: string
  firstName: string
  lastName: string
  email: string | null
  phone: string | null
  address: AddressUI | null
  emergencyContact: EmergencyContact | null
  insurance_flag: boolean
}

export interface AddressUI {
  streetA: string | null
  streetB: string | null
  city: string | null
  state: string | null
  zipCode: string | null
}

export type EmergencyContact = {
  firstName: string
  lastName: string
  phone: string
}

export type EditableName = {
  firstName: string
  lastName: string
}

export type EditableValue =
  | string
  | boolean
  | EditableName
  | AddressUI
  | EmergencyContact
  | null

export type EditAction =
  | { type: 'EDIT'; key: string; value: EditableValue }
  | { type: 'UPDATE'; value: EditableValue }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

export type PatientDetails = [
  {
    label: string
    key: 'name'
    value: { firstName: string; lastName: string }
    icon: IconType
  },
  { label: string; key: 'phone'; value: string; icon: IconType },
  { label: string; key: 'email'; value: string; icon: IconType },
  { label: string; key: 'address'; value: AddressUI | null; icon: IconType }, // Use AddressUI
  {
    label: string
    key: 'emergencyContact'
    value: EmergencyContact | null
    icon: IconType
  },
  { label: string; key: 'insuranceFlag'; value: boolean; icon: IconType },
]

export type EditState = {
  patientId: number
  patientDetails: PatientDetails
  editingKey: string | null
  editableValue: EditableValue | null
}

export interface UpdatedValues {
  key: string | null
  updatedValue: EditableValue
  patientId: number
  authId: string
}
