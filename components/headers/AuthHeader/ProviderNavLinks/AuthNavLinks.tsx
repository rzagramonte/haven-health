import Link from 'next/link'

export default function LandingNavLinks() {
  return (
    <nav>
      <ul className="flex flex-row gap-x-6 list-none">
        <li>
          <Link href="/provider/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/provider/schedule">Calendar</Link>
        </li>
        <li>
          <Link href="/provider/patient-search">Patients</Link>
        </li>
      </ul>
    </nav>
  )
}
