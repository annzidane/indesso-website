import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getFooterData, getHeaderData } from "@/lib/strapi/api"
import Link from "next/link"
import { headers } from "next/headers"
import type { Locale } from "@/lib/i18n/config"

interface NotFoundProps {
    params: Promise<{ locale: string }>
}

export default async function NotFound({ params }: NotFoundProps) {

    const headersList = await (await import("next/headers")).headers() // dynamic import or standard?

    return (
        <NotFoundContent />
    )
}


async function NotFoundContent() {
    const headersList = await headers()
    const referer = headersList.get("referer") || ""
    let locale: Locale = "en"

    const [headerData, footerData] = await Promise.all([
        getHeaderData(locale),
        getFooterData(locale),
    ])

    return (
        <div className="flex min-h-screen flex-col">
            <Header data={headerData} locale={locale} />
            <main className="flex flex-grow flex-col items-center justify-center bg-white px-4 pt-32 pb-20 text-center">
                <h1 className="mb-4 text-6xl font-bold text-primary-500">404</h1>
                <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                    Page Not Found
                </h2>
                <p className="mb-8 max-w-md text-gray-600">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    href={`/${locale}`}
                    className="rounded-full bg-primary-500 px-8 py-3 font-semibold text-indesso-dark-blue border-2 border-indesso-dark-blue transition-colors hover:bg-primary-600"
                >
                    Back to Home
                </Link>
            </main>
            <Footer data={footerData} locale={locale} />
        </div>
    )
}
