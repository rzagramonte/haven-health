import Link from 'next/link'

export default function LandingNavLinks() {
  return (
    <nav>
      <ul className="flex flex-row gap-x-6 list-none m-2">
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/services">Calendar</Link>
        </li>
        <li>
          <Link href="/about">Services</Link>
        </li>
        <li>
          <Link href="/contact">Patients</Link>
        </li>
      </ul>
    </nav>
  )
}
