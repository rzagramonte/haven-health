import React from 'react'

import PatientDetailsSidebar from '@/app/patient/[id]/PatientDetailsSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function Layout({
  children,
  params,
  patientDetails,
  // contactInfo,
  // medicalRecord,
}: {
  children: React.ReactNode
  params: Promise<{ id: number }>
  patientDetails: React.ReactNode
  // contactInfo: React.ReactNode
  // medicalRecord: React.ReactNode
}) {
  const { id } = await params

  console.log('current patient id:', id)

  return (
    <SidebarProvider>
      <PatientDetailsSidebar patientId={id} />
      <main className="border-3 border-yellow w-full bg-background">
        <SidebarTrigger className="hover:bg-foreground cursor-pointer" />
        {children}
        {patientDetails}
        {/* {contactInfo}
        {medicalRecord} */}
      </main>
    </SidebarProvider>
  )
}
