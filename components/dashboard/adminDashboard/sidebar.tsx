'use client'

import {
  BarChart3,
  Calendar,
  ChevronsLeft,
  ChevronsRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Pill,
  Settings,
  Users,
} from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    active: true,
  },
  { icon: Users, label: 'Search', href: '/patients' },
  { icon: Calendar, label: 'Appointments', href: '/appointments' },
  { icon: FileText, label: 'Medical Records', href: '/records' },
  { icon: Pill, label: 'Prescriptions', href: '/prescriptions' },
  { icon: CreditCard, label: 'Billing', href: '/billing' },
  { icon: Package, label: 'Inventory', href: '/inventory' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: BarChart3, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        'bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sidebar-foreground">Home</span>
          )}
        </div>

        <div className="mb-4">
          {!collapsed && (
            <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Main Menu
            </p>
          )}
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  item.active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </a>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex items-center justify-center w-full gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          {collapsed ? (
            <ChevronsRight className="w-4 h-4 flex-shrink-0" />
          ) : (
            <>
              <ChevronsLeft className="w-4 h-4 flex-shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
