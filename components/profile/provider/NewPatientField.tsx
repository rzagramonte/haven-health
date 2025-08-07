export interface NewPatientFieldProps {
  value: boolean
  editing: boolean
  onUpdate: (val: boolean) => void
}

export default function NewPatientField({
  value,
  editing,
  onUpdate,
}: NewPatientFieldProps) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Boolean Field">
      <label>
        <input
          type="radio"
          name="choice"
          checked={value}
          onChange={() => onUpdate(true)}
          readOnly={editing}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="choice"
          checked={!value}
          onChange={() => onUpdate(false)}
          readOnly={editing}
        />
        No
      </label>
    </div>
  )
}
