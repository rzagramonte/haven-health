import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Scheduler() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="bg-card-2 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold">Schedule Appointment</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <CardDescription>
            Book your next appointment in just a few clicks.
          </CardDescription>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="bg-secondary w-full">
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
