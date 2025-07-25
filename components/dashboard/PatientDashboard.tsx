import Messages from './Messages'
import Scheduler from './Scheduler'
import UpcomingAppointment from './UpcomingAppointment'
import WelcomeMessage from './WelcomeMessage'

type Appointment = {
  date: string[]
  time: string[]
}

type Message = {
  sender: string
  user: string
  message: string
}

type PatientDashboardProps = {
  patient: string
  provider: string
  appointments: Appointment
  messages: Message[]
}

export default function PatientDashboard({
  patient,
  provider,
  appointments,
  messages,
}: PatientDashboardProps) {
  return (
    <main className="container m-auto p-8 ">
      <WelcomeMessage patient={patient} />
      <div className="container grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <UpcomingAppointment provider={provider} appointments={appointments} />
        <Messages messages={messages} />
        <Scheduler />
      </div>
    </main>
  )
}
