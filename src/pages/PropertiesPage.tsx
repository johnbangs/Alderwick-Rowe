import React, { useState, useMemo, useEffect } from "react";
import { properties, Property } from "../data/properties";
import { PropertyCard } from "../components/PropertyCard";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useRouter } from "../context/RouterContext";
import { 
  Filter, 
  X, 
  RotateCcw, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  Building,
  Check
} from "lucide-react";

const PROPERTY_TYPES = [
  "Semi-detached house",
  "Detached house",
  "Apartment",
  "Flat",
  "Cottage",
  "Townhouse",
  "Bungalow"
];

export const PropertiesPage: React.FC = () => {
  const { searchParams, updateSearchParams } = useRouter();

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter states initialized from URL params
  const [searchTerm, setSearchTerm] = useState(searchParams.get("location") || "");
  const [transaction, setTransaction] = useState<string>(searchParams.get("transaction") || "All");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const typeParam = searchParams.get("type");
    return typeParam ? typeParam.split(",").filter(Boolean) : [];
  });
  const [minBeds, setMinBeds] = useState<string>(searchParams.get("beds") || "All");
  const [minPrice, setMinPrice] = useState<string>(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("max_price") || "");
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "All");
  const [sortOption, setSortOption] = useState<string>(searchParams.get("sort") || "newest");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Sync state to URL params when filters change
  const applyFiltersToURL = () => {
    updateSearchParams({
      location: searchTerm.trim() || undefined,
      transaction: transaction !== "All" ? transaction : undefined,
      type: selectedTypes.length > 0 ? selectedTypes.join(",") : undefined,
      beds: minBeds !== "All" ? minBeds : undefined,
      min_price: minPrice || undefined,
      max_price: maxPrice || undefined,
      status: statusFilter !== "All" ? statusFilter : undefined,
      sort: sortOption !== "newest" ? sortOption : undefined
    });
  };

  useEffect(() => {
    applyFiltersToURL();
    setVisibleCount(12);
  }, [searchTerm, transaction, selectedTypes, minBeds, minPrice, maxPrice, statusFilter, sortOption]);

  const togglePropertyType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setTransaction("All");
    setSelectedTypes([]);
    setMinBeds("All");
    setMinPrice("");
    setMaxPrice("");
    setStatusFilter("All");
    setSortOption("newest");
  };

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm.trim()) count++;
    if (transaction !== "All") count++;
    if (selectedTypes.length > 0) count += selectedTypes.length;
    if (minBeds !== "All") count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    if (statusFilter !== "All") count++;
    return count;
  }, [searchTerm, transaction, selectedTypes, minBeds, minPrice, maxPrice, statusFilter]);

  // Client-side filtering
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Location / keyword search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesArea = prop.area.toLowerCase().includes(query);
        const matchesAddress = prop.address.toLowerCase().includes(query);
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesRegion = prop.region.toLowerCase().includes(query);
        if (!matchesArea && !matchesAddress && !matchesTitle && !matchesRegion) {
          return false;
        }
      }

      // 2. Transaction filter
      if (transaction === "Purchase" && prop.price_frequency !== "one-off") {
        return false;
      }
      if (transaction === "Rental" && prop.price_frequency !== "pcm") {
        return false;
      }

      // 3. Property Type multi-select
      if (selectedTypes.length > 0 && !selectedTypes.includes(prop.property_type)) {
        return false;
      }

      // 4. Minimum Bedrooms
      if (minBeds !== "All") {
        const requiredBeds = parseInt(minBeds, 10);
        if (prop.bedrooms < requiredBeds) return false;
      }

      // 5. Price Min / Max
      const numMin = minPrice ? parseInt(minPrice, 10) : null;
      const numMax = maxPrice ? parseInt(maxPrice, 10) : null;
      if (numMin !== null && !isNaN(numMin) && prop.price_gbp < numMin) {
        return false;
      }
      if (numMax !== null && !isNaN(numMax) && prop.price_gbp > numMax) {
        return false;
      }

      // 6. Status filter
      if (statusFilter !== "All") {
        if (statusFilter === "Available" && prop.status !== "For sale" && prop.status !== "To let") {
          return false;
        }
        if (statusFilter === "Under offer" && prop.status !== "Under offer" && prop.status !== "Sold STC" && prop.status !== "Let agreed") {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, transaction, selectedTypes, minBeds, minPrice, maxPrice, statusFilter]);

  // Sorting
  const sortedProperties = useMemo(() => {
    const list = [...filteredProperties];
    if (sortOption === "price-low") {
      list.sort((a, b) => a.price_gbp - b.price_gbp);
    } else if (sortOption === "price-high") {
      list.sort((a, b) => b.price_gbp - a.price_gbp);
    } else {
      // Newest
      list.sort((a, b) => new Date(b.listed_at).getTime() - new Date(a.listed_at).getTime());
    }
    return list;
  }, [filteredProperties, sortOption]);

  const visibleProperties = sortedProperties.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <Breadcrumbs items={[{ label: "Properties" }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Page Header */}
        <div className="mb-6 pb-6 border-b border-[#1F3A2E]/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3A2E] tracking-tight">
              Property Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-[#222222]/70 mt-1">
              Prime residential sales and lettings across England, Scotland, and Wales.
            </p>
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1F3A2E] bg-white border border-[#1F3A2E]/20 rounded shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded border border-[#1F3A2E]/20 bg-white text-[#222222] focus:outline-none focus:border-[#B08D57]"
              >
                <option value="newest">Newest additions</option>
                <option value="price-low">Price: Low to high</option>
                <option value="price-high">Price: High to low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 p-3 bg-white/70 rounded-md border border-[#1F3A2E]/10">
            <span className="text-xs font-semibold text-[#1F3A2E] mr-1">Active filters:</span>
            {searchTerm.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#1F3A2E]/10 text-[#1F3A2E] rounded">
                Location: &quot;{searchTerm}&quot;
                <button type="button" onClick={() => setSearchTerm("")} className="hover:text-red-700" aria-label="Clear location filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {transaction !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#1F3A2E]/10 text-[#1F3A2E] rounded">
                {transaction === "Purchase" ? "For Sale" : "To Let"}
                <button type="button" onClick={() => setTransaction("All")} className="hover:text-red-700" aria-label="Clear transaction filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedTypes.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#1F3A2E]/10 text-[#1F3A2E] rounded">
                {t}
                <button type="button" onClick={() => togglePropertyType(t)} className="hover:text-red-700" aria-label={`Remove ${t} filter`}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {minBeds !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#1F3A2E]/10 text-[#1F3A2E] rounded">
                {minBeds}+ Beds
                <button type="button" onClick={() => setMinBeds("All")} className="hover:text-red-700" aria-label="Clear beds filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minPrice && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#1F3A2E]/10 text-[#1F3A2E] rounded">
                Min £{parseInt(minPrice).toLocaleString("en-GB")}
                <button type="button" onClick={() => setMinPrice("")} className="hover:text-red-700" aria-label="Clear min price filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxPrice && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#1F3A2E]/10 text-[#1F3A2E] rounded">
                Max £{parseInt(maxPrice).toLocaleString("en-GB")}
                <button type="button" onClick={() => setMaxPrice("")} className="hover:text-red-700" aria-label="Clear max price filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {statusFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#1F3A2E]/10 text-[#1F3A2E] rounded">
                Status: {statusFilter}
                <button type="button" onClick={() => setStatusFilter("All")} className="hover:text-red-700" aria-label="Clear status filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs text-[#B08D57] hover:underline font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-lg border border-[#1F3A2E]/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1F3A2E]/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E] flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Filter Properties</span>
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-[#B08D57] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Location Input */}
              <div className="space-y-1.5">
                <label htmlFor="filter-location" className="block text-xs font-semibold text-[#1F3A2E]">
                  Location or Area
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#B08D57] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="filter-location"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g. Manchester, Edinburgh"
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
              </div>

              {/* Transaction Segmented Control */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#1F3A2E]">
                  Transaction
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#FAF7F0] p-1 rounded border border-[#1F3A2E]/10">
                  <button
                    type="button"
                    onClick={() => setTransaction("All")}
                    className={`py-1 text-xs font-medium rounded transition-colors ${
                      transaction === "All"
                        ? "bg-[#1F3A2E] text-white shadow-xs"
                        : "text-[#222222]/80 hover:text-[#1F3A2E]"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransaction("Purchase")}
                    className={`py-1 text-xs font-medium rounded transition-colors ${
                      transaction === "Purchase"
                        ? "bg-[#1F3A2E] text-white shadow-xs"
                        : "text-[#222222]/80 hover:text-[#1F3A2E]"
                    }`}
                  >
                    Sale
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransaction("Rental")}
                    className={`py-1 text-xs font-medium rounded transition-colors ${
                      transaction === "Rental"
                        ? "bg-[#1F3A2E] text-white shadow-xs"
                        : "text-[#222222]/80 hover:text-[#1F3A2E]"
                    }`}
                  >
                    Rent
                  </button>
                </div>
              </div>

              {/* Property Types Multi-select */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#1F3A2E]">
                  Property Type
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {PROPERTY_TYPES.map((type) => {
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <label
                        key={type}
                        className="flex items-center gap-2 text-xs text-[#222222] cursor-pointer hover:text-[#1F3A2E]"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePropertyType(type)}
                          className="w-3.5 h-3.5 rounded border-[#1F3A2E]/30 text-[#1F3A2E] focus:ring-[#B08D57]"
                        />
                        <span>{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Bedrooms Minimum */}
              <div className="space-y-1.5">
                <label htmlFor="filter-beds" className="block text-xs font-semibold text-[#1F3A2E]">
                  Minimum Bedrooms
                </label>
                <select
                  id="filter-beds"
                  value={minBeds}
                  onChange={(e) => setMinBeds(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:border-[#B08D57]"
                >
                  <option value="All">Any bedrooms</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Price Min / Max */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#1F3A2E]">
                  Price Range (£ GBP)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min (£)"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                  <input
                    type="number"
                    placeholder="Max (£)"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5">
                <label htmlFor="filter-status" className="block text-xs font-semibold text-[#1F3A2E]">
                  Availability Status
                </label>
                <select
                  id="filter-status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:border-[#B08D57]"
                >
                  <option value="All">All statuses</option>
                  <option value="Available">Available only</option>
                  <option value="Under offer">Under offer / Sold STC</option>
                </select>
              </div>
            </div>
          </aside>

          {/* RESULTS GRID (3 COLUMNS ON DESKTOP) */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between text-xs text-[#222222]/70">
              <span className="font-semibold text-[#1F3A2E] tabular-nums">
                Showing {visibleProperties.length} of {sortedProperties.length} {sortedProperties.length === 1 ? "property" : "properties"}
              </span>
            </div>

            {visibleProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProperties.map((property, idx) => (
                  <PropertyCard key={property.id} property={property} priority={idx < 3} />
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="p-12 text-center bg-white rounded-lg border border-[#1F3A2E]/10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF7F0] border border-[#1F3A2E]/10 flex items-center justify-center mx-auto text-[#B08D57]">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F3A2E]">
                  No matching properties found
                </h3>
                <p className="text-xs sm:text-sm text-[#222222]/70 max-w-md mx-auto leading-relaxed">
                  We could not find any listings matching your exact search parameters. Consider broadening your criteria or speaking to our acquisition team.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3A2E] rounded hover:bg-[#162B22] transition-colors"
                  >
                    Reset all filters
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTransaction("All");
                      setSelectedTypes([]);
                    }}
                    className="px-4 py-2 text-xs font-medium text-[#1F3A2E] bg-[#FAF7F0] border border-[#1F3A2E]/20 rounded hover:bg-white transition-colors"
                  >
                    View all property types
                  </button>
                </div>
              </div>
            )}

            {/* Pagination / Load more */}
            {visibleCount < sortedProperties.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-white border border-[#1F3A2E]/20 hover:border-[#B08D57] rounded shadow-xs transition-colors"
                >
                  Load more properties ({sortedProperties.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MOBILE FILTER MODAL / SHEET */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-[#FAF7F0] h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F3A2E]/10">
              <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
                Filter Properties
              </h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#222222] hover:text-[#1F3A2E]"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters Body */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#1F3A2E] mb-1">
                  Location or Area
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Manchester, Edinburgh"
                  className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3A2E] mb-1">
                  Transaction
                </label>
                <select
                  value={transaction}
                  onChange={(e) => setTransaction(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white"
                >
                  <option value="All">All Transactions</option>
                  <option value="Purchase">For Sale</option>
                  <option value="Rental">To Let</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3A2E] mb-1">
                  Property Types
                </label>
                <div className="space-y-1.5">
                  {PROPERTY_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-xs text-[#222222]">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => togglePropertyType(type)}
                        className="w-4 h-4 rounded text-[#1F3A2E]"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3A2E] mb-1">
                  Minimum Bedrooms
                </label>
                <select
                  value={minBeds}
                  onChange={(e) => setMinBeds(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white"
                >
                  <option value="All">Any bedrooms</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3A2E] mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white"
                >
                  <option value="All">All statuses</option>
                  <option value="Available">Available only</option>
                  <option value="Under offer">Under offer / Sold STC</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F3A2E]/10 flex gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2 text-xs font-medium text-[#222222] bg-white border border-[#1F3A2E]/20 rounded"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs font-semibold text-white bg-[#1F3A2E] rounded"
              >
                Show {sortedProperties.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
