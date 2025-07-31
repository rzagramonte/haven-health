import React from 'react'

import PatientDetailsSidebar from '@/app/patient/[id]/PatientDetailsSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { getAppointment } from '@/server/appointment/queries'
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

  const response = await getPatient(id)

  console.log('current patient:', response)

  if (!response.data) {
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

  if (!response.data.person_id) {
    return null
  }

  const appointmentData = await getAppointment(response.data.person_id)

  if (!appointmentData.data) {
    return null
  }

  console.log('current appointment:', appointmentData)

  return (
    <PatientContextProvider
      patient={response.data}
      appointment={appointmentData.data}
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
