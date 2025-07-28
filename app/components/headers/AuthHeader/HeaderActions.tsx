import { InboxIcon } from 'lucide-react'
import Link from 'next/link'

import { Patient, Provider } from '@/lib/types/auth'

import { UserDropdown } from './UserDropdown'

export interface HeaderActionsProps {
  provider?: Provider
  patient?: Patient
}

export default function HeaderActions({
  provider,
  patient,
}: HeaderActionsProps) {
  return (
    <div className="flex bg-inherit items-center">
      <Link href="/inbox" className="rounded-lg text-black px-5 py-2.5">
        <InboxIcon className="w-6 h-6" />
      </Link>
      {patient && <UserDropdown patient={patient} />}
      {provider && <UserDropdown provider={provider} />}
    </div>
  )
}
