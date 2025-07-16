import { createBrowserClient } from '@supabase/ssr'

import { AppConfig } from '../config'

export function createClient() {
  return createBrowserClient(AppConfig.supabase.url, AppConfig.supabase.anonKey)
}
