'use server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'
import { ActionResponse } from '@/lib/types/auth'

import { getBookedAppointmentTimes } from './queries'
import { generateAvailableTimeSlots } from './timeSlots'

type AppointmentType = Database['public']['Enums']['appointment_type_enums']

export async function getAvailableSlots(date: Date) {
  const allSlots = generateAvailableTimeSlots()
  const bookedTimes = await getBookedAppointmentTimes(date)

  const bookedTimesString = bookedTimes.map((b) => b.toTimeString().slice(0, 5))

  return allSlots.filter((s) => !bookedTimesString.includes(s))
}

export async function createAppointment(bookingData: {
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

export async function updateAppointment(params: {
  bookingId: number
  when: Date
  type?: AppointmentType
}) {
  const supabase = await createClient()

  const patch: Database['public']['Tables']['appointment_booking']['Update'] = {
    appointment_time: params.when.toISOString(),
  }

  if (params.type) {
    patch.appointment_type = params.type
  }

  const { error } = await supabase
    .from('appointment_booking')
    .update(patch)
    .eq('id', params.bookingId)

  if (error) {
    return { success: false, message: 'Update failed' }
  }
  return { success: true, message: 'Appointment updated' }
}

export async function deleteAppointment() {}
