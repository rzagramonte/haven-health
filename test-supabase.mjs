import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_KEY  // Use your service role key here

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase URL or service role key.')
  process.exit(1)
}

// Create client with service role key for full access
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function testConnection() {
  const { data, error } = await supabase.from('person').select('*').limit(10)

  if (error) {
    console.error('❌ Supabase error:', error.message)
  } else {
    console.log('✅ Successfully connected with service role key. Sample data:', data)
  }
}

testConnection()
