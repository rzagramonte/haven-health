import { Input } from '../input'

export type EmergencyContact = {
  firstName: string
  lastName: string
  phone: string
}

export interface EmergencyContactFieldProps {
  value: EmergencyContact | null
  editing: boolean
  onUpdate: (val: EmergencyContact) => void
}

export default function EditableEmergencyContactField({
  value,
  editing,
  onUpdate,
}: EmergencyContactFieldProps) {
  if (!value) {
    return
  }

  if (!editing) {
    return (
      <>
        <p>
          {value.firstName} {value.lastName}
        </p>
        <p>{value.phone}</p>
      </>
    )
  }

  return (
    <>
      <Input
        aria-label="Emergency Contact First Name"
        className="bg-muted"
        value={value.firstName}
        onChange={(e) => onUpdate({ ...value, firstName: e.target.value })}
      />
      <Input
        aria-label="Emergency Contact Last Name"
        className="bg-muted"
        value={value.lastName}
        onChange={(e) => onUpdate({ ...value, lastName: e.target.value })}
      />
      <Input
        aria-label="Phone Number"
        className="bg-muted"
        value={value.phone}
        onChange={(e) => onUpdate({ ...value, phone: e.target.value })}
      />
    </>
  )
}
