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

import { DatePickerForm } from './ui/DatePicker'
import { RadioGroupDemo } from './ui/RadioGroup'

type FormData = {
  username: string
  age: number
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
          Please input your information below. All fields are required
        </FormDescription>
        <FormField
          control={form.control}
          name="username"
          render={({}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-white" type="email" required={true} />
              </FormControl>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="bg-white" type="password" required={true} />
              </FormControl>
              <FormLabel>Home Adress</FormLabel>
              <FormControl>
                <Input className="bg-white" type="adress" required={true} />
              </FormControl>
              <DatePickerForm />
              <h1>Sex</h1>
              <RadioGroupDemo opt1="Male" opt2="Female" />
              <h1>Do you have insurance</h1>
              <RadioGroupDemo opt1="Yes" opt2="No" />
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input
                  className="bg-white"
                  type="emergency_contact"
                  required={true}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
