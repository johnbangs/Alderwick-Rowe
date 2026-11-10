import React, { useState } from "react";
import { getPropertyBySlug, properties, Property } from "../data/properties";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PropertyCard } from "../components/PropertyCard";
import { Link, useRouter } from "../context/RouterContext";
import { 
  Bed, 
  Bath, 
  Compass, 
  FileText, 
  Download, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  X, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Home
} from "lucide-react";

interface PropertyDetailPageProps {
  slug: string;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const property = getPropertyBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#F5F0E6]">
        <h1 className="font-serif text-3xl font-bold text-[#1F3A2E] mb-3">
          Property Not Found
        </h1>
        <p className="text-sm text-[#222222]/70 max-w-md mb-6">
          The property listing you requested could not be located or may have been successfully completed and archived.
        </p>
        <Link
          to="/properties"
          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] rounded hover:bg-[#162B22] transition-colors"
        >
          Return to property search
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number, freq: "one-off" | "pcm") => {
    const formatted = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0
    }).format(price);
    return freq === "pcm" ? `${formatted} pcm` : formatted;
  };

  // Similar properties: same region or closest price band (excluding this one)
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.region === property.region || Math.abs(p.price_gbp - property.price_gbp) < 100000))
    .slice(0, 3);

  const images = property.images && property.images.length > 0 ? property.images : ["/images/hero.jpg"];

  // RealEstateListing JSON-LD Schema
  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description.replace(/\n+/g, " "),
    "url": typeof window !== "undefined" ? window.location.href : `https://alderwickrowe.co.uk/properties/${property.slug}`,
    "offers": {
      "@type": "Offer",
      "price": property.price_gbp,
      "priceCurrency": "GBP",
      "availability": property.status === "For sale" || property.status === "To let" ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": property.area,
      "addressRegion": property.region,
      "addressCountry": "GB"
    },
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": 100,
      "unitCode": "MTK"
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />

      {/* 1. Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Properties", to: "/properties" },
          { label: property.area, to: `/properties?location=${encodeURIComponent(property.area)}` },
          { label: property.title }
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 mb-6 border-b border-[#1F3A2E]/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-[#1F3A2E]/10 text-[#1F3A2E] rounded-xs border border-[#1F3A2E]/20">
                {property.status}
              </span>
              <span className="text-xs text-[#222222]/50 font-medium">
                Ref: {property.id}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1F3A2E] tracking-tight">
              {property.title}
            </h1>
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-[#222222]/70 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#B08D57] shrink-0" aria-hidden="true" />
              <span>{property.address}</span>
            </p>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#B08D57] block">
              {property.price_frequency === "one-off" ? "Guide Price" : "Rental Price"}
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3A2E] tabular-nums">
              {formatPrice(property.price_gbp, property.price_frequency)}
            </div>
          </div>
        </div>

        {/* 2. Gallery & Sticky Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Viewport */}
            <div className="space-y-3">
              <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-black/5 border border-[#1F3A2E]/10 group">
                <img
                  src={images[activeImageIndex]}
                  alt={`${property.title} - View ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded bg-black/60 hover:bg-black/80 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Fullscreen</span>
                </button>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-16 shrink-0 rounded overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? "border-[#B08D57] shadow-xs" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Key Facts Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 p-4 bg-white rounded-lg border border-[#1F3A2E]/10 text-center">
              <div className="p-2 border-r border-[#1F3A2E]/10 last:border-0">
                <span className="block text-[11px] uppercase tracking-wider text-[#222222]/60 font-semibold">Bedrooms</span>
                <span className="font-serif text-lg font-bold text-[#1F3A2E]">{property.bedrooms}</span>
              </div>
              <div className="p-2 border-r border-[#1F3A2E]/10 last:border-0">
                <span className="block text-[11px] uppercase tracking-wider text-[#222222]/60 font-semibold">Bathrooms</span>
                <span className="font-serif text-lg font-bold text-[#1F3A2E]">{property.bathrooms}</span>
              </div>
              <div className="p-2 border-r border-[#1F3A2E]/10 last:border-0">
                <span className="block text-[11px] uppercase tracking-wider text-[#222222]/60 font-semibold">Receptions</span>
                <span className="font-serif text-lg font-bold text-[#1F3A2E]">{property.receptions || 1}</span>
              </div>
              <div className="p-2 border-r border-[#1F3A2E]/10 last:border-0">
                <span className="block text-[11px] uppercase tracking-wider text-[#222222]/60 font-semibold">Type</span>
                <span className="text-xs font-semibold text-[#1F3A2E] block truncate">{property.property_type}</span>
              </div>
              <div className="p-2 border-r border-[#1F3A2E]/10 last:border-0">
                <span className="block text-[11px] uppercase tracking-wider text-[#222222]/60 font-semibold">Tenure</span>
                <span className="text-xs font-semibold text-[#1F3A2E] block">{property.tenure || "Freehold"}</span>
              </div>
              <div className="p-2">
                <span className="block text-[11px] uppercase tracking-wider text-[#222222]/60 font-semibold">EPC Rating</span>
                <span className="font-serif text-lg font-bold text-emerald-800">{property.epc_rating || "B"}</span>
              </div>
            </div>

            {/* 4. Description & Key Features */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#1F3A2E]/10 space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F3A2E] mb-4">
                  Property Description
                </h2>
                <div className="prose prose-sm max-w-none text-[#222222]/85 leading-relaxed space-y-4">
                  {property.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#1F3A2E]/10">
                <h3 className="font-serif text-lg font-bold text-[#1F3A2E] mb-3">
                  Key Features &amp; Specifications
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#222222]/85">
                  {property.key_features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 5. Documents Section */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#1F3A2E]/10">
              <h2 className="font-serif text-xl font-bold text-[#1F3A2E] mb-2">
                Documents &amp; Particulars
              </h2>
              <p className="text-xs text-[#222222]/70 mb-4">
                Authoritative architectural schedules, floorplans, and statutory certification available for immediate inspection.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {property.documents?.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded border border-[#1F3A2E]/15 bg-[#FAF7F0] hover:bg-white hover:border-[#B08D57] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#B08D57]" />
                      <span className="text-xs font-semibold text-[#1F3A2E] group-hover:text-[#B08D57] transition-colors">
                        {doc.label}
                      </span>
                    </div>
                    <Download className="w-3.5 h-3.5 text-[#222222]/50 group-hover:text-[#1F3A2E]" />
                  </a>
                ))}
              </div>
            </div>

            {/* 6. Map Section */}
            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10">
              <h2 className="font-serif text-xl font-bold text-[#1F3A2E] mb-3">
                Location &amp; Vicinity
              </h2>
              <div className="aspect-21/9 rounded bg-[#FAF7F0] border border-[#1F3A2E]/10 flex flex-col items-center justify-center text-center p-6 text-[#1F3A2E]">
                <MapPin className="w-8 h-8 text-[#B08D57] mb-2" />
                <span className="font-serif text-base font-bold text-[#1F3A2E]">{property.area}</span>
                <span className="text-xs text-[#222222]/60 mt-1">{property.address}</span>
                <span className="text-[11px] text-[#B08D57] mt-2 font-medium">
                  Coordinates: {property.latitude || 53.48}, {property.longitude || -2.24} · Ordnance Survey Registered
                </span>
              </div>
            </div>
          </div>

          {/* Sticky Enquiry Card (Desktop Right Rail) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-lg border border-[#1F3A2E]/15 shadow-md space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B08D57] block mb-1">
                  Enquiry Desk
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1F3A2E]">
                  Interested in this property?
                </h3>
                <p className="text-xs text-[#222222]/70 mt-1 leading-relaxed">
                  Arrange a private accompanied inspection or speak with the handling partner regarding terms and progression.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to={`/book-viewing?property=${property.id}`}
                  className="w-full h-11 flex items-center justify-center gap-2 px-4 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#B08D57]" />
                  <span>Book a viewing</span>
                </Link>

                <Link
                  to={`/enquire?property=${property.id}`}
                  className="w-full h-11 flex items-center justify-center gap-2 px-4 rounded text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#1F3A2E]" />
                  <span>Enquire about this property</span>
                </Link>
              </div>

              {/* Partner Contact Information */}
              <div className="pt-4 border-t border-[#1F3A2E]/10 space-y-2.5 text-xs text-[#222222]/80">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#B08D57] shrink-0" />
                  <span>Accompanied inspections by appointment only</span>
                </div>
                <div className="text-[11px] text-[#222222]/60 pt-1">
                  Direct Line:{" "}
                  <a href="tel:+441618329400" className="text-[#1F3A2E] font-semibold hover:underline">
                    +44 (0) 161 832 9400
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* 8. Similar Properties Grid */}
        {similarProperties.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#1F3A2E]/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
                  Alternative Selections
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1F3A2E]">
                  Similar Properties
                </h2>
              </div>
              <Link
                to="/properties"
                className="text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] hover:text-[#B08D57] transition-colors"
              >
                View all properties
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Persistent Floating "Enquire" Button for Mobile / Viewport */}
      <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-30">
        <Link
          to={`/enquire?property=${property.id}`}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#1F3A2E] text-white hover:bg-[#162B22] shadow-xl border border-[#B08D57]/50 text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95"
          aria-label={`Enquire about ${property.title}`}
        >
          <MessageSquare className="w-4 h-4 text-[#B08D57]" />
          <span>Enquire</span>
        </Link>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 text-white backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-wider text-[#B08D57]">
              {activeImageIndex + 1} of {images.length} · {property.title}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={images[activeImageIndex]}
              alt={`${property.title} high resolution`}
              className="max-h-[80vh] max-w-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="text-center text-xs text-white/60">
            Press ESC or click close to return
          </div>
        </div>
      )}
    </div>
  );
};
