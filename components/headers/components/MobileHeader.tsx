'use client'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import PatientNavLinks from '@/components/headers/AuthHeader/PatientNavLinks/MobileNavLinks'
import ProviderNavLinks from '@/components/headers/AuthHeader/ProviderNavLinks/MobileNavLinks'
import PublicNavLinks from '@/components/headers/PublicHeader/navlinks/MobileNavLinks'
import { Button } from '@/components/ui/button'
import type { Person } from '@/lib/types/auth'

import HeaderActions from '../AuthHeader/HeaderActions'
import { ModeToggle } from '../components/LightDarkToggle'

type MobileHeaderProps = {
  person?: Person
}

const MobileHeader = ({ person }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const NavComponent =
    person?.role == 'provider'
      ? ProviderNavLinks
      : person?.role == 'patient'
        ? PatientNavLinks
        : PublicNavLinks

  return (
    <>
      <header className="flex justify-between px-6 py-3">
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
        <div className="flex items-center gap-x-1">
          <ModeToggle />
          {person && <HeaderActions person={person} />}
          <Button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle navigation menu"
            variant="outline"
            className="drop-shadow-sm hover:drop-shadow-accent hover:border-accent"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-30"
        />
      )}

      <nav
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-muted p-6 drop-shadow-lg z-40
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div
          className="flex flex-col items-center gap-y-6"
          onClick={() => setIsMenuOpen(false)}
        >
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

          <NavComponent />

          {!person && (
            <div className="flex justify-center gap-3 w-full pt-4 mt-2 border-t">
              <Button asChild className="w-1/4" variant="default">
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                asChild
                className="w-1/4 border border-primary"
                variant="outline"
              >
                <Link href="/signup">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export { MobileHeader }
