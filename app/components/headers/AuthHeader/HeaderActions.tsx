import { InboxIcon } from 'lucide-react'
import Link from 'next/link'

import { UserDropdown } from './UserDropdown'

export default function HeaderActions() {
  return (
    <div className="flex bg-inherit items-center gap-x-5">
      <Link href="/inbox" className="rounded-lg text-black px-5 py-2.5">
        <InboxIcon className="w-6 h-6" />
      </Link>
      <UserDropdown />
    </div>
  )
}
