import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('Success! This route is for getting all patients')
}

export async function POST() {
  return new NextResponse('Success! This route is for adding a new patient')
}
