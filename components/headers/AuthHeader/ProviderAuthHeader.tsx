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
        src="/images/logo_placeholder.jpeg"
        alt="Logo"
        width="100"
        height="100"
      />
      <div className="flex mt-2 gap-x-8 items-center">
        <NavLinks />
        <ModeToggle />
        <HeaderActions person={person} />
      </div>
    </header>
  )
}
