import Image from 'next/image'

import { Person } from '@/lib/types/auth'

import { ModeToggle } from '../components/LightDarkToggle'
import HeaderActions from './HeaderActions'
import NavLinks from './ProviderNavLinks/AuthNavLinks'

export interface ProviderAuthProps {
  person: Person
}

export default function ProviderAuthHeader({ person }: ProviderAuthProps) {
  return (
    <header className="flex justify-between m-2">
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
      <div className="flex mt-2 gap-x-8 items-center">
        <NavLinks />
        <ModeToggle />
        <HeaderActions person={person} />
      </div>
    </header>
  )
}
