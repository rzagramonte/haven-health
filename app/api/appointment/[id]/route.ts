import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse(
    'Success! This route is for getting a single appointment',
  )
}

export async function PUT() {
  return new NextResponse('Success! This route if for modifying an appointment')
}

export async function DELETE() {
  return new NextResponse(
    'Success! This route is for deleting a single appointment',
  )
}
