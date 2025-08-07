import { Input } from '../../ui/input'

export interface StringFieldProps {
  value: string
  editing: boolean
  onUpdate: (val: string) => void
}

export default function StringField({
  value,
  editing,
  onUpdate,
}: StringFieldProps) {
  if (!editing) {
    return <p>{value}</p>
  }

  return (
    <Input
      className="bg-muted"
      value={value}
      onChange={(e) => onUpdate(e.target.value)}
    />
  )
}
