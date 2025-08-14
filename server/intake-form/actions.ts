'use server'
import { IntakeFormData } from '@/components/patient/patient_intake/PatientIntakeForm'
import { Address } from '@/lib/types/auth'
import { IntakeFields } from '@/lib/types/patient'
import { Sex } from '@/lib/types/patient'

import { addIntakeFields, addPatientAddress } from './queries'

export async function createIntakeForm(
  formData: IntakeFormData,
  patientId: number,
) {
  const formattedDate = formData.dob.toISOString().split('T')[0]

  const intakeFields: IntakeFields = {
    dateOfBirth: formattedDate,
    sex: formData.sex as Sex,
    insurance: formData.insurance === 'Yes' ? true : false,
    emergencyContact: formData.emergencyContact,
  }

  const address: Address = {
    ...formData.address,
  }

  try {
    const fieldsResponse = await addIntakeFields(intakeFields, patientId)

    if (fieldsResponse.success) {
      return await addPatientAddress(address, patientId)
    } else {
      return fieldsResponse
    }
  } catch (err) {
    console.error('Error updating intake form:', err)
    return {
      success: false,
      message: 'Error updating intake form',
      error: 'Intake form error',
    }
  }
}

export async function deleteIntakeForm() {}

export async function updateIntakeForm() {}
