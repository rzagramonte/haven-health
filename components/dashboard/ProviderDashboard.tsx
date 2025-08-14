'use client'

import { CalendarDays } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Sidebar } from '@/components/dashboard/adminDashboard/sidebar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Appointment, Message } from '@/lib/types/patient'

import Messages from './../patient/dashboard/Messages'
import PatientFinder from './PatientFinder'

type ProviderDashboard = {
  appointment: Appointment[]
  messages: Message[]
}

export default function ProviderDashboard({ messages }: ProviderDashboard) {
  const router = useRouter()
  const handleClick = () => {
    router.push('/provider/schedule')
  }
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            {' '}
            <h1 className="text-2xl font-semibold mb-3">
              Welcome back, Lillian Bingus!
            </h1>
            <p className="mt-1 text-2xl p-1">
              We&apos;re glad you&apos;re here. Let’s get you up to speed.
            </p>
          </div>
        </div>
        <div className="container m-auto grid grid-cols-1 md:grid-cols-2 max-w-5xl gap-10 p-4">
          <div className="flex flex-col gap-22 ">
            <div className="sm:items-center space-y-10  flex flex-col lg:items-end max-w-3xl">
              <Card className="bg-card-1 w-full max-w-md">
                <CardHeader>
                  <CardTitle className="font-bold">
                    Upcoming Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <CardDescription>
                    Your{' '}
                    <span className="text-accent font-semibold">
                      General Check-Up
                    </span>{' '}
                    with <span className="font-semibold">Lizar Campes</span> is
                    on{' '}
                    <span className="text-primary font-bold">
                      August 17, 2025 at 9:30 AM
                    </span>
                    .
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button onClick={handleClick} className="w-full">
                    <CalendarDays />
                    View All Appointments
                  </Button>
                </CardFooter>
              </Card>
              <PatientFinder />
            </div>
          </div>
          <div className="sm:items-center lg:space-y-15 space-y-6  flex flex-col lg:items-start">
            <Messages messages={messages} />
          </div>
        </div>
      </main>
    </div>
  )
}
