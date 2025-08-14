import { AppointmentsList } from '@/components/dashboard/adminDashboard/appointmentsList'
import { QuickActions } from '@/components/dashboard/adminDashboard/quickActions'
import { RecentPatients } from '@/components/dashboard/adminDashboard/recentPatients'
import { Sidebar } from '@/components/dashboard/adminDashboard/sidebar'
import { StatsCards } from '@/components/dashboard/adminDashboard/statsCards'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">
            Admin Dashboard
          </h1>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AppointmentsList />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <RecentPatients />
          </div>
        </div>
      </main>
    </div>
  )
}
