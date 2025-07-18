import Logo from './Logo'
import NavLinks from './NavLinks'

export default function Header() {
  return (
    <header>
      <Logo />
      <NavLinks />
      <button> Register</button>
      <button> Log In</button>
    </header>
  )
}
