import Link from 'next/link'
import { redirect } from 'next/navigation'

import InboxList from '@/components/messages/InboxList'
import { getCurrentPerson, getCurrentUser } from '@/server/auth/queries'
import { getInboxMessages } from '@/server/messages/queries'

export default async function MessagesPage() {
  const user = await getCurrentUser()
  if (!user.success) {
    redirect('/login')
  }

  const personResponse = await getCurrentPerson(user.data!.id)
  if (!personResponse.success || !personResponse.data) {
    redirect('/login')
  }

  const person = personResponse.data
  const threads = await getInboxMessages(person.id)

  return (
    <div className="bg-background py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
          <Link
            href="/patient/dashboard"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <InboxList threads={threads} userId={person.id} />
      </div>
    </div>
  )
}
