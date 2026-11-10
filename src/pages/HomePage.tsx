import React, { useState } from "react";
import { Link, useRouter } from "../context/RouterContext";
import { properties } from "../data/properties";
import { PropertyCard } from "../components/PropertyCard";
import { 
  Search, 
  Building, 
  Award, 
  Users, 
  MapPin, 
  ArrowRight, 
  Compass, 
  KeyRound, 
  Clock, 
  Quote 
} from "lucide-react";

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();

  // Search Bar State
  const [location, setLocation] = useState("");
  const [transaction, setTransaction] = useState<string>("All");
  const [propertyType, setPropertyType] = useState<string>("All");
  const [bedrooms, setBedrooms] = useState<string>("All");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (transaction !== "All") params.set("transaction", transaction);
    if (propertyType !== "All") params.set("type", propertyType);
    if (bedrooms !== "All") params.set("beds", bedrooms);

    const queryString = params.toString();
    navigate(`/properties${queryString ? `?${queryString}` : ""}`);
  };

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Alderwick & Rowe",
    "image": typeof window !== "undefined" ? `${window.location.origin}/images/hero.jpg` : "https://alderwickrowe.co.uk/images/hero.jpg",
    "description": "Established British estate agency providing property sales, lettings, and asset management across England, Scotland, and Wales.",
    "telephone": "+441618329400",
    "email": "enquiries@alderwickrowe.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "42 St Ann Street",
      "addressLocality": "Manchester",
      "postalCode": "M2 7EF",
      "addressCountry": "GB"
    },
    "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-16:00",
    "priceRange": "£900 - £1,500,000"
  };

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-[#1F3A2E] text-white overflow-hidden">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.jpg"
            alt="British Georgian residential property in England"
            className="w-full h-full object-cover object-center brightness-75 contrast-105"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#162B22]/95 via-[#1F3A2E]/60 to-[#1F3A2E]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#FAF7F0] text-xs uppercase tracking-widest font-semibold mb-6">
            <span>Established 1988 · Chartered Surveyors</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Property, handled properly.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#F5F0E6]/90 max-w-2xl font-normal leading-relaxed">
            Sales, lettings and management across the UK. Quietly authoritative representation for vendors, purchasers, landlords, and tenants.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/properties"
              className="px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#F5F0E6] hover:bg-white shadow-sm transition-all"
            >
              Browse properties
            </Link>
            <Link
              to="/book-viewing"
              className="px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#B08D57] hover:bg-[#C5A46F] shadow-sm transition-all"
            >
              Book a viewing
            </Link>
          </div>

          {/* Compact Overlaid Search Bar */}
          <div className="mt-10 w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4 text-[#222222] shadow-xl border border-white/20">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end text-left">
              {/* Location Input */}
              <div className="lg:col-span-2 space-y-1">
                <label htmlFor="search-location" className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A2E]">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#B08D57] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="search-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Manchester, Bristol, Edinburgh"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                  />
                </div>
              </div>

              {/* Transaction Type */}
              <div className="space-y-1">
                <label htmlFor="search-transaction" className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A2E]">
                  Transaction
                </label>
                <select
                  id="search-transaction"
                  value={transaction}
                  onChange={(e) => setTransaction(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                >
                  <option value="All">All Transactions</option>
                  <option value="Purchase">For Sale</option>
                  <option value="Rental">To Let</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-1">
                <label htmlFor="search-bedrooms" className="block text-xs font-semibold uppercase tracking-wider text-[#1F3A2E]">
                  Bedrooms
                </label>
                <select
                  id="search-bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                >
                  <option value="All">Any Beds</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full h-9 flex items-center justify-center gap-1.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded transition-colors shadow-xs cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="bg-white border-y border-[#1F3A2E]/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded bg-[#FAF7F0] text-[#1F3A2E] shrink-0 border border-[#1F3A2E]/10">
                <Building className="w-5 h-5 text-[#B08D57]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E]">
                  Properties across the UK
                </h2>
                <p className="text-xs text-[#222222]/70 mt-0.5">
                  Prime listings in England, Scotland, and Wales.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded bg-[#FAF7F0] text-[#1F3A2E] shrink-0 border border-[#1F3A2E]/10">
                <Compass className="w-5 h-5 text-[#B08D57]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E]">
                  Local experts
                </h2>
                <p className="text-xs text-[#222222]/70 mt-0.5">
                  Over three decades of regional market mastery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded bg-[#FAF7F0] text-[#1F3A2E] shrink-0 border border-[#1F3A2E]/10">
                <Award className="w-5 h-5 text-[#B08D57]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E]">
                  Regulated &amp; insured
                </h2>
                <p className="text-xs text-[#222222]/70 mt-0.5">
                  RICS chartered governance and CMP protection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded bg-[#FAF7F0] text-[#1F3A2E] shrink-0 border border-[#1F3A2E]/10">
                <Users className="w-5 h-5 text-[#B08D57]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E]">
                  Client-first service
                </h2>
                <p className="text-xs text-[#222222]/70 mt-0.5">
                  Dedicated personal director on every transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="py-16 sm:py-24 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B08D57] block mb-1">
                Curated Portfolio
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
                Featured Properties
              </h2>
            </div>
            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] hover:text-[#B08D57] transition-colors"
            >
              <span>View all properties</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} priority={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#1F3A2E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B08D57] block mb-1">
              End-to-End Property Advisory
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
              Services Tailored to Your Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#222222]/70 mt-2">
              Whether purchasing a family home, seeking a luxury tenancy, or optimising an investment portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Buyers */}
            <div className="bg-[#FAF7F0] p-8 rounded-lg border border-[#1F3A2E]/10 flex flex-col justify-between hover:border-[#B08D57]/50 transition-colors">
              <div>
                <div className="w-10 h-10 rounded bg-[#1F3A2E] text-[#B08D57] flex items-center justify-center mb-5">
                  <Compass className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F3A2E] mb-2">
                  For Buyers
                </h3>
                <p className="text-xs sm:text-sm text-[#222222]/75 leading-relaxed mb-6">
                  Access off-market opportunities, expert chain progression, and bespoke search representation across prime UK locations.
                </p>
              </div>
              <Link
                to="/buyers"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] hover:text-[#B08D57] transition-colors"
              >
                <span>Buyer services</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Tenants */}
            <div className="bg-[#FAF7F0] p-8 rounded-lg border border-[#1F3A2E]/10 flex flex-col justify-between hover:border-[#B08D57]/50 transition-colors">
              <div>
                <div className="w-10 h-10 rounded bg-[#1F3A2E] text-[#B08D57] flex items-center justify-center mb-5">
                  <KeyRound className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F3A2E] mb-2">
                  For Tenants
                </h3>
                <p className="text-xs sm:text-sm text-[#222222]/75 leading-relaxed mb-6">
                  Transparent tenancy agreements, protected deposit schemes, and high-specification residences maintained to meticulous standards.
                </p>
              </div>
              <Link
                to="/tenants"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] hover:text-[#B08D57] transition-colors"
              >
                <span>Tenant services</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Landlords */}
            <div className="bg-[#FAF7F0] p-8 rounded-lg border border-[#1F3A2E]/10 flex flex-col justify-between hover:border-[#B08D57]/50 transition-colors">
              <div>
                <div className="w-10 h-10 rounded bg-[#1F3A2E] text-[#B08D57] flex items-center justify-center mb-5">
                  <Building className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F3A2E] mb-2">
                  For Landlords
                </h3>
                <p className="text-xs sm:text-sm text-[#222222]/75 leading-relaxed mb-6">
                  Full letting management, statutory safety compliance, rigorous tenant referencing, and accurate portfolio valuations.
                </p>
              </div>
              <Link
                to="/landlords"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] hover:text-[#B08D57] transition-colors"
              >
                <span>Landlord management</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY ALDERWICK & ROWE */}
      <section className="py-16 sm:py-20 bg-[#FAF7F0] border-t border-[#1F3A2E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B08D57] block mb-1">
              The Firm Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
              Why Alderwick &amp; Rowe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1F3A2E]">
                <MapPin className="w-4 h-4 text-[#B08D57]" aria-hidden="true" />
                <span>01. Local Knowledge</span>
              </div>
              <p className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed">
                Our directors have lived and worked within their regional enclaves for decades, offering nuanced advice on micro-markets, school catchment boundaries, and heritage preservation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1F3A2E]">
                <Clock className="w-4 h-4 text-[#B08D57]" aria-hidden="true" />
                <span>02. End-to-End Support</span>
              </div>
              <p className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed">
                From initial market appraisal through to conveyancing progression and key handover, you deal with a designated chartered professional who knows your file in detail.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1F3A2E]">
                <Award className="w-4 h-4 text-[#B08D57]" aria-hidden="true" />
                <span>03. Transparent Process</span>
              </div>
              <p className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed">
                Clear terms of business, no hidden administration surcharges, and candid advice grounded in verifiable comparable evidence rather than inflated speculative quotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#1F3A2E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B08D57] block mb-1">
              Client Feedback
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1F3A2E]">
              Reputation Built on Trust
            </h2>
            <p className="text-[11px] text-[#222222]/50 italic mt-1">
              Illustrative excerpts from recent client surveys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <blockquote className="p-6 rounded-lg bg-[#FAF7F0] border border-[#1F3A2E]/10 space-y-3">
              <Quote className="w-6 h-6 text-[#B08D57]/60" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-[#222222]/85 italic leading-relaxed">
                &ldquo;Alderwick &amp; Rowe managed the sale of our period house in Didsbury with exemplary discretion. Their pricing guidance was exact, and the conveyancing liaison kept the chain together when complications arose.&rdquo;
              </p>
              <footer className="pt-2 border-t border-[#1F3A2E]/10 text-xs">
                <span className="font-bold text-[#1F3A2E] block">Dr. Alistair &amp; Clare Finch</span>
                <span className="text-[#222222]/60">Vendors · Didsbury, Greater Manchester</span>
              </footer>
            </blockquote>

            <blockquote className="p-6 rounded-lg bg-[#FAF7F0] border border-[#1F3A2E]/10 space-y-3">
              <Quote className="w-6 h-6 text-[#B08D57]/60" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-[#222222]/85 italic leading-relaxed">
                &ldquo;As an overseas landlord with residential assets in Edinburgh and Manchester, having a dependable team who respond within hours and handle maintenance with trusted local tradesmen is invaluable.&rdquo;
              </p>
              <footer className="pt-2 border-t border-[#1F3A2E]/10 text-xs">
                <span className="font-bold text-[#1F3A2E] block">Eleanor Vance</span>
                <span className="text-[#222222]/60">Portfolio Landlord · Scotland &amp; North West</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 7. CTA BAND */}
      <section className="py-14 sm:py-16 bg-[#1F3A2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E6] max-w-2xl mx-auto">
            Thinking of selling, letting or buying?
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E6]/80 max-w-xl mx-auto mt-2">
            Speak with our partners in confidence or register your search criteria to receive discrete previews of incoming instructions.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/enquire"
              className="px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] transition-colors shadow-xs"
            >
              Register your requirements
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-[#F5F0E6] bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            >
              Contact our offices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
