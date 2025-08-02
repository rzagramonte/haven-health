export type Appointment = {
  appointment_time: string | null
}
export type Message = {
  content: string
  sender: string
}

export type PatientName = string
export type Provider = string

export type EmergencyContact = {
  firstName: string
  lastName: string
  phone: string
}

export interface Patient {
  id: number
  personId: number
  birthDate: Date
  sex: string
  insuranceFlag: boolean
  emergencyContact: EmergencyContact
  createdAt: string
  updatedAt: string
}
