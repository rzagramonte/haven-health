export interface EditableBooleanFieldProps {
  value: boolean
  editing: boolean
  onUpdate: (val: boolean) => void
}

export default function EditableBooleanField({
  value,
  editing,
  onUpdate,
}: EditableBooleanFieldProps) {
  return editing ? (
    <div className="flex gap-2" role="radiogroup" aria-label="Boolean Field">
      <label>
        <input
          type="radio"
          name="choice"
          checked={value}
          onChange={() => onUpdate(true)}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="choice"
          checked={!value}
          onChange={() => onUpdate(false)}
        />
        No
      </label>
    </div>
  ) : (
    <div className="flex gap-2" role="radiogroup" aria-label="Boolean Field">
      <label>
        <input
          type="radio"
          name="choice"
          checked={value}
          onChange={() => onUpdate(true)}
          readOnly
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="choice"
          checked={!value}
          onChange={() => onUpdate(false)}
          readOnly
        />
        No
      </label>
    </div>
  )
}
