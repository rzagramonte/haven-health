export type ActionResponse<T = undefined> = {
  success: boolean
  message: string
  data?: T | null
  errors?: Record<string, string[]>
  error?: string
}

export enum Role {
  provider = 'provider',
  patient = 'patient',
  admin = 'admin',
}

export interface Person {
  id: number
  firstName: string | null
  lastName: string | null
  role: Role | null
}
