export function generateAvailableTimeSlots(
  startHour = 9,
  endHour = 17,
  interval = 30,
): string[] {
  const slots: string[] = []
  const startMinutes = startHour * 60
  const endMinutes = endHour * 60

  for (let minutes = startMinutes; minutes < endMinutes; minutes += interval) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    slots.push(
      `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
    )
  }

  return slots
}
