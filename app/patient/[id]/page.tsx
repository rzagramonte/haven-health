// import PatientContactInfoView from '@/components/ui/patient/patientDetails/PatientContactInfoView'
// import PatientMedicalRecordView from '@/components/ui/patient/patientDetails/PatientMedicalRecordView'
import type { Icon } from 'next/dist/lib/metadata/types/metadata-types'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

export interface SidebarItem {
  title: string
  icon: Icon
}

export type SidebarItems = SidebarItem[]

const sidebarItems: SidebarItems = [
  { title: 'Contact Information', icon: '' },
  { title: 'Medical Record', icon: '' },
]

export default function PatientDetails() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Patient Details</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((sidebarItem: SidebarItem) => (
                  <SidebarMenuItem key={sidebarItem.title}>
                    <SidebarMenuButton>{sidebarItem.title}</SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="border-3 border-yellow w-full">
        <SidebarTrigger />
        <h1>Welcome to the Patient Details page</h1>
      </main>
    </SidebarProvider>
  )
}
