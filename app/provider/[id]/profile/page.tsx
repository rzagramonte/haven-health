import Link from 'next/link'
import { FaHandHoldingMedical } from 'react-icons/fa'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import EditProviderProfile from '@/components/ui/provider/editProviderProfile'
import { getCurrentUser } from '@/server/auth/queries'
import { getProviderAccountSettings } from '@/server/provider/queries'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  console.log('current provider id:', id)

  const userData = await getCurrentUser()

  console.log('get current user data:', userData)

  if (!userData.data) {
    console.log('user data check failed')
    return <p>User Data not Found</p>
  }

  const providerData = await getProviderAccountSettings(userData.data?.id)

  console.log('provider data:', providerData)

  if (!providerData?.data) {
    console.log('user data check failed')
    return <p>User Data not Found</p>
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
              Back to Dashbooard
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
          <EditProviderProfile />
        </Card>
      </div>
    </main>
  )
}
