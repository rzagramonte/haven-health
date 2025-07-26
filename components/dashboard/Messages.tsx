import { useEffect, useState } from 'react'

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
import { createClient } from '@/lib/supabase/client'

type Message = {
  id: number
  sender: string
  user: string
  message: string
}

export default function Messages() {
  const supabase = createClient()

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase.from('messages').select('*')
      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        setMessages(data || [])
      }
      setLoading(false)
    }

    fetchMessages()
  }, [])

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="bg-card-2 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold">Messages</CardTitle>
        </CardHeader>

        {loading ? (
          <CardContent>Loading...</CardContent>
        ) : messages.length === 0 ? (
          <CardContent>No messages found.</CardContent>
        ) : (
          messages?.map((msg, index) => (
            <CardContent key={index} className="flex items-center gap-2">
              <CardDescription>1 new message from {msg.sender}</CardDescription>
              <CardAction>
                <Button variant="link" className="text-accent">
                  View More
                </Button>
              </CardAction>
            </CardContent>
          ))
        )}

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full bg-secondary text-secondary-foreground"
          >
            View All Messages
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
