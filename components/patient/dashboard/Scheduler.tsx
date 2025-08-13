'use client'

import { CalendarPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Scheduler() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/appointment')
  }
  return (
    <Card className="bg-card-2 w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-bold">Schedule Appointment</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <CardDescription>
          Book your next appointment in just a few clicks.
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleClick} className="bg-secondary w-full">
          <CalendarPlus />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}
