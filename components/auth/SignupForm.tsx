'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUp } from '@/server/auth/actions'
import { showError, showSuccess } from '@/utils/toast'

type SignupInputs = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export default function SignupForm() {
  const router = useRouter()
  const form = useForm<SignupInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignupInputs> = async (values) => {
    const response = await signUp(values)

    if (response.success) {
      showSuccess(response.message)
      setTimeout(() => router.push(`/patient/dashboard`), 2000)
    } else {
      showError(response.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md bg-card p-6 rounded-lg shadow-md border border-border">
        <div className="flex justify-center mb-4">
          <Image
            src="/icons/logo.svg"
            alt="Haven Health"
            width={120}
            height={120}
            className="block dark:hidden mx-auto mb-4"
          />
          <Image
            src="/icons/logo_dark.svg"
            alt="Haven Health"
            width={120}
            height={120}
            className="hidden dark:block mx-auto mb-4"
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
          Create Account
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="firstName"
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-input border border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              rules={{ required: 'Last name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-input border border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: 'Email is required',
                validate: (value) =>
                  value.includes('@') || 'Email must include "@"',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-input border border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-input border border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
