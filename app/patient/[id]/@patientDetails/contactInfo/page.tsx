'use client'

import { useContext } from 'react'

import { PatientContext } from '../../PatientContext'

export default function Page() {
  const patient = useContext(PatientContext)

  console.log('contact info current patient:', patient)

  return <h2>Patient Details Contact Info</h2>
}
