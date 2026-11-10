import React, { useState } from "react";
import { Property } from "../data/properties";
import { Link } from "../context/RouterContext";
import { Bed, Bath, ArrowUpRight, Home } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, priority = false }) => {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number, freq: "one-off" | "pcm") => {
    const formatted = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0
    }).format(price);

    return freq === "pcm" ? `${formatted} pcm` : formatted;
  };

  const getStatusColor = (status: Property["status"]) => {
    switch (status) {
      case "For sale":
        return "text-[#1F3A2E] bg-[#1F3A2E]/10 border-[#1F3A2E]/20";
      case "To let":
        return "text-[#B08D57] bg-[#B08D57]/10 border-[#B08D57]/30";
      case "Under offer":
      case "Sold STC":
      case "Let agreed":
        return "text-amber-800 bg-amber-50 border-amber-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const imageSrc = property.images && property.images.length > 0 ? property.images[0] : "";

  return (
    <article className="group bg-white rounded-lg border border-[#1F3A2E]/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F0]">
        {!imageError && imageSrc ? (
          <img
            src={imageSrc}
            alt={`${property.title} in ${property.area}`}
            loading={priority ? "eager" : "lazy"}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1F3A2E]/10 to-[#B08D57]/10 p-6 text-center text-[#1F3A2E]">
            <Home className="w-10 h-10 mb-2 opacity-50 text-[#1F3A2E]" aria-hidden="true" />
            <span className="font-serif text-sm font-semibold text-[#1F3A2E]">{property.title}</span>
            <span className="text-xs text-[#222222]/70 mt-1">{property.area}</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-sm border backdrop-blur-xs ${getStatusColor(
              property.status
            )}`}
          >
            {property.status}
          </span>
        </div>

        {/* Transaction Tag */}
        {property.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#1F3A2E] text-white rounded-xs shadow-xs">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#1F3A2E] tabular-nums">
              {formatPrice(property.price_gbp, property.price_frequency)}
            </span>
            {property.price_frequency === "one-off" && (
              <span className="text-[11px] text-[#222222]/60 font-medium">Guide price</span>
            )}
          </div>

          {/* Area & Location */}
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B08D57] mb-1">
            {property.area}
          </p>

          {/* Title */}
          <h3 className="font-serif text-base font-semibold text-[#222222] group-hover:text-[#1F3A2E] transition-colors line-clamp-1 mb-2">
            <Link to={`/properties/${property.slug}`} className="focus:outline-none">
              {property.title}
            </Link>
          </h3>

          {/* Unboxed Metadata with Typographic Separators (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#222222]/75 mb-4">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-[#B08D57]" aria-hidden="true" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"}</span>
            </span>
            <span aria-hidden="true" className="text-[#222222]/30">·</span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-[#B08D57]" aria-hidden="true" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? "bath" : "baths"}</span>
            </span>
            <span aria-hidden="true" className="text-[#222222]/30">·</span>
            <span className="truncate">{property.property_type}</span>
          </div>
        </div>

        {/* Card Footer Link */}
        <div className="pt-3 border-t border-[#1F3A2E]/10 flex items-center justify-between">
          <span className="text-xs text-[#222222]/60 font-medium">
            Ref: {property.id}
          </span>
          <Link
            to={`/properties/${property.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F3A2E] group-hover:text-[#B08D57] transition-colors"
          >
            <span>View property</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};
