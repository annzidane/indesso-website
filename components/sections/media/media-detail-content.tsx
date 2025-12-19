"use client";

import { renderRichTextToReact } from "@/lib/strapi/utils";

interface MediaDetailContentProps {
  // Strapi rich text is usually an array of block objects; accept any to be flexible
  content: any;
  title: string;
}

export function MediaDetailContent({ content, title }: MediaDetailContentProps) {

  return (
    <section className="pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-12 lg:pb-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div
            className="max-w-none [&>div>p]:mb-6 [&>div>p:last-child]:mb-0"
            style={{
              fontFamily: "Manrope",
              fontWeight: 4000,
              fontSize: "16px",
              lineHeight: "28px",
              color: "#555555",
            }}
          >
            {/* Render Strapi rich text blocks safely to React nodes */}
            {renderRichTextToReact(content)}
          </div>
        </div>
      </div>
    </section>
  );
}
