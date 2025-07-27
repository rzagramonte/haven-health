'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { Appointment, Message, Patient, Provider } from '@/lib/types/patient'

import PatientDashboard from '../../../components/dashboard/PatientDashboard'

export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient>('')
  const [provider, setProvider] = useState<Provider>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [appointment, setAppointment] = useState<Appointment>({
    appointment_date_time: '',
  })

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
        .eq('user_id', +user?.id)
        .single()

      if (personError || !personData) {
        console.error('Error fetching patient name:', personError)
      }

      setPatient(`${personData?.first_name}`)

      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('recipient_id', +user?.id)

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
          .eq('person_id', +user?.id)

      if (appointmentsError) {
        console.error('Error fetching appointments:', appointmentsError)
      } else {
        const appt = appointmentsData?.[0]
        if (appt) {
          setAppointment({ appointment_date_time: appt?.appointment_date_time })
          // Fetch provider
          const { data: providerData, error: providerError } = await supabase
            .from('person')
            .select('first_name, last_name')
            .eq('id', appt?.doctor_id)
            .single()
          if (providerError) {
            console.error('Error fetching provider:', providerError)
          } else {
            const fullName = `${providerData?.first_name} ${providerData?.last_name}`
            setProvider(fullName)
          }
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
