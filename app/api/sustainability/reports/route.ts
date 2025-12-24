import { NextResponse } from 'next/server'
import { getReportsData } from '@/lib/strapi/sustainability-api'

export async function GET() {
  try {
    const reports = await getReportsData()
    return NextResponse.json({ data: reports })
  } catch (e) {
    console.error('Error in reports API', e)
    return NextResponse.json({ data: [] })
  }
}
