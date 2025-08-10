'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { confirmBooking, getAvailableSlots } from '@/server/appointment/actions'
import { showError, showSuccess } from '@/utils/toast'

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
  const [page, setPage] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    appointment_type: '',
    appointment_date: undefined,
    appointment_time: '',
  })
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchAvailableTimes() {
      if (formData.appointment_date) {
        try {
          const times = await getAvailableSlots(formData.appointment_date)
          setAvailableTimeSlots(times)
        } catch (error) {
          console.error('Failed to fetch available time slots:', error)
          setAvailableTimeSlots([])
        }
      } else {
        setAvailableTimeSlots([])
      }
    }

    fetchAvailableTimes()
  }, [formData.appointment_date])

  const handleConfirmBooking = async () => {
    if (
      !formData.appointment_date ||
      !formData.appointment_time ||
      !formData.appointment_type
    ) {
      showError('Missing appointment information.')
      return
    }

    const response = await confirmBooking({
      date: formData.appointment_date,
      time: formData.appointment_time,
      type: formData.appointment_type,
    })

    if (response.success) {
      showSuccess('Appointment confirmed!')
      setFormData({
        appointment_type: '',
        appointment_date: undefined,
        appointment_time: '',
      })

      router.push('/patient/dashboard')
    } else {
      showError(response.message || 'Failed to book appointment.')
    }
  }

  return (
    <div className="text-card-foreground w-full rounded-lg shadow-sm">
      {page === 1 && (
        <div className="grid grid-cols-1">
          {appointmentOptions.map((a) => (
            <div
              key={a.type}
              className="border-b border-border p-4 hover:bg-muted/10 cursor-pointer transition"
              onClick={() => {
                setFormData({
                  ...formData,
                  appointment_type: a.type,
                })
                setPage(2)
              }}
            >
              <h3 className="font-semibold text-lg text-foreground">
                {a.type}
              </h3>
              <p className="text-sm text-muted-foreground">{a.description}</p>
              <span className="inline-block mt-2 text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                ⏱ {a.duration}
              </span>
            </div>
          ))}
        </div>
      )}

      {page === 2 && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Calendar
              className="w-full md:w-80"
              mode="single"
              selected={formData.appointment_date}
              onSelect={(date) =>
                setFormData({ ...formData, appointment_date: date })
              }
            />

            {formData.appointment_date && (
              <div className="flex-1">
                <h3 className="font-medium mb-2">Select a Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => {
                        setFormData({ ...formData, appointment_time: time })
                        setPage(3)
                      }}
                      className="border px-3 py-2 rounded hover:bg-muted/10 transition"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full px-2 md:px-6 pb-4 flex justify-start">
            <button
              className="bg-primary px-4 py-2 rounded"
              onClick={() => setPage(1)}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {page === 3 && (
        <div className="space-y-4 p-4">
          <h3 className="font-semibold text-lg">Confirm Your Appointment</h3>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Type:</strong> {formData.appointment_type}
            </li>
            <li>
              <strong>Date:</strong>{' '}
              {formData.appointment_date?.toLocaleDateString()}
            </li>
            <li>
              <strong>Time:</strong> {formData.appointment_time}
            </li>
          </ul>

          <div className="flex gap-4 mt-4">
            <button
              className="bg-primary px-4 py-2 rounded"
              onClick={() => setPage(2)}
            >
              Back
            </button>
            <button
              className="bg-secondary px-4 py-2 rounded"
              onClick={handleConfirmBooking}
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      )}
      <div className="mb-4 text-sm text-muted-foreground text-center">
        Step {page} of 3
      </div>
    </div>
  )
}
