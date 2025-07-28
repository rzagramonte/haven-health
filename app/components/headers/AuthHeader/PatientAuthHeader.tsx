import Image from 'next/image'

import { Patient } from '@/lib/types/auth'

import { ModeToggle } from '../components/LightDarkToggle'
import HeaderActions from './HeaderActions'
import NavLinks from './navlinks/AuthNavLinks'

export interface PatientAuthProps {
  patient: Patient
}

export default function PatientAuthHeader({ patient }: PatientAuthProps) {
  //if role === 'patient' this renders
  return (
    <header className="flex bg-[var(--background)] justify-between m-2">
      <Image
        src="/images/logo_placeholder.jpeg"
        alt="Logo"
        width="100"
        height="100"
      />
      <div className="flex justify-around mt-2 items-center gap-x-10">
        <NavLinks />
        <div className="flex gap-x-5 ">
          <ModeToggle />
          {patient && <HeaderActions patient={patient} />}
        </div>
      </div>
    </header>
  )
}
