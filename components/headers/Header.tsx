import { getCurrentPerson, getCurrentUser } from '@/server/auth/queries'

import AuthHeader from './AuthHeader/AuthHeader'
import PublicHeader from './PublicHeader/PublicHeader'

export default async function Header() {
  const user = await getCurrentUser()

  if (!user.data) {
    return (
      <div>
        {!user.success && (
          <p className="text-destructive text-sm mt-4 text-center">
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
      <div>
        <p className="text-destructive text-sm mt-4 text-center">
          {person.message}
        </p>
        <PublicHeader />
      </div>
    )
  }

  return (
    <div>
      {person.data?.role && <AuthHeader person={person.data} />}
      {!person.data?.role && (
        <div>
          <p className="text-destructive text-sm ">
            Your role is not recognized. Please contact support.
          </p>
          <PublicHeader />
        </div>
      )}
    </div>
  )
}
