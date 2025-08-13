import {
  ArrowDownCircle,
  CalendarHeart,
  HandHeart,
  PillBottle,
  Stethoscope,
  Syringe,
  UserRoundPlus,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import AboutImage from '../public/images/about-image.webp'

export default function Home() {
  return (
    <main className="flex flex-col gap-32 w-full mb-32">
      <section
        id="hero"
        className="bg-[url(/images/hero-image.webp)] bg-center bg-cover h-svh text-[#f9f7f3] dark:text-foreground"
      >
        <div className="flex flex-col gap-8 items-center justify-center h-full backdrop-blur-sm backdrop-brightness-60 text-center px-4 2xl:gap-16">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-balance 2xl:text-6xl text-[#f9f7f3]">
              Welcome to Haven Health
            </h1>
            <p className="text-2xl text-balance 2xl:text-4xl">
              Your Wellness, Our Commitment
            </p>
          </div>
          <div className="flex gap-8">
            <Button asChild variant="cta" size="cta" className="text-lg">
              <Link href="/appointment">
                <CalendarHeart className="size-6" />
                Schedule Appointment
              </Link>
            </Button>
            <Button
              asChild
              variant="cta"
              size="cta"
              className="text-lg bg-secondary"
            >
              <Link href="/signup">
                <UserRoundPlus className="size-6" />
                Create an Account
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <a
            href="#services"
            className="absolute left-1/2 bottom-4 transform -translate-x-1/2"
          >
            <ArrowDownCircle className="size-16 motion-safe:animate-bounce hover:text-secondar" />
          </a>
        </div>
      </section>
      <section
        id="services"
        className="flex flex-col gap-16 px-4 max-w-screen-xl mx-auto scroll-mt-16"
      >
        <h2 className="text-3xl font-bold text-center">Our Services</h2>
        <div
          id="services-card-container"
          className="grid grid-cols-1 gap-x-4 gap-y-8 w-full md:grid-cols-2 md:max-w-screen-md xl:grid-cols-4 xl:max-w-screen-xl mx-auto"
        >
          {/* Service Cards */}
          <article
            id="check-up"
            className="bg-card-4 p-4 rounded-lg flex gap-4 items-center shadow-lg"
          >
            <div className="bg-accent p-3 rounded-full flex items-center justify-center">
              <Stethoscope className="size-8 text-accent-foreground" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-xl font-bold">General Check-Up</h3>
              <p className="text-pretty">
                Regular check-ups to monitor your health and catch any issues
                early.
              </p>
            </div>
          </article>
          <article
            id="chronic-condition"
            className="bg-card-4 p-4 rounded-lg flex gap-4 items-center shadow-lg"
          >
            <div className="bg-accent p-3 rounded-full flex items-center justify-center">
              <PillBottle className="size-8 text-accent-foreground" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-xl font-bold">Chronic Condition Follow-Up</h3>
              <p className="text-pretty">
                Ongoing care and management for chronic conditions like
                diabetes.
              </p>
            </div>
          </article>
          <article
            id="vaccinations"
            className="bg-card-4 p-4 rounded-lg flex gap-4 items-center shadow-lg"
          >
            <div className="bg-accent p-3 rounded-full flex items-center justify-center">
              <Syringe className="size-8 text-accent-foreground" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-xl font-bold">Vaccinations</h3>
              <p className="text-pretty">
                Vaccinations to keep you and your family healthy.
              </p>
            </div>
          </article>
          <article
            id="mental-health"
            className="bg-card-4 p-4 rounded-lg flex gap-4 items-center shadow-lg"
          >
            <div className="bg-accent p-3 rounded-full flex items-center justify-center">
              <HandHeart className="size-8 text-accent-foreground" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-xl font-bold">Mental Health Consulation</h3>
              <p className="text-pretty">
                Compassionate support for your mental well-being.
              </p>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-center">
        <Button
          asChild
          variant="cta"
          size="cta"
          className="text-lg bg-secondary"
        >
          <Link href="/appointment">
            <CalendarHeart className="size-6" />
            Schedule Appointment
          </Link>
        </Button>
      </div>
      <section id="about" className="max-w-screen-xl px-4 mx-auto ">
        <div className="bg-card-3 flex flex-col gap-16 p-8 mx-auto rounded-3xl shadow-2xl dark:bg-card-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 justify-center text-pretty">
            {/* Text content */}
            <div className="grid gap-8 place-items-center lg:col-span-2 order-1 xl:order-1">
              <h2 className="text-3xl font-bold text-center mb-4">
                About Haven Health
              </h2>
              <div className="flex flex-col gap-4 mb-6">
                <p>
                  At Haven Health, we believe that everyone deserves access to
                  compassionate and comprehensive healthcare. We&apos;re a local
                  community health clinic dedicated to serving the well-being of
                  our neighbors.{' '}
                  <strong>&quot;Your Health, Our Commitment&quot;</strong>{' '}
                  isn&apos;t just our slogan; it&apos;s the guiding principle
                  behind everything we do.
                </p>
                <p>
                  We understand that navigating your health journey can be
                  complex, and our team of experienced and caring professionals
                  is here to support you every step of the way.
                </p>
                <p>
                  At Haven Health, you&apos;re more than just a patient;
                  you&apos;re a valued member of our community. We&apos;re
                  committed to fostering a welcoming and inclusive environment
                  where you feel heard, respected, and empowered to make
                  informed decisions about your health. We look forward to
                  partnering with you on your path to a healthier, happier life.
                </p>
              </div>
              {/* At xl, show the map under the text again */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12096.947849051126!2d-73.21755685!3d40.71279975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8338c078e3efb%3A0xc616688e9560cfd0!2sIslip%2C%20NY!5e0!3m2!1sen!2sus!4v1753486635993!5m2!1sen!2sus"
                className="w-full rounded-xl aspect-square md:aspect-auto hidden xl:block"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* Map at lg only, hidden at xl */}
            <div className="flex items-center justify-center order-2 xl:order-3 h-full min-h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12096.947849051126!2d-73.21755685!3d40.71279975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8338c078e3efb%3A0xc616688e9560cfd0!2sIslip%2C%20NY!5e0!3m2!1sen!2sus!4v1753486635993!5m2!1sen!2sus"
                className="w-full rounded-xl aspect-square md:aspect-auto block xl:hidden h-full min-h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* At xl, show the image */}
              <Image
                src={AboutImage}
                alt="A Nurse and their patient"
                placeholder="blur"
                className="hidden rounded-xl xl:inline-grid xl:col-span-1"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
