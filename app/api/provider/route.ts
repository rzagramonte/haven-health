import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse(
    'Success! This route is for getting all the providers',
  )
}

export async function POST() {
  return new NextResponse('Success! This is for adding a new provider.')
}
