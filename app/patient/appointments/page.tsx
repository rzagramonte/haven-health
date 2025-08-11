'use client'
import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { Appointment } from '@/lib/types/patient'

import PatientAppointment from '../../../components/patient/appointments/PatientAppointments'

const mockAppointments: Appointment[] = [
  {
    id: 1,
    appointment_time: '2024-08-15T14:00:00Z',
    appointment_type: 'Office Visit',
    provider: { first_name: 'Dr. April', last_name: ' Bailey-Maletta, DPM' },
  },
  {
    id: 2,
    appointment_time: '2024-07-15T09:30:00-04:00',
    appointment_type: 'Follow-up',
    provider: { first_name: 'Dr. James', last_name: 'Anderson, MD' },
  },
  {
    id: 3,
    appointment_time: '2024-06-10T16:00:00+01:00',
    appointment_type: 'Physical Exam',
    provider: { first_name: 'Dr. Priya', last_name: 'Desai, DO' },
  },
  {
    id: 4,
    appointment_time: '2024-05-22T11:45:00Z',
    appointment_type: 'Annual Checkup',
    provider: { first_name: 'Dr. Luis', last_name: 'Ramirez, MD' },
  },
  {
    id: 5,
    appointment_time: '2024-04-09T13:15:00-07:00',
    appointment_type: 'Specialist Visit',
    provider: { first_name: 'Dr. Nina', last_name: 'Patel, Cardiologist' },
  },
  {
    id: 6,
    appointment_time: '2024-03-01T08:30:00Z',
    appointment_type: 'Dermatology',
    provider: { first_name: 'Dr. Mark', last_name: 'Holloway, MD' },
  },
  {
    id: 7,
    appointment_time: '2023-12-20T10:00:00-05:00',
    appointment_type: 'Orthopedic',
    provider: { first_name: 'Dr. Emily', last_name: 'Zhang, DO' },
  },
  {
    id: 8,
    appointment_time: '2023-11-05T15:45:00+02:00',
    appointment_type: 'Pediatric',
    provider: { first_name: 'Dr. John', last_name: 'Kim, MD' },
  },
  {
    id: 9,
    appointment_time: '2023-10-18T12:00:00Z',
    appointment_type: 'Consultation',
    provider: { first_name: 'Dr. Alice', last_name: 'Morgan, MD' },
  },
  {
    id: 10,
    appointment_time: '2023-09-25T18:20:00+09:00',
    appointment_type: 'Telehealth',
    provider: { first_name: 'Dr. Samuel', last_name: 'Green, MD' },
  },
]

async function fetchAppointmentData(supabase: ReturnType<typeof createClient>) {
  // Fetch auth.user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Error getting user:', userError)
    return
  }

  // Use auth.user.id to fetch person
  const { data: person, error: personError } = await supabase
    .from('person')
    .select('id')
    .eq('person_uuid', user.id)
    .single()

  if (personError || !person) {
    console.error('Error getting person:', personError)
    return
  }

  // Use person.id to fetch patient
  const { data: patient, error: patientError } = await supabase
    .from('patient')
    .select('id')
    .eq('person_id', person.id)
    .single()

  if (patientError || !patient) {
    console.error('Error getting patient:', patientError)
    return
  }

  // Use patient.id to fetch Appointment
  const { data: appointments, error: appointmentsError } = await supabase
    .from('appointment_booking')
    .select(
      `id, appointment_time, appointment_type, provider:provider_id(first_name, last_name)`,
    )
    .eq('patient_id', patient.id)

  if (appointmentsError) {
    throw new Error(
      `No appointments found for user. Error: ${appointmentsError?.message || 'No matching record'}`,
    )
  }

  return { appointments }
}

export default function AppointmentPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments)

  useEffect(() => {
    const supabase = createClient()

    const fetchData = async () => {
      const data = await fetchAppointmentData(supabase)

      if (!data) {
        return
      }

      setAppointments(
        data.appointments.length ? data.appointments : mockAppointments,
      )
    }

    fetchData()
  })

  return <PatientAppointment appointments={appointments || []} />
}
