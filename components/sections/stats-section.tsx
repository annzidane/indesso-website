import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { cn } from "@/lib/utils"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { ReasonSectionProps, StrapiImage } from "@/types/strapi"
import type { Locale } from "@/lib/i18n/config"

interface StatsSectionProps {
  data: ReasonSectionProps
  locale: Locale
}

export function StatsSection({ data, locale }: StatsSectionProps) {
  // Get 4 statistic cards
  const statisticCards = data.statistics.slice(0, 4)
  
  // Get image URLs
  const matricImageUrl = data.matric.image ? getStrapiMedia(data.matric.image.url) : null
  const impactImageUrl = data.impact.image ? getStrapiMedia(data.impact.image.url) : null
  
  return (
    <section className="py-10 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionLabel variant="bubble" className="mb-4">{data.label}</SectionLabel>
            <h2 className="font-plus-extrabold text-5xl text-primary leading-tight tracking-tight">
              {data.title}
            </h2>
          </div>
          <p className="font-manrope-regular text-[16px] color-dark-grey max-w-xl lg:text-left">{data.description}</p>
        </div>

        {/* Stats Bento Grid - 4 columns layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Matric Card - Employee & People (spans 2 cols) */}
          <div 
            className="sm:col-span-2 lg:col-span-2 rounded-lg overflow-hidden text-white relative h-[296px]"
            style={{
              background: "linear-gradient(283.33deg, #055D71 0%, rgba(5, 93, 113, 0.8) 100%)",
            }}
          >
            <div className="relative z-10 flex h-full">
              {/* Left side - Image */}
              <div className="w-1/2 relative">
                {matricImageUrl && (
                  <Image
                    src={matricImageUrl}
                    alt="Employees"
                    fill
                    className="object-cover object-center"
                  />
                )}
              </div>
              {/* Right side - content */}
              <div className="w-1/2 flex flex-col justify-center p-6">
                <div className="border-b border-white/20 pb-4 mb-4">
                  <p className="text-3xl lg:text-4xl font-bold">{data.matric.employeeTitle.split(' ')[0]}</p>
                  <p className="text-lg font-semibold mt-1">{data.matric.employeeTitle.split(' ').slice(1).join(' ')}</p>
                  <p className="text-sm text-white/70 mt-1">{data.matric.employeeDescription}</p>
                </div>
                <div>
                  <p className="text-3xl lg:text-4xl font-bold">{data.matric.peopleTitle.split(' ')[0]}</p>
                  <p className="text-lg font-semibold mt-1">{data.matric.peopleTitle.split(' ').slice(1).join(' ')}</p>
                  <p className="text-sm text-white/70 mt-1">{data.matric.peopleDescription}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Small Card 1 */}
          {statisticCards[0] && (
            <SmallStatCard 
              title={statisticCards[0].title}
              description={statisticCards[0].description}
              image={statisticCards[0].image}
              variant="teal"
            />
          )}

          {/* Small Card 2 */}
          {statisticCards[1] && (
            <SmallStatCard 
              title={statisticCards[1].title}
              description={statisticCards[1].description}
              image={statisticCards[1].image}
              variant="dark"
            />
          )}

          {/* Row 2 */}
          {/* Small Card 3 */}
          {statisticCards[2] && (
            <SmallStatCard 
              title={statisticCards[2].title}
              description={statisticCards[2].description}
              image={statisticCards[2].image}
              variant="teal"
            />
          )}

          {/* Small Card 4 */}
          {statisticCards[3] && (
            <SmallStatCard 
              title={statisticCards[3].title}
              description={statisticCards[3].description}
              image={statisticCards[3].image}
              variant="dark"
            />
          )}

          {/* Impact Card (spans 2 cols) */}
          <div 
            className="sm:col-span-2 lg:col-span-2 rounded-lg overflow-hidden text-white relative h-[296px]"
            style={{
              background: "linear-gradient(256.83deg, rgba(24, 129, 81, 0.75) 0%, #188151 100%)",
            }}
          >
            <div className="relative z-10 flex h-full">
              {/* Left side - content */}
              <div className="w-1/2 flex flex-col justify-center p-6">
                <p className="text-xs uppercase tracking-wider text-white/80 mb-1">{data.impact.opener}</p>
                <p className="text-5xl lg:text-6xl font-bold">{data.impact.value.toLocaleString()}</p>
                <p className="text-lg font-semibold mt-2">{data.impact.title}</p>
                <p className="text-sm text-white/70 mt-1">{data.impact.description}</p>
              </div>
              {/* Right side - Image */}
              <div className="w-1/2 relative">
                {impactImageUrl && (
                  <Image
                    src={impactImageUrl}
                    alt="Impact"
                    fill
                    className="object-cover object-center"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface SmallStatCardProps {
  title: string
  description: string
  image?: StrapiImage
  variant?: "teal" | "dark"
}

function SmallStatCard({ title, description, image, variant = "teal" }: SmallStatCardProps) {
  const imageUrl = image ? getStrapiMedia(image.url) : null
  
  // Split title: first word becomes large, rest becomes subtitle
  const words = title.split(' ')
  const firstWord = words[0] || ""
  const restOfTitle = words.slice(1).join(' ')
  
  return (
    <div
      className="rounded-lg overflow-hidden relative h-[296px] w-full lg:w-[296px] text-white"
      style={{
        background: variant === "teal" 
          ? "linear-gradient(135deg, #106EA4 0%, rgba(16, 110, 164, 0.8) 100%)"
          : "linear-gradient(283.33deg, #055D71 0%, rgba(5, 93, 113, 0.8) 100%)",
      }}
    >
      {/* Background Image at bottom */}
      {imageUrl && (
        <div className="absolute bottom-0 left-0 right-0 h-[120px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      {/* Content */}
      <div className="relative z-10 p-5 h-full flex flex-col">
        <p className="text-4xl lg:text-5xl font-bold leading-tight">{firstWord}</p>
        {restOfTitle && (
          <p className="text-[14px] font-semibold mt-2 leading-tight">{restOfTitle}</p>
        )}
        <p className="text-sm text-white/70 mt-2">{description}</p>
      </div>
    </div>
  )
}
