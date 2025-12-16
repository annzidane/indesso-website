import Link from "next/link";
import React from "react";

interface ContentLinkProps {
  path?: string;
  locale?: string | null;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  title?: React.ReactNode;
  target?: string;
  rel?: string;
}

export function ContentLink({
  path = "/",
  locale,
  className,
  style,
  children,
  title,
  target,
  rel,
}: ContentLinkProps) {
  const to = path || "/";

  // External URL -> render <a>
  if (/^https?:\/\//i.test(to)) {
    return (
      <a
        href={to}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={className}
        style={style}
      >
        {children ?? title}
      </a>
    );
  }

  // Internal path -> ensure leading slash then optionally prefix locale
  const pathWithLeading = to.startsWith("/") ? to : `/${to}`;
  const href = locale ? `/${locale}${pathWithLeading}` : pathWithLeading;

  return (
    <Link href={href} className={className} style={style}>
      {children ?? title}
    </Link>
  );
}

export default ContentLink;
