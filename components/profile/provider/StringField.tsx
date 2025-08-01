import { Input } from '@/components/ui/input'

export interface StringFieldProps {
  value: string
  editing: boolean
  onUpdate: (val: string) => void
}

export const StringField = ({ value, editing, onUpdate }: StringFieldProps) => {
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
