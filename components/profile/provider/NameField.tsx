import { EditableName } from '@/lib/types/provider'

import { Input } from '../../ui/input'

export interface NameFieldProps {
  value: EditableName | null
  editing: boolean

  onUpdate: (val: EditableName) => void
}

export default function NameField({
  value,
  editing,
  onUpdate,
}: NameFieldProps) {
  if (!value) {
    return null
  }

  if (!editing) {
    return (
      <p>
        {value.firstName} {value.lastName}
      </p>
    )
  }

  return (
    <>
      <Input
        aria-label="First Name"
        className="bg-muted"
        value={value.firstName ?? ''}
        onChange={(e) => onUpdate({ ...value, firstName: e.target.value })}
      />

      <Input
        aria-label="Last Name"
        className="bg-muted"
        value={value.lastName ?? ''}
        onChange={(e) => onUpdate({ ...value, lastName: e.target.value })}
      />
    </>
  )
}
