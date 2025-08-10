'use client' // Error boundaries must be Client Components

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div
        role="alert"
        className="relative bg-transparent inline-block w-[80vw]  max-w-[500px] aspect-[2/1] my-8"
      >
        <Image src="/icons/googley-eyes.png" fill alt="googlyeye" />
      </div>
      <div className="text-center px-4 py-8 sm:px-2 sm:py-10">
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
          Something went wrong!
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            asChild
            aria-label="Go Back Home"
            className=""
            variant="secondary"
          >
            <Link href="/">Try Again</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
