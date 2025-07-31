'use client'

import { CircleUserRoundIcon } from 'lucide-react'
import { useState } from 'react'

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg text-black px-5 py-2.5"
      >
        <CircleUserRoundIcon className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md p-2 z-50">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Account Settings
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Log Out
          </a>
        </div>
      )}
    </div>
  )
}
