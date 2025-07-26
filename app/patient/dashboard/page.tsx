'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

import PatientDashboard from '../../../components/dashboard/PatientDashboard'

type Appointment = {
  date: string[]
  time: string[]
}

type Message = {
  id: number
  sender: string
  user: string
  message: string
}

export default function DashboardPage() {
  const supabase = createClient()
  const [patient, setPatient] = useState<string>('')
  const [provider, setProvider] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [appointments, setAppointments] = useState<Appointment>({
    date: [],
    time: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        console.error('Error getting user:', userError)
        return
      }

      setPatient(user.id)

      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('recipient_id', user.id)

      if (messagesError) {
        console.error('Error fetching messages:', messagesError)
      } else {
        setMessages(messagesData || [])
      }

      // Fetch appointments
      const { data: appointmentsData, error: appointmentsError } =
        await supabase
          .from('appointment_booking')
          .select('*')
          .eq('person_id', +user.id)

      if (appointmentsError) {
        console.error('Error fetching appointments:', appointmentsError)
      } else {
        const appt = appointmentsData?.[0]
        if (appt) {
          setAppointments({
            date: [appt.date],
            time: [appt.time],
          })
          setProvider(appt.provider || '')
        }
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <p className="p-4">Loading dashboard...</p>
  }

  return (
    <PatientDashboard
      patient={patient}
      provider={provider}
      appointments={appointments}
      messages={messages}
    />
  )
}
