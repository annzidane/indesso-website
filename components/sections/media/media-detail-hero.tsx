"use client";

import { InsightTag } from "@/components/ui/media/insight-tag";
import { MediaDetailRecord } from "@/types/strapi/media";
import Image from "next/image";

interface MediaDetailHeroProps {
  title: string;
  date: string;
  image: string;
  pageData?: MediaDetailRecord;
  tags?: any[];
}

export function MediaDetailHero({ title, date, image, pageData, tags = [] }: MediaDetailHeroProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title || "");
  const handleShare = (platform: string) => {
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };
  
  const cmsSocial: Array<any> | null = pageData?.media_detail?.social_media ?? null
  return (
    <section className="relative pt-20 md:pt-24">
      {/* Full page background blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src={pageData?.media_detail?.background_image?.url || "/media/media-bg-blur.png"}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
        <div className="max-w-4xl mx-auto relative">
          {/* Share Section - Mobile (placed inside hero so it stays near title on small screens) */}
          <div className="flex lg:hidden items-center gap-4 mb-4 md:mb-6">
            <span
              className="font-gotham"
              style={{
                fontWeight: 900,
                fontStyle: "italic",
                fontSize: "20px",
                lineHeight: "20px",
                letterSpacing: "-1.5%",
                color: "#00548B",
              }}
            >
              {pageData?.media_detail?.title_socmed || "Share This!"}
            </span>

            <div className="flex gap-3">
              {cmsSocial && cmsSocial.length > 0 ? (
                cmsSocial.map((s: any) => {
                  const href = s?.url || s?.link || "#"
                  const iconUrl = s?.icon?.url || s?.icon?.data?.attributes?.url || s?.icon
                  return (
                    <a
                      key={s.id || href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                      aria-label={`Share to ${href}`}
                    >
                      <Image src={iconUrl || "/media/icon-fb.png"} alt="share" width={32} height={32} />
                    </a>
                  )
                })
              ) : (
                // fallback to original share buttons
                <>
                  <button onClick={() => handleShare("facebook")} className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on Facebook">
                    <Image src="/media/icon-fb.png" alt="Facebook" width={32} height={32} />
                  </button>
                  <button onClick={() => handleShare("twitter")} className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on X">
                    <Image src="/media/icon-x.png" alt="X" width={32} height={32} />
                  </button>
                  <button onClick={() => handleShare("telegram")} className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on Telegram">
                    <Image src="/media/icon-telegram.png" alt="Telegram" width={32} height={32} />
                  </button>
                  <button onClick={() => handleShare("whatsapp")} className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on WhatsApp">
                    <Image src="/media/icon-whatsapp.png" alt="WhatsApp" width={32} height={32} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Desktop layout: place share column to the left of the content (not fixed) */}
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="hidden lg:flex lg:flex-col items-center gap-4 absolute -left-30 lg:-top-10">
              <div className="flex flex-col items-center">
                <span
                  className="font-gotham"
                  style={{
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "20px",
                    lineHeight: "20px",
                    letterSpacing: "-1.5%",
                    color: "#00548B",
                  }}
                >
                  Share
                </span>
                <span
                  className="font-gotham"
                  style={{
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "20px",
                    lineHeight: "20px",
                    letterSpacing: "-1.5%",
                    color: "#00548B",
                  }}
                >
                  This!
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {cmsSocial && cmsSocial.length > 0 ? (
                  cmsSocial.map((s: any) => (
                    <a key={s.id || s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                      <Image src={s?.icon?.url || s?.icon?.data?.attributes?.url || "/media/icon-fb.png"} alt={s?.url || "share"} width={32} height={32} />
                    </a>
                  ))
                ) : (
                  <>
                    <button onClick={() => handleShare("facebook")} className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on Facebook">
                      <Image src="/media/icon-fb.png" alt="Facebook" width={32} height={32} />
                    </button>
                    <button onClick={() => handleShare("twitter")} className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on X">
                      <Image src="/media/icon-x.png" alt="X" width={32} height={32} />
                    </button>
                    <button onClick={() => handleShare("telegram")} className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on Telegram">
                      <Image src="/media/icon-telegram.png" alt="Telegram" width={32} height={32} />
                    </button>
                    <button onClick={() => handleShare("whatsapp")} className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Share on WhatsApp">
                      <Image src="/media/icon-whatsapp.png" alt="WhatsApp" width={32} height={32} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1">
              <p
                className="font-manrope-regular text-sm md:text-base mb-4 md:mb-6"
                style={{
                  color: "#555555",
                  lineHeight: "24px",
                }}
              >
                {date}
              </p>

              {/* Title */}
              <h1
                className="font-plus-bold text-3xl md:text-5xl mb-8 md:mb-7"
                style={{
                  color: "#003557",
                  lineHeight: "1.2",
                  letterSpacing: "-3%",
                }}
              >
                {title}
              </h1>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto pb-10">
                  {tags.map((tag, index) => (
                    <InsightTag key={index} tag={tag} />
                  ))}
                </div>
              )}

              {/* Featured Image */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
