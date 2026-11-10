import React from "react";
import { Link } from "../context/RouterContext";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": typeof window !== "undefined" ? window.location.origin : "https://alderwickrowe.co.uk"
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": item.label,
        ...(item.to ? { "item": `${typeof window !== "undefined" ? window.location.origin : "https://alderwickrowe.co.uk"}${item.to}` } : {})
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#222222]/70">
        <li>
          <Link to="/" className="hover:text-[#1F3A2E] hover:underline transition-colors font-medium">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-[#B08D57] shrink-0" aria-hidden="true" />
              {isLast || !item.to ? (
                <span className="text-[#1F3A2E] font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-[#1F3A2E] hover:underline transition-colors font-medium truncate max-w-[120px] sm:max-w-xs">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
