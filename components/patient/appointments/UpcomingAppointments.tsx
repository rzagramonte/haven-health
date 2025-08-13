'use client'

import Autoplay from 'embla-carousel-autoplay'
import { CalendarCog, CalendarX2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Appointment } from '@/lib/types/patient'
import { toDate } from '@/lib/utils/splitAppointments'

type UpcomingAppointmentsProps = { appointments: Appointment[] }

const fmtDate = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})
const fmtTime = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric',
})

export default function UpcomingAppointments({
  appointments,
}: UpcomingAppointmentsProps) {
  const router = useRouter()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const update = () => setCurrent(api.selectedScrollSnap())

    update()

    api.on('select', update)
    api.on('reInit', update)

    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  const activeAppt = appointments[current]
  const activeId = activeAppt?.id

  const onReschedule = () => {
    const appt = appointments[current]
    if (!appt?.id || !appt?.appointment_time) {
      return
    }

    const at = new Date(appt.appointment_time).toISOString()
    const type = appt.appointment_type ?? ''

    router.push(
      `/appointment?mode=reschedule&id=${appt.id}&type=${encodeURIComponent(type)}&at=${encodeURIComponent(at)}`,
    )
  }

  const onCancel = () => {
    if (!activeId) {
      return
    }
    router.push(`/appointment/${activeId}/cancel`)
  }

  return (
    <Card className="bg-card-1 w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Upcoming {appointments.length == 1 ? 'Appointment' : 'Appointments'}
        </CardTitle>
      </CardHeader>
      {!appointments.length ? (
        <CardContent>No upcoming appointments found.</CardContent>
      ) : (
        <CardContent className="mb-4 md:flex">
          <Carousel
            setApi={setApi}
            plugins={[Autoplay({ delay: 4000 })]}
            opts={{ align: 'start', loop: true }}
            className="md:w-1/2"
          >
            <CarouselContent>
              {appointments.map((a) => {
                const dt = a?.appointment_time
                  ? toDate(a.appointment_time)
                  : null
                const localDate = dt ? fmtDate.format(dt) : ''
                const localTime = dt ? fmtTime.format(dt) : ''
                return (
                  <CarouselItem key={a?.id ?? `${a?.appointment_time}`}>
                    <div className="py-4 px-7">
                      Your {a?.appointment_type?.toLowerCase()} with{' '}
                      {a?.provider.first_name} {a?.provider.last_name} is on{' '}
                      <span className="font-semibold">
                        {localDate} at {localTime}
                      </span>
                      .
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
          <CardFooter className="gap-2 md:w-1/2">
            <Button
              onClick={onReschedule}
              className="w-1/2"
              disabled={!activeId}
            >
              <CalendarCog />
              Reschedule
            </Button>
            <Button
              onClick={onCancel}
              className="border border-primary bg-card-1 text-card-foreground w-1/2 hover:text-destructive-foreground hover:bg-destructive hover:border-destructive"
              disabled={!activeId}
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
