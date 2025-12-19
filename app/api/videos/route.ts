import { NextResponse } from 'next/server'
import { fetchStrapi } from '@/lib/strapi/client'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const params = url.searchParams
    const start = params.get('start') ? Number(params.get('start')) : 0
    const limit = params.get('limit') ? Number(params.get('limit')) : 100
    const locale = params.get('locale') || 'en'

    const query: Record<string, any> = {
      ['pagination[start]']: start,
      ['pagination[limit]']: limit,
      pLevel: params.get('pLevel') ? Number(params.get('pLevel')) : 4,
    }

    const options: any = { locale, query, revalidate: 60 }

    const resp = await fetchStrapi('videos', options)
    return NextResponse.json(resp)
  } catch (err: any) {
    console.error('Error in /api/videos route:', err)
    return NextResponse.json({ data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }, { status: 500 })
  }
}
