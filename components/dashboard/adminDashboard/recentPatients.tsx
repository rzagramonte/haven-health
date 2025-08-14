import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const recentPatients = [
  {
    name: 'Alice Johnson',
    age: 34,
    lastVisit: '2 days ago',
    status: 'stable',
  },
  {
    name: 'Robert Smith',
    age: 45,
    lastVisit: '1 week ago',
    status: 'follow-up',
  },
  {
    name: 'Maria Garcia',
    age: 28,
    lastVisit: '3 days ago',
    status: 'stable',
  },
]

export function RecentPatients() {
  return (
    <Card className="bg-card-2 border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Patients</CardTitle>
        <p className="text-sm text-muted-foreground">
          Patients who visited in the last week
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPatients.map((patient, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {patient.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-card-foreground">
                    {patient.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Age {patient.age} • {patient.lastVisit}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {patient.status}
                </Badge>
                <Button variant="ghost" size="sm" className="text-xs">
                  View Record
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
