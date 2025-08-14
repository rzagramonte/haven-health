'use client'

import { Sidebar } from '@/components/dashboard/adminDashboard/sidebar'
import { Appointment } from '@/lib/types/patient'

import BookNow from './BookNow'
import PastAppointmentsSection from './PastAppointmentsSection'
import UpcomingAppointments from './UpcomingAppointments'

type PatientAppointmentsProps = {
  upcoming: Appointment[]
  past: Appointment[]
}

export default function PatientAppointments({
  upcoming,
  past,
}: PatientAppointmentsProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="container mx-auto px-6 py-8 max-w-6xl flex-1">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-6 ">
          <h1 className="text-2xl font-semibold mb-3">
            Appointments and Visits
          </h1>
          <BookNow />
        </div>
        <div className="mb-6 flex xl:justify-center">
          <UpcomingAppointments appointments={upcoming ? upcoming : []} />
        </div>
        <div className="mx-auto max-w-5xl p-4">
          <PastAppointmentsSection appointments={past ? past : []} />
        </div>
      </main>
    </div>
  )
}
