import { redirect } from 'next/navigation'

import BookingForm from '@/components/appointment/BookingForm'
import ProviderCard from '@/components/providers/ProviderCard'
import { getCurrentUser } from '@/server/auth/queries'
import { getProvider } from '@/server/provider/queries'

export default async function AppointmentsPage() {
  const user = await getCurrentUser()
  console.log(user)

  if (!user.data) {
    redirect('/login')
  }

  const provider = await getProvider()

  if (!provider) {
    return <p>No Provider Found</p>
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <h2 className="text-4xl font-semibold my-5">Appointment Scheduler</h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] p-6 gap-6">
        <div className="p-4 rounded-lg shadow-sm">
          <ProviderCard provider={provider} />
        </div>
        <BookingForm />
      </div>
    </div>
  )
}
