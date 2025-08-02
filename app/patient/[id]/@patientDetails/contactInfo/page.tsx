'use client'

import { SlashIcon } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate, getAge } from '@/utils/helpers'

import { PatientContext } from '../../PatientContext'

type EmergencyContact = {
  firstName: string
  lastName: string
  phone: string
}

export default function Page() {
  const { patient, appointment, person, medicalVisit, address } =
    useContext(PatientContext)
  console.log('contact info current patient:', patient)
  console.log('contact info current appointment:', appointment)
  console.log('contact info current person:', person)
  console.log('contact info current person:', medicalVisit)
  console.log('emergency contact in patient:', patient?.emergency_contact)
  const emergencyContact = patient?.emergency_contact as EmergencyContact | null
  console.log('emergency contact:', emergencyContact)

  return (
    <section className="border-3 border-black p-2 flex flex-col items-center">
      <Card className="w-full max-w-screen-lg mx-auto sm:p-6 md:p-8">
        <CardHeader>
          <CardTitle>Patient Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* main patient div */}
          <div className="border-3 border-lime-300 flex flex-col justify-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="text-xl">
                  Today&apos;s Visit
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon></SlashIcon>
                </BreadcrumbSeparator>
                <BreadcrumbItem className="font-bold text-xl">
                  Patient Details
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="border-3 border-red-300 max-w-[1000px] flex flex-col lg:flex-row gap-4 grow">
              {/* patient pic and name */}
              <div className="flex flex-col border-8 border-yellow-500">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 border-3 border-purple-300">
                  <Image
                    src="/images/default-user-image.jpg"
                    alt="patient-image"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  {person?.first_name} {person?.last_name}
                </span>
                <span className="text-lg sm:text-xl md:text-2xl">
                  {patient?.date_of_birth
                    ? getAge(patient?.date_of_birth)
                    : 'No age found'}
                  , {patient?.sex}
                </span>
              </div>

              {/* appointment and address */}
              <div className="border-8 border-blue-700 w-full flex flex-col justify-center gap-2">
                <div className="border-3 border-blue-300 w-full flex justify-between">
                  <div className="flex flex-col border-3 border-red-300 gap-2">
                    <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">
                      Scheduled Appointment
                    </h3>
                    <span className="text-xl">
                      {appointment?.appointment_time
                        ? formatDate(appointment?.appointment_time)
                        : 'No Appointment Scheduled'}
                    </span>
                  </div>
                  <div className="border-3 border-red-300 w-full max-w-[50%] ">
                    <h4 className="text-lg">Special Notes</h4>
                    <span className="text-sm sm:text-base md:text-lg leading-snug">
                      {medicalVisit?.summary_notes}
                    </span>
                  </div>
                </div>
                {/* contact details */}
                <div className="flex flex-col border-3 gap-1 border-black-300">
                  <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">
                    Contact Details
                  </h3>
                  <div className="flex justify-between">
                    <div className="flex flex-col border-3 border-red-300 w-full">
                      <h4>Emergency Contact</h4>
                      <span>
                        {emergencyContact?.firstName}{' '}
                        {emergencyContact?.lastName}
                      </span>
                      <span>{emergencyContact?.phone}</span>
                    </div>
                    <div className="border-3 border-red-300 w-full flex flex-col gap-1 text-sm">
                      <h4 className="text-lg">Address</h4>
                      <span>
                        {address?.streeta}, {address?.city}{' '}
                        {address?.address_state} {address?.zip_code}
                      </span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
