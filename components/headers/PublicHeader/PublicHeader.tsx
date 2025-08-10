import Image from 'next/image'
import Link from 'next/link'

import { MobileHeader } from '@/components/headers/components/MobileHeader'
import { Button } from '@/components/ui/button'

import { ModeToggle } from '../components/LightDarkToggle'
import NavLinks from './navlinks/LandingNavLinks'

export default function PublicHeader() {
  return (
    <>
      <header className="hidden lg:flex bg-background justify-between px-6 py-3">
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
        <div className="flex flex-row justify-between items-center gap-x-10">
          <NavLinks />

          <div className="flex gap-x-5">
            <ModeToggle />
            <Link href="/login">
              <Button className="cursor-pointer" variant="default">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                className="cursor-pointer border border-primary"
                variant="outline"
              >
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
