import Image from 'next/image'

import { Person } from '@/lib/types/auth'

import { ModeToggle } from '../components/LightDarkToggle'
import { MobileHeader } from '../components/MobileHeader'
import HeaderActions from './HeaderActions'
import NavLinks from './ProviderNavLinks/AuthNavLinks'

export interface AuthHeader {
  person: Person
}

export default function AuthHeader({ person }: AuthHeader) {
  return (
    <>
      <header className="hidden md:flex bg-background justify-between m-2">
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
        <div className="flex justify-around mt-2 items-center gap-x-10">
          <NavLinks />
          <div className="flex gap-x-5 ">
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
