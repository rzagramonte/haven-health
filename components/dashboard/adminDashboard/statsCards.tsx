import { Calendar, Clock, Star } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const stats = [
  {
    title: "Today's Appointments",
    value: '24',
    subtitle: '3 pending confirmations',
    icon: Calendar,
    color: 'text-chart-1',
  },
  {
    title: 'Patient Average Wait Time',
    value: '5:29 minutes',
    subtitle: '+9% from last month',
    icon: Clock,
    color: 'text-chart-2',
  },
  {
    title: 'Patient Satisfaction',
    value: '4.8/5',
    subtitle: '+0.2 from last quarter',
    icon: Star,
    color: 'text-chart-3',
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.subtitle}
                  </p>
                </div>
                <div className={cn('p-2 rounded-lg bg-muted', stat.color)}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
