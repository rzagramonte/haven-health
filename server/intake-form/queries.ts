import 'server-only'

import { createClient } from '@/lib/supabase/server'
import type { ActionResponse } from '@/lib/types/auth'
import { Address } from '@/lib/types/auth'
import type { IntakeFields } from '@/lib/types/patient'

export async function addIntakeFields(
  intakeFields: IntakeFields,
  patientId: number,
): Promise<ActionResponse<number>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('patient')
      .update({
        date_of_birth: intakeFields.dateOfBirth,
        sex: intakeFields.sex,
        emergency_contact: intakeFields.emergencyContact,
        insurance_flag: intakeFields.insurance,
      })
      .eq('id', patientId)
      .select()
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
      message: 'Intake fields successfully updated',
      data: data.id,
    }
  } catch (err) {
    console.error('There was a problem updating your intake fields:', err)
    return {
      success: false,
      message: 'Failed to submit intake form',
      error: 'Intake form error',
    }
  }
}

export async function addPatientAddress(
  address: Address,
  personId: number,
): Promise<ActionResponse> {
  const supabase = await createClient()

  try {
    const { error } = await supabase
      .from('address')
      .insert({
        person_id: personId,
        streeta: address.streetA,
        streetb: address.streetB,
        city: address.city,
        address_state: address.state,
        zip_code: address.zipCode,
      })
      .eq('person_id', personId)

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    return {
      success: true,
      message: 'Address updated successfully',
    }
  } catch (err) {
    console.error('Error updating your address:', err)
    return {
      success: false,
      message: 'Failed to submit address',
      error: 'Address intake error',
    }
  }
}

export async function getIntakeForm() {}

export async function getIntakeForms() {}
