import { FaHandHoldingMedical } from 'react-icons/fa'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function ProfilePage() {
  return (
    <main>
      <div className="border-3 border-black w-full max-w-[110px]">
        <Avatar className="w-[100px] h-[100px] bg-background flex items-center justify-center">
          <FaHandHoldingMedical className="w-[60px] h-[60px] text-foreground" />
        </Avatar>
      </div>
      <h1>Provider Profile</h1>

      <div className="p-3 flex flex-col gap-1 items-center border-3 border-black">
        <div className=" w-full max-w-[500px]">
          <Button className="w-full max-w-[125px] text-xs">
            Back to Dashbooard
          </Button>
        </div>
        <Card className="w-full max-w-[500px] bg-card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
