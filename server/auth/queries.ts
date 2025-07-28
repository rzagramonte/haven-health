import type { User } from '@supabase/supabase-js'
import { cache } from 'react'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse, Person } from '@/lib/types/auth'

export const getCurrentUser: () => Promise<ActionResponse<User>> = cache(
  async () => {
    const supabase = await createClient()

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        return {
          success: false,
          message: error.message,
          error: error.name,
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
        message: 'An error occurred while retrievig the current user',
        error: 'Failed to get current user',
      }
    }
  },
)

export async function getCurrentPerson(
  userId: string,
): Promise<ActionResponse<Person>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('person')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }

    const personData = data[0]

    const person = {
      id: personData.id,
      firstName: personData.first_name,
      lastName: personData.last_name,
      role: personData.role,
      createdAt: personData.created_at,
      updatedAt: personData.updated_at,
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
