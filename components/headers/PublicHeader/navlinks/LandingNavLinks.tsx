import Link from 'next/link'

export default function LandingNavLinks() {
  return (
    <nav>
      <ul className="flex flex-row gap-x-6 list-none">
        <li className="hover:text-foreground/90">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-foreground/90">
          <Link href="/#services">Services</Link>
        </li>
        <li className="hover:text-foreground/90">
          <Link href="/#about">About</Link>
        </li>
        <li className="hover:text-foreground/90">
          <Link href="/#contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}
