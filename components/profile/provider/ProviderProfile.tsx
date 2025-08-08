'use client'
import { useReducer } from 'react'
import { useTransition } from 'react'
import { FaEdit } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { VscSaveAs } from 'react-icons/vsc'

import { CardAction, CardContent } from '@/components/ui/card'
import type {
  EditAction,
  EditState,
  ProviderDetails,
  ProviderProfile,
} from '@/lib/types/provider'
import { UpdatedValues } from '@/lib/types/provider'
import { updateProviderProfile } from '@/server/provider/actions'
import { getFieldValue, transformProviderProfile } from '@/utils/provider'
import { showError, showSuccess } from '@/utils/toast'

import LoadSpinner from '../../loading/Spinner'
import { Button } from '../../ui/button'
import NameField from './NameField'
import NewPatientField from './NewPatientField'
import StringField from './StringField'

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

interface ProviderProfileProps {
  providerDetails: ProviderProfile
  userId: string
}

export default function ProviderProfile({
  providerDetails,
  userId,
}: ProviderProfileProps) {
  const [editState, editDispatch] = useReducer(editProfileReducer, {
    providerId: providerDetails.id,
    providerDetails: transformProviderProfile(providerDetails),
    editingKey: null,
    editableValue: null,
  })

  const [isPending, startTransition] = useTransition()

  const handleSubmit = (editState: EditState) => {
    const updatedValues: UpdatedValues = {
      authId: userId,
      providerId: providerDetails.id,
      key: editState.editingKey,
      updatedValue: editState.editableValue,
    }

    startTransition(async () => {
      const response = await updateProviderProfile(updatedValues)

      if (response.success) {
        showSuccess(response.message)
      } else {
        showError(
          response.message || 'Something went wrong in updating your settings',
        )
      }

      editDispatch({ type: 'SAVE' })
    })
  }

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
                {key === 'newPatients' && (
                  <NewPatientField
                    value={getFieldValue(key, editState, value)}
                    editing={editState.editingKey === key}
                    onUpdate={(val) =>
                      editDispatch({ type: 'UPDATE', value: val })
                    }
                  />
                )}

                {key === 'name' && (
                  <NameField
                    value={getFieldValue(key, editState, value)}
                    editing={editState.editingKey === key}
                    onUpdate={(val) =>
                      editDispatch({ type: 'UPDATE', value: val })
                    }
                  />
                )}
                {(key === 'phone' || key === 'email') && (
                  <StringField
                    value={getFieldValue(key, editState, value)}
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
                    onClick={() => handleSubmit(editState)}
                  >
                    {isPending ? <LoadSpinner /> : <VscSaveAs />}
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
