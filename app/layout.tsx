import './globals.css'

import type { Metadata } from 'next'
 ecg-5/theme
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Geist } from 'next/font/google'
import { Toaster } from 'sonner'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
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
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

      <body className={`${geistSans.className} antialiased`}>
        {children}
        <Toaster position="top-center" richColors />

      </body>
    </html>
  )
}
