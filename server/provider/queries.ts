import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse } from '@/lib/types/auth'
import { ProviderAccountSettings } from '@/lib/types/provider'

export async function getProvider() {}

export async function getProviders() {}

export async function getProviderAccountSettings(
  authId: string,
): Promise<ActionResponse<ProviderAccountSettings>> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('person')
      .select('*, patient(emergency_contact), address(*)')
      .eq('person_uuid', authId)
      .single()

    if (error) {
      return {
        success: false,
        message:
          error.message || 'Something went wrong getting the account settings',
        error: error.name,
      }
    }

    const providerAccountSettings = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      role: 'provider',
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      address: {
        id: data.address[0].id,
        personId: data.address[0].person_id,
        streetA: data.address[0].streeta,
        city: data.address[0].city,
        state: data.address[0].address_state,
        zipCode: data.address[0].zip_code,
      },
      emergencyContact: data.patient?.emergency_contact,
    }

    return {
      success: true,
      message: 'Provider account setttings successfully retreived',
      data: providerAccountSettings,
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
