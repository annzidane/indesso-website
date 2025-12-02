import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { AboutUsPageProps } from "@/types/strapi"

export type AboutUsBoardProps = AboutUsPageProps["boards"]

interface BoardSectionProps {
  data: AboutUsBoardProps
}

interface BoardMemberProps {
  firstName: string
  lastName: string | null
  position: string
  image?: { url: string; alternativeText?: string | null }
}

function MemberCard({ member }: { member: BoardMemberProps }) {
  return (
    <div 
      className="group bg-white rounded overflow-hidden border border-gray-200"
      style={{ width: '280px', height: '424px' }}
    >
      {/* Image container - fixed height for 280x280 */}
      <div className="relative w-[280px] h-[280px] bg-[#E8F4FA] overflow-hidden">
        <Image
          src={
            getStrapiMedia(member.image?.url ?? null) ||
            "/placeholder.svg?height=280&width=280"
          }
          alt={member.image?.alternativeText || `${member.firstName} ${member.lastName || ""}`}
          fill
          className="object-cover object-top transition-transform group-hover:scale-105"
        />
      </div>
      {/* Content section with padding - remaining height 144px */}
      <div className="p-5">
        {/* Name - First name in accent/italic, Last name in dark blue */}
        <div className="mb-2">
          <h4 className="font-plus-bold text-2xl text-indesso-dark-blue">{member.firstName}</h4>
          {member.lastName && (
            <p className="font-plus-regular text-xl text-indesso-dark-blue">{member.lastName}</p>
          )}
        </div>
        {/* Position */}
        <p className="font-manrope-regular text-grey text-sm">{member.position}</p>
      </div>
    </div>
  )
}

export function BoardSection({ data }: BoardSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <SectionLabel variant="bubble" className="mb-4">{data.eyebrow}</SectionLabel>
          <h2 className="font-plus-bold text-3xl md:text-4xl lg:text-5xl text-foreground max-w-lg">
            {data.title}
          </h2>
        </div>

        {/* Board Sections */}
        {data.sections.map((section) => {
          const membersRow1 = section.members.slice(0, 4)
          const membersRow2 = section.members.slice(4)

          return (
            <div key={section.id} className="mb-16 last:mb-0">
              {/* Section Title with solid line */}
              <div className="flex items-center gap-4 mb-10">
                <h3 className="font-plus-extrabold text-[28px] text-foreground italic whitespace-nowrap leading-none">
                  {section.title}
                </h3>
                <div className="flex-1 h-1 bg-indesso-blue/10" />
              </div>
              
              {/* First row - 4 columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 mb-10">
                {membersRow1.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
              
              {/* Second row if exists */}
              {membersRow2.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
                  {membersRow2.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
