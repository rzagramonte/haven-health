'use server'

import { ActionResponse } from '@/lib/types/auth'
import { UpdatedSettingValues } from '@/lib/types/provider'

import {
  updateAddress,
  updateEmail,
  updateEmergencyContact,
  updateName,
  updatePhone,
} from './queries'

export async function updateProviderSettings(
  updatedSetting: UpdatedSettingValues,
): Promise<ActionResponse> {
  const { settingKey, settingValue, providerId, authId } = updatedSetting

  switch (settingKey) {
    case 'emergencyContact': {
      return await updateEmergencyContact(providerId, settingValue)
    }

    case 'address': {
      return await updateAddress(providerId, settingValue)
    }

    case 'name': {
      return await updateName(providerId, settingValue)
    }

    case 'email': {
      return await updateEmail(authId, settingValue)
    }

    case 'phone': {
      return await updatePhone(authId, settingValue)
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
