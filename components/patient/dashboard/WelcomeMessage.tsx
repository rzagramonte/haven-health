'use client'

import { Patient } from '@/lib/types/patient'

export default function WelcomeMessage({ patient }: { patient: Patient }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Welcome, {patient}!</h1>
      <p className="mt-1 text-2xl p-1">
        We&apos;re glad you&apos;re here. Let’s get you up to speed.
      </p>
    </div>
  )
}
