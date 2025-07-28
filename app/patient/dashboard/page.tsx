'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { Appointment, Message, Patient, Provider } from '@/lib/types/patient'

import PatientDashboard from '../../../components/dashboard/PatientDashboard'

export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient>('')
  const [provider, setProvider] = useState<Provider>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [appointment, setAppointment] = useState<Appointment>(null)

  useEffect(() => {
    const supabase = createClient()
    const fetchData = async () => {
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
        .eq('user_id', user.id)
        .single()

      if (personError || !personData) {
        console.error('Error fetching patient name:', personError)
      }

      setPatient(`${personData?.first_name}`)

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
            content: msg.content ?? '',
            sender_name: `${msg.sender ?? ''}`,
          }),
        )

        setMessages(formattedMessages)
      }
      // Fetch appointments
      const { data: appointmentsData, error: appointmentsError } =
        await supabase
          .from('appointment')
          .select(
            `
  date_time,
  doctor:doctor_id!appointment_doctor_id_fkey (
    first_name,
    last_name
  )
`,
          )

          .eq('patient_id', user.id)

      if (appointmentsError) {
        console.error('Error fetching appointments:', appointmentsError)
      } else {
        const appt = appointmentsData?.[0]
        if (appt) {
          setAppointment({ date_time: appt.date_time })
          const fullName = `${appt?.doctor}`
          setProvider(fullName)
        }
      }
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
