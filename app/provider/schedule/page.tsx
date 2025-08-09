import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import TodaysAppointmentsTable from './todaysAppointmentsTable'
import WeeklyAppointmentsTable from './weeklyAppointmentsTable'
import { getWeekRange } from './weeklyAppointmentsTable'

export default function SchedulePage() {
  const today = new Date()
  const todaysDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const weekRange = getWeekRange()

  return (
    <main className="my-32">
      <Tabs defaultValue="daily" className="place-self-center min-w-3xl">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="bg-card-3">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>{todaysDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <TodaysAppointmentsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly" className="bg-card-3">
          <Card>
            <CardHeader>
              <CardTitle>This Week&apos;s Schedule</CardTitle>
              <CardDescription>{weekRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklyAppointmentsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
