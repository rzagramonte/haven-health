import Link from 'next/link'
import { redirect } from 'next/navigation'

import MessageList from '@/components/messages/MessageList'
import MessageSend from '@/components/messages/MessageSend'
import { MessageSender } from '@/lib/types/messages'
import { getCurrentPerson, getCurrentUser } from '@/server/auth/queries'
import { getConversation } from '@/server/messages/queries'

export default async function ProviderConversationPage({
  params,
}: {
  params: Promise<{ threadKey: string }>
}) {
  const { threadKey } = await params

  const user = await getCurrentUser()
  if (!user.success || !user.data) {
    redirect('/login')
  }

  const personResponse = await getCurrentPerson(user.data.id)
  if (!personResponse.success || !personResponse.data) {
    redirect('/login')
  }

  const person = personResponse.data

  const messages: MessageSender[] = await getConversation({
    userId: person.id,
    thread_key: threadKey,
  })

  if (!messages.length) {
    return (
      <div className="text-center py-10">
        <p>No messages found in this conversation</p>
        <Link href="/provider/inbox">Back to inbox</Link>
      </div>
    )
  }

  const [firstMessage] = messages
  const recipientId =
    firstMessage.sender_id === person.id
      ? firstMessage.recipient_id
      : firstMessage.sender_id

  return (
    <div className="bg-background py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Conversation</h1>
          <Link
            href="/provider/inbox"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to Inbox
          </Link>
        </div>

        <MessageList messages={messages} currentUserId={person.id} />

        <MessageSend
          senderId={person.id}
          recipientId={recipientId}
          context={firstMessage.context}
          message_type={firstMessage.message_type ?? undefined}
          appointment_id={firstMessage.appointment_id}
        />
      </div>
    </div>
  )
}
