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
    const { error: loginErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginErr) {
      console.error('Login error:', loginErr.message)
      return {
        success: false,
        message: 'Login failed. Please check your credentials.',
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
      message: 'An unexpected error occurred. Please try again.',
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    })


    if (error || !data?.user) {
      console.error('Signup auth error:', error?.message)
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
      }
    }

    const { data: signupData, error: signupErr } = await supabase
      .from('person')
      .insert({
        first_name: firstName,
        last_name: lastName,
        role: 'patient',
        person_uuid: data.user.id,
      })
      .select('id')
      .single()

    if (signupErr) {
      console.error('Error creating person:', signupErr.message)
      return {
        success: false,
        message: 'Failed to create user profile. Please try again later.',
      }
    }

    const { error: patientErr } = await supabase.from('patient').insert({
      person_id: signupData.id,
    })

    if (patientErr) {
      console.error('Error creating patient:', patientErr.message)
      return {
        success: false,
        message: 'Profile created, but failed to create patient record.',
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
    }
  }
}

export async function logOut(): Promise<ActionResponse> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error.message)
    return {
      success: false,
      message: 'Logout failed. Please try again.',
    }
  }

  redirect('./login')
}

export async function updatePassword() {}

export async function resetPassword() {}

export async function updateSettings() {}
