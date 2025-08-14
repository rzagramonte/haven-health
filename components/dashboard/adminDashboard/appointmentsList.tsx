import { Eye } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const appointments = [
  {
    id: 1,
    patient: 'Dr. Sarah Johnson',
    type: 'Consultation',
    time: '9:00 AM',
    status: 'confirmed',
  },
  {
    id: 2,
    patient: 'Michael Chen',
    type: 'Follow-up',
    time: '10:30 AM',
    status: 'pending',
  },
  {
    id: 3,
    patient: 'Emma Wilson',
    type: 'Check-up',
    time: '2:00 PM',
    status: 'confirmed',
  },
  {
    id: 4,
    patient: 'James Brown',
    type: 'Consultation',
    time: '3:30 PM',
    status: 'cancelled',
  },
  {
    id: 5,
    patient: 'Dingus Mingus',
    type: 'Consultation',
    time: '4:30 PM',
    status: 'confirmed',
  },
]

const statusColors = {
  confirmed: 'bg-chart-2 text-white',
  pending: 'bg-chart-4 text-foreground',
  cancelled: 'bg-destructive text-destructive-foreground',
}

export function AppointmentsList() {
  return (
    <Card className="bg-card-2 border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          {"Today's Appointments"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage appointments for today
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {appointment.patient
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-card-foreground">
                    {appointment.patient}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.type} • {appointment.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    statusColors[
                      appointment.status as keyof typeof statusColors
                    ]
                  }
                >
                  {appointment.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
