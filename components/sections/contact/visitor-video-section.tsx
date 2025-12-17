"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VisitorVideoProps {
  data?: any
}

function getYouTubeEmbedUrl(url: string) {
  try {
    if (!url) return null
    // handle youtu.be short links
    const shortMatch = url.match(/youtu\.be\/([\w-]+)/)
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0`

    // handle full youtube url
    const fullMatch = url.match(/[?&]v=([\w-]+)/)
    if (fullMatch) return `https://www.youtube.com/embed/${fullMatch[1]}?autoplay=1&rel=0`

    // fallback: return original (may already be embed)
    return url
  } catch (e) {
    return null
  }
}

export function VisitorVideoSection({ data }: VisitorVideoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scale, setScale] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.5))
      );

      const newScale = 0.7 + progress * 0.3;
      setScale(Math.min(1, newScale));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const videoLink = data?.link
  const media = data?.media || data?.image || null

  const youTubeEmbed = videoLink ? getYouTubeEmbedUrl(videoLink) : null
  const videoSrc = !youTubeEmbed && media?.url && media.url.endsWith(".mp4") ? media.url : null

  // Prefer larger formats to avoid upscaling a small thumbnail (which causes blur).
  const thumbnail =
    media?.formats?.large?.url ||
    media?.formats?.medium?.url ||
    media?.formats?.small?.url ||
    media?.formats?.thumbnail?.url ||
    media?.url ||
    "/contact-us/video-thumb.png"

  const handlePlayClick = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-24 bg-[#F8F8F8] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div
          className="relative w-full max-w-[1240px] mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 ease-out"
          style={{ transform: `scale(${scale})`, maxHeight: 712 }}
        >
          {/* If YouTube link -> render iframe when playing */}
          {youTubeEmbed && isPlaying && (
            <iframe
              src={youTubeEmbed}
              title="Visitor Center Video"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* If mp4 video -> render video element */}
          {videoSrc && (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover ${isPlaying ? "block" : "hidden"}`}
              controls={isPlaying}
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Thumbnail when not playing */}
          {!isPlaying && (
            <>
              <Image src={thumbnail} alt="Visitor Center Video" fill className="object-cover" />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  onClick={handlePlayClick}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-[#003557] ml-1" fill="#003557" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
