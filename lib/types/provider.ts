import { IconType } from 'react-icons'

import { Database } from '@/lib/supabase/types'

import { Person as AuthPerson } from './auth'

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

export type EditableValue = string | boolean | EditableName | null

export type EditAction =
  | { type: 'EDIT'; key: string; value: EditableValue }
  | { type: 'UPDATE'; value: EditableValue }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

export type ProviderDetails = [
  {
    label: string
    key: 'name'
    value: { firstName: string; lastName: string }
    icon: IconType
  },
  { label: string; key: 'phone'; value: string; icon: IconType },
  { label: string; key: 'email'; value: string; icon: IconType },
  { label: string; key: 'newPatients'; value: boolean; icon: IconType },
]

export type EditState = {
  providerId: number
  providerDetails: ProviderDetails
  editingKey: string | null
  editableValue: EditableValue | null
}

export interface ProviderProfile extends AuthPerson {
  email: string
  phone: string
}

export interface UpdatedValues {
  key: string | null
  updatedValue: EditableValue
  providerId: number
  authId: string
}
