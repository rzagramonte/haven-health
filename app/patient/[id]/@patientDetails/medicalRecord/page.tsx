'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { SlashIcon } from 'lucide-react'
import { useContext } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { PatientContext } from '../../PatientContext'

export default function Page() {
  const { patient, medicalVisit } = useContext(PatientContext)

  console.log('current patient in medical record page:', patient)
  console.log('medical visit in medical record page:', medicalVisit)

  return (
    <section className="border-3 border-black p-2 flex flex-col items-center">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-xl">
              Today&apos;s Visit
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon></SlashIcon>
            </BreadcrumbSeparator>
            <BreadcrumbItem className="font-bold text-xl">
              Medical Record
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Accordion type="single" collapsible>
          <AccordionItem value="prescriptions">
            <AccordionTrigger>Prescriptions</AccordionTrigger>
            <AccordionContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <ul>
                {medicalVisit?.prescriptions?.map((prescription: string) => (
                  <li key={prescription}>
                    <span>{prescription}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <hr />
      </div>
    </section>
  )
}
