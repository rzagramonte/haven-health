'use client'

import { Patient } from '@/lib/types/patient'

export default function WelcomeMessage({ patient }: { patient: Patient }) {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-semibold mb-3">Welcome, {patient}!</h1>
      <p className="mt-1 text-2xl p-1">
        We&apos;re glad you&apos;re here. Let’s get you up to speed.
      </p>
    </div>
  )
}
