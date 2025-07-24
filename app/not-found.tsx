'use client'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
        <div role="alert" className="bg-transparent inline-block">
          <Image
            src="/icons/googley-eyes.png"
            width={500}
            height={500}
            alt="googlyeye"
          />
        </div>
        <div className="text-center border-1 border-black p-[2em] bg-card">
          <p className="text-base font-semibold text-accent">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              aria-label="Go Back Home"
              className="cursor-pointer hover:bg-white hover:text-black"
            >
              <Link href="/">Go Back Home</Link>
            </Button>
            <Button
              aria-label="Contact Support"
              variant="outline"
              className="cursor-pointer"
            >
              Contact Support <span aria-hidden="true">&rarr;</span>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
