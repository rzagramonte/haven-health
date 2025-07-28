import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { Footer } from '@/components/ui/footer'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Haven Health',
  description: 'Your Wellness, Our Committment',
  openGraph: {
    title: 'Haven Health | Your Wellness, Our Commitment',
    description: 'Haven Health Community Health Clinic',
    url: 'https://dsd-east-coast-goats.vercel.app/',
    siteName: 'Haven Health',
    images: [
      {
        url: 'https://dsd-east-coast-goats.vercel.app/opengraph-image.png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const inter = Inter({
  variable: '--font-inter-sans',
  display: 'swap',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
