import { SlashIcon } from 'lucide-react'
import Image from 'next/image'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import type { ActionResponse } from '@/lib/types/auth'
import { getAppointments } from '@/server/appointment/queries'
import { getAddress, getPerson } from '@/server/auth/queries'
import { getPatient } from '@/server/patient/queries'
import { getMedicalVisit } from '@/server/patient/queries'

export function assertData<T>(result: ActionResponse<T>, message: string): T {
  if (!result.data) {
    throw new Error(message)
  }
  return result.data
}

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  const patient = assertData(await getPatient(id), 'Patient not found')
  const person = assertData(
    await getPerson(patient.personId),
    'Person not found',
  )
  const medicalVisit = assertData(
    await getMedicalVisit(patient.id),
    'Medical visit not found',
  )
  const appointments = assertData(
    await getAppointments(patient.id),
    'Appointments not found',
  )
  const address = assertData(await getAddress(person.id), 'Address not found')

  console.log(appointments, patient, person, medicalVisit, address)

  return (
    <section className=" p-2 flex flex-col items-center">
      <Card className="w-full max-w-screen-lg mx-auto sm:p-6 md:p-8 bg-card-2 text-foreground">
        <CardContent className="p-0">
          <div className="b flex flex-col justify-center">
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
          </div>
          <div className=" max-w-[1000px] flex flex-col lg:flex-row gap-5 grow p-2">
            <div className="flex flex-col gap-3">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 ">
                <Image
                  src="/images/patient-profile.jpeg"
                  alt="patient-image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <span className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {person?.firstName} {person?.lastName}
              </span>
              <span className="text-lg sm:text-xl md:text-2xl text-">
                {/* {patient?.dateOfBirth
                   ? getAge(patient?.dateOfBirth)
                   : 'No age found'}
                 , {patient?.sex} */}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
