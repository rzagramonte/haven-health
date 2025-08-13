'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import {
  createAppointment,
  getAvailableSlots,
  updateAppointment,
} from '@/server/appointment/actions'
import { showError, showSuccess } from '@/utils/toast'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'

type FormData = {
  appointment_type: string
  appointment_date: Date | undefined
  appointment_time: string | null
}

const appointmentOptions = [
  {
    type: 'General Checkup',
    description:
      'Routine physical exam to assess overall health, screen for common conditions, and discuss preventive care recommendations.',
    duration: '30m',
  },
  {
    type: 'Chronic Condition Follow-Up',
    description: 'Ongoing care management',
    duration: '30m',
  },
  {
    type: 'Vaccination & Immunization',
    description: 'Vaccines/brief consult',
    duration: '30m',
  },
  {
    type: 'Mental Health Consultation',
    description: 'Well-being session',
    duration: '30m',
  },
]

export default function BookingForm() {
  const router = useRouter()
  const params = useSearchParams()

  const mode = params.get('mode') ?? 'create'
  const bookingId = params.get('id')
  const seedType = params.get('type') || ''
  const seedAt = params.get('at')
  const seedDate = seedAt ? new Date(seedAt) : undefined
  const seedTime = seedDate ? seedDate.toTimeString().slice(0, 5) : ''

  const [page, setPage] = useState(1)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const [formData, setFormData] = useState<FormData>(() => ({
    appointment_type: seedType,
    appointment_date: seedDate,
    appointment_time: seedTime,
  }))
  const { appointment_date, appointment_time, appointment_type } = formData

  useEffect(() => {
    async function fetchAvailableTimes() {
      if (!appointment_date) {
        setAvailableTimeSlots([])
        return
      }
      try {
        const times = await getAvailableSlots(appointment_date)
        setAvailableTimeSlots(times)
      } catch (err) {
        console.error('Failed to fetch available time slots:', err)
        setAvailableTimeSlots([])
      }
    }
    fetchAvailableTimes()
  }, [appointment_date])

  useEffect(() => {
    if (mode !== 'reschedule') {
      return
    }
    if (!appointment_type || !appointment_date) {
      return
    }

    if (appointment_time && availableTimeSlots.includes(appointment_time)) {
      setPage(3)
    } else {
      setPage(2)
    }
  }, [
    mode,
    appointment_type,
    appointment_date,
    appointment_time,
    availableTimeSlots,
  ])

  useEffect(() => {
    if (appointment_time && !availableTimeSlots.includes(appointment_time)) {
      setFormData((f) => ({ ...f, appointment_time: '' }))
    }
  }, [availableTimeSlots, appointment_time])

  const handleConfirmBooking = async () => {
    if (!appointment_type || !appointment_date || !appointment_time) {
      showError('Missing appointment information.')
      return
    }

    if (mode === 'reschedule' && bookingId) {
      const datePart = appointment_date.toISOString().split('T')[0]
      const when = new Date(`${datePart}T${appointment_time}:00`)
      startTransition(async () => {
        const res = await updateAppointment({
          bookingId: Number(bookingId),
          when,
        })
        if (res.success) {
          showSuccess('Appointment rescheduled!')
          router.push('/patient/appointments')
        } else {
          showError(res.message || 'Failed to reschedule.')
        }
      })
      return
    }

    startTransition(async () => {
      const res = await createAppointment({
        date: appointment_date,
        time: appointment_time,
        type: appointment_type,
      })
      if (res.success) {
        showSuccess('Appointment confirmed!')
        setFormData({
          appointment_type: '',
          appointment_date: undefined,
          appointment_time: '',
        })
        router.push('/patient/appointments')
      } else {
        showError(res.message || 'Failed to book appointment.')
      }
    })
  }

  return (
    <div className="bg-card-2 w-full rounded-lg shadow-sm">
      {page === 1 && (
        <div className="grid grid-cols-1">
          {appointmentOptions.map((a) => {
            const disabled =
              mode === 'reschedule' && seedType && a.type !== seedType
            return (
              <div
                key={a.type}
                className={`border-b border-background p-4 transition ${disabled ? 'opacity-50 pointer-events-none' : 'hover:bg-muted/10 cursor-pointer'}`}
                onClick={() => {
                  setFormData({ ...formData, appointment_type: a.type })
                  setPage(2)
                }}
              >
                <h3 className="font-semibold text-lg">{a.type}</h3>
                <p className="text-sm">{a.description}</p>
                <span className="inline-block mt-2 text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  ⏱ {a.duration}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {page === 2 && (
        <div className="space-6">
          <div className="flex flex-col md:flex-row gap-6 ">
            <Calendar
              className="w-full md:w-fit lg:w-80 bg-card-2 rounded-lg"
              mode="single"
              selected={appointment_date}
              onSelect={(date) =>
                setFormData({
                  ...formData,
                  appointment_date: date ?? undefined,
                })
              }
            />

            {appointment_date && (
              <div className="flex-1 p-4">
                <h3 className="font-medium mb-2 text-center">Select a Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => {
                        setFormData({ ...formData, appointment_time: time })
                        setPage(3)
                      }}
                      className={`border border-muted p-2 rounded transition ${
                        time === appointment_time
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full px-2 md:px-6 pb-4 flex justify-start">
            <Button
              variant="secondary"
              className="px-4 py-2"
              onClick={() => setPage(1)}
            >
              Back
            </Button>
          </div>
        </div>
      )}

      {page === 3 && (
        <div className="space-y-4 p-4">
          <h3 className="font-semibold text-lg">
            {mode === 'reschedule'
              ? 'Confirm Your Reschedule'
              : 'Confirm Your Appointment'}
          </h3>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Type:</strong> {appointment_type}
            </li>
            <li>
              <strong>Date:</strong> {appointment_date?.toLocaleDateString()}
            </li>
            <li>
              <strong>Time:</strong> {appointment_time}
            </li>
          </ul>

          <div className="flex gap-4 mt-4">
            <Button
              variant="secondary"
              className="px-4 py-2"
              onClick={() => setPage(2)}
            >
              Back
            </Button>
            <Button
              className="px-4 py-2"
              onClick={handleConfirmBooking}
              disabled={isPending}
            >
              {mode === 'reschedule' ? 'Reschedule' : 'Confirm Appointment'}
            </Button>
          </div>
        </div>
      )}

      <div className="mb-4 text-sm text-muted-foreground text-center">
        Step {page} of 3
      </div>
    </div>
  )
}
