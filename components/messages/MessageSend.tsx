'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { SendMessages } from '@/lib/types/messages'
import { sendMessage } from '@/server/messages/actions'
import { showError } from '@/utils/toast'

type Props = {
  senderId: number
  recipientId: number
  context: SendMessages['context']
  message_type?: SendMessages['message_type']
  appointment_id?: number | null
}

export default function MessageSend({
  senderId,
  recipientId,
  context,
  message_type,
  appointment_id,
}: Props) {
  const [content, setContent] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSend = () => {
    if (!content.trim()) {
      return
    }

    startTransition(async () => {
      try {
        await sendMessage({
          sender_id: senderId,
          recipient_id: recipientId,
          content,
          context,
          message_type,
          appointment_id,
        })

        setContent('')
        router.refresh()
      } catch (err) {
        console.error(err)
        showError('Failed to send a message')
      }
    })
  }

  return (
    <div className="mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        className="w-full border border-border rounded-md p-2 text-sm text-foreground placeholder:text-muted-foreground bg-muted"
        placeholder="Type your message..."
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleSend}
          disabled={isPending || !content.trim()}
          className="px-3 py-1 text-sm font-medium bg-primary text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
        >
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
