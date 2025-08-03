'use server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'
import { ActionResponse } from '@/lib/types/auth'

import { getBookedAppointmentTimes } from './queries'
import { generateAvailableTimeSlots } from './timeSlots'

type AppointmentType = Database['public']['Enums']['appointment_type_enums']

export async function createAppointment() {}

export async function deleteAppointment() {}

export async function updateAppointment() {}

export async function getAvailableSlots(date: Date) {
  const allSlots = generateAvailableTimeSlots()
  const bookedTimes = await getBookedAppointmentTimes(date)

  const bookedTimesString = bookedTimes.map((b) => b.toTimeString().slice(0, 5))

  return allSlots.filter((s) => !bookedTimesString.includes(s))
}

export async function confirmBooking(bookingData: {
  type: string
  date: Date
  time: string
}): Promise<ActionResponse> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (!user || userError) {
    return {
      success: false,
      message: 'Authentication failed',
    }
  }

  const { data: person, error: personErr } = await supabase
    .from('person')
    .select('id')
    .eq('person_uuid', user.id)
    .single()

  if (personErr || !person) {
    return {
      success: false,
      message: 'Failed to fetch user profile',
    }
  }

  const { data: patient, error: patientErr } = await supabase
    .from('patient')
    .select('id')
    .eq('person_id', person.id)
    .single()

  if (patientErr || !patient) {
    return {
      success: false,
      message: 'Patient record not found',
    }
  }

  const { data: provider, error: providerErr } = await supabase
    .from('person')
    .select('id')
    .eq('role', 'provider')
    .limit(1)
    .single()

  if (providerErr || !provider) {
    return {
      success: false,
      message: 'No provider found',
    }
  }

  const dateString = bookingData.date.toISOString().split('T')[0]
  const appointmentStart = new Date(`${dateString}T${bookingData.time}:00`)

  const { error: bookingErr } = await supabase
    .from('appointment_booking')
    .insert({
      patient_id: patient.id,
      provider_id: provider.id,
      appointment_type: bookingData.type as AppointmentType,
      appointment_time: appointmentStart.toISOString(),
      status: 'scheduled',
    })

  if (bookingErr) {
    return {
      success: false,
      message: 'Failed to create appointment booking',
    }
  }

  return { success: true, message: 'Appointment booked successfully!' }
}
