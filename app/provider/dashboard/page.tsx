'use client'

import { useState } from 'react'

import { Appointment, Message, Provider } from '@/lib/types/patient'

import ProviderDashboard from '../../../components/dashboard/ProviderDashboard'

export default function DashboardPage() {
  const messagesData: Message[] = [
    {
      id: 1,
      sender: 'John Martinez',
      content:
        'Hi, I’m running low on my blood pressure medication. Can I get a refill?',
    },
    {
      id: 2,
      sender: 'Emily Chen',
      content:
        'I’ve been feeling dizzy the past few days. Should I schedule a visit?',
    },
    {
      id: 3,
      sender: 'Emily Chen',
      content: 'Also, my test results from last week—are they available yet?',
    },
    {
      id: 4,
      sender: 'Michael Johnson',
      content: 'Can I get a copy of my MRI report for my personal records?',
    },
    {
      id: 5,
      sender: 'John Martinez',
      content:
        'I forgot to mention I’m allergic to penicillin. Please update my chart.',
    },
    {
      id: 6,
      sender: 'Sophia Patel',
      content: 'The new prescription is making me nauseous. Is that normal?',
    },
    {
      id: 7,
      sender: 'David Kim',
      content: 'Can I reschedule my appointment to next Wednesday afternoon?',
    },
    {
      id: 8,
      sender: 'Isabella Rodriguez',
      content: 'My knee pain has gotten worse since our last visit.',
    },
    {
      id: 9,
      sender: 'Liam Thompson',
      content: 'I’m still waiting on my lab results from last month.',
    },
    {
      id: 10,
      sender: 'Liam Thompson',
      content:
        'Also, could you email me the aftercare instructions from my last appointment?',
    },
    {
      id: 11,
      sender: 'Liam Thompson',
      content: 'Thanks again for your help with the prescription issue.',
    },
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
