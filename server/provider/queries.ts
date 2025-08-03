import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { ProviderInfo } from '@/lib/types/provider'

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
