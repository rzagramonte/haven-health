import Image from 'next/image'

import { Provider } from '@/lib/types/auth'

import { ModeToggle } from '../components/LightDarkToggle'
import HeaderActions from './HeaderActions'
import NavLinks from './navlinks/AuthNavLinks'

export interface ProviderAuthProps {
  provider: Provider
}

export default function ProviderAuthHeader({ provider }: ProviderAuthProps) {
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
        {provider && <HeaderActions provider={provider} />}
      </div>
    </header>
  )
}
