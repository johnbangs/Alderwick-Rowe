import React, { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../context/RouterContext";
import { 
  KeyRound, 
  Search, 
  ShieldCheck, 
  FileCheck2, 
  ChevronDown, 
  ArrowRight,
  FileText,
  BadgeInfo
} from "lucide-react";

export const TenantsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does tenant referencing work?",
      a: "Our referencing is conducted independently through an accredited tenant referencing agency. Checks typically review credit history, employment income confirmation (normally requiring household gross income of 2.5 to 3 times the annual rent), and positive references from previous landlords."
    },
    {
      q: "How is my tenancy deposit protected?",
      a: "In compliance with the Tenant Fees Act 2019, security deposits are capped at five weeks' rent for annual tenancies under £50,000. All deposits are registered with a government-backed scheme (Deposit Protection Service or TDS) and held securely throughout the tenancy."
    },
    {
      q: "What holding deposit is required when making an application?",
      a: "A refundable holding deposit capped at one week's rent is required to reserve the property while references are compiled. Once accepted, this holding payment is credited directly toward your first month's advance rental."
    },
    {
      q: "What permitted fees may apply during my tenancy?",
      a: "All permitted fees are set out transparently in writing before you commit. These are strictly limited under UK law to: rent, refundable security deposit, refundable holding deposit, default fees for late payment of rent (charged at 3% above Bank of England base rate), and reasonable costs incurred for replacement keys."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Register Requirements",
      desc: "Specify your desired locality, move-in window, furnished status, and monthly rental budget."
    },
    {
      num: "02",
      title: "Accompanied Viewing",
      desc: "Inspect available properties with an Alderwick & Rowe lettings director who can explain tenancy terms."
    },
    {
      num: "03",
      title: "Referencing & Agreement",
      desc: "Complete digital referencing with employment and tenancy history verification, followed by digital AST signing."
    },
    {
      num: "04",
      title: "Inventory & Key Handover",
      desc: "Receive an independent photographic schedule of condition and keys on move-in day with 24/7 emergency support."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20">
      <Breadcrumbs items={[{ label: "Tenant Services" }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* 1. Hero */}
        <section className="bg-[#1F3A2E] text-white rounded-lg p-8 sm:p-14 border border-[#B08D57]/30">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
              Prime Residential Lettings
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Tenancy with Alderwick &amp; Rowe
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F0E6]/90 leading-relaxed font-normal">
              Renting a quality home should be straightforward, transparent, and professionally managed. Explore prime residences across England, Scotland, and Wales.
            </p>
            <div className="pt-2">
              <Link
                to="/enquire?type=tenant"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] rounded transition-colors shadow-xs"
              >
                <span>Register as a tenant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Legal fee disclosure notice */}
        <section className="bg-white p-5 rounded-lg border border-[#1F3A2E]/10 flex items-start gap-3.5">
          <BadgeInfo className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
          <div className="text-xs text-[#222222]/80 leading-relaxed">
            <strong className="text-[#1F3A2E] block text-sm font-serif font-bold mb-0.5">
              Statutory Fee Transparency Note
            </strong>
            In accordance with the Tenant Fees Act 2019 (England) and the Renting Homes (Fees etc.) (Wales) Act 2019, all applicable holding deposits, permitted payments, and default fees will be disclosed to you in writing prior to commencing any formal application. Security deposits are registered with a government-approved scheme.
          </div>
        </section>

        {/* 2. How We Help */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
              Why Tenants Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-[#222222]/70 mt-1">
              Well-maintained properties, dedicated property managers, and rapid repair triage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <Search className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                High-Calibre Homes
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                Every property on our register undergoes an exhaustive condition audit, statutory Gas Safety certification, and EPC verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Protected Deposits &amp; CMP
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                Your deposit is held in a statutory custodial scheme, and client money is protected under Propertymark and RICS CMP regulations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <FileCheck2 className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Streamlined Digital Move-In
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                Complete referencing, document verification, and tenancy agreement signing securely from your phone or desktop.
              </p>
            </div>
          </div>
        </section>

        {/* 3. The 4-step Process */}
        <section className="bg-white p-8 sm:p-12 rounded-lg border border-[#1F3A2E]/10 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
              Clear Roadmap
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1F3A2E]">
              The Tenancy Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div key={st.num} className="space-y-2 border-l-2 border-[#B08D57] pl-4">
                <span className="font-serif text-2xl font-bold text-[#B08D57] block">
                  {st.num}
                </span>
                <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                  {st.title}
                </h3>
                <p className="text-xs text-[#222222]/75 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FAQ Accordion */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1F3A2E]">
              Questions from Prospective Tenants
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-[#1F3A2E]/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif text-sm font-semibold text-[#1F3A2E] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B08D57] transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#222222]/80 leading-relaxed border-t border-[#1F3A2E]/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Documents / Downloads */}
        <section className="bg-[#FAF7F0] p-6 sm:p-8 rounded-lg border border-[#1F3A2E]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
                Official Lettings Documentation
              </h2>
              <p className="text-xs text-[#222222]/70 mt-0.5">
                Review the comprehensive property particulars and sample tenancy schedule.
              </p>
            </div>
            <a
              href="/documents/property-listings-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <FileText className="w-4 h-4 text-[#B08D57]" />
              <span>Lettings Portfolio Brochure (PDF)</span>
            </a>
          </div>
        </section>

        {/* 6. CTA Band */}
        <section className="bg-[#1F3A2E] text-white p-8 sm:p-12 rounded-lg text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E6]">
            Looking for your next home?
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E6]/80 max-w-xl mx-auto">
            Register your tenancy requirements to be informed as soon as matching rental properties become available.
          </p>
          <div className="pt-2">
            <Link
              to="/enquire?type=tenant"
              className="inline-block px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] rounded transition-colors shadow-xs"
            >
              Register as a tenant
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
