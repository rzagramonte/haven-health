'use client'

import { CalendarDays } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
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
    router.push('/provider/schedule')
  }

  let localDate = ''
  let localTime = ''
  let nextAppointment

  if (appointment) {
    const now = Date.now()

    nextAppointment = appointment
      .filter(
        (a) =>
          a.appointment_time && new Date(a.appointment_time).getTime() >= now,
      )
      .sort(
        (a, b) =>
          new Date(a.appointment_time!).getTime() -
          new Date(b.appointment_time!).getTime(),
      )[0]

    if (nextAppointment) {
      const date = new Date(nextAppointment.appointment_time as string)

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
  }

  return (
    <Card className="bg-card-1 w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold">Upcoming Appointment</CardTitle>
      </CardHeader>
      {!appointment ? (
        <CardContent>No upcoming appointments found.</CardContent>
      ) : (
        <CardContent className="flex items-center gap-2">
          <CardDescription>
            Your{' '}
            <span className="text-accent font-semibold">
              {nextAppointment?.appointment_type}
            </span>{' '}
            with{' '}
            <span className="font-semibold">
              {nextAppointment?.provider.first_name}{' '}
              {nextAppointment?.provider.last_name}
            </span>{' '}
            is on <span className="text-primary font-bold">{localDate}</span> at{' '}
            <span className="text-primary font-bold">{localTime}</span>.
          </CardDescription>
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
