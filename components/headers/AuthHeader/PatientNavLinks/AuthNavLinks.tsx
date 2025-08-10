import Link from 'next/link'

export default function LandingNavLinks() {
  return (
    <nav>
      <ul className="flex flex-row gap-x-6 list-none">
        <li>
          <Link href="/patient/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/patient/appointments">Appointments</Link>
        </li>
        <li>
          <Link href="/patient/provider-search">Providers</Link>
        </li>
      </ul>
    </nav>
  )
}
