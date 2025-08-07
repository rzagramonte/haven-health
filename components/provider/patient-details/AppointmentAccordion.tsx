import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import type { PatientAppointment } from '@/lib/types/patient'
import { formatDate } from '@/utils/helpers'

export interface AppointmentAccordionProps {
  appointment: PatientAppointment
}

export default function AppointmentAccordion({
  appointment,
}: AppointmentAccordionProps) {
  if (!appointment.id || appointment.status === 'scheduled') {
    return null
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col max-w-[400px] gap-5"
    >
      <AccordionItem
        value={formatDate(appointment.time ?? '')}
        className="flex flex-col  border-b-1 border-foreground"
      >
        <AccordionTrigger className="flex items-center w-full justify-between p-2 AccordionTrigger hover:bg-card-4">
          <span className="inline cursor-pointer">
            {formatDate(appointment.time ?? '')}
          </span>
          <ChevronDown size={20} className="cursor-pointer AccordionChevron" />
        </AccordionTrigger>
        <AccordionContent className="overflow-hidden flex flex-col data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up p-2 AccordionContent">
          <div>
            <span className="font-bold">Type:</span>{' '}
            <span>{appointment.type} </span>
          </div>
          {appointment.status && (
            <div>
              <span className="font-bold">Status:</span>{' '}
              <span>
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status?.slice(1)}{' '}
              </span>
            </div>
          )}

          {appointment.datePaid ? (
            <div>
              <span className="font-bold">Paid: </span>
              <span>{appointment.datePaid}</span>
            </div>
          ) : null}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
