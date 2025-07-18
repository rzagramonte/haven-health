import Image from 'next/image'
import NavLinks from './NavLinks'

export default function Header() {
  return (
    <header>
      <Image
        src="/images/logo_placeholder"
        alt="Logo"
        width="200"
        height="200"
      />
      <NavLinks />
      {/* <button> Register</button>
      <button> Log In</button> */}
    </header>
  )
}
