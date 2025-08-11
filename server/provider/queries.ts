import 'server-only'

import type { User } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse, Role } from '@/lib/types/auth'
import { EmergencyContact } from '@/lib/types/patient'
import { ProviderInfo } from '@/lib/types/provider'
import { ProviderProfile } from '@/lib/types/provider'

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
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      address: {
        streetA: data.address[0].streeta,
        city: data.address[0].city,
        state: data.address[0].address_state,
        zipCode: data.address[0].zip_code,
      },
      //@ts-expect-error :: emergency contact is not an array
      emergencyContact: data.patient?.emergency_contact as EmergencyContact,
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
