import Link from 'next/link'
import { FaHandHoldingMedical } from 'react-icons/fa'

import { EditPatientProfile } from '@/components/profile/patient/editPatientProfile'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getPatientProfile } from '@/server/patient/queries'

export default async function ProfilePage() {
  const userData = await getPatientProfile()
  if (!userData) {
    return (
      <main className="flex-grow p-5 text-center">
        <h1>Profile Not Found</h1>
        <p>
          We could not load the patient profile. Please ensure you are logged
          in.
        </p>
      </main>
    )
  }

  const formattedProfile = {
    ...userData,
    address: userData.address
      ? {
          streetA: userData.address.streeta,
          streetB: userData.address.streetb,
          city: userData.address.city,
          state: userData.address.state,
          zipCode: userData.address.zip, // Map 'zip' to 'zipCode'
        }
      : null,
  }

  return (
    <main className="flex-grow p-5">
      <div className="w-full max-w-[110px]">
        <Avatar className="w-[100px] h-[100px] bg-background flex items-center justify-center">
          <FaHandHoldingMedical className="w-[60px] h-[60px] text-foreground" />
        </Avatar>
      </div>
      <h1>Patient Profile</h1>
      <div className="p-3 flex flex-col gap-1 items-center">
        <div className=" w-full max-w-[500px]">
          <Link href="/patient/dashboard">
            <Button className="w-full max-w-[125px] text-xs cursor-pointer">
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <Card className="w-full max-w-[500px] bg-card">
          <CardHeader>
            <CardTitle>Patient Profile</CardTitle>
            <CardDescription>
              Where Patient Profile Details Live
            </CardDescription>
          </CardHeader>
          <EditPatientProfile profile={formattedProfile} />
        </Card>
      </div>
    </main>
  )
}
