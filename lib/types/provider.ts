import { IconType } from 'react-icons'

import { Address, Person } from './auth'
import { EmergencyContact } from './patient'

export type ProviderDetails = [
  { label: string; key: 'name'; value: string; icon: IconType },
  { label: string; key: 'phone'; value: string; icon: IconType },
  { label: string; key: 'email'; value: string; icon: IconType },
  { label: string; key: 'address'; value: string; icon: IconType },
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

export interface ProviderAccountSettings extends Person {
  address: Address
  emergencyContact: EmergencyContact
  email: string
}
