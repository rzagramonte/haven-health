import type { User } from '@supabase/supabase-js'
import { cache } from 'react'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse, Person, Role } from '@/lib/types/auth'

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

export async function createUser() {}

export const getUserByEmail = cache(async () => {})

export const getUsers = cache(async () => {})

export async function deleteUser() {}

export async function updateUser() {}
