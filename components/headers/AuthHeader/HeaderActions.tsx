import { InboxIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Person, Role } from '@/lib/types/auth'

import { UserDropdown } from './UserDropdown'

export interface HeaderActionsProps {
  person: Person
}

export default function HeaderActions({ person }: HeaderActionsProps) {
  const personInbox =
    person.role === Role.patient ? '/patient/inbox' : '/provider/inbox'

  return (
    <div className="flex justify-between gap-x-1">
      <Link href={personInbox}>
        <Button variant="ghost">
          <InboxIcon className="size-5" />
        </Button>
      </Link>
      <UserDropdown person={person} />
    </div>
  )
}
