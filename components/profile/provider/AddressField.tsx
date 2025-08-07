import { Input } from '../../ui/input'

export type EditableAddress = {
  streetA: string | null
  streetB?: string | null
  city: string | null
  state: string | null
  zipCode: string | null
}

export interface AddressFieldProps {
  value: EditableAddress | null
  editing: boolean
  onUpdate: (val: EditableAddress) => void
}

export default function AddressField({
  value,
  editing,
  onUpdate,
}: AddressFieldProps) {
  console.log('editable address field value:', value)
  if (!value) {
    return null
  }

  if (!editing) {
    return (
      <>
        <p>{value.streetA}</p>
        {value.streetB && <p>{value.streetB}</p>}
        <p>
          {value.city}, {value.state} {value.zipCode}
        </p>
      </>
    )
  }

  return (
    <>
      <Input
        aria-label="Street Address A"
        className="bg-muted"
        value={value.streetA ?? ''}
        onChange={(e) => onUpdate({ ...value, streetA: e.target.value })}
      />
      <Input
        aria-label="Street Address B (optional)"
        className="bg-muted"
        value={value.streetB ?? ''}
        onChange={(e) => onUpdate({ ...value, streetB: e.target.value })}
      />
      <Input
        aria-label="City"
        className="bg-muted"
        value={value.city ?? ''}
        onChange={(e) => onUpdate({ ...value, city: e.target.value })}
      />
      <Input
        aria-label="State"
        className="bg-muted"
        value={value.state ?? ''}
        onChange={(e) => onUpdate({ ...value, state: e.target.value })}
      />
      <Input
        aria-label="Zip Code"
        className="bg-muted"
        value={value.zipCode ?? ''}
        onChange={(e) => onUpdate({ ...value, zipCode: e.target.value })}
      />
    </>
  )
}
