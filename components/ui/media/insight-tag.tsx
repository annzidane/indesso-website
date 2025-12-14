import { cn } from "@/lib/utils";

interface InsightTagProps {
  tag: string;
  className?: string;
  variant?: "default" | "filter";
  active?: boolean;
  onClick?: () => void;
}

export function InsightTag({
  tag,
  className,
  variant = "default",
  active = false,
  onClick
}: InsightTagProps) {
  if (variant === "filter") {
    return (
      <button
        onClick={onClick}
        className={cn(
          "font-plus-bold text-sm md:text-base px-3 py-1 rounded transition-colors",
          active
            ? "bg-[#1099D6] text-white"
            : "bg-[#1099D61A] text-[#003557] hover:bg-[#1099D633]",
          className
        )}
        style={{
          borderRadius: "4px",
          padding: "4px 12px",
          lineHeight: "24px",
          letterSpacing: "0%",
        }}
      >
        {tag}
      </button>
    );
  }

  return (
    <span
      className={cn(
        "font-plus-bold inline-block",
        className
      )}
      style={{
        borderRadius: "4px",
        padding: "4px 12px",
        background: "#1099D61A",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0%",
        color: "#003557",
      }}
    >
      {tag}
    </span>
  );
}
