import { getCurrentPerson, getCurrentUser } from '@/server/auth/queries'

import PatientAuthHeader from './AuthHeader/PatientAuthHeader'
import ProviderAuthHeader from './AuthHeader/ProviderAuthHeader'
import PublicHeader from './PublicHeader/PublicHeader'

export default async function Header() {
  const user = await getCurrentUser()

  if (!user.data) {
    return (
      <div className="bg-background">
        {!user.success && (
          <p className="text-red-600 text-sm mt-4 text-center">
            {user.message}
          </p>
        )}
        <PublicHeader />
      </div>
    )
  }

  const person = await getCurrentPerson(user.data.id)

  if (!person.success) {
    return (
      <div className="bg-background">
        <p className="text-red-600 text-sm mt-4 text-center">
          {person.message}
        </p>
        <PublicHeader />
      </div>
    )
  }

  return (
    <div className="bg-background">
      {person.data?.role === 'provider' && (
        <ProviderAuthHeader person={person.data} />
      )}
      {person.data?.role === 'patient' && (
        <PatientAuthHeader person={person.data} />
      )}
      {!person.data?.role && (
        <div className="bg-background">
          <p className="text-red-600 text-sm mt-4">
            Your role is not recognized. Please contact support.
          </p>
          <PublicHeader />
        </div>
      )}
    </div>
  )
}
