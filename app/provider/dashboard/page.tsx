'use client'

import { useState } from 'react'

import ProviderDashboard from '@/components/dashboard/ProviderDashboard'
import { Appointment, Message } from '@/lib/types/patient'

export default function DashboardPage() {
  const [messages] = useState<Message[]>([])
  const [appointment] = useState<Appointment[]>([])

  return <ProviderDashboard appointment={appointment} messages={messages} />
}
