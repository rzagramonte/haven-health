export type Appointment = {
  appointment_time: string | null
}

export type Appointments = {
  id: number
  appointment_time: string | null
  appointment_type: string | null
  provider: string
} | null

export type Message = {
  sender: string
  content: string
}

export type Patient = string
export type Provider = string
