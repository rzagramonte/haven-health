'use server'

import { ActionResponse } from '@/lib/types/auth'
import { UpdatedValues } from '@/lib/types/patientProfile'
import {
  updateAddress,
  updateEmail,
  updateEmergencyContact,
  updateInsuranceFlag,
  updateName,
  updatePhone,
} from '@/server/patient/queries'

export async function updatePatientProfile(
  updatedValues: UpdatedValues,
): Promise<ActionResponse> {
  const { key, updatedValue, patientId, authId } = updatedValues

  // The switch statement needs to handle every possible key
  switch (key) {
    case 'name': {
      return await updateName(patientId, updatedValue)
    }
    case 'email': {
      return await updateEmail(authId, updatedValue)
    }
    case 'phone': {
      return await updatePhone(authId, updatedValue)
    }
    case 'address': {
      if (typeof updatedValue !== 'object' || updatedValue === null) {
        throw new Error('Invalid address format provided.')
      }
      // @ts-expect-error fixing address types todo
      return await updateAddress(patientId, updatedValue)
    }
    case 'emergencyContact': {
      console.log(updatedValue)
      return await updateEmergencyContact(patientId, updatedValue)
    }
    case 'insuranceFlag': {
      return await updateInsuranceFlag(patientId, updatedValue)
    }
    default:
      return {
        success: false,
        message: 'Unsupported account setting type',
        error: 'Invalid setting key',
      }
  }
}
