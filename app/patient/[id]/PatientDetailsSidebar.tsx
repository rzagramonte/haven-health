import Link from 'next/link'
import type { IconType } from 'react-icons'
import { BiSolidContact } from 'react-icons/bi'
import { FaBriefcaseMedical } from 'react-icons/fa6'

import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export interface SidebarItem {
  title: string
  icon: IconType
  href: string
}

export type SidebarItems = SidebarItem[]

const sidebarItems: SidebarItems = [
  { title: 'Contact Information', icon: BiSolidContact, href: 'contactInfo' },
  { title: 'Medical Record', icon: FaBriefcaseMedical, href: 'medicalRecord' },
]

export interface PatientSidebarProps {
  patientId: number
}

export default function PatientDetailsSidebar({
  patientId,
}: PatientSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent className="bg-foreground text-white ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white mb-10 p-2 flex-col text-lg items-start">
            Patient Details
            <Separator />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {sidebarItems.map(({ title, icon: Icon, href }) => (
                <SidebarMenuItem key={title}>
                  <Link href={`/patient/${patientId}/${href}`}>
                    <SidebarMenuButton className="cursor-pointer text-lg">
                      <Icon />
                      {title}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
