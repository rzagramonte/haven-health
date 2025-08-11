import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

export interface MedicalAccordionProps {
  data: string[]
  label: string
}

export default function MedicalAccordion({
  data,
  label,
}: MedicalAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col w-full max-w-[400px]  gap-5"
    >
      <AccordionItem
        value={label}
        className="flex flex-col hover:bg-red  border-b-1 border-foreground  "
      >
        <AccordionTrigger className="flex items-center w-full justify-between p-2 AccordionTrigger hover:rounded-md hover:bg-card-4 ">
          <span className=" cursor-pointer  p-1">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </span>
          <ChevronDown size={20} className="cursor-pointer AccordionChevron" />
        </AccordionTrigger>
        <AccordionContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up p-2 AccordionContent">
          <ul>
            {data.map((item: string) => (
              <li key={item}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
