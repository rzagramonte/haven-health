import { InboxIcon } from 'lucide-react'
import Link from 'next/link'

import { Person } from '@/lib/types/auth'

import { UserDropdown } from './UserDropdown'

export interface HeaderActionsProps {
  person: Person
}

export default function HeaderActions({ person }: HeaderActionsProps) {
  return (
    <div className="flex bg-inherit items-center">
      <Link href="/inbox" className="rounded-lg text-black px-5 py-2.5">
        <InboxIcon className="w-6 h-6" />
      </Link>
      <UserDropdown person={person} />
    </div>
  )
}
