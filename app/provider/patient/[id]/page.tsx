import { SlashIcon } from 'lucide-react'
import Image from 'next/image'

import AppointmentAccordion from '@/components/provider/patient-details/AppointmentAccordion'
import MedicalAccordion from '@/components/provider/patient-details/MedicalAccordion'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { getAppointments } from '@/server/appointment/queries'
import { getAddress, getPerson } from '@/server/auth/queries'
import { getPatientDetails } from '@/server/patient/queries'
import { getMedicalVisit } from '@/server/patient/queries'
import { assertData, formatDate, getAge } from '@/utils/helpers'

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  const patient = assertData(await getPatientDetails(id), 'Patient not found')
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

  const scheduledAppointment = appointments?.find(
    (appointment) => appointment.status == 'scheduled',
  )

  return (
    <section className=" p-2 flex flex-col items-center gap-10">
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
                  src="/images/danny-patient-profile.jpeg"
                  alt="patient-image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <span className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {person?.firstName} {person?.lastName}
              </span>
              <span className="text-lg sm:text-xl md:text-2xl text-">
                {patient?.dateOfBirth
                  ? getAge(patient?.dateOfBirth)
                  : 'No age found'}
                , {patient?.sex}
              </span>
            </div>

            <div className=" w-full flex flex-col justify-center gap-2 ">
              <div className=" w-full flex justify-between gap-2 p-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">
                    Scheduled Appointment
                  </h3>
                  <span className="text-xl">
                    {scheduledAppointment?.time
                      ? formatDate(scheduledAppointment.time)
                      : 'No Appointment Scheduled'}
                  </span>
                </div>
                <div className=" w-full max-w-[50%] ">
                  <h4 className="text-lg font-bold">Special Notes</h4>
                  <span className="text-sm sm:text-base md:text-lg leading-snug text-secondary">
                    {medicalVisit?.summaryNotes}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 ">
                <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">
                  Contact Details
                </h3>
                <div className="flex justify-between">
                  <div className="flex flex-col w-full">
                    <h4 className="font-bold text-lg">Emergency Contact</h4>
                    <span>
                      {patient?.emergencyContact?.firstName}{' '}
                      {patient?.emergencyContact?.lastName}
                    </span>
                    <span>{patient?.emergencyContact?.phone}</span>
                  </div>
                  <div className=" w-full flex flex-col gap-1 text-sm">
                    <h4 className="text-lg font-bold">Address</h4>
                    <span>
                      {address?.streetA}, {address?.city} {address?.state}{' '}
                      {address?.zipCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className=" bg-card-2 w-full max-w-screen-lg mx-auto sm:p-6 md:p-8 flex flex-col justify-center mb-10 ">
        <CardHeader className="font-bold text-xl sm:text-2xl md:text-3xl w-full justify-center">
          <CardTitle>Medical Record</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col text-foreground w-full items-center">
          {medicalVisit?.prescriptions && (
            <MedicalAccordion
              data={medicalVisit?.prescriptions}
              label="prescriptions"
            />
          )}
          {medicalVisit?.allergies && (
            <MedicalAccordion
              data={medicalVisit?.allergies}
              label="allergies"
            />
          )}
        </CardContent>
        <CardHeader className="font-bold text-xl sm:text-2xl md:text-3xl w-full justify-center">
          <CardTitle>Past Appointments</CardTitle>
        </CardHeader>
        <CardContent className="">
          <ul>
            {appointments?.map((appointment) => (
              <li key={appointment.id} className="w-full flex justify-center">
                <AppointmentAccordion appointment={appointment} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
