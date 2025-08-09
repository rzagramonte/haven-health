'use client'

import type { AddressUI } from '@/lib/types/patientProfile'

import { Input } from '../../ui/input'

export interface AddressFieldProps {
  value: AddressUI | null
  editing: boolean
  onUpdate: (value: AddressUI) => void
}

export default function AddressField({
  value,
  editing,
  onUpdate,
}: AddressFieldProps) {
  const currentAddress = value || {
    streetA: '',
    streetB: '',
    city: '',
    state: '',
    zipCode: '',
  }

  if (!editing) {
    if (!currentAddress.streetA) {
      return <p className="text-foreground/50">Not provided</p>
    }

    const placeholderClass = 'text-foreground/50'
    return (
      <>
        <p className={!currentAddress.streetA ? placeholderClass : ''}>
          {currentAddress.streetA || 'Street Address'}
        </p>
        {currentAddress.streetB && <p>{currentAddress.streetB}</p>}
        <p
          className={
            !currentAddress.city &&
            !currentAddress.state &&
            !currentAddress.zipCode
              ? placeholderClass
              : ''
          }
        >
          {`${currentAddress.city || 'City'}, ${
            currentAddress.state || 'State'
          } ${currentAddress.zipCode || 'ZIP'}`}
        </p>
      </>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...currentAddress,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Input
        aria-label="Street Address A"
        placeholder="Street..."
        className="bg-muted placeholder:text-foreground/50"
        name="streetA"
        value={currentAddress.streetA ?? ''}
        onChange={handleChange}
      />
      <Input
        aria-label="Street Address B (optional)"
        placeholder="Apt..."
        className="bg-muted placeholder:text-foreground/50"
        name="streetB"
        value={currentAddress.streetB ?? ''}
        onChange={handleChange}
      />
      <Input
        aria-label="City"
        placeholder="City"
        className="bg-muted placeholder:text-foreground/50"
        name="city"
        value={currentAddress.city ?? ''}
        onChange={handleChange}
      />
      <Input
        aria-label="State"
        placeholder="State"
        className="bg-muted placeholder:text-foreground/50"
        name="state"
        value={currentAddress.state ?? ''}
        onChange={handleChange}
      />
      <Input
        aria-label="Zip Code"
        placeholder="ZIP"
        className="bg-muted placeholder:text-foreground/50"
        name="zipCode"
        value={currentAddress.zipCode ?? ''}
        onChange={handleChange}
      />
    </>
  )
}
