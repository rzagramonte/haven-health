'use client'
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

  return (
    <Card className="bg-card-2 w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold">Messages</CardTitle>
      </CardHeader>
      {!messages.length ? (
        <CardContent>No messages found.</CardContent>
      ) : (
        messages?.map((msg, index) => (
          <CardContent key={index} className="flex items-center gap-2">
            <CardDescription>
              1 new message from {msg.sender.first_name} {msg.sender.last_name}
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
        ))
      )}
      <CardFooter className="flex-col gap-2">
        <Button
          onClick={handleClickMessages}
          className="w-full bg-secondary text-secondary-foreground"
        >
          View All Messages
        </Button>
      </CardFooter>
    </Card>
  )
}
