export function generateAvailableTimeSlots(
  startHour = 9,
  endHour = 17,
  interval = 30,
): string[] {
  const slots: string[] = []
  const startMinutes = startHour * 60
  const endMinutes = endHour * 60

  for (let minutes = startMinutes; minutes < endMinutes; minutes += interval) {
    const hours24 = Math.floor(minutes / 60)
    const mins = minutes % 60

    // Convert to 12-hour format
    const hours12 = hours24 % 12 || 12
    const period = hours24 < 12 ? 'AM' : 'PM'

    slots.push(`${hours12}:${String(mins).padStart(2, '0')} ${period}`)
  }

  return slots
}
