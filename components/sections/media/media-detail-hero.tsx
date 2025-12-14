import Image from "next/image";

interface MediaDetailHeroProps {
  title: string;
  date: string;
  image: string;
}

export function MediaDetailHero({ title, date, image }: MediaDetailHeroProps) {
  return (
    <section className="relative pt-20 md:pt-24">
      {/* Full page background blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/media-bg-blur.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Date */}
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
            className="font-plus-bold text-3xl md:text-5xl mb-8 md:mb-12"
            style={{
              color: "#003557",
              lineHeight: "1.2",
              letterSpacing: "-3%",
            }}
          >
            {title}
          </h1>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
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
    </section>
  );
}
