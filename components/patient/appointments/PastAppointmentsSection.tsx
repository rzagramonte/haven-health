'use client'

import { Appointment } from '@/lib/types/patient'

import AppointmentCard from './AppointmentCard'

type PastAppointmentsProps = {
  appointments: Appointment[]
}

export default function PastAppointmentsSection({
  appointments,
}: PastAppointmentsProps) {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mt-5">Past Visits</h2>
      </div>
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-y-4 py-4">
        <AppointmentCard appointments={appointments} />
      </div>
    </>
  )
}
