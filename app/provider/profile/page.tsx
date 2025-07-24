'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { IconType } from 'react-icons'
import {
  FaEdit,
  FaHandHoldingMedical,
  FaPhone,
  FaUser,
  FaUserFriends,
} from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { MdAlternateEmail } from 'react-icons/md'
import { RiContactsBookFill } from 'react-icons/ri'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export type ProviderDetailsBlock = [
  { label: string; key: 'name'; value: string; icon: IconType },
  { label: string; key: 'phone'; value: string; icon: IconType },
  { label: string; key: 'email'; value: string; icon: IconType },
  { label: string; key: 'address'; value: string; icon: IconType },
  {
    label: string
    key: 'emergencyContact'
    value: {
      firstName: string
      lastName: string
      phone: string
    }
    icon: IconType
  },
  { label: string; key: 'newPatients'; value: boolean; icon: IconType },
]

const providerDummyData: ProviderDetailsBlock = [
  { label: 'Name & Title', key: 'name', value: 'Bob Ross M.D.', icon: FaUser },
  { label: 'Phone', key: 'phone', value: '(555) 555-5555', icon: FaPhone },
  {
    label: 'Email',
    key: 'email',
    value: 'provider@email.com',
    icon: MdAlternateEmail,
  },
  {
    label: 'Address',
    key: 'address',
    value: '123 Main St., Islip, NY 11751',
    icon: FaHouse,
  },
  {
    label: 'Emergency Contact',
    key: 'emergencyContact',
    value: {
      firstName: 'Jane',
      lastName: 'Ross',
      phone: '(555) 555-5555',
    },
    icon: RiContactsBookFill,
  },
  {
    label: 'Are you accepting new patients?',
    key: 'newPatients',
    value: true,
    icon: FaUserFriends,
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEditMode = () => {
    console.log(isEditing)
    setIsEditing((prev) => !prev)
  }

  return (
    <main className="flex-grow p-5">
      <div className="border-3 border-black w-full max-w-[110px]">
        <Avatar className="w-[100px] h-[100px] bg-background flex items-center justify-center">
          <FaHandHoldingMedical className="w-[60px] h-[60px] text-foreground" />
        </Avatar>
      </div>
      <h1>Provider Profile</h1>
      <div className="p-3 flex flex-col gap-1 items-center border-3 border-black">
        <div className=" w-full max-w-[500px]">
          <Link href="/provider/dashboard">
            <Button className="w-full max-w-[125px] text-xs cursor-pointer">
              Back to Dashbooard
            </Button>
          </Link>
        </div>
        <Card className="w-full max-w-[500px] bg-card">
          <CardHeader>
            <CardTitle>Provider Profile</CardTitle>
            <CardDescription>
              Where Provider Profile Details Live
            </CardDescription>
            <CardAction>
              <Button
                className="w-full max-w-[30px] h-full cursor-pointer"
                onClick={toggleEditMode}
              >
                <FaEdit className="w-full" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="border-1 border-black flex flex-col items-center">
            <ul className="flex flex-col gap-1">
              {providerDummyData.map(({ key, label, value, icon: Icon }) => (
                <li
                  key={key}
                  className="border-1 border-black flex items-center gap-2"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold">{label}</p>
                    {key === 'emergencyContact' && typeof value === 'object' ? (
                      <>
                        <p>
                          {value.firstName} {value.lastName}
                        </p>
                        <p>{value.phone}</p>
                      </>
                    ) : key === 'newPatients' ? (
                      <div className="flex gap-2">
                        <label htmlFor="yes-option">
                          {value ? ' Yes' : 'No'}
                        </label>
                        <input
                          type="radio"
                          name="choice"
                          value="yes"
                          checked={value}
                          id="yes-option"
                        />
                        <label htmlFor="no-option">
                          {value ? ' No' : 'Yes'}
                        </label>
                        <input
                          type="radio"
                          name="choice"
                          value="no"
                          checked={!value}
                          id="no-option"
                        />
                      </div>
                    ) : (
                      <p>{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
