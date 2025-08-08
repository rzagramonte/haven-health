'use client'

import { MessagesSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Message } from '@/lib/types/patient'

export default function Messages({ messages }: { messages: Message[] }) {
  const router = useRouter()
  const handleClickMessage = () => {
    router.push('/patient/message')
  }
  const handleClickMessages = () => {
    router.push('/patient/messages')
  }

  const messageCounts = messages?.reduce(
    (acc, msg) => {
      acc[msg.sender] = (acc[msg.sender] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const seen = new Set<string>()

  return (
    <Card className="bg-card-2 w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold">Messages</CardTitle>
      </CardHeader>

      <div className="overflow-auto sm:max-h-61 lg:max-h-65 scrollbar-thin [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-card-4 dark:[&::-webkit-scrollbar-thumb]:bg-card-4">
        {!messages.length ? (
          <CardContent className="">No messages found.</CardContent>
        ) : (
          messages.map((m, i) => {
            if (seen.has(m.sender)) {
              return null
            }
            seen.add(m.sender)

            const count = messageCounts[m.sender]
            const label =
              count > 1
                ? `${count} new messages from ${m.sender}`
                : `1 new message from ${m.sender}`

            return (
              <CardContent
                key={i}
                className="container flex justify-between py-2.5"
              >
                <CardDescription className="break-words pl-4">
                  {label}
                </CardDescription>
                <CardAction>
                  <Button
                    variant="link"
                    onClick={handleClickMessage}
                    className="text-accent"
                  >
                    View More
                  </Button>
                </CardAction>
              </CardContent>
            )
          })
        )}
      </div>

      <CardFooter className="flex-col gap-2">
        <Button
          onClick={handleClickMessages}
          className="w-full bg-secondary text-secondary-foreground"
        >
          <MessagesSquare />
          View All Messages
        </Button>
      </CardFooter>
    </Card>
  )
}
