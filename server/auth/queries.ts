import type { User } from '@supabase/supabase-js'
import { cache } from 'react'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse, Person } from '@/lib/types/auth'

export const getCurrentUser: () => Promise<ActionResponse<User>> = cache(
  async () => {
    const supabase = await createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    try {
      if (session) {
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
      } else {
        console.log()
        return {
          success: true,
          data: null,
          message: 'No active user session found',
        }
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

// export const getCurrentUser = async (): Promise<ActionResponse<User>> => {
//   const supabase = createClient()

//   try {
//     const {
//       data: { user },
//       error,
//     } = await supabase.auth.getUser()

//     if (error || !user) {
//       return {
//         success: false,
//         message: error?.message || 'User authentication failed',
//         error: error?.name || 'Authentication',
//       }
//     }

//     return {
//       success: true,
//       data: user,
//       message: 'Retrieved the current user',
//     }
//   } catch (err) {
//     console.error('Get current user error:', err)
//     return {
//       success: false,
//       message: 'An error occurred while retrieving the current user',
//       error: 'Failed to get current user',
//     }
//   }
// }

export async function getCurrentPerson(
  userId: string,
): Promise<ActionResponse<Person>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('person')
      .select('*')
      .eq('person_uuid', userId)
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
      role: data.role,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
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
