'use client'
import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { Appointments } from '@/lib/types/patient'

import PatientAppointments from '../../../components/patient/appointments/PatientAppointments'

const mockAppointments: Appointments[] = [
  {
    id: 1,
    appointment_time: '2024-08-01T14:00:00Z', // UTC
    appointment_type: 'Office Visit',
    provider: 'Dr. April Bailey-Maletta, DPM',
  },
  {
    id: 2,
    appointment_time: '2024-07-15T09:30:00-04:00', // EDT (New York)
    appointment_type: 'Follow-up',
    provider: 'Dr. James Anderson, MD',
  },
  {
    id: 3,
    appointment_time: '2024-06-10T16:00:00+01:00', // BST (London)
    appointment_type: 'Physical Exam',
    provider: 'Dr. Priya Desai, DO',
  },
  {
    id: 4,
    appointment_time: '2024-05-22T11:45:00Z',
    appointment_type: 'Annual Checkup',
    provider: 'Dr. Luis Ramirez, MD',
  },
  {
    id: 5,
    appointment_time: '2024-04-09T13:15:00-07:00', // PDT (LA)
    appointment_type: 'Specialist Visit',
    provider: 'Dr. Nina Patel, Cardiologist',
  },
  {
    id: 6,
    appointment_time: '2024-03-01T08:30:00Z',
    appointment_type: 'Dermatology',
    provider: 'Dr. Mark Holloway, MD',
  },
  {
    id: 7,
    appointment_time: '2023-12-20T10:00:00-05:00',
    appointment_type: 'Orthopedic',
    provider: 'Dr. Emily Zhang, DO',
  },
  {
    id: 8,
    appointment_time: '2023-11-05T15:45:00+02:00', // EET (Eastern Europe)
    appointment_type: 'Pediatric',
    provider: 'Dr. John Kim, MD',
  },
  {
    id: 9,
    appointment_time: '2023-10-18T12:00:00Z',
    appointment_type: 'Consultation',
    provider: 'Dr. Alice Morgan, MD',
  },
  {
    id: 10,
    appointment_time: '2023-09-25T18:20:00+09:00', // JST (Tokyo)
    appointment_type: 'Telehealth',
    provider: 'Dr. Samuel Green, MD',
  },
]

async function fetchAppointmentsData(
  supabase: ReturnType<typeof createClient>,
) {
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

  // Use patient.id to fetch appointments
  const { data: appointments, error: appointmentsError } = await supabase
    .from('appointment_booking')
    .select(
      `id, appointment_time, appointment_type, provider:provider_id!appointment_provider_id_fkey (first_name, last_name)`,
    )
    .eq('patient_id', patient.id)

  if (appointmentsError || !appointments) {
    console.error('Error getting appointments:', appointmentsError)
    return
  }

  return appointments
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointments[] | null>(
    mockAppointments,
  )

  useEffect(() => {
    const supabase = createClient()

    const fetchData = async () => {
      const appointments = await fetchAppointmentsData(supabase)

      if (!appointments) {
        return
      }

      setAppointments(appointments)
    }

    fetchData()
  }, [])

  return <PatientAppointments appointments={appointments || []} />
}
