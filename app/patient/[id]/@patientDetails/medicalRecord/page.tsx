'use client'

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
  const patient = useContext(PatientContext)

  console.log('current patient in medical record page:', patient)

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
      </div>
    </section>
  )
}
