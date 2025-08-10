'use client'

import { Appointment } from '@/lib/types/patient'

import BookNow from './BookNow'
import PastAppointmentsSection from './PastAppointmentsSection'
import UpcomingAppointments from './UpcomingAppointments'

type PatientAppointmentsProps = {
  appointments: Appointment[]
}

export default function PatientAppointments({
  appointments,
}: PatientAppointmentsProps) {
  return (
    <main className="container m-auto p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold my-5">Appointments and Visits</h1>
        <BookNow />
      </div>
      <div className="p-4 pb-3">
        <UpcomingAppointments
          appointments={appointments ? [appointments[0]] : []}
        />
      </div>
      <div className="p-4 pb-3">
        <PastAppointmentsSection
          appointments={appointments ? appointments.slice(1) : []}
        />
      </div>
    </main>
  )
}
