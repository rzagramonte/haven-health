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
}

export type SidebarItems = SidebarItem[]

const sidebarItems: SidebarItems = [
  { title: 'Contact Information', icon: BiSolidContact },
  { title: 'Medical Record', icon: FaBriefcaseMedical },
]

export default function PatientDetailsSidebar() {
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
              {sidebarItems.map(({ title, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton className="cursor-pointer text-lg">
                    <Icon />
                    {title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
