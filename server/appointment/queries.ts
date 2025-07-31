import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/lib/supabase/types'
import { ActionResponse } from '@/lib/types/auth'

export async function getAppointment(
  personId: number,
): Promise<ActionResponse<Tables<'appointment_booking'>>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('appointment_booking')
      .select('*')
      .eq('person_id', personId)
      .single()

    if (error) {
      return {
        success: false,
        message: error.message || `Something went wrong`,
        error: error.name,
      }
    }

    return {
      success: true,
      data: data,
      message: 'Retrieved current appointment',
    }
  } catch (err) {
    console.error('Get current appointment error:', err)
    return {
      success: false,
      message: 'An error occured retrieving the current appointment',
      error: 'Failed to get current appointment',
    }
  }
}

export async function getAppointments() {}
