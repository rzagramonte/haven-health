import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/lib/supabase/types'
import { ActionResponse } from '@/lib/types/auth'

export async function getPatientWithPersonId(
  personId: number,
): Promise<ActionResponse<Tables<'patient'>>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('patient')
      .select('*')
      .eq('person_id', personId)
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    return {
      success: true,
      data: data,
      message: 'Retrieved current patient',
    }
  } catch (err) {
    console.error('Get current patient error:', err)
    return {
      success: false,
      message: 'An error occured retrieving the current patient',
      error: 'Failed to get current patient',
    }
  }
}

export async function getPatient(
  patientId: number,
): Promise<ActionResponse<Tables<'patient'>>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('patient')
      .select('*, medical_visit(*)')
      .eq('id', patientId)
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    return {
      success: true,
      data: data,
      message: 'Retrieved current patient',
    }
  } catch (err) {
    console.error('Get current patient error:', err)
    return {
      success: false,
      message: 'An error occured retrieving the current patient',
      error: 'Failed to get current patient',
    }
  }
}

export async function getPatients() {}
