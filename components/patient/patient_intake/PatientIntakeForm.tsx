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
import type { Address } from '@/lib/types/auth'
import type { EmergencyContact } from '@/lib/types/patient'

import { DatePicker } from './ui/DatePicker'
import { RadioGroupDemo } from './ui/RadioGroup'

type FormData = {
  address: Address
  dob: Date
  sex: string
  insurance: string
  emergencyContact: EmergencyContact
}

export default function PatientIntakeForm() {
  const form = useForm<FormData>({
    defaultValues: {
      address: {
        streetA: '',
        streetB: '',
        city: '',
        state: '',
        zipCode: '',
      },
      sex: '',
      insurance: '',
      emergencyContact: {
        firstName: '',
        lastName: '',
        phone: '',
      },
    },
  })

  function onSubmit(values: FormData) {
    //check that with the team
    console.log('intake-form values:', values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormDescription>
          Please input your information below. All fields are required.
        </FormDescription>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel>Address</FormLabel>
              <FormItem>
                <FormControl>
                  <Input
                    value={field.value?.streetA ?? ''}
                    type="text"
                    className="bg-input placeholder:text-gray-400"
                    placeholder="StreetA"
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        streetA: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input
                    value={field.value?.streetB ?? ''}
                    type="text"
                    className="bg-input placeholder:text-gray-400"
                    placeholder="StreetB"
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        streetB: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        city: e.target.value,
                      })
                    }
                    value={field.value?.city ?? ''}
                    type="text"
                    className="bg-input placeholder:text-gray-400"
                    placeholder="city"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        state: e.target.value,
                      })
                    }
                    value={field.value?.state ?? ''}
                    type="text"
                    className="bg-input placeholder:text-gray-400"
                    placeholder="state"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input
                    value={field.value?.zipCode ?? ''}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        zipCode: e.target.value,
                      })
                    }
                    type="text"
                    className="bg-input placeholder:text-gray-400"
                    placeholder="zipCode"
                  />
                </FormControl>
              </FormItem>
            </div>
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
          name="emergencyContact"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel>Emergency Contact</FormLabel>
              <FormItem>
                <FormControl>
                  <Input
                    value={field.value?.firstName ?? ''}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        firstName: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="First Name"
                    className="bg-input placeholder:text-gray-400"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        lastName: e.target.value,
                      })
                    }
                    value={field.value?.lastName ?? ''}
                    type="text"
                    placeholder="Last Name"
                    className="bg-input placeholder:text-gray-400"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        phone: e.target.value,
                      })
                    }
                    value={field.value?.phone ?? ''}
                    type="text"
                    placeholder="Phone"
                    className="bg-input placeholder:text-gray-400"
                  />
                </FormControl>
              </FormItem>
            </div>
          )}
        />
        <Button
          className="bg-secondary w-full mb-8 cursor-pointer"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
