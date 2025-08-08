import { EditState } from '@/components/profile/patient/editPatientProfile'

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
