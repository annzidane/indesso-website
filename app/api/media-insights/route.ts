import { NextResponse } from 'next/server'
import { fetchStrapi } from '@/lib/strapi/client'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const params = url.searchParams
    const start = params.get('start') ? Number(params.get('start')) : 0
    const limit = params.get('limit') ? Number(params.get('limit')) : 8
    const locale = params.get('locale') || 'en'
    const slug = params.get('slug') || null

    const query: Record<string, any> = {
      sort: 'date:desc',
      ['pagination[start]']: start,
      ['pagination[limit]']: limit,
      pLevel: 5,
    }

    const options: any = { locale, query, revalidate: 60 }

    if (slug) {
      // Use filter to fetch by slug
      options.filters = { slug: { $eq: slug } }
      // when filtering by slug, ignore pagination
      delete options.query['pagination[start]']
      delete options.query['pagination[limit]']
    }

    const resp = await fetchStrapi('media-insights', options)
    return NextResponse.json(resp)
  } catch (err: any) {
    console.error('Error in /api/media-insights route:', err)
    return NextResponse.json({ data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }, { status: 500 })
  }
}
