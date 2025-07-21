import React from 'react'
import type { IconType } from 'react-icons'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

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

export const copyright = '©2024 Haven Health. All rights reserved.'
export const description = 'Get in touch through social media'

export const legalLinks = [
  { name: 'Terms and Conditions', href: '#' },
  { name: 'Privacy Policy', href: '#' },
]

export const quickLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Our Services', href: '#' },
      { name: 'Patient Portal', href: '#' },
      { name: 'Appointments', href: '#' },
    ],
  },
]

export const socialLinks = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
]

export const contactInfo = [
  {
    title: 'Contact Us',
    info: {
      street: '123 Main St.',
      location: 'Islip, NY 11751',
      email: 'info@havenhealth.org',
      phone: '(631) 555-5555',
    },
  },
]

export const locationHours = [
  {
    title: 'Hours of Operation',
    hours: {
      weekly: 'Monday - Saturday',
      schedule: '9AM - 5PM',
    },
    walkIns: {
      title: 'Walk-Ins',
      schedule: '9AM - 12PM',
    },
  },
]

const Footer = () => {
  return (
    <section className="p-5 border-2 border-black bg-muted">
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-start lg:text-left">
        <div className="flex w-full max-w-[90%] flex-col justify-between gap-3 lg:items-start">
          <p className="text-muted-foreground max-w-[70%] text-sm">
            {description}
          </p>
          <ul className="text-muted-foreground flex items-center space-x-6">
            {socialLinks.map(({ icon: Icon, label }: SocialLink) => (
              <li
                key={label}
                className="hover:text-primary font-medium"
                aria-label={label}
              >
                <a>
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
          {locationHours.map((hoursInfo: LocationHoursBlock, index) => (
            <div key={index}>
              <h3 className="mb-4 font-bold whitespace-nowrap">
                {hoursInfo.title}
              </h3>
              <div className="text-muted-foreground space-y-1 text-sm whitespace-nowrap">
                <p>{hoursInfo.hours.weekly}</p>
                <p>{hoursInfo.hours.schedule}</p>
              </div>
              <br />
              <div className="text-muted-foreground space-y-1 text-sm">
                <p>{hoursInfo.walkIns.title}</p>
                <p>{hoursInfo.walkIns.schedule}</p>
              </div>
            </div>
          ))}
          {contactInfo.map((contact: ContactInfoBlock) => (
            <div key={contact.title}>
              <h3 className="mb-4 font-bold">{contact.title}</h3>
              <div className="text-muted-foreground space-y-3 text-sm">
                <p>{contact.info.phone}</p>
                <p>{contact.info.email}</p>
                <p>{contact.info.street}</p>
                <p>{contact.info.location}</p>
              </div>
            </div>
          ))}
          {quickLinks.map((quickLink: QuickLinkGroup) => (
            <div key={quickLink.title}>
              <h3 className="mb-4 font-bold">{quickLink.title}</h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                {quickLink.links.map((link: Link) => (
                  <li
                    key={link.name}
                    className="hover:text-primary font-medium"
                  >
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
        <p className="order-2 lg:order-1">{copyright}</p>
        <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
          {legalLinks.map((link: Link) => (
            <li key={link.name} className="hover:text-primary">
              <a href={link.href}> {link.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export { Footer }
