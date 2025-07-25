import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function PatientFinder() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="bg-card-2 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold">Schedule Appointment</CardTitle>
        </CardHeader>
        <Input className="bg-white" />
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="bg-secondary w-full">
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
