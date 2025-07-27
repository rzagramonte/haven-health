export type ActionResponse<T = undefined> = {
  success: boolean
  message: string
  data?: T | null
  errors?: Record<string, string[]>
  error?: string
}
