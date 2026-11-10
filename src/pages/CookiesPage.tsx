import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useCookieConsent } from "../context/CookieContext";
import { AlertTriangle, SlidersHorizontal, Check } from "lucide-react";

export const CookiesPage: React.FC = () => {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20">
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Legal Notice:</strong>
            This cookie policy is a template compliant with the Privacy and Electronic Communications Regulations (PECR) and UK GDPR. Have reviewed by a qualified UK solicitor prior to final production deployment.
          </div>
        </div>

        <article className="bg-white p-8 sm:p-12 rounded-lg border border-[#1F3A2E]/10 space-y-6 text-xs sm:text-sm text-[#222222]/85 leading-relaxed">
          <header className="border-b border-[#1F3A2E]/10 pb-6 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
              Cookie Management
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3A2E]">
              Cookie Policy
            </h1>
            <p className="text-xs text-[#222222]/60">
              Last updated: 10th November 2026 · Alderwick &amp; Rowe Ltd
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are compact text files placed upon your computer, tablet, or smartphone when accessing our website. They facilitate fundamental website navigation, remember user preferences across sessions, and assist our understanding of how our visitors discover our property listings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              2. Categories of Cookies We Deploy
            </h2>

            {/* Category 1: Strictly Necessary */}
            <div className="p-4 rounded bg-[#FAF7F0] border border-[#1F3A2E]/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[#1F3A2E] text-sm">
                  A. Strictly Necessary Cookies
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F3A2E] bg-[#1F3A2E]/10 px-2 py-0.5 rounded">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-[#222222]/80">
                Essential for core website operation, CSRF security verification, session persistence for multi-step property enquiries, and recording your cookie consent preferences. These cannot be switched off in our systems.
              </p>
            </div>

            {/* Category 2: Analytical & Performance */}
            <div className="p-4 rounded bg-[#FAF7F0] border border-[#1F3A2E]/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[#1F3A2E] text-sm">
                  B. Analytical &amp; Performance Cookies
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57] bg-[#B08D57]/10 px-2 py-0.5 rounded">
                  Opt-In Required
                </span>
              </div>
              <p className="text-xs text-[#222222]/80">
                Enable us to aggregate anonymous statistics regarding visitor counts, popular search areas, and device viewports to optimize site speed and layout. Never deployed without your consent.
              </p>
            </div>

            {/* Category 3: Marketing & Targeting */}
            <div className="p-4 rounded bg-[#FAF7F0] border border-[#1F3A2E]/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[#1F3A2E] text-sm">
                  C. Marketing &amp; Targeting Cookies
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B08D57] bg-[#B08D57]/10 px-2 py-0.5 rounded">
                  Opt-In Required
                </span>
              </div>
              <p className="text-xs text-[#222222]/80">
                Used to measure the efficacy of regional property campaigns and display tailored property recommendations based on prior searches.
              </p>
            </div>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              3. Managing Your Preferences
            </h2>
            <p>
              You can adjust or revoke your cookie choices at any time using our interactive settings panel. You may also configure your web browser to reject cookies, though doing so may prevent access to certain interactive search features.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={openPreferencesModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded transition-colors shadow-xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Open Cookie Preferences Panel</span>
              </button>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};
