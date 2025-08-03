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
  role: string
  createdAt?: string | null
  updatedAt?: string | null
}

export interface Address {
  id: number
  personId: number | null
  streetA: string | null
  streetB?: string | null
  city: string | null
  state: string | null
  zipCode: string | null
}
