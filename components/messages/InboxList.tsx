'use client'

import Link from 'next/link'

import { InboxMessageItem } from '@/lib/types/messages'

export default function InboxList({
  threads,
  userId,
  path = '/patient/messages',
}: {
  threads: InboxMessageItem[]
  userId: number
  path?: string
}) {
  return (
    <div className="bg-background py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="divide-y divide-border rounded-md bg-muted">
          {threads.map((thread) => {
            const date = new Date(thread.last_sent_at).toLocaleDateString(
              'en-US',
              {
                month: 'short',
                day: 'numeric',
              },
            )

            const isUser = thread.sender_id === userId
            const displayName = isUser
              ? 'You'
              : thread.sender_role === 'provider'
                ? `Dr. ${thread.sender_name}`
                : thread.sender_name
            const initial = thread.sender_name?.[0] ?? '?'

            return (
              <li key={thread.latest}>
                <Link href={`${path}/${thread.thread_key}`}>
                  <div className="flex items-center gap-4 px-4 py-3 hover:bg-muted/60 transition cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
                      {initial}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {displayName}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {thread.last_message}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
