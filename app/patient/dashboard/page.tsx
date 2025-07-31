'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { Appointment, Message, Patient, Provider } from '@/lib/types/patient'

import PatientDashboard from '../../../components/dashboard/PatientDashboard'

async function fetchDashboardData(supabase: ReturnType<typeof createClient>) {
  // ... all that logic to get user, patient, messages, appointment

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Error getting user:', userError)
    return
  }
  const { data: personData, error: personError } = await supabase
    .from('person')
    .select('first_name, last_name')
    .eq('person_uuid', user.id)
    .single()

  if (personError || !personData) {
    console.error('Error fetching patient name:', personError)
  }

  const patient = personData?.first_name

  /*
      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(
          `
    content,
    sender:sender_id!messages_sender_id_fkey (
      first_name,
      last_name
    )
  `,
        )
        .eq('recipient_id', user.id)

      if (messagesError) {
        console.error('Error fetching messages:', messagesError)
      } else {
        const formattedMessages: Message[] = (messagesData ?? []).map(
          (msg) => ({
            content: msg.content,
            sender_name: msg.sender,
          }),
        )

        setMessages(formattedMessages)
      }
*/
  // Fetch appointments
  const { data: appointmentsData, error: appointmentsError } = await supabase
    .from('appointment_booking')
    .select(
      `
  appointment_time,
  doctor:doctor_id!appointment_doctor_id_fkey (
    first_name,
    last_name
  )
`,
    )

    .eq('patient_id', user.id)

  let appointment: Appointment | null = null
  let provider = ''

  if (appointmentsError) {
    console.error('Error fetching appointments:', appointmentsError)
  } else {
    const appt = appointmentsData?.[0]
    if (appt) {
      appointment = { appointment_time: appt?.appointment_time }
      provider = appt?.doctor
    }
  }

  return {
    patient,
    provider,
    appointment,
    //messages,
  }
}

export default function DashboardPage() {
  const messagesData = [
    {
      content: 'Radiology results are back',
      sender: 'Dr. Rachel Kim',
    },
    {
      content: 'Lipid panel results are back',
      sender: 'Dr. Elijah Thompson',
    },
    {
      content: 'Follow-up needed',
      sender: 'Dr. Elias Hunt',
    },
    {
      content: 'MRI Clean',
      sender: 'Dr. José Martínez',
    },
    {
      content: 'Radiology results are back',
      sender: 'Dr. Rachel Kim',
    },
    {
      content: 'Lipid panel results are back',
      sender: 'Dr. Elijah Thompson',
    },
    {
      content: 'Follow-up needed',
      sender: 'Dr. Elias Hunt',
    },
    {
      content: 'MRI Clean',
      sender: 'Dr. José Martínez',
    },
    {
      content: 'MRI Clean',
      sender: 'Dr. Josh Martínez',
    },
    {
      content: 'Prescripton sent out',
      sender: 'Dr. José Martínez',
    },
    {
      content: 'MRI Clean',
      sender: 'Dr. José Martínez',
    },
  ]

  const [patient /*setPatient*/] = useState<Patient>('')
  const [provider, setProvider] = useState<Provider>('')
  const [messages /*, setMessages*/] = useState<Message[]>(messagesData)
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    const supabase = createClient()
    fetchDashboardData(supabase).then((data) => {
      if (!data) {
        return
      }
      //setPatient(data.patient)
      setProvider(data.provider)
      setAppointment(data.appointment)
      //setMessages(data.messages)
    })
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
