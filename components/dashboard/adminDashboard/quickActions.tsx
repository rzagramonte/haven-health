import {
  Calendar,
  FileText,
  MessageSquare,
  Pill,
  Search,
  UserPlus,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const quickActions = [
  {
    icon: UserPlus,
    title: 'New Patient',
    description: 'Register a new patient',
    color: 'text-chart-1',
  },
  {
    icon: Calendar,
    title: 'Schedule Appointment',
    description: 'Book a new appointment',
    color: 'text-chart-2',
  },
  {
    icon: Pill,
    title: 'Create Prescription',
    description: 'Write a new prescription',
    color: 'text-chart-3',
  },
  {
    icon: FileText,
    title: 'Medical Record',
    description: 'Add medical notes',
    color: 'text-chart-4',
  },
  {
    icon: Search,
    title: 'Patient Search',
    description: 'Find patient records',
    color: 'text-chart-5',
  },
  {
    icon: MessageSquare,
    title: 'Send Message',
    description: 'Contact patient or staff',
    color: 'text-primary',
  },
]

export function QuickActions() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Frequently used actions for faster workflow
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-accent/50 bg-transparent"
              >
                <Icon className={`w-5 h-5 ${action.color}`} />
                <div className="text-left">
                  <p className="font-medium text-sm text-card-foreground">
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
