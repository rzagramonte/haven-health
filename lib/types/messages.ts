import { Database } from '@/lib/supabase/types'

export type SendMessages = {
  sender_id: number
  recipient_id: number
  content: string
  context: Database['public']['Enums']['message_context']
  message_type?: Database['public']['Enums']['message_type']
  appointment_id?: number | null
}

export type MessageSender = Database['public']['Tables']['messages']['Row'] & {
  sender: Pick<
    Database['public']['Tables']['person']['Row'],
    'first_name' | 'last_name' | 'role'
  >
}

export type InboxMessageItem = {
  thread_key: string
  context: Database['public']['Enums']['message_context']
  appointment_id?: number | null
  last_message: string
  last_sent_at: string
  sender_name: string
  sender_id: number
  sender_role: string
  recipient_id: number
  latest: number
}

export type GetConversationParams = {
  userId: number
  thread_key: string
}
