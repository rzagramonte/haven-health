import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { ModeToggle } from '../components/LightDarkToggle'
import NavLinks from './navlinks/LandingNavLinks'

export default function PublicHeader() {
  return (
    <header className="flex flex-row justify-between m-2">
      <Image src="/icons/logo_dark.svg" alt="Logo" width="100" height="100" />
      <div className="flex flex-row justify-around mt-2 items-center gap-x-10">
        <NavLinks />
        <ModeToggle />
        <div className="flex flex-row gap-x-5 ">
          <Button variant="default">Register</Button>
          <Button variant="secondary">Log In</Button>
        </div>
      </div>
    </header>
  )
}
