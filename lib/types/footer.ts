import { IconType } from 'react-icons'

// Type for a single link in quickLinks
export type Link = {
  name: string
  href: string
}

// Type for a quick link group (e.g., "Quick Links")
export type QuickLinkGroup = {
  title: string
  links: Link[]
}

export type SocialLink = {
  icon: IconType
  href: string
  label: string
}

export type ContactInfoBlock = {
  title: string
  info: {
    street: string
    location: string
    email: string
    phone: string
  }
}

export type LocationHoursBlock = {
  title: string
  hours: {
    weekly: string
    schedule: string
  }
  walkIns: {
    title: string
    schedule: string
  }
}
