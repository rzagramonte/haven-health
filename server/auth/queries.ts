import type { User } from '@supabase/supabase-js'
import { cache } from 'react'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { ActionResponse, Address, Person, Role } from '@/lib/types/auth'
import { EditableValue } from '@/lib/types/provider'
import { formatPhoneNumber } from '@/utils/helpers'

export const getCurrentUser: () => Promise<ActionResponse<User>> = cache(
  async () => {
    const supabase = await createClient()

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return {
          success: true,
          data: null,
          message: 'No active user session found',
        }
      }
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) {
        return {
          success: false,
          message: error?.message || 'User authentication failed',
          error: error?.name || 'Authentication',
        }
      }
      return {
        success: true,
        data: user,
        message: 'Retrieved the current user',
      }
    } catch (err) {
      console.error('Get current user error:', err)
      return {
        success: false,
        message: 'An error occurred while retrieving  the current user',
        error: 'Failed to get current user',
      }
    }
  },
)

export async function getCurrentPerson(
  authId: string,
): Promise<ActionResponse<Person>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('person')
      .select('*')
      .eq('person_uuid', authId)
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    const person = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role as Role,
    }

    return {
      success: true,
      data: person,
      message: 'Retrieved the current person',
    }
  } catch (err) {
    console.error('Get current user error:', err)
    return {
      success: false,
      message: 'An error occurred while getting the current person',
      error: 'Failed to get current person',
    }
  }
}

export async function getPerson(
  personId: number | null,
): Promise<ActionResponse<Person>> {
  if (!personId) {
    return {
      success: false,
      message: 'Need a proper patient Id',
    }
  }

  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('person')
      .select('*')
      .eq('id', personId)
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    const person: Person = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role as Role,
    }

    return {
      success: true,
      data: person,
      message: 'Retrieved the selected person',
    }
  } catch (err) {
    console.error('Get selected user error:', err)
    return {
      success: false,
      message: 'An error occurred while getting the  selected person',
      error: 'Failed to get the selected person',
    }
  }
}

export async function getAddress(
  personId: number,
): Promise<ActionResponse<Address>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('address')
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

    const address = {
      id: data.id,
      personId: data.person_id,
      streetA: data.streeta,
      streetB: data.streetb || '',
      city: data.city,
      state: data.address_state,
      zipCode: data.zip_code,
    }

    return {
      success: true,
      data: address,
      message: 'Retrieved the selected person',
    }
  } catch (err) {
    console.error('Get selected user error:', err)
    return {
      success: false,
      message: 'An error occurred while getting address',
      error: 'Failed to get the selected address',
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
      console.error(error.message)
      return {
        success: false,
        message: 'Failed to save name',
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
        message: 'Failed to save email',
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
        message: 'Failed to save phone',
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

export async function createUser() {}

export const getUserByEmail = cache(async () => {})

export const getUsers = cache(async () => {})

export async function deleteUser() {}

export async function updateUser() {}
