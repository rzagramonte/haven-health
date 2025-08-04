import { parsePhoneNumberFromString } from 'libphonenumber-js'

export function mockDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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

export const formatPhoneNumber = (phoneNumberString: string) => {
  const defaultCountry = 'US'

  const phoneNumber = parsePhoneNumberFromString(
    phoneNumberString,
    defaultCountry,
  )

  if (!phoneNumber) {
    throw new Error('Could not parse phone number')
  }

  return phoneNumber.format('E.164')
}
