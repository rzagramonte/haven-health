'use client'

import { Input } from '@/components/ui/input'
import type { EmergencyContact } from '@/lib/types/patientProfile'

interface EmergencyContactFieldProps {
  value: EmergencyContact | null
  editing: boolean
  onUpdate: (value: EmergencyContact) => void
}

export default function EmergencyContactField({
  value,
  editing,
  onUpdate,
}: EmergencyContactFieldProps) {
  const currentContact = value || { firstName: '', lastName: '', phone: '' }

  if (!editing) {
    if (!currentContact.firstName) {
      return <p className="text-muted-foreground">Not provided</p>
    }

    return (
      <div>
        <p>
          {currentContact.firstName} {currentContact.lastName}
        </p>
        <p className="text-sm text-foreground/80">{currentContact.phone}</p>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...currentContact,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex flex-col gap-2 p-2 bg-muted rounded-md">
      <div className="flex gap-2">
        <Input
          name="firstName"
          placeholder="First Name"
          defaultValue={currentContact.firstName ?? ''}
          onChange={handleChange}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          defaultValue={currentContact.lastName ?? ''}
          onChange={handleChange}
        />
      </div>
      <Input
        name="phone"
        placeholder="Phone Number"
        defaultValue={currentContact.phone ?? ''}
        onChange={handleChange}
      />
    </div>
  )
}
