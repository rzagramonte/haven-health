import type { User } from '@supabase/supabase-js'
import { cache } from 'react'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse } from '@/lib/types/auth'

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
        message: 'Signed in successfully',
      }
    } catch (err) {
      console.error('Get current user error:', err)
      return {
        success: false,
        message: 'An error occurred while signing in',
        error: 'Failed to sign in',
      }
    }
  },
)

export async function createUser() {}

export const getUserByEmail = cache(async () => {})

export const getUsers = cache(async () => {})

export async function deleteUser() {}

export async function updateUser() {}
