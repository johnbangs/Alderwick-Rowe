# Alderwick & Rowe — Pre-Launch Verification & Deployment Checklist

This document tracks the technical, regulatory, and integration readiness of the client-facing website for **Alderwick & Rowe Ltd** (Chartered Surveyors & Estate Agents).

---

## 1. Webhook & Automation Integration (n8n Intake)
- [x] **Contract Conformance**: All enquiry dispatches strictly match the payload contract with all 18 keys guaranteed:
  `full_name`, `email`, `phone`, `client_type`, `preferred_location`, `property_type`, `bedrooms`, `budget_min`, `budget_max`, `budget_currency`, `budget_frequency`, `transaction`, `timeline`, `preferred_contact`, `service_required`, `sample_enquiry`, `message`, `source`.
- [x] **Resilience & Local Queuing**: Submissions failing due to network disconnection or timeout are saved to `ar_offline_enquiry_queue` in `localStorage` without interrupting user flow.
- [x] **Success & Failure States**: Explicit 2xx confirmation dialogues with customer reference summaries; graceful retry and `mailto:` fallbacks on failures.
- [x] **Rate Limiting & Anti-Spam**: Client-side throttle (10-second cool-off) and invisible honeypot field (`website-address`) active across intake forms.
- [x] **Live Advisory Chat Widget**: Direct interactive chat interface anchored across all public pages, forwarding real-time messages to the n8n webhook with property context and contact capture.
- [x] **Developer Testing Tool**: Dedicated diagnostic workbench available at `/dev/payload-test` with live JSON contract inspector, custom webhook override, and execution latency benchmarks.

---

## 2. Property Portfolio & Document Audit
- [x] **Document Archive**: Original audit copy of `Aldershot___Rowe_-_Property_Listings_7c1dbe23.pdf` preserved in `/public/documents/originals/`.
- [x] **Property Data Model**: All listings in `/data/properties.ts` extracted directly from source records across Manchester, Bristol, Bath, Leeds, Edinburgh, Glasgow, Cardiff, Swansea, and Newport.
- [x] **Document Downloads**: Active document links (`property.documents[]`) configured with `target="_blank"` and `rel="noopener noreferrer"`.
- [x] **Zero-Pill Aesthetic**: Property cards and detail headers adhere to unboxed typography with dot separators (`·`).

---

## 3. SEO & Structured Data (Schema.org)
- [x] **Metadata**: Descriptive title (`≤ 60 chars`) and meta description (`120–155 chars`) configured in `index.html`.
- [x] **OpenGraph & Twitter Cards**: Configured for social preview generation.
- [x] **Schema.org Structured Data**:
  - `RealEstateAgent` / `Organization` JSON-LD on `/`
  - `RealEstateListing` JSON-LD on `/properties/[slug]`
  - `BreadcrumbList` JSON-LD on inner navigation
- [x] **Sitemap & Robots**: `/sitemap.xml` and `/robots.txt` generated, excluding `/dev/` from search indexers.

---

## 4. UK GDPR, Legal & Regulatory Compliance
- [x] **Cookie Consent Banner**: Strictly necessary cookies active by default; analytical and targeting cookies gated behind explicit opt-in with interactive preference modal (`/cookies`).
- [x] **Consent Checkbox**: Statutory contact consent mandatory on all forms before submission.
- [x] **Statutory Legal Drafts**: `/privacy`, `/terms`, and `/cookies` fully populated with UK GDPR, PECR, and English law governing clauses (marked for solicitor sign-off).
- [x] **Company Credentials**: Registered in England & Wales (Company No. 08492014) at 42 St Ann Street, Manchester, M2 7EF. RICS and CMP accredited notices displayed.

---

## 5. Accessibility & Performance (WCAG 2.1 AA)
- [x] **Contrast Compliance**: Deep Forest Green (`#1F3A2E`) and Charcoal (`#222222`) against Warm Cream (`#F5F0E6`) exceed 4.5:1 contrast ratio.
- [x] **Keyboard Navigation**: Form controls, lightboxes, and modals support full keyboard focus with visible brass (`#B08D57`) focus rings.
- [x] **Responsive Sticky Cap**: Mobile bottom navigation bar conforms strictly to $\le 15\%$ viewport height.
- [x] **Screen Reader Support**: Form inputs wired with `aria-describedby`, error announcements, and semantic heading hierarchy.

---

## Sign-Off Checklist Prior to DNS Cutover
- [ ] Staging webhook endpoint confirmed with production n8n instance.
- [ ] Solicitor review of `/privacy`, `/terms`, and `/cookies` completed.
- [ ] Google Search Console sitemap submission logged.
- [ ] Formal DNS cutover from staging to primary domain (`alderwickrowe.co.uk`).
