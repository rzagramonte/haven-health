import { Appointment } from '@/lib/types/patient'

export function normalizeTS(s: string) {
  // Fix Postgres format "YYYY-MM-DD HH:MM:SS+00"
  let t = s.replace(' ', 'T')
  t = t.replace(/([+-]\d{2})(\d{2})$/, '$1:$2')
  return t.replace(/\+00:00$/, 'Z')
}

export function toDate(s: string) {
  return new Date(normalizeTS(s))
}

export function splitAppointments(appts: Appointment[]) {
  const valid = appts.filter((a) => a?.appointment_time)
  const now = Date.now()

  const upcoming = valid
    .filter((a) => toDate(a.appointment_time!).getTime() >= now)
    .sort(
      (a, b) =>
        toDate(a.appointment_time!).getTime() -
        toDate(b.appointment_time!).getTime(),
    )

  const past = valid
    .filter((a) => toDate(a.appointment_time!).getTime() < now)
    .sort(
      (a, b) =>
        toDate(b.appointment_time!).getTime() -
        toDate(a.appointment_time!).getTime(),
    )

  return { upcoming, past }
}
