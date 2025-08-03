'use client'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { DatePicker } from './ui/DatePicker'
import { RadioGroupDemo } from './ui/RadioGroup'

type FormData = {
  firstName: string
  lastName: string
  address: string
  dob: Date
  sex: string
  insurance: string
  emergency_contact: string
}

export default function PatientIntakeForm() {
  const form = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      sex: '',
      insurance: '',
      emergency_contact: '',
    },
  })

  function onSubmit(values: FormData) {
    //check that with the team
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormDescription>
          Please input your information below. All fields are required.
        </FormDescription>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Address</FormLabel>
              <FormControl>
                <Input {...field} type="text" className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <FormControl>
                <RadioGroupDemo
                  value={field.value}
                  onChange={field.onChange}
                  opt1="Male"
                  opt2="Female"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insurance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance</FormLabel>
              <FormControl>
                <RadioGroupDemo
                  value={field.value}
                  onChange={field.onChange}
                  opt1="Yes"
                  opt2="No"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emergency_contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input {...field} type="text" className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="bg-green-800 w-full mb-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
