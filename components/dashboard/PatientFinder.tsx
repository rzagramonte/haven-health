'use client'

import { useState } from 'react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { supabase } from '@/lib/supabase/client'

type Patient = {
  id: number
  first_name: string
  last_name: string
  role: string
  created_at: string
  updated_at: string
}

export default function PatientFinder() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Patient[]>([])

  async function fetchData(value: string) {
    const { data, error } = await supabase
      .from('person')
      .select('*')
      .eq('role', 'patient')
      .ilike('first_name', `%${value}`)
    if (error) {
      console.log(error)
      return null
    }
    if (data) {
      setResults(data)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="bg-card-2 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold">Find a Patient</CardTitle>
        </CardHeader>
        <Command>
          <CommandInput
            placeholder="Start typing"
            value={input}
            onValueChange={(value) => {
              setInput(value)
              fetchData(value)
            }}
          />
          <CommandList>
            {results.map((patient) => (
              <CommandItem key={patient.id}>
                {' '}
                {patient.first_name} {patient.last_name}{' '}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </Card>
    </div>
  )
}
