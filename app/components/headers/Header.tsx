import { Patient, Provider } from '@/lib/types/auth'
import { getCurrentPerson, getCurrentUser } from '@/server/auth/queries'

import PatientAuthHeader from './AuthHeader/PatientAuthHeader'
import ProviderAuthHeader from './AuthHeader/ProviderAuthHeader'
import PublicHeader from './PublicHeader/PublicHeader'

export default async function Header() {
  //put in a session here
  //return session ? AuthHeader: PublicHeader

  const user = await getCurrentUser()
  const person = await getCurrentPerson(user.data?.id ?? '')

  console.log('current user:', user)
  console.log('current person:', person)
  console.log('current person role:', person.data?.role)

  return (
    <div className="bg-background">
      {!person && <PublicHeader />}
      {person && person.data?.role === 'provider' && (
        <ProviderAuthHeader provider={person.data as Provider} />
      )}
      {person && person.data?.role === 'patient' && (
        <PatientAuthHeader patient={person.data as unknown as Patient} />
      )}
    </div>
  )
}
