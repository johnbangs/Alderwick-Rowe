import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../context/RouterContext";
import { Shield, AlertTriangle } from "lucide-react";

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Notice Disclaimer Banner */}
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Legal Notice:</strong>
            This document is a comprehensive template tailored for UK GDPR and Data Protection Act 2018 compliance. Have reviewed by a qualified UK solicitor prior to final production deployment.
          </div>
        </div>

        <article className="bg-white p-8 sm:p-12 rounded-lg border border-[#1F3A2E]/10 space-y-6 text-xs sm:text-sm text-[#222222]/85 leading-relaxed">
          <header className="border-b border-[#1F3A2E]/10 pb-6 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
              Statutory Compliance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3A2E]">
              Privacy Policy (UK GDPR)
            </h1>
            <p className="text-xs text-[#222222]/60">
              Last updated: 10th November 2026 · Alderwick &amp; Rowe Ltd
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              1. Introduction &amp; Data Controller
            </h2>
            <p>
              Alderwick &amp; Rowe Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting and respecting your personal privacy. Under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, Alderwick &amp; Rowe Ltd is the Data Controller responsible for your personal data.
            </p>
            <p>
              Registered Office: 42 St Ann Street, Manchester, M2 7EF, United Kingdom. Company No. 08492014. If you have any inquiries regarding this policy or wish to exercise your statutory rights, please contact our Data Protection Officer at: <a href="mailto:privacy@alderwickrowe.co.uk" className="text-[#1F3A2E] font-semibold underline">privacy@alderwickrowe.co.uk</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              2. Personal Data We Collect
            </h2>
            <p>We may collect, record, and process the following categories of personal data:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Identity Data:</strong> Full name, title, date of birth, proof of photographic identification (where conducting anti-money laundering checks).</li>
              <li><strong>Contact Data:</strong> Residential address, email address, and telephone numbers.</li>
              <li><strong>Transaction &amp; Property Requirements:</strong> Desired locations, target price brackets, bedroom configurations, search timelines, and notes regarding properties inspected.</li>
              <li><strong>Financial Data:</strong> Proof of funds, mortgage agreement in principle letters, and bank statements required for AML compliance or tenancy referencing.</li>
              <li><strong>Technical &amp; Usage Data:</strong> Anonymised IP addresses, browser specifications, and browsing patterns collected via essential and analytical cookies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              3. Lawful Basis for Processing
            </h2>
            <p>We process your personal information exclusively under the following lawful bases:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Consent (Article 6(1)(a)):</strong> Where you explicitly check our contact consent box to register requirements or receive property previews.</li>
              <li><strong>Contractual Performance (Article 6(1)(b)):</strong> Where processing is necessary to execute an agency agreement, prepare tenancy agreements, or arrange viewing access.</li>
              <li><strong>Legal Obligation (Article 6(1)(c)):</strong> To satisfy statutory anti-money laundering (Money Laundering Regulations 2017) and estate agency regulations.</li>
              <li><strong>Legitimate Interests (Article 6(1)(f)):</strong> To maintain operational security, prevent fraudulent enquiries, and refine our website architecture.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              4. Data Retention Periods
            </h2>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected. Prospective buyer and tenant inquiry records are retained for up to 24 months from last contact unless deletion is requested. Transaction files and AML identification records are retained for a statutory period of 5 to 7 years in compliance with HMRC and RICS regulatory guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1F3A2E]">
              5. Your Statutory Rights
            </h2>
            <p>Under UK data protection legislation, you possess the following individual rights:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The right to request access to your personal data (Subject Access Request).</li>
              <li>The right to request rectification of inaccurate or incomplete information.</li>
              <li>The right to request erasure of your data (&ldquo;the right to be forgotten&rdquo;), subject to statutory record-keeping constraints.</li>
              <li>The right to restrict or object to the processing of your data.</li>
              <li>The right to withdraw consent at any time without affecting past lawful processing.</li>
            </ul>
            <p>
              To exercise any of these rights, please submit a written request to <a href="mailto:privacy@alderwickrowe.co.uk" className="text-[#1F3A2E] underline font-semibold">privacy@alderwickrowe.co.uk</a>. You also hold the right to lodge a formal complaint with the Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#B08D57] underline">ico.org.uk</a>.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};
