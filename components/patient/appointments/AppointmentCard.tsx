'use client'

import { FileText, Stethoscope } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Appointments } from '@/lib/types/patient'

export default function AppointmentCard({
  appointments,
}: {
  appointments: Appointments[]
}) {
  const router = useRouter()
  const handleClickSummary = (id: number) => {
    router.push(`/patient/appointment/${id}#summary`)
  }
  const handleClickMedicalVisit = (id: number) => {
    router.push(`/patient/appointment/${id}#medical-visit`)
  }

  if (!appointments || !appointments.length) {
    return <p className="text-muted-foreground">No past appointments found.</p>
  }

  return appointments.map((appt, i) => {
    if (appt) {
      const date = new Date(appt.appointment_time as string)

      const month = date
        .toLocaleString('default', { month: 'short' })
        .toUpperCase()
      const day = date.getDate()
      const year = date.getFullYear()

      return (
        <Card key={i} className="w-full max-w-md mx-auto bg-card-2">
          <CardContent className="p-0">
            <div className="flex items-start gap-4 p-4 pb-3">
              <div className="flex flex-col items-center min-w-0 text-secondary">
                <div className="text-xs font-medium uppercase tracking-wide">
                  {month}
                </div>
                <div className="text-3xl font-bold leading-none">{day}</div>
                <div className="text-xsmt-1">{year}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1">
                  {appt.appointment_type}
                </h3>
                <p className="text-sm leading-relaxed">
                  {appt.provider}
                  <br />
                  Haven Health - Islip
                </p>
              </div>
            </div>
            <div className="border-t border-card-4">
              <Button
                variant="link"
                onClick={() => handleClickSummary(appt.id)}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 text-left transition-colors border-b border-card-4"
              >
                <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  View After Visit Summary
                </span>
              </Button>
              <Button
                variant="link"
                onClick={() => handleClickMedicalVisit(appt.id)}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 transition-colors"
              >
                <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  View all clinical notes
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }
  })
}
