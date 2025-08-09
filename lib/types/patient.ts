export type Appointment = {
  id: number
  appointment_time: string | null
  appointment_type: string | null
  provider: {
    first_name: string | null
    last_name: string | null
  }
} | null

export type Message = {
  id: number
  sender: string
  content: string
}

export type Patient = string
export type Provider = string
