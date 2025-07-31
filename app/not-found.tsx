'use client'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
        <div
          role="alert"
          className="relative bg-transparent inline-block w-[80vw]  max-w-[500px] aspect-[2/1]"
        >
          <Image src="/icons/googley-eyes.png" fill alt="googlyeye" />
        </div>
        <div className="text-center px-4 py-8 sm:px-2 sm:py-10">
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
            404, Page not found
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              aria-label="Go Back Home"
              className="cursor-pointer hover:bg-white hover:text-black"
              variant="secondary"
            >
              <Link href="/">Please Take Me Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
