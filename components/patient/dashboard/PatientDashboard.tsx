'use client'

import { Appointment, Message, Patient } from '@/lib/types/patient'

import Messages from './Messages'
import Scheduler from './Scheduler'
import UpcomingAppointment from './UpcomingAppointment'
import WelcomeMessage from './WelcomeMessage'

type PatientDashboardProps = {
  patient: Patient
  appointment: Appointment[]
  messages: Message[]
}

export default function PatientDashboard({
  patient,
  appointment,
  messages,
}: PatientDashboardProps) {
  return (
    <main className="container m-auto px-6 py-8 max-w-6xl">
      <div className="container mb-6">
        <WelcomeMessage patient={patient} />
      </div>
      <div className="container m-auto grid grid-cols-1 md:grid-cols-2  border border-l border-r-0 border-t-0 border-b-0 max-w-5xl gap-10 p-4">
        <div className="sm:items-center space-y-10  flex flex-col lg:items-end max-w-3xl">
          <UpcomingAppointment appointment={appointment} />
          <Scheduler />
        </div>
        <div className="sm:items-center lg:space-y-15 space-y-6  flex flex-col lg:items-start  ">
          <Messages messages={messages} />
        </div>
      </div>
    </main>
  )
}
