import Link from 'next/link'

import { TIMEZONE } from '@/lib/utils'
import {
  type AppointmentsByDateRange,
  getAppointmentsByDateRange,
} from '@/server/appointment/queries'

function getWeekBounds() {
  const today = new Date()
  const startOfWeek = new Date(today)
  const dayOfWeek = today.getDay()
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  startOfWeek.setDate(today.getDate() - daysFromMonday)
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 5)
  endOfWeek.setHours(23, 59, 59, 999)

  return { startOfWeek, endOfWeek }
}

function getWeekDays() {
  const { startOfWeek } = getWeekBounds()
  const days = []

  for (let i = 0; i < 6; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    days.push(day)
  }

  return days
}

function groupAppointmentsByDay(appointments: AppointmentsByDateRange) {
  const grouped: { [key: string]: AppointmentsByDateRange } = {}

  appointments.forEach((appointment) => {
    if (!appointment.appointment_time) {
      return
    }

    const date = new Date(appointment.appointment_time)
    const dayKey = date.toDateString()

    if (!grouped[dayKey]) {
      grouped[dayKey] = []
    }
    grouped[dayKey].push(appointment)
  })

  Object.keys(grouped).forEach((day) => {
    grouped[day].sort(
      (a, b) =>
        new Date(a.appointment_time || '').getTime() -
        new Date(b.appointment_time || '').getTime(),
    )
  })

  return grouped
}

function formatTime(dateTime: string): string {
  return new Date(dateTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: TIMEZONE,
  })
}

interface Patient {
  person?: {
    first_name?: string | null
    last_name?: string | null
  }
}

function formatPatientName(patient?: Patient): string {
  if (!patient?.person) {
    return 'Unknown Patient'
  }
  const { first_name, last_name } = patient.person
  return `${first_name || ''} ${last_name || ''}`.trim()
}

export default async function WeeklyAppointmentsTable() {
  const { startOfWeek, endOfWeek } = getWeekBounds()
  const appointments = await getAppointmentsByDateRange(startOfWeek, endOfWeek)

  const weekDays = getWeekDays()
  const appointmentsByDay = groupAppointmentsByDay(appointments)
  const today = new Date().toDateString()

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-4xl">
        <div className="grid grid-cols-6 gap-4 mb-6">
          {weekDays.map((day) => {
            const dayKey = day.toDateString()
            const dayAppointments = appointmentsByDay[dayKey] || []
            const isToday = day.toDateString() === today

            return (
              <div key={dayKey} className="space-y-3">
                <div
                  className={`text-center p-3 rounded-lg font-medium ${
                    isToday
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card-2 text-card-foreground'
                  }`}
                >
                  <div className="text-sm">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-bold">{day.getDate()}</div>
                </div>
                <div className="space-y-2 min-h-24">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((appointment) => {
                      const now = new Date()
                      const hasPassed =
                        new Date(appointment.appointment_time || '') < now

                      return (
                        <div
                          key={appointment.id}
                          className={`bg-card-1 border border-border rounded-lg p-3 text-sm hover:shadow-sm transition-shadow ${
                            hasPassed
                              ? 'bg-muted opacity-60'
                              : 'text-card-foreground'
                          }`}
                        >
                          <div className="font-medium text-primary mb-2">
                            {formatTime(appointment.appointment_time || '')}
                          </div>
                          <div className="space-y-1">
                            <Link
                              href="#"
                              className="block underline underline-offset-2 text-card-foreground font-medium"
                            >
                              {formatPatientName(appointment.patient)}
                            </Link>
                            <div className="text-muted-foreground text-xs">
                              {appointment.appointment_type || 'General'}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              Dr. {appointment.provider?.last_name || 'Unknown'}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-xs text-muted-foreground text-center py-6 italic">
                      No appointments
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function getWeekRange(): string {
  const { startOfWeek, endOfWeek } = getWeekBounds()

  const start = startOfWeek.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })
  const end = endOfWeek.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${start} - ${end}`
}
