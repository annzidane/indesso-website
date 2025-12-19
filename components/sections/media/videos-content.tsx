"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { VideoFeaturedCard } from "@/components/ui/media/video-featured-card";
import { VideoGalleryCard } from "@/components/ui/media/video-gallery-card";

// Video data for the featured section
// We'll fetch videos from the server proxy `/api/videos`.
type VideoModel = {
  id: number | string;
  title?: string;
  url_video?: string;
  description?: string;
  publishedAt?: string;
}

function getYouTubeId(url?: string) {
  if (!url) return null
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  return ytMatch ? ytMatch[1] : null
}

const PLACEHOLDER_BIG = "/media/video-featured-big.png"
const PLACEHOLDER_SMALL = "/media/video-gallery-1.png"


export function VideosContent({ label }: { label?: string }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [featuredVideos, setFeaturedVideos] = useState<Array<any>>([])
  const [galleryVideos, setGalleryVideos] = useState<Array<any>>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/videos?pLevel=4&limit=100`)
        if (!res.ok) throw new Error(`Failed to fetch videos: ${res.status}`)
        const json = await res.json()
        const data = Array.isArray(json?.data) ? json.data : []

        const mapped: VideoModel[] = data.map((v: any) => ({
          id: v.id,
          title: v.title,
          url_video: v.url_video,
          description: v.description,
          publishedAt: v.publishedAt || v.publishedAt,
        }))

        if (!mounted) return

        // First 3 -> featured; rest -> gallery
        const first3 = mapped.slice(0, 3).map((m) => {
          const ytId = getYouTubeId(m.url_video)
          return {
            id: `v${m.id}`,
            title: m.title || '',
            subtitle: m.title ? m.title.toUpperCase() : '',
            thumbnail: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : PLACEHOLDER_BIG,
            videoUrl: m.url_video || '',
          }
        })

        const rest = mapped.slice(3).map((m) => {
          const ytId = getYouTubeId(m.url_video)
          return {
            id: `g${m.id}`,
            title: m.title || '',
            thumbnail: ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : PLACEHOLDER_SMALL,
            videoUrl: m.url_video || '',
          }
        })

        setFeaturedVideos(first3)
        setGalleryVideos(rest)
      } catch (e) {
        console.error('Error fetching videos', e)
        if (mounted) {
          setFeaturedVideos([])
          setGalleryVideos([])
        }
      }
    })()
    return () => { mounted = false }
  }, [])

  const handlePlayVideo = (videoUrl: string) => {
    setActiveVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  // Defensive defaults for featured slots to avoid reading undefined before fetch completes
  const fv0 = featuredVideos[0] || { title: "", subtitle: "", thumbnail: PLACEHOLDER_BIG, videoUrl: "" };
  const fv1 = featuredVideos[1] || { title: "", subtitle: "", thumbnail: PLACEHOLDER_SMALL, videoUrl: "" };
  const fv2 = featuredVideos[2] || { title: "", subtitle: "", thumbnail: PLACEHOLDER_SMALL, videoUrl: "" };

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
              title={fv0.title}
              subtitle={fv0.subtitle}
              thumbnail={fv0.thumbnail}
              videoUrl={fv0.videoUrl}
              variant="large"
              className="h-full"
              onPlay={() => handlePlayVideo(fv0.videoUrl)}
            />

            {/* Right Column - 2 Smaller Videos */}
            <div className="flex flex-col gap-4 md:gap-6 h-full">
              <VideoFeaturedCard
                title={fv1.title}
                subtitle={fv1.subtitle}
                thumbnail={fv1.thumbnail}
                videoUrl={fv1.videoUrl}
                variant="small"
                className="flex-1"
                onPlay={() => handlePlayVideo(fv1.videoUrl)}
              />
              <VideoFeaturedCard
                title={fv2.title}
                subtitle={fv2.subtitle}
                thumbnail={fv2.thumbnail}
                videoUrl={fv2.videoUrl}
                variant="small"
                className="flex-1"
                onPlay={() => handlePlayVideo(fv2.videoUrl)}
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
          <div className="flex-1 h-0.5 bg-[#EAEAEA]" />
        </div>

        {/* Gallery Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {galleryVideos.map((video: any) => (
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

            {/* Video Player: use iframe for YouTube links, otherwise native video */}
            {getYouTubeId(activeVideo || undefined) ? (
              <iframe
                width="100%"
                height="480"
                src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo || undefined)}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video rounded-lg"
              />
            ) : (
              <video
                src={activeVideo || undefined}
                controls
                autoPlay
                className="w-full aspect-video rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
