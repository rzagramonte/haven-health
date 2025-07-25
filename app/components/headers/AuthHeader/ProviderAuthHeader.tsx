import Image from 'next/image'

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
      <div className="flex flex-row justify-around mt-2 items-center gap-x-10">
        <NavLinks />
        <HeaderActions />
      </div>
    </header>
  )
}
