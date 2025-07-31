'use server'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse } from '@/lib/types/auth'

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<ActionResponse> {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      }
    }
    return {
      success: true,
      message: 'Signed in successfully',
    }
  } catch (err) {
    console.error('Sign in error:', err)
    return {
      success: false,
      message: 'An error occurred while signing in',
      error: 'Failed to sign in',
    }
  }
}

export async function signUp({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string
  lastName: string
  email: string
  password: string
}): Promise<ActionResponse> {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    })

    if (error) {
      return {
        success: false,
        message: error.message || `Something went wrong`,
        error: error.name,
      }
    }

    return {
      success: true,
      message: 'Signed up successfully',
    }
  } catch (err) {
    console.error('Sign up error:', err)

    return {
      success: false,
      message: 'An error occurred while signing up',
      error: 'Failed to sign up',
    }
  }
}

export async function logOut(): Promise<ActionResponse> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      success: false,
      message: error.message || 'Log out went wrong',
      error: error.name,
    }
  }

  redirect('./login')
}

export async function updatePassword() {}

export async function resetPassword() {}

export async function updateSettings() {}
