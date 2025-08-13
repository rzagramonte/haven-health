'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { createClient } from '@/lib/supabase/client'

type Patient = {
  created_at: string | null
  first_name: string | null
  id: number
  last_name: string | null
  person_uuid: string | null
  role: 'patient' | 'admin' | 'provider' | null
  updated_at: string | null
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
      const supabase = createClient()
      const { data, error } = await supabase
        .from('person')
        .select('*')
        .eq('role', 'patient')
        .or(`first_name.ilike.%${value}%,last_name.ilike.%${value}%`)
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
    <div className="flex justify-center py-8">
      <Card className="bg-card-2 w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-bold">Find a Patient</CardTitle>
        </CardHeader>
        <Command>
          <CommandInput
            placeholder="Start typing a name"
            value={input}
            onValueChange={handleInputChange}
          />
          <CommandList>
            {results.length > 0 &&
              results.map((patient) => (
                <CommandItem
                  className="cursor-pointer"
                  key={patient.id}
                  value={`${patient.first_name} ${patient.last_name}`}
                >
                  <Link href={`./patient/${patient.id}`}>
                    {patient.first_name} {patient.last_name}
                  </Link>
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
