import 'server-only'

import { createClient } from '@/lib/supabase/server'

type AppointmentRow = { appointment_time: string | null }

export async function getAppointment() {}

export type AppointmentsByDateRange = Awaited<
  ReturnType<typeof getAppointmentsByDateRange>
>

export async function getAppointmentsByDateRange(
  startDate: Date,
  endDate: Date,
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('appointment_booking')
    .select(
      `
      id,
      appointment_time,
      appointment_type,
      patient:patient_id (
        person:person_id (
          first_name,
          last_name
        )
      ),
      provider:provider_id (
        first_name,
        last_name
      )
    `,
    )
    .gte('appointment_time', startDate.toISOString())
    .lte('appointment_time', endDate.toISOString())
    .order('appointment_time', { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch appointments: ${error.message}`)
  }

  return data
}

export async function getBookedAppointmentTimes(date: Date) {
  const supabase = await createClient()

  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const { data, error } = await supabase
    .from('appointment_booking')
    .select('appointment_time')
    .gte('appointment_time', startOfDay.toISOString())
    .lte('appointment_time', endOfDay.toISOString())
    .eq('status', 'scheduled')

  if (error) {
    console.error('Error fetching booked times: ', error.message)
    throw error
  }

  if (!data) {
    return []
  }

  return (data as AppointmentRow[])
    .filter((a) => a.appointment_time !== null)
    .map((a) => new Date(a.appointment_time!))
}
