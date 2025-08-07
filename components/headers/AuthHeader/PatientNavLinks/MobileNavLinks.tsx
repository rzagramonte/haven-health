import Link from 'next/link'

export default function LandingNavLinks() {
  return (
    <nav>
      <ul className="flex flex-col items-center gap-y-2 mt-4">
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
