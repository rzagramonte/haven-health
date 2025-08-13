'use server'
import 'server-only'

import type { User } from '@supabase/supabase-js'

import { AppConfig } from '@/lib/config'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { ActionResponse } from '@/lib/types/auth'
import { MedicalVisit, PatientRecord } from '@/lib/types/patient'
import {
  AddressUI,
  EditableValue,
  EmergencyContact,
  PatientProfile,
} from '@/lib/types/patientProfile'
import { formatPhoneNumber } from '@/utils/helpers'

export async function getPatientProfile(
  userData: ActionResponse<User>,
): Promise<ActionResponse<PatientProfile>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('person')
      .select('*, patient!inner(emergency_contact, insurance_flag), address(*)')
      .eq('person_uuid', userData.data?.id ?? '')
      .single()

    if (error) {
      return {
        success: false,
        message:
          error.message || 'Something went wrong getting the account settings',
        error: error.name,
      }
    }

    const patientData = Array.isArray(data.patient)
      ? data.patient[0]
      : data.patient
    const addressData = data.address[0]

    const patientProfile = {
      id: data.id,
      authId: userData.data?.id ?? '',
      firstName: data.first_name ?? '',
      lastName: data.last_name ?? '',
      email: userData.data?.email ?? '',
      phone: userData.data?.phone ?? '',
      address: addressData
        ? {
            streetA: addressData.streeta,
            streetB: addressData.streetb,
            city: addressData.city,
            state: addressData.address_state,
            zipCode: addressData.zip_code,
          }
        : null,
      emergencyContact:
        (patientData?.emergency_contact as EmergencyContact) ?? null,
      insurance_flag: patientData?.insurance_flag ?? false,
    }

    return {
      success: true,
      message: 'Patient account setttings successfully retrieved',
      data: patientProfile,
    }
  } catch (err) {
    console.error('There was an error getting your contact info:', err)

    return {
      success: false,
      message: 'There was an error getting your contact information',
      error: 'Error getting your contact info',
    }
  }
}

export async function updateName(
  patientId: number,
  settingValue: EditableValue,
) {
  try {
    if (!patientId || !settingValue) {
      throw new Error('Missing credentials')
    }

    if (!(typeof settingValue === 'object' && 'firstName' in settingValue)) {
      throw new Error('Invalid format for name')
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('person')
      .update({
        first_name: settingValue.firstName,
        last_name: settingValue.lastName,
      })
      .eq('id', patientId)

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    return {
      success: true,
      message: 'Name updated successfully',
    }
  } catch (err) {
    console.error('Failed to update name:', err)
    return {
      success: false,
      message: 'Failed to update name',
      error: 'Name update error',
    }
  }
}

export async function updateEmail(
  authId: string,
  settingValue: EditableValue,
): Promise<ActionResponse> {
  try {
    if (!authId || !settingValue) {
      throw new Error('Missing credentials')
    }

    if (typeof settingValue !== 'string') {
      throw new Error('Invalid format for email')
    }

    const supabaseAdmin = createAdminClient(
      AppConfig.supabase.url,
      AppConfig.supabase.adminKey,
    )

    const { error } = await supabaseAdmin.auth.admin.updateUserById(authId, {
      email: settingValue,
    })

    if (error) {
      console.error(error.message)
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    return {
      success: true,
      message: 'Email successfully updated',
    }
  } catch (err) {
    console.error('Failed to update email:', err)
    return {
      success: false,
      message: 'Failed to update email',
      error: 'Update email error',
    }
  }
}

export async function updatePhone(
  authId: string,
  settingValue: EditableValue,
): Promise<ActionResponse> {
  try {
    if (!authId || !settingValue) {
      throw new Error('Missing credentials')
    }

    if (typeof settingValue !== 'string') {
      throw new Error('Invalid format for phone')
    }

    const formattedPhone = formatPhoneNumber(settingValue)

    const supabaseAdmin = createAdminClient(
      AppConfig.supabase.url,
      AppConfig.supabase.adminKey,
    )

    const { error } = await supabaseAdmin.auth.admin.updateUserById(authId, {
      phone: formattedPhone,
    })

    if (error) {
      console.error(error.message)
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    return {
      success: true,
      message: 'Phone number successfully updated',
    }
  } catch (err) {
    console.error('Failed to update phone number:', err)
    return {
      success: false,
      message: 'Failed to update phone number',
      error: 'Phone number update error',
    }
  }
}

export async function updateAddress(
  patientId: number,
  settingValue: AddressUI,
): Promise<ActionResponse> {
  try {
    if (!patientId || !settingValue) {
      throw new Error('Missing credentials')
    }

    const supabase = await createClient()
    const addressForDb = {
      streeta: settingValue.streetA,
      streetb: settingValue.streetB,
      city: settingValue.city,
      address_state: settingValue.state,
      zip_code: settingValue.zipCode,
    }

    const { data, error: selectError } = await supabase
      .from('address')
      .select('person_id')
      .eq('person_id', patientId)
      .limit(1)

    if (selectError) {
      return {
        success: false,
        message: selectError.message,
        error: selectError.name,
      }
    }

    if (data.length > 0) {
      // Update
      const { error: updateError } = await supabase
        .from('address')
        .update(addressForDb)
        .eq('person_id', patientId)

      if (updateError) {
        return {
          success: false,
          message: updateError.message,
          error: updateError.name,
        }
      }
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('address')
        .insert({ ...addressForDb, person_id: patientId })

      if (insertError) {
        return {
          success: false,
          message: insertError.message,
          error: insertError.name,
        }
      }
    }

    return { success: true, message: 'Address updated successfully' }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'An unknown error occurred.'
    console.error('Failed to update address:', message)
    return { success: false, message: 'Failed to update address.' }
  }
}

export async function updateEmergencyContact(
  patientId: number,
  settingValue: EditableValue,
): Promise<ActionResponse> {
  try {
    if (!patientId || !settingValue) {
      throw new Error('Missing credentials')
    }

    if (typeof settingValue !== 'object' || settingValue === null) {
      throw new Error('Invalid format for emergency contact')
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('patient')
      .update({ emergency_contact: settingValue as EmergencyContact })
      .eq('person_id', patientId)

    if (error) {
      return { success: false, message: error.message, error: error.name }
    }

    return {
      success: true,
      message: 'Emergency contact updated successfully',
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'An unknown error occurred.'
    console.error('Failed to update emergency contact:', message)
    return { success: false, message: 'Failed to update emergency contact.' }
  }
}

export async function updateInsuranceFlag(
  patientId: number,
  settingValue: EditableValue,
): Promise<ActionResponse> {
  try {
    if (!patientId) {
      throw new Error('Missing credentials')
    }

    if (typeof settingValue !== 'boolean') {
      throw new Error('Invalid format for insurance flag')
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('patient')
      .update({ insurance_flag: settingValue })
      .eq('person_id', patientId)

    if (error) {
      return { success: false, message: error.message, error: error.name }
    }

    return { success: true, message: 'Insurance status updated successfully' }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'An unknown error occurred.'
    console.error('Failed to update insurance status:', message)
    return { success: false, message: 'Failed to update insurance status.' }
  }
}

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

export async function getMedicalVisit(
  patientId: number,
): Promise<ActionResponse<MedicalVisit>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('medical_visit')
      .select('*')
      .eq('patient_id', patientId)
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
