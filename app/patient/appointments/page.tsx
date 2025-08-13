'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { Appointment } from '@/lib/types/patient'
import { splitAppointments } from '@/lib/utils/splitAppointments'

import PatientAppointment from '../../../components/patient/appointments/PatientAppointments'

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
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const supabase = createClient()

    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/login')
        return
      }

      const data = await fetchAppointmentData(supabase)

      if (data) {
        setAppointments(data.appointments)
      }
    }

    fetchData()
  }, [router])

  const { upcoming, past } = splitAppointments(appointments)

  return <PatientAppointment upcoming={upcoming} past={past} />
}
