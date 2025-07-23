import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type RadioGroupDemoProps = {
  opt1: string
  opt2: string
}

export function RadioGroupDemo({ opt1, opt2 }: RadioGroupDemoProps) {
  return (
    <RadioGroup className="flex flex-row" defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem className="border-green-300" value="default" id="r1" />
        <Label htmlFor="r1">{opt1}</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          className="border-green-300"
          value="comfortable"
          id="r2"
        />
        <Label htmlFor="r2">{opt2}</Label>
      </div>
    </RadioGroup>
  )
}
