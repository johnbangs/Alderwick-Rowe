import React, { useState } from "react";
import { Link, useRouter } from "../context/RouterContext";
import { Menu, X, Phone, Calendar } from "lucide-react";

export const Header: React.FC = () => {
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Properties", to: "/properties" },
    { label: "Buyers", to: "/buyers" },
    { label: "Tenants", to: "/tenants" },
    { label: "Landlords", to: "/landlords" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" }
  ];

  const isActive = (to: string) => {
    if (to === "/" && pathname === "/") return true;
    if (to !== "/" && pathname.startsWith(to)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F0E6]/95 backdrop-blur-md border-b border-[#1F3A2E]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in editorial display font) */}
          <Link
            to="/"
            className="flex flex-col group text-left whitespace-nowrap shrink-0"
            aria-label="Alderwick & Rowe Home"
          >
            <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#1F3A2E] group-hover:text-[#B08D57] transition-colors">
              Alderwick &amp; Rowe
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B08D57] -mt-0.5">
              Est. 1988 · Chartered Surveyors
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Clean text with subtle underline) */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#222222]"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#1F3A2E] ${
                  isActive(link.to)
                    ? "text-[#1F3A2E] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B08D57]"
                    : "text-[#222222]/80 hover:text-[#1F3A2E]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Primary Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/book-viewing"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded-md transition-all shadow-sm hover:shadow active:translate-y-px whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B08D57]" aria-hidden="true" />
              <span>Book a viewing</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1F3A2E] rounded-md hover:bg-[#1F3A2E]/5 focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#1F3A2E]/10 bg-[#FAF7F0] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-[#1F3A2E]/10 text-[#1F3A2E] font-semibold"
                    : "text-[#222222] hover:bg-[#1F3A2E]/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#1F3A2E]/10 flex flex-col gap-2.5">
            <Link
              to="/book-viewing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded-md transition-colors"
            >
              Book a viewing
            </Link>
            <a
              href="tel:+441618329400"
              className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#1F3A2E]"
            >
              <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>+44 (0) 161 832 9400</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
