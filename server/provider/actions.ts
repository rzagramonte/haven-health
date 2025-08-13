'use server'

import { ActionResponse } from '@/lib/types/auth'
import { UpdatedValues } from '@/lib/types/provider'

import { updateEmail, updateName, updatePhone } from '../auth/queries'

export async function updateProviderProfile(
  updatedValues: UpdatedValues,
): Promise<ActionResponse> {
  const { key, updatedValue, providerId, authId } = updatedValues

  switch (key) {
    case 'name': {
      return await updateName(providerId, updatedValue)
    }

    case 'email': {
      return await updateEmail(authId, updatedValue)
    }

    case 'phone': {
      return await updatePhone(authId, updatedValue)
    }

    default:
      return {
        success: false,
        message: 'Unsupported account setting type',
        error: 'Invalid setting key',
      }
  }
}

export async function createProvider() {}

export async function deleteProvider() {}
