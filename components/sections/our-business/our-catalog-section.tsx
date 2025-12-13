import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi/client";
import { Button } from "@/components/ui/button";
import type { OurCatalogSectionData } from "@/types/strapi";
import { SectionLabel } from "@/components/ui/section-label";

interface OurCatalogSectionProps {
  data: OurCatalogSectionData;
}

export function OurCatalogSection({ data }: OurCatalogSectionProps) {
  const backgroundUrl = getStrapiMedia(data.background_image?.url || null);
  const imageUrl = getStrapiMedia(data.image?.url || null);

  // Extract text from rich text blocks
  const paragraphs =
    data.text?.map(
      (block) => block.children?.map((child) => child.text).join("") || ""
    ) || [];

  return (
    <section className="relative w-full px-4 md:px-0 my-12 md:my-16">
      {/* MOBILE LAYOUT - Stack: Image on top, content below */}
      <div className="md:hidden flex flex-col gap-0 mx-auto max-w-[1240px]">
        {/* Background Image - Mobile */}
        <div
          className="relative w-full aspect-[328/200] rounded-t-[10px] overflow-hidden"
          style={{ maxHeight: "12rem" }}
        >
          <Image
            src={backgroundUrl}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Panel - Mobile */}
        <div
          className="overflow-hidden relative"
          style={{
            backgroundColor: "#000",
          }}
        >
          {/* Layer 1: First gradient with multiply blend mode */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(315.17deg, rgba(0, 0, 0, 0.9) 25.07%, rgba(0, 13, 48, 0.45) 50%)",
              backgroundBlendMode: "multiply",
            }}
          />
          {/* Layer 2: Second gradient with overlay blend mode */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(270deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 84, 139, 0) 100%)",
              backgroundBlendMode: "overlay",
            }}
          />
          {/* Layer 3: Original glass gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(rgb(102 192 214 / 25%) 0%, rgba(0, 119, 182, 0.25) 100%)",
              backdropFilter: "blur(50px)",
              WebkitBackdropFilter: "blur(50px)",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "80px",
            }}
          />
          <div
            className="relative z-10 px-4 py-6"
            style={{
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "80px",
            }}
          >
            <SectionLabel
              variant="bubble-light"
              className="mb-3 font-manrope-extrabold text-[12px] leading-[18px] tracking-[4px]"
            >
              {data.eyebrow}
            </SectionLabel>

            <h2 className="font-plus-bold text-[28px] text-white leading-[36px] tracking-[-1px] mb-4 align-middle">
              {data.title}
            </h2>

            <div className="space-y-3 mb-6">
              {paragraphs.map((text, idx) => (
                <p
                  key={idx}
                  className="text-white/80 font-manrope-regular text-[14px] leading-[24px] tracking-[0%]"
                >
                  {text}
                </p>
              ))}
            </div>

            {data.button && (
              <Button
                asChild
                className="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white rounded-[2px] transition-colors text-sm w-[204px] h-12"
                style={{
                  gap: "10px",
                  padding: "16px",
                }}
              >
                <Link href={data.button.path || "/"}>{data.button.title}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Original overlay design */}
      <div className="hidden md:block relative mx-auto w-full max-w-[1240px] rounded-3xl overflow-hidden aspect-[1240/600]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundUrl}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        {/* FULL LEFT GLASS PANEL */}
        <div
          className="absolute inset-y-0 left-0 w-[55%] glass-dark overflow-hidden"
          style={{
            borderTopLeftRadius: "24px",
            borderBottomLeftRadius: "24px",
            borderBottomRightRadius: "80px",
            borderTopRightRadius: "0px",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full px-12 lg:px-16 py-10 flex items-center">
          <div className="grid grid-cols-2 gap-8 lg:gap-16 w-full items-center">
            {/* LEFT CONTENT */}
            <div className="max-w-xl text-white">
              <SectionLabel
                variant="bubble-light"
                className="mb-4 font-manrope-extrabold text-xs leading-[18px] tracking-[0.2em]"
              >
                {data.eyebrow}
              </SectionLabel>

              <h2 className="font-plus-bold text-4xl lg:text-5xl text-white leading-tight tracking-[-1px] mb-6">
                {data.title}
              </h2>

              <div className="space-y-4 mb-8">
                {paragraphs.map((text, idx) => (
                  <p
                    key={idx}
                    className="text-white/80 font-manrope-regular text-base leading-relaxed"
                  >
                    {text}
                  </p>
                ))}
              </div>

              {data.button && (
                <Button
                  asChild
                  className="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white rounded-[1px] px-6 py-6 transition-colors text-base"
                >
                  <Link href={data.button.path || "/"}>
                    {data.button.title}
                  </Link>
                </Button>
              )}
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-end items-center">
              <div className="relative w-[420px] lg:w-[520px] aspect-square -mr-10">
                <Image
                  src={imageUrl}
                  alt={data.image?.alternativeText || "Catalog Image"}
                  fill
                  className="object-contain object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
