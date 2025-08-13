'use client'

import { Provider } from '@/lib/types/patient'

export default function ProviderWelcomeMessage({
  provider,
}: {
  provider: Provider
}) {
  return (
    <div className=" mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Welcome, Dr. {[provider]}!</h1>
      <p className="mt-1 pl-5">
        We&apos;re glad you&apos;re here. Let’s get you up to speed.
      </p>
    </div>
  )
}
