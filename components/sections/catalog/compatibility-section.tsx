"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface Application {
  title: string;
  icon: string;
}

interface CompatibilitySectionProps {
  applications: Application[];
  title?: string;
  description?: string;
  accordionTitle?: string;
}

export function CompatibilitySection({
  applications,
  title,
  description,
  accordionTitle,
}: CompatibilitySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="py-12 md:py-16 lg:py-20"
      style={{
        backgroundImage: "url('/application-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
          <h2
            className="font-plus-bold text-2xl md:text-3xl lg:text-4xl mb-4"
            style={{
              color: "#003557",
              letterSpacing: "-1px",
            }}
          >
            {title ?? ""}
          </h2>
          <p
            className="font-manrope-regular text-sm md:text-base"
            style={{ color: "#333333", lineHeight: "24px" }}
          >
            {description ?? ""}
          </p>
        </div>

        {/* Application Section */}
        <div className="max-w-8xl mx-auto">
          {/* Section Header with Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-6 py-4 md:px-8 md:py-6 transition-colors"
            style={{
              background:
                "linear-gradient(90deg, #00548B 0%, rgba(0, 84, 139, 0.8) 100%)",
              borderTopLeftRadius: "2px",
              borderTopRightRadius: "2px",
              borderBottomLeftRadius: isExpanded ? "0" : "2px",
              borderBottomRightRadius: isExpanded ? "0" : "2px",
            }}
          >
              <span
                className="font-plus-bold text-lg md:text-xl text-white"
              >
                {accordionTitle ?? ""}
              </span>
            <ChevronDown
              className={`w-6 h-6 text-white transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Application List */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{
              background: "#FFFFFF",
              border: "1px solid #EAEAEA",
              borderTop: "none",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            <div className="divide-y divide-gray-200">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 px-6 py-4 md:px-8 md:py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={app.icon}
                      alt={app.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span
                    className=" text-sm md:text-base"
                    style={{ color: "#003557" }}
                  >
                    {app.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* All Applications Link */}
          {!isExpanded && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsExpanded(true)}
                className="font-plus-bold text-sm md:text-base hover:underline transition-all inline-flex items-center gap-2"
                style={{ color: "#00548B" }}
              >
                <span>◆</span>
                <span>All Application</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
