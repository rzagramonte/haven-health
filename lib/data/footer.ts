import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

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
