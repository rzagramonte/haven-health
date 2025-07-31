'use client'

import React, { createContext } from 'react'

import { Tables } from '@/lib/supabase/types'

export interface PatientContextProps {
  children: React.ReactNode
  patient: Tables<'patient'> | null
}

type PatientContextType = Tables<'patient'> | null
export const PatientContext = createContext<PatientContextType>(null)

export default function PatientContextProvider({
  children,
  patient,
}: PatientContextProps) {
  return (
    <PatientContext.Provider value={patient}>
      {children}
    </PatientContext.Provider>
  )
}
