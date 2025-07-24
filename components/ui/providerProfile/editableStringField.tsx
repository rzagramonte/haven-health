import { Input } from '../input'

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
  return editing ? (
    <>
      <Input
        className="bg-muted"
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
      />
    </>
  ) : (
    <p>{value}</p>
  )
}
