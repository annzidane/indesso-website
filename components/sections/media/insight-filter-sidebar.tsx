"use client";

import { cn } from "@/lib/utils";

interface InsightTopic {
  title: string;
  slug: string;
}

interface InsightFilterSidebarProps {
  topics: InsightTopic[];
  selectedTopic: string | null; // slug
  onTopicSelect: (topicSlug: string | null) => void;
}

// Chevron Right Icon
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InsightFilterSidebar({
  topics,
  selectedTopic,
  onTopicSelect,
}: InsightFilterSidebarProps) {
  return (
    <aside className="w-full lg:w-[200px] flex-shrink-0">
      <div className="sticky top-24">
        {/* All Topics Button */}
        <button
          onClick={() => onTopicSelect(null)}
          className={cn(
            "w-full flex items-center justify-between py-4 text-left font-plus-bold text-base transition-colors border-b border-[#EAEAEA]",
            selectedTopic === null
              ? "text-[#00548B]"
              : "text-[#555555] hover:text-[#00548B]"
          )}
        >
          <span>All Topics</span>
          {selectedTopic === null && <ChevronRight />}
        </button>

        {/* Topic List */}
        <div className="flex flex-col">
          {topics.map((topic) => (
            <button
              key={topic.slug}
              onClick={() => onTopicSelect(topic.slug)}
              className={cn(
                "w-full flex items-center justify-between py-4 text-left text-base transition-colors border-b border-[#EAEAEA]",
                selectedTopic === topic.slug
                  ? "text-[#00548B] font-plus-bold"
                  : "text-[#555555] hover:text-[#00548B] font-plus-medium"
              )}
            >
              <span>{topic.title}</span>
              {selectedTopic === topic.slug && <ChevronRight />}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
