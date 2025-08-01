import React from 'react'

import PatientDetailsSidebar from '@/app/patient/[id]/PatientDetailsSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { getAppointment } from '@/server/appointment/queries'
import { getPerson } from '@/server/auth/queries'
import { getPatient } from '@/server/patient/queries'

import PatientContextProvider from './PatientContext'

export default async function Layout({
  children,
  params,
  patientDetails,
}: {
  children: React.ReactNode
  params: Promise<{ id: number }>
  patientDetails: React.ReactNode
}) {
  const { id } = await params

  console.log('current patient id:', id)

  const patientData = await getPatient(id)

  console.log('current patient:', patientData)

  if (!patientData.data) {
    return (
      <SidebarProvider>
        <PatientDetailsSidebar patientId={id} />
        <main className="border-3 border-yellow w-full bg-background">
          <SidebarTrigger className="hover:bg-foreground cursor-pointer" />
          <p>Patient Not Found</p>
        </main>
      </SidebarProvider>
    )
  }

  const personData = await getPerson(patientData.data.person_id)

  if (!personData.data) {
    return null
  }

  if (!patientData.data.person_id) {
    return null
  }

  const appointmentData = await getAppointment(patientData.data.person_id)

  if (!appointmentData.data) {
    return null
  }

  console.log('current appointment:', appointmentData)

  return (
    <PatientContextProvider
      patient={patientData.data}
      appointment={appointmentData.data}
      person={personData.data}
    >
      <SidebarProvider>
        <PatientDetailsSidebar patientId={id} />
        <main className="border-3 border-yellow w-full bg-background">
          <SidebarTrigger className="hover:bg-foreground cursor-pointer" />
          {children}
          {patientDetails}
        </main>
      </SidebarProvider>
    </PatientContextProvider>
  )
}
