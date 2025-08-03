'use client'
import { useReducer } from 'react'
import { useTransition } from 'react'
import { FaEdit } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { VscSaveAs } from 'react-icons/vsc'

import { CardAction, CardContent } from '@/components/ui/card'
import { UpdatedSettingValues } from '@/lib/types/provider'
import {
  EditableName,
  EditableValue,
  EditAction,
  EditState,
  ProviderAccountSettings,
  ProviderDetails,
} from '@/lib/types/provider'
import { updateProviderSettings } from '@/server/provider/actions'
import { transformProviderSettings } from '@/utils/provider'
import { showError, showSuccess } from '@/utils/toast'

import { Button } from '../button'
import EditableAddressField, { EditableAddress } from './editableAddressField'
import EditableBooleanField from './editableBooleanField'
import EditableEmergencyContactField, {
  EmergencyContact,
} from './editableEmergencyContactField'
import EditableNameField from './editableNameField'
import EditableStringField from './editableStringField'

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

interface ProviderProfileProps {
  providerDetails: ProviderAccountSettings
  userId: string
}

export default function EditProviderProfile({
  providerDetails,
  userId,
}: ProviderProfileProps) {
  console.log('provider details in provider profile:', providerDetails)
  const [editState, editDispatch] = useReducer(editProfileReducer, {
    providerId: providerDetails.id,
    providerDetails: transformProviderSettings(providerDetails),
    editingKey: null,
    editableValue: null,
  })

  const [isPending, startTransition] = useTransition()

  console.log('Use is pending:', isPending)

  const handleSubmit = (
    editKey: string | null,
    editableValue: EditableValue,
  ) => {
    const settings: UpdatedSettingValues = {
      authId: userId,
      providerId: providerDetails.id,
      settingKey: editKey,
      settingValue: editableValue,
    }

    startTransition(async () => {
      console.log('start transition called and update provider queued')

      const response = await updateProviderSettings(settings)

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
                {key === 'emergencyContact' && (
                  <EditableEmergencyContactField
                    value={
                      editState.editingKey === key &&
                      typeof editState.editableValue === 'object' &&
                      editState.editableValue !== null &&
                      'phone' in editState.editableValue
                        ? editState.editableValue
                        : (value as EmergencyContact)
                    }
                    editing={editState.editingKey === key}
                    onUpdate={(val) =>
                      editDispatch({ type: 'UPDATE', value: val })
                    }
                  />
                )}
                {key === 'address' && (
                  <EditableAddressField
                    value={
                      editState.editingKey === key &&
                      typeof editState.editableValue === 'object'
                        ? (editState.editableValue as EditableAddress)
                        : (value as EditableAddress)
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

                {key === 'name' && (
                  <EditableNameField
                    value={
                      editState.editingKey === key &&
                      typeof editState.editableValue === 'object'
                        ? (editState.editableValue as EditableName)
                        : (value as EditableName)
                    }
                    editing={editState.editingKey === key}
                    onUpdate={(val) =>
                      editDispatch({ type: 'UPDATE', value: val })
                    }
                  />
                )}
                {key !== 'emergencyContact' &&
                  key !== 'newPatients' &&
                  key !== 'address' &&
                  key !== 'name' && (
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
                    onClick={() =>
                      handleSubmit(
                        editState.editingKey,
                        editState.editableValue,
                      )
                    }
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
