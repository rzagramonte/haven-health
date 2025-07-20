import React from 'react'

import {
  contactInfo,
  copyright,
  description,
  legalLinks,
  locationHours,
  quickLinks,
  socialLinks,
} from '@/lib/data/footer'
import {
  ContactInfoBlock,
  Link,
  LocationHoursBlock,
  QuickLinkGroup,
  SocialLink,
} from '@/lib/types/footer'

const Footer = () => {
  return (
    <section className="p-5 border-2 border-black">
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
