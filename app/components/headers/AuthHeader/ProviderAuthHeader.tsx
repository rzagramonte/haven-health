import Image from 'next/image'

import { ModeToggle } from '../components/LightDarkToggle'
import HeaderActions from './HeaderActions'
import NavLinks from './navlinks/AuthNavLinks'

export default function ProviderAuthHeader() {
  //if role === 'provider'
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
        <HeaderActions />
      </div>
    </header>
  )
}
