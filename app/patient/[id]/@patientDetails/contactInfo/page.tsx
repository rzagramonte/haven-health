'use client'

import { useContext } from 'react'

import { PatientContext } from '../../PatientContext'

export default function Page() {
  const { patient, appointment } = useContext(PatientContext)

  console.log('contact info current patient:', patient)
  console.log('contact info current appointment:', appointment)

  return <h2>Patient Details Contact Info</h2>
}
