'use client'

import { Appointment, Message, Patient, Provider } from '@/lib/types/patient'

import Messages from './Messages'
import Scheduler from './Scheduler'
import UpcomingAppointment from './UpcomingAppointment'
import WelcomeMessage from './WelcomeMessage'

type PatientDashboardProps = {
  patient: Patient
  provider: Provider
  appointment: Appointment | null
  messages: Message[]
}

export default function PatientDashboard({
  patient,
  provider,
  appointment,
  messages,
}: PatientDashboardProps) {
  return (
    <main className="container m-auto p-8">
      <div className="container m-auto p-8">
        <WelcomeMessage patient={patient} />
      </div>
      <div className="container m-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="sm:items-center lg:space-y-15 space-y-6 lg:m-7 flex flex-col lg:items-end ">
          <UpcomingAppointment appointment={appointment} provider={provider} />
          <Scheduler />
        </div>
        <div className="sm:items-center lg:space-y-15 space-y-6 lg:m-7 flex flex-col lg:items-start  ">
          <Messages messages={messages} />
        </div>
      </div>
    </main>
  )
}
