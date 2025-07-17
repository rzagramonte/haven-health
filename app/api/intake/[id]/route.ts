import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse(
    'Success! This route is for getting a single intake form.',
  )
}

export async function PUT() {
  return new NextResponse(
    'Success! This route is for modifying an intake form.',
  )
}

export async function DELETE() {
  return new NextResponse('Success! This route is for deleting an intake form.')
}
