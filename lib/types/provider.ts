import { IconType } from 'react-icons'

import { Database } from '@/lib/supabase/types'

import { Address as AuthAddress, Person as AuthPerson } from './auth'
import { EmergencyContact } from './patient'

export type Person = Database['public']['Tables']['person']['Row']
export type Contact = Database['public']['Tables']['contact']['Row']
export type Address = Database['public']['Tables']['address']['Row']

export type ProviderInfo = Person & {
  contact: Contact[]
  address: Address[]
}

export interface EditableName {
  firstName: string
  lastName: string
}

export type EditableEmergencyContact = Omit<Address, 'id' | 'personId'>

export type EditableValue =
  | string
  | boolean
  | EmergencyContact
  | EditableName
  | AuthAddress
  | null

export type EditAction =
  | { type: 'EDIT'; key: string; value: EditableValue }
  | { type: 'UPDATE'; value: EditableValue }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

export type EditState = {
  providerId: number
  providerDetails: ProviderDetails
  editingKey: string | null
  editableValue: EditableValue | null
}

export type ProviderDetails = [
  {
    label: string
    key: 'name'
    value: { firstName: string; lastName: string }
    icon: IconType
  },
  { label: string; key: 'phone'; value: string; icon: IconType },
  { label: string; key: 'email'; value: string; icon: IconType },
  {
    label: string
    key: 'address'
    value: AuthAddress
    icon: IconType
  },
  {
    label: string
    key: 'emergencyContact'
    value: {
      firstName: string
      lastName: string
      phone: string
    }
    icon: IconType
  },
  { label: string; key: 'newPatients'; value: boolean; icon: IconType },
]

export interface ProviderProfile extends AuthPerson {
  address: AuthAddress
  emergencyContact: EmergencyContact
  email: string
  phone: string
}

export interface UpdatedSettingValues {
  settingKey: string | null
  settingValue: EditableValue
  providerId: number
  authId: string
}
