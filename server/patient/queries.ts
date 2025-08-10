import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/lib/supabase/types'
import type { ActionResponse } from '@/lib/types/auth'
import type {
  EmergencyContact,
  MedicalVisit,
  PatientRecord,
} from '@/lib/types/patient'

export async function getPatientDetails(
  patientId: number,
): Promise<ActionResponse<PatientRecord>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('patient')
      .select('*')
      .eq('id', patientId)
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    const patient = {
      id: data.id,
      personId: data.person_id,
      dateOfBirth: data.date_of_birth,
      sex: data.sex,
      insuranceFlag: data.insurance_flag,
      emergencyContact: data.emergency_contact as EmergencyContact,
    }

    return {
      success: true,
      data: patient,
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

export async function getMedicalVisit(
  patientId: number,
): Promise<ActionResponse<MedicalVisit>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('medical_visit')
      .select('*')
      .eq('id', patientId)
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    const medicalVisit = {
      id: data.id,
      patientId: data.patient_id,
      doctorId: data.doctor_id,
      allergies: data.allergies,
      prescriptions: data.prescriptions,
      summaryNotes: data.summary_notes,
      followUpNeeded: data.followup_needed,
    }

    return {
      success: true,
      data: medicalVisit,
      message: 'Retrieved current patient',
    }
  } catch (err) {
    console.error('Get medical visit error:', err)
    return {
      success: false,
      message: 'An error occured retrieving medical visit',
      error: 'Failed to get medical visit',
    }
  }
}

export async function getPatients() {}
