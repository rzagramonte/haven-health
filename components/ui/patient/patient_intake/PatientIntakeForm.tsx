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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// import { DatePicker } from './ui/DatePicker'
import { RadioGroupDemo } from './ui/RadioGroup'

type FormData = {
  username: string
  password: string
  address: string
  dob: Date
  sex: string
  insurance: string
  emergency_contact: string
}

export default function PatientIntakeForm() {
  const form = useForm<FormData>()

  function onSubmit(values: FormData) {
    //check that with the team
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 w-1/3 "
      >
        <FormDescription>
          Please input your information below. All fields are required.
        </FormDescription>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" className="bg-white" />
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
        {/* <FormField
          control={form.control}
          name="dob"
          render={({ field }) => <DatePicker />}
        /> */}
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <RadioGroupDemo {...field} opt1="Male" opt2="Female" />
          )}
        />
        <FormField
          control={form.control}
          name="insurance"
          render={({ field }) => (
            <RadioGroupDemo {...field} opt1="Yes" opt2="No" />
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
        <Button className="bg-green-800 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
