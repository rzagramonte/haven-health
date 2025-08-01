'use client'

import Image from 'next/image'
import { useContext } from 'react'

import { PatientContext } from '../../PatientContext'

export default function Page() {
  const { patient, appointment, person } = useContext(PatientContext)

  console.log('contact info current patient:', patient)
  console.log('contact info current appointment:', appointment)
  console.log('contact info current person:', person)

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
            <div className="flex flex-col gap-3">
              <div className="relative size-75">
                <Image
                  src="/images/default-user-image.jpg"
                  alt="patient-image"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-4xl">
                {person?.first_name} {person?.last_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
