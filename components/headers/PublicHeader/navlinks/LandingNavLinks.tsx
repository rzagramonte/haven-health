import Link from 'next/link'

export default function LandingNavLinks({ className }: { className?: string }) {
  return (
    <nav>
      <ul className={className || 'flex flex-row gap-x-6 list-none'}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  )
}
