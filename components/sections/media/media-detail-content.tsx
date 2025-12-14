"use client";

import Image from "next/image";

interface MediaDetailContentProps {
  content: string;
  title: string;
}

export function MediaDetailContent({
  content,
  title,
}: MediaDetailContentProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

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

  return (
    <section className="pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-12 lg:pb-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Share Section - Mobile */}
          <div className="flex lg:hidden items-center gap-4 mb-8 md:mb-12">
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
              Share This!
            </span>

            {/* Social Icons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleShare("facebook")}
                className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Share on Facebook"
              >
                <Image
                  src="/media/icon-fb.png"
                  alt="Facebook"
                  width={32}
                  height={32}
                />
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Share on X"
              >
                <Image src="/media/icon-x.png" alt="X" width={32} height={32} />
              </button>
              <button
                onClick={() => handleShare("telegram")}
                className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Share on Telegram"
              >
                <Image
                  src="/media/icon-telegram.png"
                  alt="Telegram"
                  width={32}
                  height={32}
                />
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Share on WhatsApp"
              >
                <Image
                  src="/media/icon-whatsapp.png"
                  alt="WhatsApp"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>

          {/* Share Section - Desktop Floating */}
          <div className="hidden lg:block fixed left-8 top-1/3 z-10">
            <div className="flex flex-col items-center gap-4">
              {/* Share This text - horizontal */}
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

              {/* Social Icons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Share on Facebook"
                >
                  <Image
                    src="/media/icon-fb.png"
                    alt="Facebook"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Share on X"
                >
                  <Image
                    src="/media/icon-x.png"
                    alt="X"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  onClick={() => handleShare("telegram")}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Share on Telegram"
                >
                  <Image
                    src="/media/icon-telegram.png"
                    alt="Telegram"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Share on WhatsApp"
                >
                  <Image
                    src="/media/icon-whatsapp.png"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className="max-w-none [&>div>p]:mb-6 [&>div>p:last-child]:mb-0"
            style={{
              fontFamily: "Manrope",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "28px",
              color: "#555555",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </section>
  );
}
