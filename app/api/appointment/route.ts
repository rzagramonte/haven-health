import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('Success! This route will return all appointments')
}

export async function POST() {
  return new NextResponse('Success! This route will create a new appointment')
}
