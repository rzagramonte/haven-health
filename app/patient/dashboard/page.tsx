'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { Appointment, Message, Patient } from '@/lib/types/patient'

import PatientDashboard from '../../../components/patient/dashboard/PatientDashboard'

const mockAppointments: Appointment[] = [
  {
    id: 1,
    appointment_time: '2024-08-15T14:00:00Z',
    appointment_type: 'Office Visit',
    provider: { first_name: 'Dr. April', last_name: ' Bailey-Maletta, DPM' },
  },
]

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'Dr. Rachel Kim',
    content: 'Radiology results are back',
  },
  {
    id: 2,
    sender: 'Dr. Amelia Grant',
    content: 'Lipid panel results are back',
  },
  {
    id: 3,
    sender: 'Dr. Amelia Grant',
    content: 'Follow-up needed',
  },
  {
    id: 4,
    sender: 'Dr. Fatima Hassan',
    content: 'MRI Clean',
  },
  {
    id: 5,
    sender: 'Dr. Rachel Kim',
    content: 'Radiology results are back',
  },
  {
    id: 6,
    sender: 'Dr. Lydia Chen',
    content: 'Lipid panel results are back',
  },
  {
    id: 7,
    sender: 'Dr. Harper Lin',
    content: 'Follow-up needed',
  },
  {
    id: 8,
    sender: 'Dr. Dahlia Stone',
    content: 'MRI Clean',
  },
  {
    id: 9,
    sender: 'Dr. Sandy Alberca',
    content: 'MRI Clean',
  },
  {
    id: 10,
    sender: 'Dr. Sandy Alberca',
    content: 'Prescripton sent out',
  },
  {
    id: 11,
    sender: 'Dr. Sandy Alberca',
    content: 'MRI Clean',
  },
]

async function fetchDashboardData(supabase: ReturnType<typeof createClient>) {
  // Fetch auth.user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { patientName: '', messages: [], appointment: [] as Appointment[] }
  }

  // Use auth.user.id to fetch person
  const { data: person, error: personError } = await supabase
    .from('person')
    .select('id, first_name, last_name')
    .eq('person_uuid', user.id)
    .single()

  if (personError || !person) {
    return { patientName: '', messages: [], appointment: [] as Appointment[] }
  }
  const patientName = [person.first_name, person.last_name]
    .filter(Boolean)
    .join(' ')

  // Use person.id to fetch messages
  const { data: messages, error: messagesError } = await supabase
    .from('messages')
    .select(
      `
      id, content,
      sender:sender_id(first_name, last_name)
    `,
    )
    .eq('recipient_id', person.id)

  if (messagesError) {
    throw new Error(
      `No messages found for user. Error: ${messagesError?.message || 'No matching record'}`,
    )
  }

  // Use person.id to fetch patient
  const { data: patient, error: patientError } = await supabase
    .from('patient')
    .select('id')
    .eq('person_id', person.id)
    .single()

  if (patientError || !patient) {
    return { patientName, messages, appointment: [] as Appointment[] }
  }

  // Use patient.id to fetch appointments
  const { data: appointment, error: appointmentError } = await supabase
    .from('appointment_booking')
    .select(
      `id, appointment_time, appointment_type, provider:provider_id(first_name, last_name)`,
    )
    .eq('patient_id', patient.id)
    .order('appointment_time', { ascending: true })

  if (appointmentError) {
    throw new Error(
      `No appointments found for user. Error: ${appointmentError?.message || 'No matching record'}`,
    )
  }

  return {
    appointment,
    messages,
    patientName,
  }
}

export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [appointment, setAppointment] = useState<Appointment[]>([])

  useEffect(() => {
    const supabase = createClient()

    const fetchData = async () => {
      const data = await fetchDashboardData(supabase)

      if (data) {
        setPatient(data.patientName ? data.patientName : 'Jane Doe')
        setAppointment(
          data.appointment.length ? data.appointment : mockAppointments,
        )
        setMessages(data.messages.length ? data.messages : mockMessages)
      }
    }

    fetchData()
  })

  return (
    <PatientDashboard
      patient={patient}
      appointment={appointment}
      messages={messages}
    />
  )
}
