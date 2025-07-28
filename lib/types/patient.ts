export type Appointment = {
  date_time: string
} | null
export type Message = {
  content: string
  sender_name: string
  sender: {
    first_name: string
    last_name: string
  }
}

export type Patient = string
export type Provider = string
