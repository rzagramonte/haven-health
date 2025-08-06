'use client'

import { Appointments } from '@/lib/types/patient'

import AppointmentCard from './../appointments/AppointmentCard'
import BookNow from './../appointments/BookNow'
import UpcomingAppointment from './../appointments/UpcomingAppointment'

type PatientAppointmentProps = {
  appointments: Appointments[]
}

export default function PatientDashboard({
  appointments,
}: PatientAppointmentProps) {
  return (
    <main className="container m-auto p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold my-5">Appointments and Visits</h1>
        <BookNow />
      </div>

      <div className="p-4 pb-3">
        <UpcomingAppointment
          appointments={appointments ? appointments[0] : null}
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mt-5">Past Visits</h2>
      </div>
      <div className="border border-l border-r-0 border-t-0 border-b-0 container m-auto p-4 pb-3 grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        <AppointmentCard
          appointments={appointments ? appointments.slice(1) : []}
        />
      </div>
    </main>
  )
}
