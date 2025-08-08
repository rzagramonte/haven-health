import { Input } from '../ui/input'

export interface EditableStringFieldProps {
  value: string
  editing: boolean
  onUpdate: (val: string) => void
}

export default function EditableStringField({
  value,
  editing,
  onUpdate,
}: EditableStringFieldProps) {
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
