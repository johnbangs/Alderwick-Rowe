import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../context/RouterContext";
import { AlertTriangle } from "lucide-react";

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20">
      <Breadcrumbs items={[{ label: "Terms of Use" }]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Legal Notice:</strong>
            This terms of use document is drafted in accordance with the laws of England and Wales. Have reviewed by a qualified UK solicitor prior to final production deployment.
          </div>
        </div>

        <article className="bg-white p-8 sm:p-12 rounded-lg border border-[#1F3A2E]/10 space-y-6 text-xs sm:text-sm text-[#222222]/85 leading-relaxed">
          <header className="border-b border-[#1F3A2E]/10 pb-6 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
              Website Terms of Engagement
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3A2E]">
              Terms of Use
            </h1>
            <p className="text-xs text-[#222222]/60">
              Last updated: 10th November 2026 · Alderwick &amp; Rowe Ltd
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              1. Website Access &amp; Acceptance
            </h2>
            <p>
              These Terms of Use govern your access to and use of this website. By accessing or browsing our pages, reviewing property particulars, or submitting an enquiry, you confirm your acceptance of these Terms. If you do not agree, you must cease using our website immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              2. No Legal or Financial Advice
            </h2>
            <p>
              The materials, property schedules, particulars, floor plans, and market insights published on this website are provided solely for general information and marketing purposes. They do not constitute formal legal, structural, or financial mortgage advice. Prospective purchasers and tenants must satisfy themselves by inspection, physical survey, and independent legal advice through their retained solicitors before committing to an exchange of contracts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              3. Accuracy of Property Particulars (Consumer Protection Regulations)
            </h2>
            <p>
              While Alderwick &amp; Rowe makes every effort to ensure the accuracy of all details in compliance with the Consumer Protection from Unfair Trading Regulations 2008, all measurements, areas, distances, and photographs are approximate and illustrative only. Fixtures, fittings, heating appliances, and services have not been tested by the agent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              4. Intellectual Property
            </h2>
            <p>
              All intellectual property rights in this website, including photographs, architectural text, brand logos, floor plans, and code, are owned by or licensed to Alderwick &amp; Rowe Ltd. Reproduction, commercial scraping, or redistribution without express written consent is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted under English law, Alderwick &amp; Rowe Ltd excludes all liability for any direct, indirect, or consequential loss or damage arising out of reliance upon website content or temporary site unavailability. Nothing in these terms limits liability for death, personal injury resulting from negligence, or fraudulent misrepresentation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms of Use and any dispute arising from them shall be governed by and construed in accordance with the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any proceedings.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};
