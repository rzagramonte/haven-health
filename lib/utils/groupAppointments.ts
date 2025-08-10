import { Appointment } from '@/lib/types/patient'

export function groupAppointmentsByTimeAgo(
  appointments: Appointment[] | null,
): Record<string, Appointment[]> {
  const now = new Date()
  const groups: Record<string, Appointment[]> = {}
  if (!appointments) {
    throw new Error('useFormField should be used within <FormField>')
  }

  for (const appt of appointments) {
    if (appt?.appointment_time) {
      const date = new Date(appt.appointment_time)
      const diffDays = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
      )

      let bucket = ''
      if (diffDays < 30) {
        bucket = 'This month'
      } else if (diffDays < 60) {
        bucket = '1 month ago'
      } else if (diffDays < 180) {
        bucket = '6 months ago'
      } else if (diffDays < 365) {
        bucket = '1 year ago'
      } else {
        bucket = `${Math.floor(diffDays / 365)} years ago`
      }

      if (!groups[bucket]) {
        groups[bucket] = []
      }
      groups[bucket].push(appt)
    }
  }

  return groups
}
