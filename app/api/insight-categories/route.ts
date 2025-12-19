import { NextResponse } from 'next/server'
import { fetchStrapi } from '@/lib/strapi/client'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const params = url.searchParams
    const locale = params.get('locale') || 'en'

    const query: Record<string, any> = {
      sort: 'title:asc',
      ['pagination[start]']: 0,
      ['pagination[limit]']: 100,
      pLevel: 5,
    }

    const options: any = { locale, query, revalidate: 60 }

    const resp = await fetchStrapi('insight-categories', options)
    return NextResponse.json(resp)
  } catch (err: any) {
    console.error('Error in /api/insight-categories route:', err)
    return NextResponse.json({ data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }, { status: 500 })
  }
}
