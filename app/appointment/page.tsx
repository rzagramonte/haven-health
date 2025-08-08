import BookingForm from '@/components/appointment/BookingForm'
import ProviderCard from '@/components/providers/ProviderCard'
import { getProvider } from '@/server/provider/queries'

export default async function AppointmentsPage() {
  const provider = await getProvider()

  if (!provider) {
    return <p>No Provider Found</p>
  }

  return (
    <div>
      <h2 className="p-2 text-lg font-semibold mb-4">Appointment Scheduler</h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] p-6 gap-6">
        <div className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">
          <ProviderCard provider={provider} />
        </div>
        <BookingForm />
      </div>
    </div>
  )
}
