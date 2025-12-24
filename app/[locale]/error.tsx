"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { Locale } from "@/lib/i18n/config"

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const params = useParams()
    const locale = (params?.locale as Locale) || "en"
    const [layoutData, setLayoutData] = useState<{ header: any; footer: any } | null>(null)

    useEffect(() => {
        // Fetch layout data client-side since this is an error boundary
        fetch(`/api/layout-data?locale=${locale}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.header && data.footer) {
                    setLayoutData(data)
                }
            })
            .catch((err) => console.error("Failed to load layout for error page", err))
    }, [locale])

    return (
        <div className="flex min-h-screen flex-col">
            {layoutData && <Header data={layoutData.header} locale={locale} />}

            <main className="flex flex-grow flex-col items-center justify-center bg-white px-4 pt-32 pb-20 text-center">
                <h1 className="mb-4 text-6xl font-bold text-primary-500">Oops!</h1>
                <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                    Something went wrong
                </h2>
                <p className="mb-8 max-w-md text-gray-600">
                    We apologize for the inconvenience. An unexpected error has occurred.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => reset()}
                        className="rounded-full border-2 border-indesso-dark-blue px-6 py-3 font-semibold text-indesso-dark-blue transition-colors hover:bg-primary-50"
                    >
                        Try Again
                    </button>
                    <Link
                        href={`/${locale}`}
                        className="rounded-full bg-primary-500 px-6 py-3 font-semibold text-indesso-dark-blue transition-colors border-2 border-indesso-dark-blue hover:bg-primary-600"
                    >
                        Back to Home
                    </Link>
                </div>
                {/* Optional: Display error details in development */}
                {/* {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 max-w-lg rounded bg-red-50 p-4 text-left text-sm text-red-800">
                        <p className="font-bold">Error: {error.message}</p>
                        {error.digest && <p className="mt-1 text-xs">Digest: {error.digest}</p>}
                    </div>
                )} */}
            </main>

            {layoutData && <Footer data={layoutData.footer} locale={locale} />}
        </div>
    )
}
