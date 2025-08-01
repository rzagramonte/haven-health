'use client'

import Image from 'next/image'
import { useContext } from 'react'

import { formatDate, getAge } from '@/utils/helpers'

import { PatientContext } from '../../PatientContext'

type EmergencyContact = {
  firstName: string
  lastName: string
  phone: string
}

export default function Page() {
  const { patient, appointment, person, medicalVisit } =
    useContext(PatientContext)
  console.log('contact info current patient:', patient)
  console.log('contact info current appointment:', appointment)
  console.log('contact info current person:', person)
  console.log('contact info current person:', medicalVisit)
  console.log('emergency contact in patient:', patient?.emergency_contact)
  const emergencyContact = patient?.emergency_contact as EmergencyContact | null
  console.log('emergency contact:', emergencyContact)

  return (
    <section className="border-3 border-black p-2">
      <h2>Patient Details Contact Info</h2>
      <div>
        <div>
          <p>Breadcrumb</p>
        </div>
        {/* main patient div */}
        <div className="border-3 border-lime-300 flex justify-center">
          <div className="border-3 border-red-300 max-w-[1000px] flex grow">
            {/* patient pic and name */}
            <div className="flex flex-col p-2 border-8 border-yellow-500">
              <div className="relative size-75 border-3 border-purple-300">
                <Image
                  src="/images/default-user-image.jpg"
                  alt="patient-image"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-4xl">
                {person?.first_name} {person?.last_name}
              </span>
              <span className="text-2xl">
                {patient?.date_of_birth
                  ? getAge(patient?.date_of_birth)
                  : 'No age found'}
                , {patient?.sex}
              </span>
            </div>

            {/* appointment and address */}
            <div className="border-3 border-black-300 w-full p-5 flex flex-col gap-2">
              <div className="border-3 border-black-300 w-full">
                <h3 className="font-bold text-3xl">Scheduled Appointment</h3>
                <span className="text-xl">
                  {appointment?.appointment_time
                    ? formatDate(appointment?.appointment_time)
                    : 'No Appointment Scheduled'}
                </span>
              </div>
              <div className="flex flex-col border-3 border-black-300">
                <h3 className="font-bold text-3xl">Contact Details</h3>
                <h4>Emergency Contact</h4>
                <span>
                  {emergencyContact?.firstName} {emergencyContact?.lastName}
                </span>
                <span>{emergencyContact?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
