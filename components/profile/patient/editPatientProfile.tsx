'use client'

import { useReducer, useTransition } from 'react'
import { FaEdit } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { VscSaveAs } from 'react-icons/vsc'

import LoadSpinner from '@/components/loading/Spinner'
import { Button } from '@/components/ui/button'
import { CardAction, CardContent } from '@/components/ui/card'
import type {
  EditAction,
  EditState,
  PatientDetails,
  PatientProfile,
  UpdatedValues,
} from '@/lib/types/patientProfile'
import { updatePatientProfile } from '@/server/patient/actions'
import { getFieldValue, transformPatientProfile } from '@/utils/patient'
import { showError, showSuccess } from '@/utils/toast'

import AddressField from './AddressField'
import EmergencyContactField from './EmergencyContactField'
import InsuredRadio from './InsuredRadio'
import NameField from './NameField'
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

interface PatientProfileProps {
  patientDetails: PatientProfile
  userId: string
}

export default function EditPatientProfile({
  patientDetails,
  userId,
}: PatientProfileProps) {
  const [isPending, startTransition] = useTransition()

  const [editState, editDispatch] = useReducer(editProfileReducer, {
    patientId: patientDetails.id,
    patientDetails: transformPatientProfile(patientDetails),
    editingKey: null,
    editableValue: null,
  })

  const handleSubmit = () => {
    const updatedValues: UpdatedValues = {
      authId: userId,
      patientId: patientDetails.id,
      key: editState.editingKey,
      updatedValue: editState.editableValue,
    }

    startTransition(async () => {
      const response = await updatePatientProfile(updatedValues)
      if (response.success) {
        showSuccess(response.message)
      } else {
        showError(response.message)
      }
      editDispatch({ type: 'SAVE' })
    })
  }

  return (
    <CardContent>
      <ul>
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
                    case 'name':
                      return (
                        <NameField
                          value={getFieldValue(key, editState, value)}
                          editing={editState.editingKey === key}
                          onUpdate={(val) =>
                            editDispatch({ type: 'UPDATE', value: val })
                          }
                        />
                      )
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
                    case 'insuranceFlag':
                      return (
                        <InsuredRadio
                          value={getFieldValue(key, editState, value)}
                          editing={editState.editingKey === key}
                          onUpdate={(val) =>
                            editDispatch({ type: 'UPDATE', value: val })
                          }
                        />
                      )
                    default:
                      return (
                        <StringField
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
              {editState.editingKey === key ? (
                <div className="flex gap-1">
                  <Button
                    onClick={() => editDispatch({ type: 'CANCEL' })}
                    disabled={isPending}
                  >
                    <GiCancel />
                  </Button>
                  <Button onClick={handleSubmit} disabled={isPending}>
                    {isPending ? <LoadSpinner /> : <VscSaveAs />}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => editDispatch({ type: 'EDIT', key, value })}
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
