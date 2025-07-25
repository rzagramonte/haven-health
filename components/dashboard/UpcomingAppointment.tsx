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

type Appointment = {
  date: string[]
  time: string[]
}

export default function UpcomingAppointment({
  provider,
  appointments,
}: {
  provider: string
  appointments: Appointment
}) {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="bg-card-1 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold">Upcoming Appointment</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <CardDescription>
            Your appointment with {provider} is on {appointments.date[0]} at{' '}
            {appointments.time[0]}.
          </CardDescription>
          <CardAction>
            <Button variant="link" className="text-accent">
              View More
            </Button>
          </CardAction>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            View All Appointments
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
