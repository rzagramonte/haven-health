import Link from 'next/link'

export default function LandingNavLinks() {
  return (
    <nav>
      <ul className="flex flex-col items-center gap-y-2 mt-4">
        <li className="hover:text-foreground/90">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-foreground/90">
          <Link href="#services">Services</Link>
        </li>
        <li className="hover:text-foreground/90">
          <Link href="#about">About</Link>
        </li>
        <li className="hover:text-foreground/90">
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  )
}
