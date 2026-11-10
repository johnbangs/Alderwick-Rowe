import React from "react";
import { Link } from "../context/RouterContext";
import { useCookieConsent } from "../context/CookieContext";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <footer className="bg-[#162B22] text-[#F5F0E6] pt-16 pb-24 sm:pb-16 border-t border-[#1F3A2E]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F5F0E6]/10">
          {/* Column 1 & 2: Firm identity and accreditation */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                Alderwick &amp; Rowe
              </span>
              <span className="text-[11px] tracking-widest uppercase font-semibold text-[#B08D57]">
                Chartered Surveyors &amp; Estate Agents
              </span>
            </Link>
            <p className="text-sm text-[#F5F0E6]/80 leading-relaxed max-w-sm">
              Established in 1988, Alderwick &amp; Rowe provides discreet, authoritative residential sales, prime lettings, and portfolio asset management across England, Scotland, and Wales.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#B08D57]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#B08D57]" aria-hidden="true" />
              <span>Regulated by RICS · Member of The Property Ombudsman · CMP Protected</span>
            </div>
          </div>

          {/* Column 3: Property Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B08D57] mb-4">
              Property Services
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F0E6]/80">
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  Property Search
                </Link>
              </li>
              <li>
                <Link to="/properties?transaction=Purchase" className="hover:text-white transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties?transaction=Rental" className="hover:text-white transition-colors">
                  Properties to Let
                </Link>
              </li>
              <li>
                <Link to="/book-viewing" className="hover:text-white transition-colors">
                  Book an Inspection
                </Link>
              </li>
              <li>
                <Link to="/enquire" className="hover:text-white transition-colors">
                  Register Requirements
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Sectors */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B08D57] mb-4">
              Client Advisory
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F0E6]/80">
              <li>
                <Link to="/buyers" className="hover:text-white transition-colors">
                  Buyer Services &amp; Search
                </Link>
              </li>
              <li>
                <Link to="/tenants" className="hover:text-white transition-colors">
                  Tenant Information
                </Link>
              </li>
              <li>
                <Link to="/landlords" className="hover:text-white transition-colors">
                  Landlord Asset Management
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Office Locations &amp; Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Registered Office & Contacts */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B08D57] mb-4">
              Head Office
            </h3>
            <div className="space-y-3 text-sm text-[#F5F0E6]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic text-xs leading-relaxed">
                  42 St Ann Street<br />
                  St Ann&apos;s Square<br />
                  Manchester, M2 7EF<br />
                  United Kingdom
                </address>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B08D57] shrink-0" aria-hidden="true" />
                <a href="tel:+441618329400" className="hover:text-white transition-colors text-xs">
                  +44 (0) 161 832 9400
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B08D57] shrink-0" aria-hidden="true" />
                <a href="mailto:enquiries@alderwickrowe.co.uk" className="hover:text-white transition-colors text-xs">
                  enquiries@alderwickrowe.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal notice & bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#F5F0E6]/60">
          <div className="space-y-1">
            <p>
              Alderwick &amp; Rowe Ltd — Registered in England &amp; Wales (Company No. 08492014).
            </p>
            <p>
              Registered Office: 42 St Ann Street, Manchester, M2 7EF. Authorised and regulated by the Royal Institution of Chartered Surveyors (RICS).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={openPreferencesModal}
              className="text-[#B08D57] hover:underline focus:outline-none cursor-pointer"
            >
              Cookie Settings
            </button>
            <span aria-hidden="true">·</span>
            <Link to="/dev/payload-test" className="text-[#F5F0E6]/30 hover:text-[#F5F0E6]/70 transition-colors">
              Workflow Diagnostics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
