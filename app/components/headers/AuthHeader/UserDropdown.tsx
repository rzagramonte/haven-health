'use client'

import { CircleUserRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useTransition } from 'react'

import { Patient, Provider } from '@/lib/types/auth'
import { logOut } from '@/server/auth/actions'

export interface UserDropdownProps {
  provider?: Provider
  patient?: Patient
}

export const UserDropdown = ({ provider, patient }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleLogOut = () => {
    startTransition(async () => {
      await logOut()
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg text-black px-5 py-2.5"
      >
        <CircleUserRoundIcon className="h-6 w-6 cursor-pointer" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md p-2 z-50">
          <Link
            href={
              provider && !patient ? '/provider/profile' : '/patient/profile'
            }
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              Account Settings
            </button>
          </Link>
          <button
            onClick={handleLogOut}
            disabled={isPending}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {isPending ? 'Logging Out' : 'Log Out'}
          </button>
        </div>
      )}
    </div>
  )
}
