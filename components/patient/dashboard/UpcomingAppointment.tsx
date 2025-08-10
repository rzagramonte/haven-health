'use client'

import { CalendarDays } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Appointment } from '@/lib/types/patient'

type UpcomingAppointmentProps = {
  appointment: Appointment[]
}

export default function UpcomingAppointment({
  appointment,
}: UpcomingAppointmentProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push('/patient/appointments')
  }

  let localDate = ''
  let localTime = ''

  if (appointment) {
    const date = new Date(appointment[0]?.appointment_time as string)

    localDate = date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    localTime = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
    })
  }

  return (
    <Card className="bg-card-1 w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold">Upcoming Appointment</CardTitle>
      </CardHeader>
      {!appointment ? (
        <CardContent className="pl-10">
          No upcoming appointments found.
        </CardContent>
      ) : (
        <CardContent className="flex items-center gap-2">
          <CardDescription>
            Your {appointment[0]?.appointment_type?.toLowerCase()} with{' '}
            {appointment[0]?.provider.first_name}{' '}
            {appointment[0]?.provider.last_name} is on {localDate} at{' '}
            {localTime}.
          </CardDescription>
          <CardAction>
            <Button variant="link" className="text-accent">
              View More
            </Button>
          </CardAction>
        </CardContent>
      )}
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleClick} className="w-full">
          <CalendarDays />
          View All Appointments
        </Button>
      </CardFooter>
    </Card>
  )
}
