import 'server-only'

import { createClient } from '@/lib/supabase/server'

type AppointmentRow = { appointment_time: string | null }

export async function getAppointment() {}

export async function getAppointments() {}

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
