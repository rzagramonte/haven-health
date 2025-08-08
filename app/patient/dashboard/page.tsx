'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { Appointment, Message, Patient, Provider } from '@/lib/types/patient'

import PatientDashboard from '../../../components/patient/dashboard/PatientDashboard'

async function fetchDashboardData(supabase: ReturnType<typeof createClient>) {
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
    .select('id, first_name, last_name')
    .eq('person_uuid', user.id)
    .single()

  if (personError || !person) {
    console.error('Error fetching patient name:', personError)
    return
  }
  const patientName =
    `${person.first_name ?? ''} ${person.last_name ?? ''}`.trim()

  // Use person.id to fetch messages
  const { data: messages, error: messagesError } = await supabase
    .from('messages')
    .select(
      `id, content,sender:sender_id!messages_sender_id_fkey (first_name, last_name)`,
    )
    .eq('recipient_id', person.id)

  if (messagesError || !messages) {
    console.error('Error fetching messages:', messagesError)
    return
  }

  // Use person.id to fetch patient
  const { data: patient, error: patientError } = await supabase
    .from('patient')
    .select('id')
    .eq('person_id', person.id)
    .single()

  if (patientError || !patient) {
    console.error('Error fetching patient:', patientError)
    return
  }

  // Use patient.id to fetch appointments
  const { data: appointment, error: appointmentError } = await supabase
    .from('appointment_booking')
    .select(
      `id, appointment_time,
      provider:provider_id!appointment_provider_id_fkey (first_name, last_name)`,
    )
    .eq('patient_id', patient.id)
    .gt('appointment_time', new Date().toISOString())
    .order('appointment_time', { ascending: true })
    .limit(1)
    .single()

  if (appointmentError || !appointment) {
    console.error('Error fetching appointments:', appointmentError)
    return
  }

  return {
    appointment,
    messages,
    patientName,
  }
}

export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient>('')
  const [provider, setProvider] = useState<Provider>('')
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'Dr. Rachel Kim',
      content: 'Radiology results are back',
    },
    {
      sender: 'Dr. Amelia Grant',
      content: 'Lipid panel results are back',
    },
    {
      sender: 'Dr. Amelia Grant',
      content: 'Follow-up needed',
    },
    {
      sender: 'Dr. Fatima Hassan',
      content: 'MRI Clean',
    },
    {
      sender: 'Dr. Rachel Kim',
      content: 'Radiology results are back',
    },
    {
      sender: 'Dr. Lydia Chen',
      content: 'Lipid panel results are back',
    },
    {
      sender: 'Dr. Harper Lin',
      content: 'Follow-up needed',
    },
    {
      sender: 'Dr. Dahlia Stone',
      content: 'MRI Clean',
    },
    {
      sender: 'Dr. Sandy Alberca',
      content: 'MRI Clean',
    },
    {
      sender: 'Dr. Sandy Alberca',
      content: 'Prescripton sent out',
    },
    {
      sender: 'Dr. Sandy Alberca',
      content: 'MRI Clean',
    },
  ])
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const fetchData = async () => {
      const data = await fetchDashboardData(supabase)

      if (!data) {
        return
      }

      setPatient(data.patientName)
      setProvider(data.appointment.provider)
      setAppointment(data.appointment)
      setMessages(data.messages)
    }

    fetchData()
  }, [])

  return (
    <PatientDashboard
      patient={patient}
      provider={provider}
      appointment={appointment}
      messages={messages}
    />
  )
}
