import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('Success! This route is for getting a single patient')
}

export async function PUT() {
  return new NextResponse(
    'Success! This route is for modifying a single patient',
  )
}

export async function DELETE() {
  return new NextResponse(
    'Success! This route is for deleting a single patient.',
  )
}
