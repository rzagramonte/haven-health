'use server'

import { createClient } from '@/lib/supabase/server'
import { SendMessages } from '@/lib/types/messages'

export async function sendMessage(message: SendMessages) {
  const supabase = await createClient()

  const { data: authRes, error: authErr } = await supabase.auth.getUser()
  if (authErr || !authRes?.user) {
    console.error('sendMessage: NO AUTH USER', { authErr, authRes })
    throw new Error('Failed to send message')
  }

  const payload: SendMessages = {
    ...message,
    content: (message.content ?? '').trim(),
    appointment_id: message.appointment_id ?? null,
  }

  if (!payload.sender_id || !payload.recipient_id || !payload.content) {
    console.error('sendMessage: BAD PAYLOAD', { payload })
    throw new Error('Failed to send message')
  }

  const { data: senderRow, error: senderErr } = await supabase
    .from('person')
    .select('id, person_uuid')
    .eq('id', payload.sender_id)
    .single()

  if (senderErr || !senderRow) {
    console.error('sendMessage: SENDER NOT FOUND', {
      senderErr,
      senderRow,
      payload,
    })
    throw new Error('Failed to send message')
  }

  if (senderRow.person_uuid !== authRes.user.id) {
    console.error(
      'sendMessage: RLS MISMATCH (sender person_uuid != auth uid)',
      {
        auth_uid: authRes.user.id,
        sender_person_uuid: senderRow.person_uuid,
        sender_id: senderRow.id,
      },
    )
    throw new Error(
      'Sender person_uuid does not match authenticated user. Message not sent.',
    )
  }

  const { data, error } = await supabase
    .from('messages')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    console.error('sendMessage: INSERT FAILED', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      payload,
    })
    throw new Error('Failed to send message')
  }

  return data
}
