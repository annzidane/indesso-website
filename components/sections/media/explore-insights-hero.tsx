import Image from "next/image";

export function ExploreInsightsHero() {
  return (
    <section className="relative w-full h-[240px] md:h-[320px] lg:h-[480px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/media/explore-insight-bg-top.png"
        alt="Explore Insights"
        fill
        className="object-cover"
        priority
      />

      {/* Subtle Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <h1
          className="font-plus-semibold text-[32px] md:text-[48px] lg:text-[64px] text-white"
          style={{
            lineHeight: "100%",
            letterSpacing: "-1px",
          }}
        >
          Explore Insights
        </h1>
      </div>
    </section>
  );
}
