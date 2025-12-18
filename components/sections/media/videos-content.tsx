"use client";

import { useState } from "react";
import Image from "next/image";
import { VideoFeaturedCard } from "@/components/ui/media/video-featured-card";
import { VideoGalleryCard } from "@/components/ui/media/video-gallery-card";

// Video data for the featured section
const featuredVideos = [
  {
    id: "v1",
    title: "Bunga Mas Journey: Nurtured by Nature, Crafted for Radiance",
    subtitle: "BUNGA MAS JOURNEY",
    thumbnail: "/media/video-featured-big.png",
    videoUrl: "/media/video_sample.mp4",
  },
  {
    id: "v2",
    title: "Clove Journey: From Fallen Leaves to Every...",
    subtitle: "CLOVE JOURNEY",
    thumbnail: "/media/video-featured-1.png",
    videoUrl: "/media/video_sample.mp4",
  },
  {
    id: "v3",
    title: "Indesso Visitor Center Highlights",
    subtitle: "",
    thumbnail: "/media/video-featured-2.png",
    videoUrl: "/media/video_sample.mp4",
  },
];

// Video data for the gallery section
const galleryVideos = [
  {
    id: "g1",
    title: "Indesso Company Profile",
    thumbnail: "/media/video-gallery-1.png",
    videoUrl: "/media/video_sample.mp4",
  },
  {
    id: "g2",
    title: "Culinaroma Profile",
    thumbnail: "/media/video-gallery-2.png",
    videoUrl: "/media/video_sample.mp4",
  },
  {
    id: "g3",
    title: "Indesso Visitor Center",
    thumbnail: "/media/video-gallery-3.png",
    videoUrl: "/media/video_sample.mp4",
  },
  {
    id: "g4",
    title: "Indesso Logo Philosophy",
    thumbnail: "/media/video-gallery-4.png",
    videoUrl: "/media/video_sample.mp4",
  },
];

export function VideosContent({ label }: { label?: string }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handlePlayVideo = (videoUrl: string) => {
    setActiveVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Featured Videos Section with Full-Width Background */}
      <div className="relative">
        {/* Full-width Background Blur Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/media-bg-blur.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Featured Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:min-h-[520px] lg:min-h-[600px]">
            {/* Large Video - Left */}
            <VideoFeaturedCard
              title={featuredVideos[0].title}
              subtitle={featuredVideos[0].subtitle}
              thumbnail={featuredVideos[0].thumbnail}
              videoUrl={featuredVideos[0].videoUrl}
              variant="large"
              className="h-full"
              onPlay={() => handlePlayVideo(featuredVideos[0].videoUrl)}
            />

            {/* Right Column - 2 Smaller Videos */}
            <div className="flex flex-col gap-4 md:gap-6 h-full">
              <VideoFeaturedCard
                title={featuredVideos[1].title}
                subtitle={featuredVideos[1].subtitle}
                thumbnail={featuredVideos[1].thumbnail}
                videoUrl={featuredVideos[1].videoUrl}
                variant="small"
                className="flex-1"
                onPlay={() => handlePlayVideo(featuredVideos[1].videoUrl)}
              />
              <VideoFeaturedCard
                title={featuredVideos[2].title}
                subtitle={featuredVideos[2].subtitle}
                thumbnail={featuredVideos[2].thumbnail}
                videoUrl={featuredVideos[2].videoUrl}
                variant="small"
                className="flex-1"
                onPlay={() => handlePlayVideo(featuredVideos[2].videoUrl)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Gallery Section */}
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-6 mb-6 md:mb-8">
          <h2
            className="font-plus-bold text-xl md:text-2xl lg:text-3xl whitespace-nowrap"
            style={{
              color: "#003557",
              fontStyle: "italic",
            }}
          >
            {label || "Video Gallery"}
          </h2>
          <div className="flex-1 h-[2px] bg-[#EAEAEA]" />
        </div>

        {/* Gallery Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {galleryVideos.map((video) => (
            <VideoGalleryCard
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              videoUrl={video.videoUrl}
              onPlay={() => handlePlayVideo(video.videoUrl)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={handleCloseVideo}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Video Player */}
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full aspect-video rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
