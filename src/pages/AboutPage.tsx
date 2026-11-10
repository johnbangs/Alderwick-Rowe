import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../context/RouterContext";
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  Users, 
  MapPin, 
  ArrowRight,
  BookOpen,
  Scale
} from "lucide-react";

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: "Arthur Alderwick MRICS",
      role: "Senior Partner & Founder",
      bio: "With over 35 years of prime residential experience across Greater Manchester and Cheshire, Arthur oversees major residential instructions and high-value acquisitions.",
      photo: "/images/hero.jpg"
    },
    {
      name: "Helena Rowe FRICS",
      role: "Managing Partner",
      bio: "A Fellow of the Royal Institution of Chartered Surveyors, Helena leads our Scottish and Northern English divisions, advising family offices and private estates on long-term portfolio asset strategy.",
      photo: "/images/hero.jpg"
    },
    {
      name: "Gethin Davies MRICS",
      role: "Head of Welsh Operations & Prime Sales",
      bio: "Gethin directs our Cardiff and Swansea practices, specialising in coastal residences, historic country houses, and Welsh conveyancing protocol.",
      photo: "/images/hero.jpg"
    },
    {
      name: "Sophie Abernethy",
      role: "Head of Lettings & Asset Compliance",
      bio: "Sophie manages our residential lettings division across England and Scotland, ensuring meticulous adherence to statutory tenancy deposit legislation and building safety acts.",
      photo: "/images/hero.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20">
      <Breadcrumbs items={[{ label: "About the Firm" }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Hero */}
        <section className="bg-[#1F3A2E] text-white rounded-lg p-8 sm:p-14 border border-[#B08D57]/30">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
              Established 1988
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Quietly Authoritative Estate Agency
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F0E6]/90 leading-relaxed font-normal">
              For more than thirty-five years, Alderwick &amp; Rowe has represented buyers, vendors, landlords, and tenants across England, Scotland, and Wales with uncompromised integrity.
            </p>
          </div>
        </section>

        {/* Firm Story */}
        <section className="bg-white p-8 sm:p-12 rounded-lg border border-[#1F3A2E]/10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
              Our Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
              Founded on Precision and Discretion
            </h2>
            <div className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed space-y-3">
              <p>
                Alderwick &amp; Rowe was founded in Manchester in 1988 by Arthur Alderwick and Helena Rowe, two chartered surveyors who believed the British property market demanded a more measured, transparent approach than the high-street franchise model offered.
              </p>
              <p>
                From an initial practice in St Ann&apos;s Square specialising in Victorian and Edwardian residences, the firm has expanded its footprint organically to cover prime enclaves across Greater Manchester, Cheshire, the South West, Yorkshire, Edinburgh, and South Wales.
              </p>
              <p>
                Today, every property entrusted to our care continues to be personally managed by a qualified chartered surveyor. We intentionally reject high-volume sales targets in favor of meticulous attention to each individual transaction.
              </p>
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#1F3A2E]/10 bg-[#FAF7F0]">
            <img
              src="/images/properties/AR-PROP-001/hero.jpg"
              alt="Period architectural home represented by Alderwick & Rowe"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Values */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
              Guiding Principles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
              The Four Pillars of Our Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <Scale className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Fiduciary Integrity
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                As RICS-regulated practitioners, our valuations and advice are completely independent, candid, and substantiated by empirical comparable transactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <BookOpen className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Technical Mastery
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                We understand structural construction, historic building conservation, statutory leasehold legislation, and regional planning policy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Absolute Discretion
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                We regularly negotiate confidential off-market transactions for high-profile clients, vendors, and family trusts requiring total anonymity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 space-y-2">
              <div className="w-10 h-10 rounded bg-[#FAF7F0] text-[#1F3A2E] flex items-center justify-center border border-[#1F3A2E]/10 mb-3">
                <Award className="w-5 h-5 text-[#B08D57]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                Accountability
              </h3>
              <p className="text-xs text-[#222222]/80 leading-relaxed">
                A named partner leads your instruction from initial inspection to key handover, ensuring no handover lapses or junior delegation.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
              Partnership
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3A2E]">
              Senior Leadership
            </h2>
            <p className="text-xs sm:text-sm text-[#222222]/70 mt-1">
              Chartered surveyors and regional specialists with decades of proven practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-[#1F3A2E]/10 overflow-hidden shadow-xs flex flex-col justify-between">
                <div className="p-5 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B08D57] block">
                    {member.role}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#1F3A2E]">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#222222]/75 leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>
                <div className="px-5 py-3 bg-[#FAF7F0] border-t border-[#1F3A2E]/10 text-[11px] text-[#1F3A2E] font-medium">
                  Direct Partner Access
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registered Company Information Box */}
        <section className="bg-white p-6 sm:p-8 rounded-lg border border-[#1F3A2E]/10 space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
            Statutory Company Information
          </h2>
          <div className="text-xs text-[#222222]/80 leading-relaxed space-y-1">
            <p>
              <strong>Company Name:</strong> Alderwick &amp; Rowe Ltd
            </p>
            <p>
              <strong>Registration:</strong> Registered in England &amp; Wales, Company Registration No. 08492014
            </p>
            <p>
              <strong>Registered Office:</strong> 42 St Ann Street, Manchester, M2 7EF, United Kingdom
            </p>
            <p>
              <strong>Regulatory Bodies:</strong> Regulated by the Royal Institution of Chartered Surveyors (RICS Firm No. 041892). Member of The Property Ombudsman (TPO Membership No. T02918). Client Money Protection provided under Propertymark CMP Scheme.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
