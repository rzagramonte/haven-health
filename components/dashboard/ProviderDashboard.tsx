'use client'
import { Appointment, Message } from '@/lib/types/patient'

import Messages from './Messages'
import PatientFinder from './PatientFinder'
import Scheduler from './Scheduler'
import UpcomingAppointment from './UpcomingAppointment'

type ProviderDashboard = {
  provider: string
  appointment: Appointment | null
  messages: Message[]
}

export default function ProviderDashboard({
  provider,
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
          <UpcomingAppointment appointment={appointment} provider={provider} />
          <Scheduler />
        </div>

        <div className="flex flex-col space-y-6 lg:space-y-15 lg:m-7 lg:items-start">
          <Messages messages={messages} />
        </div>
      </div>

      <PatientFinder />
    </main>
  )
}
