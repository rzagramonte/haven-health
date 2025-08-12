'use client'

import { MessageSender } from '@/lib/types/messages'
import { getDisplayName } from '@/utils/displayName'

type Props = {
  messages: MessageSender[]
  currentUserId: number
}

export default function MessageList({ messages, currentUserId }: Props) {
  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.sender_id === currentUserId
        const displayName = getDisplayName(message.sender, isCurrentUser)
        const cardColor = isCurrentUser ? 'ml-auto bg-card-1' : 'bg-card-3'

        return (
          <div
            key={message.id}
            className={`rounded-lg p-3 max-w-[75%] ${cardColor}`}
          >
            <div className="text-xs font-semibold mb-1">{displayName}</div>
            <div className="text-sm">{message.content}</div>
            <div className="text-[10px] mt-1 text-right opacity-70">
              {message.created_at
                ? new Date(message.created_at).toLocaleString()
                : ''}
            </div>
          </div>
        )
      })}
    </div>
  )
}
