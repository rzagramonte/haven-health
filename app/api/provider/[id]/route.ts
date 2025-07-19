import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('Success! This is for getting a single provider')
}

export async function PUT() {
  return new NextResponse('Success! This route is for changing a provider')
}

export async function DELETE() {
  return new NextResponse('Success! This is for deleting a single provider.')
}
