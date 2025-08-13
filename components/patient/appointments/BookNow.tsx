'use client'

import { CalendarPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function BookNow() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/appointment')
  }
  return (
    <div className="gap-2 ">
      <Button onClick={handleClick} variant="secondary" className="p-5">
        <CalendarPlus />
        Schedule an appointment
      </Button>
    </div>
  )
}
