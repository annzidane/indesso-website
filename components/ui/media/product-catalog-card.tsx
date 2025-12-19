import Image from "next/image";

interface ProductCatalogCardProps {
  title: string;
  image?: string;
  downloadUrl?: string;
}

export function ProductCatalogCard({
  title,
  image,
  downloadUrl = "#",
}: ProductCatalogCardProps) {
  const imageSrc = image || "/media/media-product-catalog.png";
  return (
    <div className="flex flex-col items-center">
      {/* Card Container with Border */}
      <div className="w-full border border-[#EAEAEA] rounded-[4px] p-4 md:p-5 lg:p-6 flex flex-col items-center">
        {/* Image */}
        <div className="relative w-full aspect-[3/4] mb-4">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h3
          className="font-plus-bold text-sm md:text-base text-[#001932] text-center mb-4"
          style={{
            lineHeight: "24px",
          }}
        >
          {title}
        </h3>

        {/* Download Button */}
        <a
          href={downloadUrl}
          download
          className="w-full max-w-[240px] flex items-center justify-center font-manrope-medium text-sm md:text-base text-[#00548B] hover:bg-[#00548B] hover:text-white transition-colors"
          style={{
            height: "56px",
            borderRadius: "2px",
            border: "1px solid #00548B",
            padding: "18px 24px",
          }}
        >
          Download
        </a>
      </div>
    </div>
  );
}
