import Image from 'next/image'
import Link from 'next/link'

import PatientNavLinks from '@/components/headers/AuthHeader/PatientNavLinks/AuthNavLinks'
import ProviderNavLinks from '@/components/headers/AuthHeader/ProviderNavLinks/AuthNavLinks'
import { Person } from '@/lib/types/auth'

import { ModeToggle } from '../components/LightDarkToggle'
import { MobileHeader } from '../components/MobileHeader'
import HeaderActions from './HeaderActions'

export interface AuthHeader {
  person: Person
}

export default function AuthHeader({ person }: AuthHeader) {
  const NavComponent =
    person?.role == 'provider' ? ProviderNavLinks : PatientNavLinks
  return (
    <>
      <header className="hidden md:flex justify-between items-center px-6 py-3">
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
        <div className="flex justify-around items-center gap-x-10">
          <NavComponent />
          <div className="flex items-center gap-x-1">
            <ModeToggle />
            <HeaderActions person={person} />
          </div>
        </div>
      </header>
      <div className="md:hidden">
        <MobileHeader person={person} />
      </div>
    </>
  )
}
