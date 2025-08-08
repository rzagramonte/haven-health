import type { Address } from '@/lib/types/auth'

import { Input } from '../../ui/input'

export interface AddressFieldProps {
  value: Address | null
  editing: boolean
  onUpdate: (val: Address) => void
}

export default function AddressField({
  value,
  editing,
  onUpdate,
}: AddressFieldProps) {
  if (!value) {
    return null
  }

  if (!editing) {
    const placeholderClass = 'text-foreground/50'

    return (
      <>
        <p className={!value.streetA ? placeholderClass : ''}>
          {value.streetA || 'Street Address'}
        </p>
        {value.streetB && <p>{value.streetB}</p>}
        <p
          className={
            !value.city && !value.state && !value.zipCode
              ? placeholderClass
              : ''
          }
        >
          {`${value.city || 'City'}, ${value.state || 'State'} ${value.zipCode || 'ZIP'}`}
        </p>
      </>
    )
  }

  return (
    <>
      <Input
        aria-label="Street Address A"
        placeholder="Street..."
        className="bg-muted placeholder:text-foreground/50"
        value={value.streetA ?? ''}
        onChange={(e) => onUpdate({ ...value, streetA: e.target.value })}
      />
      <Input
        aria-label="Street Address B (optional)"
        placeholder="Apt..."
        className="bg-muted placeholder:text-foreground/50"
        value={value.streetB ?? ''}
        onChange={(e) => onUpdate({ ...value, streetB: e.target.value })}
      />
      <Input
        aria-label="City"
        placeholder="City"
        className="bg-muted placeholder:text-foreground/50"
        value={value.city ?? ''}
        onChange={(e) => onUpdate({ ...value, city: e.target.value })}
      />
      <Input
        aria-label="State"
        placeholder="State"
        className="bg-muted placeholder:text-foreground/50"
        value={value.state ?? ''}
        onChange={(e) => onUpdate({ ...value, state: e.target.value })}
      />
      <Input
        aria-label="Zip Code"
        placeholder="ZIP"
        className="bg-muted placeholder:text-foreground/50"
        value={value.zipCode ?? ''}
        onChange={(e) => onUpdate({ ...value, zipCode: e.target.value })}
      />
    </>
  )
}
