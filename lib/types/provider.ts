import { IconType } from 'react-icons'

import { Address, Person } from './auth'
import { EmergencyContact } from './patient'

// PROVIDER PROFILE TYPES

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
  | EditableEmergencyContact
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
    value: Omit<Address, 'id' | 'personId'>
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

export interface ProviderProfile extends Person {
  address: Omit<Address, 'id' | 'personId'>
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
