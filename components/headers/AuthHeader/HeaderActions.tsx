import { InboxIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Person } from '@/lib/types/auth'

import { UserDropdown } from './UserDropdown'

export interface HeaderActionsProps {
  person: Person
}

export default function HeaderActions({ person }: HeaderActionsProps) {
  return (
    <div className="flex justify-between gap-x-1">
      <Link href={`${person.role}/inbox`}>
        <Button variant="ghost">
          <InboxIcon className="size-5" />
        </Button>
      </Link>
      <UserDropdown person={person} />
    </div>
  )
}
