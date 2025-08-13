'use client'
import { CalendarDays } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
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
  return (
    <main className="flex flex-col max-w-5xl mx-auto mt-32">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-3xl font-semibold">Welcome back, Doctor!</h1>
          <p>We&apos;re glad you&apos;re here. Let’s get you up to speed.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 items-center">
          <div className="flex flex-col gap-22 ">
            <div>
              <Card className="bg-card-1 w-full max-w-md">
                <CardHeader>
                  <CardTitle className="font-bold">
                    Upcoming Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  General Check-Up with Roosiel Agramonte on 8/17 at 9:30 AM
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button asChild className="w-full">
                    <Link
                      href="/provider/schedule"
                      className="flex items-center"
                    >
                      <CalendarDays />
                      View All Appointments
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="w-full">
              <PatientFinder />
            </div>
          </div>
          <div className="items-center">
            <Messages messages={messages} />
          </div>
        </div>
      </div>
    </main>
  )
}
