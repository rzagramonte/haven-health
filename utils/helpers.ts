import { parsePhoneNumberFromString } from 'libphonenumber-js'

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

export const getAge = (dateOfBirth: string) => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  const age = today.getFullYear() - birthDate.getFullYear()
  return age
}

export const formatPhoneNumber = (phoneNumberString: string) => {
  const defaultCountry = 'US'

  const phoneNumber = parsePhoneNumberFromString(
    phoneNumberString,
    defaultCountry,
  )

  console.log('phone number:', phoneNumber)

  if (!phoneNumber) {
    throw new Error('Could not parse phone number')
  }

  return phoneNumber.format('E.164')
}
