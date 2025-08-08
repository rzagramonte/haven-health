import 'server-only'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import type { EmergencyContact } from '@/lib/types/emergencyContact'

import { getCurrentUser } from '../auth/queries'

export async function getPersonIdByUuid(userUuid: string) {
  const supabase = await createClient()
  const { data: person, error } = await supabase
    .from('person')
    .select('id')
    .eq('person_uuid', userUuid)
    .single()

  if (error || !person) {
    console.error('Could not find person for user UUID:', error)
    return null
  }

  return person.id
}

export async function getPatient() {
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
    .eq('role', 'patient')
    .limit(1)
    .single()

  if (error) {
    console.error(error.message)
    throw new Error('Failed to fetch provider')
  }

  return data
}

export async function getPatientProfile() {
  const getUser = await getCurrentUser()
  if (!getUser.data) {
    return null
  }
  const supabase = await createClient()
  const personId = getUser.data.id

  const { data, error } = await supabase
    .from('person')
    .select(
      `
            first_name,
            last_name,
            patient ( insurance_flag, emergency_contact ),
            address ( streeta, streetb, city, address_state, zip_code ),
            contact ( contact_type, contact_value )
            `,
    )
    .eq('person_uuid', personId)
    .single()

  if (error || !data) {
    console.error('Failed to fetch patient profile:', error?.message)
    return null
  }

  const email = getUser.data?.email ?? null
  const phone = getUser.data.phone ?? null

  const patientData = data.patient[0]
  const addressData = data.address[0]

  const patientProfile = {
    fullName: {
      firstName: data.first_name ?? '',
      lastName: data.last_name ?? '',
    },
    phone: phone,
    email: email,
    address: {
      streeta: addressData?.streeta ?? null,
      streetb: addressData?.streetb ?? null,
      city: addressData?.city ?? null,
      state: addressData?.address_state ?? null,
      zip: addressData?.zip_code ?? null,
    },
    emergencyContact:
      (patientData?.emergency_contact as EmergencyContact) ?? null,
    insurance_flag: patientData?.insurance_flag ?? false,
  }
  return patientProfile
}

export async function updatePatientProfile(updates: {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  address?: {
    streeta?: string
    streetb?: string
    city?: string
    state?: string
    zip?: string
  }
  emergencyContact?: EmergencyContact
  insurance_flag?: boolean
}) {
  const { data: user, error: userError } = await getCurrentUser()
  if (userError || !user) {
    return { success: false, error: { message: 'User not authenticated.' } }
  }
  const userUuid = user.id

  const personId = await getPersonIdByUuid(userUuid)
  if (!personId) {
    return { success: false, error: { message: 'Person record not found.' } }
  }

  const supabase = await createClient()

  if (updates.firstName || updates.lastName) {
    const { error } = await supabase
      .from('person')
      .update({ first_name: updates.firstName, last_name: updates.lastName })
      .eq('id', personId)
    if (error) {
      return { success: false, error }
    }
  }

  if (updates.phone) {
    const { error } = await supabase.auth.admin.updateUserById(userUuid, {
      phone: updates.phone,
    })
    if (error) {
      return { success: false, error }
    }
  }

  if (updates.email) {
    const { error } = await supabase
      .from('contact')
      .update({ contact_value: updates.email })
      .eq('person_id', personId)
      .eq('contact_type', 'email')
    if (error) {
      return { success: false, error }
    }
  }

  if (updates.address) {
    const { error } = await supabase
      .from('address')
      .update({
        streeta: updates.address.streeta,
        streetb: updates.address.streetb,
        city: updates.address.city,
        address_state: updates.address.state,
        zip_code: updates.address.zip,
      })
      .eq('person_id', personId)
    if (error) {
      return { success: false, error }
    }
  }

  if (updates.emergencyContact) {
    const { error } = await supabase
      .from('patient')
      .update({ emergency_contact: updates.emergencyContact })
      .eq('person_id', personId)
    if (error) {
      return { success: false, error }
    }
  }

  if (typeof updates.insurance_flag === 'boolean') {
    const { error } = await supabase
      .from('patient')
      .update({ insurance_flag: updates.insurance_flag })
      .eq('person_id', personId)
    if (error) {
      return { success: false, error }
    }
  }

  revalidatePath('/profile')
  return { success: true }
}
