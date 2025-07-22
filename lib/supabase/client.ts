import { createBrowserClient } from '@supabase/ssr'

import { AppConfig } from '../config'
import type { Database } from './types'

export function createClient() {
  return createBrowserClient<Database>(
    AppConfig.supabase.url,
    AppConfig.supabase.anonKey,
  )
}
