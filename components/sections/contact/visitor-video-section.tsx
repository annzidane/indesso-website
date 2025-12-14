"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export function VisitorVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scale, setScale] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Start animation when section enters viewport
      // Progress from 0 to 1 as section scrolls through viewport
      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.5)
        )
      );

      // Scale from 0.7 to 1 based on scroll progress
      const newScale = 0.7 + progress * 0.3;
      setScale(Math.min(1, newScale));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-24 bg-[#F8F8F8] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div
          className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover ${
              isPlaying ? "block" : "hidden"
            }`}
            controls={isPlaying}
            playsInline
          >
            <source src="/media/video_sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Thumbnail - Show when not playing */}
          {!isPlaying && (
            <>
              <Image
                src="/contact-us/video-thumb.png"
                alt="Visitor Center Video"
                fill
                className="object-cover"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  onClick={handlePlayClick}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Play
                    className="w-6 h-6 md:w-8 md:h-8 text-[#003557] ml-1"
                    fill="#003557"
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
