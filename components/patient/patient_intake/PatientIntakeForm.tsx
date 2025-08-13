'use client'

import { redirect } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import LoadSpinner from '@/components/loading/Spinner'
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
import { createIntakeForm } from '@/server/intake-form/actions'
import { showError, showSuccess } from '@/utils/toast'

import { DatePicker } from './ui/DatePicker'
import { RadioGroupDemo } from './ui/RadioGroup'

export type IntakeFormData = {
  address: Address
  dob: Date
  sex: string
  insurance: string
  emergencyContact: EmergencyContact
}

export interface PatientIntakeProps {
  patientId: number
}

export default function PatientIntakeForm({ patientId }: PatientIntakeProps) {
  const form = useForm<IntakeFormData>({
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

  const [isPending, startTransition] = useTransition()

  function onSubmit(formData: IntakeFormData) {
    startTransition(async () => {
      const response = await createIntakeForm(formData, patientId)

      if (response.success) {
        showSuccess(response.message)
        redirect('/patient/dashboard')
      } else {
        showError(
          response.message ||
            'Something went wrong submitting your intake form',
        )
      }
    })
  }

  return (
    <main className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-10 w-full max-w-[600px] rounded-md m-8 bg-card-4 max-sm:p-5"
        >
          <h1 className="font-bold text-3xl mt-4">Patient Intake Form </h1>
          <FormDescription>
            Please input your information below. All fields are required.
          </FormDescription>
          <div className="flex flex-col w-full max-w-[375px] p-2 gap-5">
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
                        className="bg-input placeholder:text-gray-400 w-full"
                        placeholder="Address Line 1"
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
                        placeholder="Address Line 2"
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
                        placeholder="City"
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
                        placeholder="State"
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
                        placeholder="Zip Code"
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
                  <FormControl className="flex-1">
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
                  <FormControl className="flex-1">
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
          </div>
          <Button
            className="bg-secondary w-full max-w-[350px] mb-8 cursor-pointer"
            type="submit"
          >
            {isPending ? <LoadSpinner /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </main>
  )
}
