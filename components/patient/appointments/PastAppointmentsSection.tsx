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
      <div className="border border-l border-r-0 border-t-0 border-b-0 container m-auto p-4 pb-3 grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        <AppointmentCard appointments={appointments} />
      </div>
    </>
  )
}
