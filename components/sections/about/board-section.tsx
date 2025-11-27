import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"
import { getStrapiMedia } from "@/lib/strapi/api"
import type { BoardSection as BoardSectionType, BoardMember } from "@/types/about"

interface BoardSectionProps {
  data: BoardSectionType
}

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <div className="text-center">
      <div className="aspect-square relative rounded-lg overflow-hidden bg-muted mb-4">
        <Image
          src={
            getStrapiMedia(member.image.url) ||
            "/placeholder.svg?height=200&width=200&query=professional business person silhouette"
          }
          alt={member.image.alternativeText || member.name}
          fill
          className="object-cover"
        />
      </div>
      <h4 className="font-semibold text-primary">{member.name}</h4>
      <p className="text-sm text-muted-foreground">{member.position}</p>
    </div>
  )
}

export function BoardSection({ data }: BoardSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <SectionLabel className="mb-4">{data.label}</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground max-w-md">{data.title}</h2>
        </div>

        {/* Board of Commissioner */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-foreground mb-8">Board of Commissioner</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.commissioners.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Board of Directors */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-8">Board of Directors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.directors.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
