import React, { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../context/RouterContext";
import { 
  Building, 
  ShieldCheck, 
  Wrench, 
  Coins, 
  ChevronDown, 
  ArrowRight,
  FileText,
  BadgePercent
} from "lucide-react";

export const LandlordsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What management services does Alderwick & Rowe offer?",
      a: "We provide two core tiers: Tenant Find (comprehensive marketing, accompanied viewings, rigorous referencing, AST execution, and deposit protection) and Fully Managed (all Tenant Find services plus 24/7 maintenance dispatch, rent collection, regular property inspection visits, and annual safety renewals)."
    },
    {
      q: "How are statutory safety regulations managed?",
      a: "We maintain exhaustive digital compliance files for every asset. This includes statutory annual Gas Safety certificates (CP12), 5-year Electrical Installation Condition Reports (EICR), Energy Performance Certificates (EPC), smoke/carbon monoxide alarm verifications, and Legionella risk assessments."
    },
    {
      q: "What are your management fees?",
      a: "Fees on request. We tailor our management structure to the volume and geographical spread of your portfolio, whether you hold a single investment flat or an extensive multi-unit residential block. Full terms and transparent fee breakdowns are presented in writing following our initial appraisal."
    },
    {
      q: "How quickly do you find qualified tenants?",
      a: "Across our network in England, Scotland, and Wales, the average let time for correctly priced properties is under 14 days, supported by our active waitlist of pre-qualified corporate and private tenants."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Market Valuation",
      desc: "An in-person visit by a chartered surveyor assessing achievable rental yields and enhancement recommendations."
    },
    {
      num: "02",
      title: "Compliance & Preparation",
      desc: "Auditing EPC, gas and electrical certification, and professional architectural photography."
    },
    {
      num: "03",
      title: "Targeted Marketing",
      desc: "Presentation to our qualified tenant database and prominent exposure across leading national channels."
    },
    {
      num: "04",
      title: "End-to-End Management",
      desc: "Rent collection, photographic inventories, prompt maintenance triage, and statutory legal renewals."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20">
      <Breadcrumbs items={[{ label: "Landlord Services" }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* 1. Hero */}
        <section className="bg-[#1F3A2E] text-white rounded-lg p-8 sm:p-14 border border-[#B08D57]/30">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
              Asset &amp; Letting Management
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Landlord Services &amp; Portfolio Management
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F0E6]/90 leading-relaxed font-normal">
              Protecting asset values, ensuring rigorous statutory compliance, and delivering consistent net rental returns across England, Scotland, and Wales.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/enquire?type=landlord"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] rounded transition-colors shadow-xs"
              >
                <span>Request a valuation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Transparent Fee Notice */}
        <section className="bg-white p-5 rounded-lg border border-[#1F3A2E]/10 flex items-start gap-3.5">
          <BadgePercent className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
          <div className="text-xs text-[#222222]/80 leading-relaxed">
            <strong className="text-[#1F3A2E] block text-sm font-serif font-bold mb-0.5">
              Transparent Terms of Engagement
            </strong>
            Alderwick &amp; Rowe operates on transparent, competitive terms. Fees on request — complete fee schedules, tenant finding rates, and portfolio management percentages are provided in writing following your tailored valuation.
          </div>
        </section>

        {/* 2. How We Help */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
              Dedicated Management Pillars
            </h2>
            <p className="text-xs sm:text-sm text-[#222222]/70 mt-1">
              Safeguarding your property asset with hands-on professional care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Statutory Compliance
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                Stay fully compliant with evolving UK landlord legislation, including EPC standards, EICR certification, CP12 gas records, and Right to Rent verifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <Wrench className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Vetted Maintenance Network
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                We work exclusively with insured, certified local tradespeople with transparent pricing and pre-agreed expenditure limits, resolving issues promptly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <Coins className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Reliable Rent Collection &amp; CMP
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                Automated monthly accounting, swift landlord remittances, and Propertymark Client Money Protection coverage for total financial peace of mind.
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
              From Appraisal to Management
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
              Landlord &amp; Asset Management Enquiries
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
                Portfolio Management Prospectus
              </h2>
              <p className="text-xs text-[#222222]/70 mt-0.5">
                Download the Alderwick &amp; Rowe portfolio particulars and standard letting management charter.
              </p>
            </div>
            <a
              href="/documents/property-listings-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <FileText className="w-4 h-4 text-[#B08D57]" />
              <span>Full Portfolio Prospectus (PDF)</span>
            </a>
          </div>
        </section>

        {/* 6. CTA Band */}
        <section className="bg-[#1F3A2E] text-white p-8 sm:p-12 rounded-lg text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E6]">
            Instruct Alderwick &amp; Rowe on your property
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E6]/80 max-w-xl mx-auto">
            Book a confidential rental valuation with our local partners to understand your property&apos;s true yield potential.
          </p>
          <div className="pt-2">
            <Link
              to="/enquire?type=landlord"
              className="inline-block px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] rounded transition-colors shadow-xs"
            >
              Request a valuation
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
