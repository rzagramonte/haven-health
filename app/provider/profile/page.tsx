'use client'

import Link from 'next/link'
import { useReducer } from 'react'
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
import { Input } from '@/components/ui/input'

export type ProviderDetails = [
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

type EditableValue =
  | string
  | boolean
  | {
      firstName: string
      lastName: string
      phone: string
    }

type EditAction =
  | { type: 'EDIT'; key: string; value: EditableValue }
  | { type: 'UPDATE'; value: EditableValue }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

type EditState = {
  providerDetails: ProviderDetails
  editingKey: string | null
  editableValue: EditableValue | null
}

const providerDummyData: ProviderDetails = [
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

const editProfileReducer = (
  state: EditState,
  action: EditAction,
): EditState => {
  switch (action.type) {
    case 'EDIT':
      return { ...state, editingKey: action.key, editableValue: action.value }

    case 'UPDATE':
      return { ...state, editableValue: action.value }

    // udpate provider details state based on matching item.key to state.editingKey
    case 'SAVE':
      if (!state.editingKey) {
        return state
      }
      return {
        ...state,
        providerDetails: state.providerDetails.map((item) =>
          item.key === state.editingKey
            ? { ...item, value: state.editableValue }
            : item,
        ) as ProviderDetails,
        editingKey: null,
        editableValue: null,
      }

    case 'CANCEL':
      return { ...state, editingKey: null, editableValue: null }

    default:
      return state
  }
}

export default function ProfilePage() {
  const [editState, editDispatch] = useReducer(editProfileReducer, {
    providerDetails: providerDummyData,
    editingKey: null,
    editableValue: null,
  })

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
          </CardHeader>
          <CardContent className="border-1 border-black flex flex-col items-center">
            <ul className="flex flex-col gap-1">
              {editState.providerDetails.map(
                ({ key, label, value, icon: Icon }) => (
                  <li
                    key={key}
                    className="border-1 border-black flex items-center justify-between gap-2 p-1"
                  >
                    <div className="flex gap-2">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-semibold">{label}</p>
                        {editState.editingKey === key &&
                          key === 'emergencyContact' &&
                          typeof editState.editableValue === 'object' && (
                            <>
                              <Input
                                className="bg-muted"
                                value={editState.editableValue?.firstName}
                                onChange={(e) => {
                                  if (
                                    typeof editState.editableValue ===
                                      'object' &&
                                    editState.editableValue != null
                                  ) {
                                    editDispatch({
                                      type: 'UPDATE',
                                      value: {
                                        ...editState.editableValue,
                                        firstName: e.target.value,
                                      },
                                    })
                                  }
                                }}
                              />
                              <Input
                                className="bg-muted"
                                value={editState.editableValue?.lastName}
                                onChange={(e) => {
                                  if (
                                    typeof editState.editableValue ===
                                      'object' &&
                                    editState.editableValue != null
                                  ) {
                                    editDispatch({
                                      type: 'UPDATE',
                                      value: {
                                        ...editState.editableValue,
                                        lastName: e.target.value,
                                      },
                                    })
                                  }
                                }}
                              />
                              <Input
                                className="bg-muted"
                                value={editState.editableValue?.phone}
                                onChange={(e) => {
                                  if (
                                    typeof editState.editableValue ===
                                      'object' &&
                                    editState.editableValue != null
                                  ) {
                                    editDispatch({
                                      type: 'UPDATE',
                                      value: {
                                        ...editState.editableValue,
                                        phone: e.target.value,
                                      },
                                    })
                                  }
                                }}
                              />
                            </>
                          )}
                        {editState.editingKey === key &&
                          key === 'newPatients' &&
                          typeof editState.editableValue === 'boolean' && (
                            <div className="flex gap-2">
                              <label htmlFor="yes-option">
                                {value ? ' Yes' : 'No'}
                              </label>
                              <input
                                type="radio"
                                name="choice"
                                value="yes"
                                checked={
                                  typeof editState.editableValue === 'boolean'
                                    ? editState.editableValue
                                    : value
                                }
                                id="yes-option"
                                onChange={(e) =>
                                  editDispatch({
                                    type: 'UPDATE',
                                    value: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="no-option">
                                {value ? ' No' : 'Yes'}
                              </label>
                              <input
                                type="radio"
                                name="choice"
                                value="no"
                                checked={
                                  typeof editState.editableValue === 'boolean'
                                    ? !editState.editableValue
                                    : !value
                                }
                                id="no-option"
                                onChange={(e) =>
                                  editDispatch({
                                    type: 'UPDATE',
                                    value: e.target.value,
                                  })
                                }
                              />
                            </div>
                          )}
                        {editState.editingKey === key &&
                          key !== 'emergencyContact' &&
                          key != 'newPatients' &&
                          typeof editState.editableValue === 'string' && (
                            <Input
                              className="bg-muted"
                              value={
                                typeof editState.editableValue === 'string'
                                  ? editState.editableValue
                                  : value
                              }
                              onChange={(e) =>
                                editDispatch({
                                  type: 'UPDATE',
                                  value: e.target.value,
                                })
                              }
                            />
                          )}
                        {editState.editingKey !== key &&
                          key === 'emergencyContact' &&
                          typeof value === 'object' && (
                            <>
                              <p>
                                {value.firstName} {value.lastName}
                              </p>
                              <p>{value.phone}</p>
                            </>
                          )}
                        {editState.editingKey !== key &&
                          key === 'newPatients' &&
                          typeof value === 'boolean' && (
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
                                readOnly
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
                                readOnly
                              />
                            </div>
                          )}
                        {editState.editingKey !== key &&
                          key !== 'emergencyContact' &&
                          key !== 'newPatients' && <p>{value}</p>}
                      </div>
                    </div>
                    <CardAction className="">
                      <Button
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          editDispatch({ type: 'EDIT', key: key, value: value })
                        }}
                      >
                        <FaEdit />
                      </Button>
                    </CardAction>
                  </li>
                ),
              )}
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
