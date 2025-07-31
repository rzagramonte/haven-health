'use client'

import { useContext } from 'react'

import { PatientContext } from '../../PatientContext'

export default function Page() {
  const patient = useContext(PatientContext)

  console.log('current patient in medical record page:', patient)

  return <h2>Patient Details Medical Record</h2>
}
