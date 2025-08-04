import Link from 'next/link'
import { Suspense } from 'react'
import { FaHandHoldingMedical } from 'react-icons/fa'

import ProfileSkeleton from '@/components/loading/ProfileSkeleton'
import EditProviderProfile from '@/components/provider/editProviderProfile'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCurrentUser } from '@/server/auth/queries'
import { getProviderAccountSettings } from '@/server/provider/queries'

export default async function ProfilePage() {
  const userData = await getCurrentUser()

  console.log('current user profile page:', userData.data)

  if (!userData.data?.id || !userData.data?.email) {
    throw new Error('User data is incomplete')
  }

  // || !userData.data.phone

  console.log('user:', userData.data)

  const providerData = await getProviderAccountSettings(
    userData.data?.id,
    userData.data?.email,
    userData.data?.phone,
  )

  if (!providerData?.data) {
    throw new Error('User data is incomplete')
  }

  return (
    <main className="flex-grow p-5">
      <div className="w-full max-w-[110px]">
        <Avatar className="w-[100px] h-[100px] bg-background flex items-center justify-center">
          <FaHandHoldingMedical className="w-[60px] h-[60px] text-foreground" />
        </Avatar>
      </div>
      <h1>Provider Profile</h1>
      <div className="p-3 flex flex-col gap-1 items-center">
        <div className=" w-full max-w-[500px]">
          <Link href="/provider/dashboard">
            <Button className="w-full max-w-[125px] text-xs cursor-pointer">
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <Card className="w-full max-w-[500px] bg-card">
          <CardHeader>
            <CardTitle>Provider Profile</CardTitle>
            <CardDescription>
              Where Provider Profile Details Live
            </CardDescription>
          </CardHeader>
          <Suspense fallback={<ProfileSkeleton />}>
            <EditProviderProfile
              providerDetails={providerData.data}
              userId={userData.data?.id}
            />
          </Suspense>
        </Card>
      </div>
    </main>
  )
}
