import { FaHome, FaPhone, FaUser, FaUserFriends } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { RiContactsBookFill } from 'react-icons/ri'

import type {
  EditState,
  PatientDetails,
  PatientProfile,
} from '@/lib/types/patientProfile'

export function transformPatientProfile(data: PatientProfile): PatientDetails {
  return [
    {
      label: 'Name',
      key: 'name',
      value: { firstName: data.firstName, lastName: data.lastName },
      icon: FaUser,
    },
    {
      label: 'Phone',
      key: 'phone',
      value: data.phone || 'Not provided',
      icon: FaPhone,
    },
    {
      label: 'Email',
      key: 'email',
      value: data.email || 'Not provided',
      icon: MdAlternateEmail,
    },

    {
      label: 'Address',
      key: 'address',
      value: data.address,
      icon: FaHome,
    },

    {
      label: 'Emergency Contact',
      key: 'emergencyContact',
      value: data.emergencyContact,
      icon: RiContactsBookFill,
    },
    {
      label: 'Are you currently insured?',
      key: 'insuranceFlag',
      value: data.insurance_flag,
      icon: FaUserFriends,
    },
  ]
}

export function getFieldValue<T>(
  key: string,
  editState: EditState,
  originalValue: T,
): T {
  if (editState.editingKey === key && editState.editableValue !== null) {
    if (
      typeof originalValue === 'string' &&
      typeof editState.editableValue === 'string'
    ) {
      return editState.editableValue as T
    }

    if (
      typeof originalValue === 'boolean' &&
      typeof editState.editableValue === 'boolean'
    ) {
      return editState.editableValue as T
    }

    if (
      typeof originalValue === 'object' &&
      typeof editState.editableValue === 'object'
    ) {
      return editState.editableValue as T
    }
  }

  return originalValue
}
