'use client'
import { useReducer } from 'react'
import type { IconType } from 'react-icons'
import { FaEdit, FaPhone, FaUser, FaUserFriends } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { GiCancel } from 'react-icons/gi'
import { MdAlternateEmail } from 'react-icons/md'
import { RiContactsBookFill } from 'react-icons/ri'
import { VscSaveAs } from 'react-icons/vsc'

import AddressField from '@/components/profile/patient/AddressField'
import EmergencyContactField, {
  EmergencyContact,
} from '@/components/profile/patient/EmergencyContactField'
import { Button } from '@/components/ui/button'
import { CardAction, CardContent } from '@/components/ui/card'
import { Address } from '@/lib/types/auth'
import { getFieldValue } from '@/utils/helper'

import EditableBooleanField from './InsuredBooleanField'
import EditableStringField from './StringField'

type PatientProfile = {
  fullName: {
    firstName: string
    lastName: string
  }
  phone: string | null
  email: string | null
  address: Address | null
  emergencyContact: EmergencyContact | null
  insurance_flag: boolean
}

type EditableValue = string | boolean | Address | EmergencyContact | null

type EditAction =
  | { type: 'EDIT'; key: string; value: EditableValue }
  | { type: 'UPDATE'; value: EditableValue }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

export type PatientDetails = [
  { label: string; key: 'name'; value: string; icon: IconType },
  { label: string; key: 'phone'; value: string; icon: IconType },
  { label: string; key: 'email'; value: string; icon: IconType },
  { label: string; key: 'address'; value: Address; icon: IconType },
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
  { label: string; key: 'insuredFlag'; value: boolean; icon: IconType },
]

export type EditState = {
  patientDetails: PatientDetails
  editingKey: string | null
  editableValue: EditableValue | null
}

const editProfileReducer = (
  state: EditState,
  action: EditAction,
): EditState => {
  switch (action.type) {
    case 'EDIT':
      return { ...state, editingKey: action.key, editableValue: action.value }

    case 'UPDATE':
      return { ...state, editableValue: action.value }

    case 'SAVE':
      if (!state.editingKey) {
        return state
      }
      return {
        ...state,
        patientDetails: state.patientDetails.map((item) =>
          item.key === state.editingKey
            ? { ...item, value: state.editableValue }
            : item,
        ) as PatientDetails,
        editingKey: null,
        editableValue: null,
      }

    case 'CANCEL':
      return { ...state, editingKey: null, editableValue: null }

    default:
      return state
  }
}

export const EditPatientProfile = ({
  profile,
}: {
  profile: PatientProfile
}) => {
  const initialPatientDetails: PatientDetails = [
    {
      label: 'Name',
      key: 'name',
      value: `${profile.fullName.firstName} ${profile.fullName.lastName}`,
      icon: FaUser,
    },
    {
      label: 'Phone',
      key: 'phone',
      value: profile.phone || 'Not provided',
      icon: FaPhone,
    },
    {
      label: 'Email',
      key: 'email',
      value: profile.email || 'Not provided',
      icon: MdAlternateEmail,
    },
    {
      label: 'Address',
      key: 'address',
      value: {
        streetA: profile?.address?.streetA ?? '',
        streetB: profile?.address?.streetB ?? '',
        city: profile?.address?.city ?? '',
        state: profile?.address?.state ?? '',
        zipCode: profile?.address?.zipCode ?? '',
      },
      icon: FaHouse,
    },
    {
      label: 'Emergency Contact',
      key: 'emergencyContact',
      value: profile.emergencyContact || {
        firstName: '',
        lastName: '',
        phone: '',
      },
      icon: RiContactsBookFill,
    },
    {
      label: 'Are you currently insured?',
      key: 'insuredFlag',
      value: profile.insurance_flag,
      icon: FaUserFriends,
    },
  ]

  const [editState, editDispatch] = useReducer(editProfileReducer, {
    patientDetails: initialPatientDetails,
    editingKey: null,
    editableValue: null,
  })

  return (
    <CardContent className="flex flex-col items-center">
      <ul className=" w-full max-w-[350px] flex flex-col gap-3">
        {editState.patientDetails.map(({ key, label, value, icon: Icon }) => (
          <li
            key={key}
            className="flex items-center w-full justify-between gap-2 p-1 border-b-1 border-destructive"
          >
            <div className="flex gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-semibold">{label}</p>

                {(() => {
                  switch (key) {
                    case 'address':
                      return (
                        <AddressField
                          value={getFieldValue(key, editState, value)}
                          editing={editState.editingKey === key}
                          onUpdate={(val) =>
                            editDispatch({ type: 'UPDATE', value: val })
                          }
                        />
                      )

                    case 'emergencyContact':
                      return (
                        <EmergencyContactField
                          value={getFieldValue(key, editState, value)}
                          editing={editState.editingKey === key}
                          onUpdate={(val) =>
                            editDispatch({ type: 'UPDATE', value: val })
                          }
                        />
                      )

                    case 'insuredFlag':
                      return (
                        <EditableBooleanField
                          value={getFieldValue(key, editState, value)}
                          editing={editState.editingKey === key}
                          onUpdate={(val) =>
                            editDispatch({ type: 'UPDATE', value: val })
                          }
                        />
                      )

                    default:
                      if (value === 'Not provided') {
                        return <p className="text-foreground/50">{value}</p>
                      }
                      return (
                        <EditableStringField
                          value={getFieldValue(key, editState, value)}
                          editing={editState.editingKey === key}
                          onUpdate={(val) =>
                            editDispatch({ type: 'UPDATE', value: val })
                          }
                        />
                      )
                  }
                })()}
              </div>
            </div>
            <CardAction>
              {editState.editingKey === key && (
                <div className="flex gap-1">
                  <Button
                    className="w-6 h-6 cursor-pointer"
                    aria-label="Cancel edit"
                    onClick={() => {
                      editDispatch({ type: 'CANCEL' })
                    }}
                  >
                    <GiCancel />
                  </Button>
                  <Button
                    className="w-6 h-6 cursor-pointer"
                    aria-label="Save changes"
                    onClick={() => {
                      editDispatch({ type: 'SAVE' })
                    }}
                  >
                    <VscSaveAs />
                  </Button>
                </div>
              )}
              {editState.editingKey !== key && (
                <Button
                  className="w-6 h-6 cursor-pointer"
                  aria-label="Edit Field"
                  onClick={() => {
                    editDispatch({
                      type: 'EDIT',
                      key: key,
                      value: value,
                    })
                  }}
                >
                  <FaEdit />
                </Button>
              )}
            </CardAction>
          </li>
        ))}
      </ul>
    </CardContent>
  )
}
