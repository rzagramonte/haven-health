'use client'
import { Appointment, Message } from '@/lib/types/patient'

import Messages from './../patient/dashboard/Messages'
import Scheduler from './../patient/dashboard/Scheduler'
import UpcomingAppointment from './../patient/dashboard/UpcomingAppointment'
import PatientFinder from './PatientFinder'

type ProviderDashboard = {
  appointment: Appointment[]
  messages: Message[]
}

export default function ProviderDashboard({
  appointment,
  messages,
}: ProviderDashboard) {
  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-center mb-8">
        <span className="text-xl font-semibold">Welcome</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-6 lg:space-y-15 lg:m-7 lg:items-end">
          <UpcomingAppointment appointment={appointment} />
          <Scheduler />
        </div>

        <div className="flex flex-col space-y-6 lg:space-y-15 lg:m-7 lg:items-start">
          <Messages messages={messages} path="/provider" />
        </div>
      </div>

      <PatientFinder />
    </main>
  )
}
