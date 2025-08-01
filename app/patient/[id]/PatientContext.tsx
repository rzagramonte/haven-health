'use client'

import React, { createContext } from 'react'

import { Tables } from '@/lib/supabase/types'

export interface PatientContextProps {
  children: React.ReactNode
  patient: Tables<'patient'> | null
  appointment: Tables<'appointment_booking'> | null
  person: Tables<'person'> | null
  medicalVisit: Tables<'medical_visit'> | null
}

interface PatientContextType {
  patient: Tables<'patient'> | null
  appointment: Tables<'appointment_booking'> | null
  person: Tables<'person'> | null
  medicalVisit: Tables<'medical_visit'> | null
}
export const PatientContext = createContext<PatientContextType>({
  patient: null,
  appointment: null,
  person: null,
  medicalVisit: null,
})

export default function PatientContextProvider({
  children,
  patient,
  appointment,
  person,
  medicalVisit,
}: PatientContextProps) {
  return (
    <PatientContext.Provider
      value={{ patient, appointment, person, medicalVisit }}
    >
      {children}
    </PatientContext.Provider>
  )
}
