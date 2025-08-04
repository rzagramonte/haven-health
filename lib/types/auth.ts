export type EmergencyContact = {
  firstName: string
  lastName: string
  phone: string
}

export type ActionResponse<T = undefined> = {
  success: boolean
  message: string
  data?: T | null
  errors?: Record<string, string[]>
  error?: string
}

export interface Person {
  id: number
  firstName: string | null
  lastName: string | null
  role: 'provider' | 'patient' | 'admin' | null
  createdAt: string | null
  updatedAt: string | null
}
