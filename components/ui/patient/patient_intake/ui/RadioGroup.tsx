import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type RadioGroupDemoProps = {
  opt1: string
  opt2: string
  value: string
  onChange: (value: string) => void
}

export function RadioGroupDemo({
  opt1,
  opt2,
  value,
  onChange,
}: RadioGroupDemoProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="flex flex-row"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value={opt1} id="r1" className="border-green-300" />
        <Label htmlFor="r1">{opt1}</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value={opt2} id="r2" className="border-green-300" />
        <Label htmlFor="r2">{opt2}</Label>
      </div>
    </RadioGroup>
  )
}
