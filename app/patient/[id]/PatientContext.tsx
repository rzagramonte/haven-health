'use client'

import React, { createContext } from 'react'

import { Tables } from '@/lib/supabase/types'

export interface PatientContextProps {
  children: React.ReactNode
  patient: Tables<'patient'> | null
  appointment: Tables<'appointment_booking'> | null
}

interface PatientContextType {
  patient: Tables<'patient'> | null
  appointment: Tables<'appointment_booking'> | null
}
export const PatientContext = createContext<PatientContextType>({
  patient: null,
  appointment: null,
})

export default function PatientContextProvider({
  children,
  patient,
  appointment,
}: PatientContextProps) {
  return (
    <PatientContext.Provider value={{ patient, appointment }}>
      {children}
    </PatientContext.Provider>
  )
}
