'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [hasSearched, setHasSearched] = useState(false)
  const [results, setResults] = useState<Patient[]>([])
  const lastQueryRef = useRef<string>('')

  async function fetchData(value: string) {
    if (value.length < 2) {
      setResults([])
      setHasSearched(false)
      return
    }

    lastQueryRef.current = value

    try {
      const { data, error } = await supabase
        .from('person')
        .select('*')
        .eq('role', 'patient')
        .or(`first_name.ilike.%${value}%`)
        .order('first_name')
        .limit(10)

      if (error) {
        return
      }

      if (lastQueryRef.current === value) {
        setResults(data || [])
        setHasSearched(true)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(input)
    }, 300)

    return () => clearTimeout(timer)
  }, [input])

  const handleInputChange = (value: string) => {
    setInput(value)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="bg-card-2 w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold">Find a Patient</CardTitle>
        </CardHeader>
        <Command>
          <CommandInput
            placeholder="Start typing a name..."
            value={input}
            onValueChange={handleInputChange}
          />
          <CommandList>
            {results.length > 0 &&
              results.map((patient) => (
                <CommandItem key={patient.id}>
                  {patient.first_name} {patient.last_name}
                </CommandItem>
              ))}
            {hasSearched && results.length === 0 && (
              <CommandItem>No patients found</CommandItem>
            )}
          </CommandList>
        </Command>
      </Card>
    </div>
  )
}
