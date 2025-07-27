'use client'

import { useState } from 'react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export default function PatientFinder() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState('')

  const patients = [
    { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 2, name: 'Brian Smith', email: 'brian.smith@example.com' },
    { id: 3, name: 'Carla Diaz', email: 'carla.diaz@example.com' },
    { id: 4, name: 'Daniel Lee', email: 'daniel.lee@example.com' },
    { id: 5, name: 'Emma Brown', email: 'emma.brown@example.com' },
  ]

  function handleSearch(name: string) {
    console.log(patients[0].name)
    setResults(name)
    setInput(name)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="bg-card-2 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold">Find a Patient</CardTitle>
        </CardHeader>
        <Command>
          <CommandInput
            placeholder="Type patient's name"
            value={input}
            onValueChange={(value) => {
              handleSearch(value)
            }}
          />
          <CommandList>
            <CommandItem> {results} </CommandItem>
          </CommandList>
        </Command>
      </Card>
    </div>
  )
}
