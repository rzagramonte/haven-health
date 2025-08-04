'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import NavLinks from '@/components/headers/PublicHeader/navlinks/LandingNavLinks'
import { Button } from '@/components/ui/button'

import { ModeToggle } from '../components/LightDarkToggle'

export const PublicMobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="flex justify-between items-center px-4 py-2">
        <Image src="/icons/logo_dark.svg" alt="Logo" width="100" height="100" />
        <div className="flex items-center gap-x-4">
          <ModeToggle />
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle navigation menu"
            className="text-2xl"
          >
            ☰
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-30"
        />
      )}

      <nav
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background p-6 shadow-lg z-40
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div
          className="flex flex-col items-center gap-y-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <NavLinks className="flex flex-col items-center gap-y-2" />
          <div className="flex flex-col gap-y-2 w-full pt-4 mt-4 border-t">
            <Link href="/signup">
              <Button className="w-full">Register</Button>
            </Link>
            <Link href="/login">
              <Button className="w-full" variant="secondary">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
