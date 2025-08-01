'use client'

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
import { Appointment, Provider } from '@/lib/types/patient'

type UpcomingAppointmentProps = {
  appointment: Appointment | null
  provider: Provider
}

export default function UpcomingAppointment({
  appointment,
  provider,
}: UpcomingAppointmentProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push('/appointment')
  }

  if (!appointment?.appointment_time) {
    return null
  }
  const date = new Date(appointment?.appointment_time)

  const localDate = date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const localTime = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <Card className="bg-card-1 w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold">Upcoming Appointment</CardTitle>
      </CardHeader>
      {!appointment?.appointment_time ? (
        <CardContent className="pl-10">
          No upcoming appointments found.
        </CardContent>
      ) : (
        <CardContent className="flex items-center gap-2">
          <CardDescription>
            Your appointment with {provider} is on {localDate} at {localTime}.
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
          View All Appointments
        </Button>
      </CardFooter>
    </Card>
  )
}
