'use client'
import { useReducer } from 'react'
import type { IconType } from 'react-icons'
import { FaEdit, FaPhone, FaUser, FaUserFriends } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { GiCancel } from 'react-icons/gi'
import { MdAlternateEmail } from 'react-icons/md'
import { RiContactsBookFill } from 'react-icons/ri'
import { VscSaveAs } from 'react-icons/vsc'

import { CardAction, CardContent } from '@/components/ui/card'

import { Button } from '../ui/button'
import EditableBooleanField from './editableBooleanField'
import EditableEmergencyContactField, {
  EmergencyContact,
} from './editableEmergencyContactField'
import EditableStringField from './editableStringField'

type EditableValue = string | boolean | EmergencyContact | null

type EditAction =
  | { type: 'EDIT'; key: string; value: EditableValue }
  | { type: 'UPDATE'; value: EditableValue }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }

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

export default function EditProviderProfile() {
  const [editState, editDispatch] = useReducer(editProfileReducer, {
    providerDetails: providerDummyData,
    editingKey: null,
    editableValue: null,
  })

  return (
    <CardContent className="flex flex-col items-center">
      <ul className=" w-full max-w-[350px] flex flex-col gap-3">
        {editState.providerDetails.map(({ key, label, value, icon: Icon }) => (
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
                {key === 'emergencyContact' && (
                  <EditableEmergencyContactField
                    value={
                      editState.editingKey === key &&
                      typeof editState.editableValue === 'object'
                        ? editState.editableValue
                        : (value as EmergencyContact)
                    }
                    editing={editState.editingKey === key}
                    onUpdate={(val) =>
                      editDispatch({ type: 'UPDATE', value: val })
                    }
                  />
                )}
                {key === 'newPatients' && (
                  <EditableBooleanField
                    value={
                      editState.editingKey === key &&
                      typeof editState.editableValue === 'boolean'
                        ? editState.editableValue
                        : (value as boolean)
                    }
                    editing={editState.editingKey === key}
                    onUpdate={(val) =>
                      editDispatch({ type: 'UPDATE', value: val })
                    }
                  />
                )}
                {key !== 'emergencyContact' && key !== 'newPatients' && (
                  <EditableStringField
                    value={
                      editState.editingKey === key &&
                      typeof editState.editableValue === 'string'
                        ? editState.editableValue
                        : (value as string)
                    }
                    editing={editState.editingKey === key}
                    onUpdate={(val) =>
                      editDispatch({ type: 'UPDATE', value: val })
                    }
                  />
                )}
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
