import { FaPhone, FaUser, FaUserFriends } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'

import { EditState } from '@/lib/types/provider'
import { ProviderDetails, ProviderProfile } from '@/lib/types/provider'
export function transformProviderProfile(
  data: ProviderProfile,
): ProviderDetails {
  return [
    {
      label: 'Name & Title',
      key: 'name',
      value: { firstName: data.firstName ?? '', lastName: data.lastName ?? '' },
      icon: FaUser,
    },
    {
      label: 'Phone',
      key: 'phone',
      value: data.phone,
      icon: FaPhone,
    },
    {
      label: 'Email',
      key: 'email',
      value: data.email ?? '(no email)',
      icon: MdAlternateEmail,
    },
    {
      label: 'Are you accepting new patients?',
      key: 'newPatients',
      value: true,
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
