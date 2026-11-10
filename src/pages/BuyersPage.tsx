import React, { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../context/RouterContext";
import { 
  Compass, 
  Search, 
  Eye, 
  CheckCircle, 
  ShieldCheck, 
  FileCheck, 
  ChevronDown, 
  ArrowRight,
  FileText,
  Download
} from "lucide-react";

export const BuyersPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How early should I register my purchasing criteria?",
      a: "We recommend registering at least three to six months prior to your intended move date. Many prime residences achieve agreed terms off-market or during confidential pre-marketing previews before appearing on public portals."
    },
    {
      q: "What documentation is required to submit a formal offer?",
      a: "To present an offer with maximum credibility to a vendor, we request photographic ID (passport or driving licence), formal proof of address (utility bill within 3 months), decision in principle from your lender (if financing), and proof of funds for any cash deposit."
    },
    {
      q: "How does Alderwick & Rowe support chain progression?",
      a: "Our designated sales progression partners actively liaise with conveyancers, mortgage underwriters, and all parties across the upward and downward chains each week, heading off legal hurdles before exchange."
    },
    {
      q: "Do you represent buyers across Scotland and Wales as well as England?",
      a: "Yes. Our chartered surveyors are conversant with the distinct legal frameworks across England and Wales (Law Society protocols) and Scotland (Scottish missives and Home Report system)."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Register & Profile",
      desc: "Discuss your spatial needs, architectural preferences, and schooling parameters with our regional partners."
    },
    {
      num: "02",
      title: "Preview & Search",
      desc: "Receive curated particulars and private previews of instructions prior to national portal syndication."
    },
    {
      num: "03",
      title: "Accompanied Inspection",
      desc: "Private viewings conducted by an experienced director who can answer nuanced technical questions on boundaries, services, and tenure."
    },
    {
      num: "04",
      title: "Negotiation & Completion",
      desc: "Rigorous offer presentation, solicitor briefing, and dedicated chain progression through to legal exchange and key release."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20">
      <Breadcrumbs items={[{ label: "Buyer Services" }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* 1. Hero */}
        <section className="bg-[#1F3A2E] text-white rounded-lg p-8 sm:p-14 border border-[#B08D57]/30">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
              Residential Acquisition
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Buying with Alderwick &amp; Rowe
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F0E6]/90 leading-relaxed font-normal">
              Whether you are acquiring a historic town residence, a family detached home, or an urban pied-à-terre, our partners provide seasoned guidance at every juncture.
            </p>
            <div className="pt-2">
              <Link
                to="/enquire?type=buyer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] rounded transition-colors shadow-xs"
              >
                <span>Register as a buyer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. How We Help */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
              How We Support Purchasers
            </h2>
            <p className="text-xs sm:text-sm text-[#222222]/70 mt-1">
              Authoritative representation from initial registration to legal completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <Search className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Off-Market Access
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                Gain direct access to instructions handled discreetly without public listing boards, protecting privacy and giving you first right of consideration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <Eye className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Accompanied Director Viewings
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                Inspections are personally escorted by knowledgeable professionals who can address planning history, boundary questions, and EPC requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <FileCheck className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Proactive Conveyancing Progression
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                We bridge the gap between solicitors, mortgage valuers, and surveyors to resolve inquiries rapidly and protect agreed completion deadlines.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Four-Step Timeline Process */}
        <section className="bg-white p-8 sm:p-12 rounded-lg border border-[#1F3A2E]/10 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
              Clear Roadmap
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1F3A2E]">
              The Acquisition Process
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
              Questions for Purchasers
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
                Client Guides &amp; Schedules
              </h2>
              <p className="text-xs text-[#222222]/70 mt-0.5">
                Download the Alderwick &amp; Rowe comprehensive residential portfolio prospectus.
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
            Ready to initiate your property search?
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E6]/80 max-w-xl mx-auto">
            Register your criteria with our acquisition team to receive tailored properties matching your exact brief.
          </p>
          <div className="pt-2">
            <Link
              to="/enquire?type=buyer"
              className="inline-block px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] rounded transition-colors shadow-xs"
            >
              Register as a buyer
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
