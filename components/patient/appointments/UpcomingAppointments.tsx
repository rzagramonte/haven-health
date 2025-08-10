'use client'

import { CalendarCog, CalendarX2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Appointment } from '@/lib/types/patient'

type UpcomingAppointmentsProps = {
  appointments: Appointment[]
}

export default function UpcomingAppointments({
  appointments,
}: UpcomingAppointmentsProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push('/appointment')
  }

  let localDate = ''
  let localTime = ''

  if (appointments) {
    const date = new Date(appointments[0]?.appointment_time as string)

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
    <Card className="bg-card-1 w-full max-w">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Upcoming Appointment
        </CardTitle>
      </CardHeader>
      {!appointments ? (
        <CardContent className="">No upcoming appointments found.</CardContent>
      ) : (
        <CardContent className="md:flex">
          <CardContent className="md:w-1/2 py-4">
            Your {appointments[0]?.appointment_type?.toLowerCase()} with{' '}
            {appointments[0]?.provider.first_name}{' '}
            {appointments[0]?.provider.last_name} is on{' '}
            <span className="font-semibold">
              {localDate} at {localTime}
            </span>
            .
          </CardContent>
          <CardFooter className="flex justify-center gap-2 p-4 md:w-1/2">
            <Button onClick={handleClick} className="w-1/2">
              <CalendarCog />
              Reschedule
            </Button>
            <Button
              onClick={handleClick}
              className="border border-primary bg-card-1 w-1/2 text-foreground"
            >
              <CalendarX2 />
              Cancel
            </Button>
          </CardFooter>
        </CardContent>
      )}
    </Card>
  )
}
