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
  appointments: Appointment
  provider: Provider
}

export default function UpcomingAppointment({
  appointments,
  provider,
}: UpcomingAppointmentProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push('/appointment')
  }
  return (
    <Card className="bg-card-1 w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold">Upcoming Appointment</CardTitle>
      </CardHeader>
      {!appointments.date ? (
        <CardContent>No upcoming appointments found.</CardContent>
      ) : (
        <CardContent className="flex items-center gap-2">
          <CardDescription>
            Your appointment with {provider} is on {appointments.date} at{' '}
            {appointments.time}.
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
