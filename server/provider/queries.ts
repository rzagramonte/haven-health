import 'server-only'

import type { User } from '@supabase/supabase-js'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { ActionResponse, Role } from '@/lib/types/auth'
import { ProviderInfo } from '@/lib/types/provider'
import { EditableValue, ProviderProfile } from '@/lib/types/provider'
import { formatPhoneNumber } from '@/utils/helpers'

export async function getProvider(): Promise<ProviderInfo> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('person')
    .select(
      `
      *,
      contact(*),
      address(*)
    `,
    )
    .eq('role', 'provider')
    .limit(1)
    .single()

  if (error) {
    console.error(error.message)
    throw new Error('Failed to fetch provider')
  }

  return data
}

export async function getProviders() {}

export async function getProviderProfile(
  userData: ActionResponse<User>,
): Promise<ActionResponse<ProviderProfile>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('person')
      .select('*, patient!inner(emergency_contact), address(*)')
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

    const providerProfile = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      role: 'provider' as Role,
      email: userData.data?.email ?? '',
      phone: userData.data?.phone ?? '',
    }

    return {
      success: true,
      message: 'Provider account setttings successfully retrieved',
      data: providerProfile,
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
  providerId: number,
  settingValue: EditableValue,
) {
  try {
    if (!providerId || !settingValue) {
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
      .eq('id', providerId)

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
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
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
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
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
