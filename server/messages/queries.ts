import 'server-only'

import { createClient } from '@/lib/supabase/server'
import {
  GetConversationParams,
  InboxMessageItem,
  MessageSender,
} from '@/lib/types/messages'
import { generateThreadKey } from '@/utils/thread'

export async function getInboxMessages(
  userId: number,
): Promise<InboxMessageItem[]> {
  const supabase = await createClient()

  // fetch all related to user (recipient or sender)
  const { data: messages, error } = await supabase
    .from('messages')
    .select(
      `
      id, appointment_id, content, context, created_at, message_type,
      recipient_id, sender_id,
      sender:person!messages_sender_id_fkey ( first_name, last_name, role ),
      recipient:person!messages_recipient_id_fkey ( first_name, last_name, role )
    `,
    )
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error || !messages) {
    throw new Error('Failed to load messages')
  }

  // unique threads (senderId : recipientId)
  const threads = new Map<string, InboxMessageItem>()

  for (const message of messages) {
    const otherId =
      message.sender_id === userId ? message.recipient_id : message.sender_id

    const a = Math.min(userId, otherId)
    const b = Math.max(userId, otherId)

    const key = generateThreadKey({
      userId: a,
      otherId: b,
      context: message.context,
      appointmentId: message.appointment_id ?? undefined,
      messageType: message.message_type ?? undefined,
    })

    if (threads.has(key)) {
      continue
    }

    // latest message per thread
    threads.set(key, {
      thread_key: key,
      context: message.context,
      appointment_id: message.appointment_id ?? undefined,
      last_message: message.content,
      last_sent_at: message.created_at || '',
      sender_name:
        `${message.sender?.first_name ?? ''} ${message.sender?.last_name ?? ''}`.trim(),
      sender_role: message.sender?.role ?? '',
      sender_id: message.sender_id,
      recipient_id: message.recipient_id,
      latest: message.id,
    })
  }

  return Array.from(threads.values())
}

export async function getConversation({
  userId,
  thread_key,
}: GetConversationParams): Promise<MessageSender[]> {
  const supabase = await createClient()

  const { data: messages, error } = await supabase
    .from('messages')
    .select(
      `
        *,
        sender:person!messages_sender_id_fkey (
          first_name,
          last_name,
          role
        )
      `,
    )
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: true })
    .limit(100)

  if (error || !messages) {
    console.error(error)
    throw new Error('Failed to fetch messages for user')
  }

  // generated hashed key for unique threads (conversations)
  const matchedMessages = messages.filter((message) => {
    const otherId =
      message.sender_id === userId ? message.recipient_id : message.sender_id

    const hashed = generateThreadKey({
      userId: Math.min(userId, otherId),
      otherId: Math.max(userId, otherId),
      context: message.context,
      appointmentId: message.appointment_id ?? undefined,
      messageType: message.message_type ?? undefined,
    })

    return hashed === thread_key
  })

  return matchedMessages as MessageSender[]
}
