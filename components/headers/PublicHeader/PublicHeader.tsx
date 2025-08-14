import Image from 'next/image'
import Link from 'next/link'

import { MobileHeader } from '@/components/headers/components/MobileHeader'
import { Button } from '@/components/ui/button'

import { ModeToggle } from '../components/LightDarkToggle'
import NavLinks from './navlinks/LandingNavLinks'

export default function PublicHeader() {
  return (
    <>
      <header className="hidden lg:flex bg-background justify-between items-center px-6 py-3 border border-b">
        <Link href="/" aria-label="Go to Homepage">
          <Image
            src="/icons/logo.svg"
            alt="Haven Health"
            width={200}
            height={32}
            className="block dark:hidden"
          />
          <Image
            src="/icons/logo_dark.svg"
            alt="Haven Health"
            width={200}
            height={32}
            className="hidden dark:block"
          />
        </Link>
        <div className="flex flex-row justify-between items-center gap-x-10">
          <NavLinks />

          <div className="flex gap-x-5">
            <ModeToggle />
            <Link href="/login">
              <Button variant="default">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button className="border border-primary" variant="outline">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="lg:hidden">
        <MobileHeader />
      </div>
    </>
  )
}
