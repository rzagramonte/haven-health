'use client'

import { useState } from 'react'

import { Appointment, Message, Provider } from '@/lib/types/patient'

import ProviderDashboard from '../../../components/dashboard/ProviderDashboard'

export default function DashboardPage() {
  const messagesData: Message[] = [
    { content: 'Radiology results are back', sender: 'Dr. Rachel Kim' },
    { content: 'Lipid panel results are back', sender: 'Dr. Elijah Thompson' },
    { content: 'Follow-up needed', sender: 'Dr. Elias Hunt' },
    { content: 'MRI Clean', sender: 'Dr. José Martínez' },
    { content: 'Prescripton sent out', sender: 'Dr. José Martínez' },
    { content: 'MRI Clean', sender: 'Dr. Josh Martínez' },
  ]

  const [provider] = useState<Provider>('')
  const [messages] = useState<Message[]>(messagesData)
  const [appointment] = useState<Appointment | null>(null)

  return (
    <ProviderDashboard
      provider={provider}
      appointment={appointment}
      messages={messages}
    />
  )
}
