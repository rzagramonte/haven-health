import React from 'react'

import PatientDetailsSidebar from '@/components/ui/patient/patientDetails/PatientDetailsSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function PatientDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ patientId: number }>
}) {
  const { patientId } = await params

  console.log('current patient id:', patientId)

  return (
    <SidebarProvider>
      <PatientDetailsSidebar />
      <main className="border-3 border-yellow w-full bg-background">
        <SidebarTrigger className="hover:bg-foreground cursor-pointer" />
        {children}
      </main>
    </SidebarProvider>
  )
}
