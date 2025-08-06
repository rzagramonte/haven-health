import Image from 'next/image'

import { Person } from '@/lib/types/auth'

import { ModeToggle } from '../components/LightDarkToggle'
import { MobileHeader } from '../components/MobileHeader'
import HeaderActions from './HeaderActions'
import NavLinks from './ProviderNavLinks/AuthNavLinks'

export interface PatientAuthProps {
  person: Person
}

export default function PatientAuthHeader({ person }: PatientAuthProps) {
  return (
    <>
      <header className="hidden md:flex bg-background justify-between m-2">
        <Image src="/icons/logo.svg" alt="Logo" width="100" height="100" />
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
