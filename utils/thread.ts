import { createHash } from 'crypto'

export function generateThreadKey(args: {
  userId: number
  otherId: number
  context: string
  appointmentId?: number
  messageType?: string
}): string {
  const { userId, otherId, context, appointmentId, messageType } = args
  const sortedIds = [userId, otherId].sort((a, b) => a - b).join('-')

  let base: string

  if (context === 'appointment') {
    if (!appointmentId) {
      throw new Error('appointmentId is required when context is "appointment"')
    }
    base = `appointment-${appointmentId}-${sortedIds}`
  } else {
    base = `context-${context}-${messageType}-${sortedIds}`
  }

  return createHash('sha256').update(base).digest('hex')
}
