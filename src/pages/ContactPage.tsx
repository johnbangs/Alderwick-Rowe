import React, { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../context/RouterContext";
import { submitEnquiryToN8N } from "../services/n8n";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Loader2, 
  Check, 
  AlertCircle,
  Building2
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setSubmitError("Please provide your full name, email address, and a message.");
      return;
    }

    if (!consent) {
      setSubmitError("Please confirm your consent to be contacted regarding this enquiry.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      client_type: "" as const,
      preferred_location: "",
      property_type: "",
      bedrooms: "",
      budget_min: "",
      budget_max: "",
      budget_currency: "GBP" as const,
      budget_frequency: "" as const,
      transaction: "" as const,
      timeline: "",
      preferred_contact: "Email" as const,
      service_required: "General Enquiry",
      sample_enquiry: message.trim(),
      message: message.trim(),
      source: "website-contact"
    };

    const result = await submitEnquiryToN8N(payload);
    setIsSubmitting(false);

    if (result.success || result.queuedLocally) {
      setSubmitSuccess(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setConsent(false);
    } else {
      setSubmitError(result.error || "Unable to send your message. Please contact our reception directly by phone.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block">
            Offices &amp; Enquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3A2E]">
            Contact Alderwick &amp; Rowe
          </h1>
          <p className="text-xs sm:text-sm text-[#222222]/70 leading-relaxed">
            Our partners welcome confidential enquiries regarding property sales, acquisitions, prime lettings, and valuation instructions across the United Kingdom.
          </p>
        </div>

        {/* Quick Route Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Link
            to="/book-viewing"
            className="p-4 rounded-lg bg-white border border-[#1F3A2E]/10 hover:border-[#B08D57] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#B08D57]" />
              <div>
                <span className="font-serif text-sm font-bold text-[#1F3A2E] block">
                  Book a Viewing
                </span>
                <span className="text-xs text-[#222222]/60">
                  Select a property and nominate an inspection time
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#1F3A2E] group-hover:text-[#B08D57]">
              Start &rarr;
            </span>
          </Link>

          <Link
            to="/enquire"
            className="p-4 rounded-lg bg-white border border-[#1F3A2E]/10 hover:border-[#B08D57] transition-all flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#B08D57]" />
              <div>
                <span className="font-serif text-sm font-bold text-[#1F3A2E] block">
                  Register Criteria
                </span>
                <span className="text-xs text-[#222222]/60">
                  Full 5-step structured acquisition intake
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#1F3A2E] group-hover:text-[#B08D57]">
              Start &rarr;
            </span>
          </Link>
        </div>

        {/* Two-Column Grid: Contact Information & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Details (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-[#1F3A2E]/10 shadow-xs space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B08D57] block mb-1">
                  Headquarters
                </span>
                <h2 className="font-serif text-xl font-bold text-[#1F3A2E]">
                  Manchester Head Office
                </h2>
                <div className="mt-3 space-y-3 text-xs text-[#222222]/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <address className="not-italic leading-relaxed">
                      Alderwick &amp; Rowe Ltd<br />
                      42 St Ann Street<br />
                      St Ann&apos;s Square<br />
                      Manchester, M2 7EF<br />
                      United Kingdom
                    </address>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <a href="tel:+441618329400" className="hover:text-[#1F3A2E] font-medium text-xs">
                      +44 (0) 161 832 9400
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <a href="mailto:enquiries@alderwickrowe.co.uk" className="hover:text-[#1F3A2E] font-medium text-xs">
                      enquiries@alderwickrowe.co.uk
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="pt-4 border-t border-[#1F3A2E]/10">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#1F3A2E]">
                  <Clock className="w-4 h-4 text-[#B08D57]" />
                  <span>Office &amp; Telephone Hours</span>
                </div>
                <div className="space-y-1 text-xs text-[#222222]/70">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="font-medium text-[#222222]">09:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium text-[#222222]">09:00 – 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday &amp; Bank Holidays:</span>
                    <span className="font-medium text-[#222222]">Closed (Emergency lines active)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Map Visualizer */}
            <div className="bg-white p-5 rounded-lg border border-[#1F3A2E]/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E] mb-3">
                Location Map
              </h3>
              <div className="aspect-16/9 rounded bg-[#FAF7F0] border border-[#1F3A2E]/10 flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="w-6 h-6 text-[#B08D57] mb-1" />
                <span className="font-serif text-xs font-bold text-[#1F3A2E]">St Ann&apos;s Square, Manchester</span>
                <span className="text-[11px] text-[#222222]/60 mt-0.5">M2 7EF · Adjacent to St Ann&apos;s Church</span>
              </div>
            </div>
          </div>

          {/* General Enquiry Form (3 columns) */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#1F3A2E]/10 shadow-xs space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B08D57] block mb-1">
                  Direct Dispatch
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1F3A2E]">
                  Send a General Message
                </h2>
                <p className="text-xs text-[#222222]/70 mt-1">
                  For general corporate correspondence, media queries, or introductory appraisal requests.
                </p>
              </div>

              {submitSuccess && (
                <div className="p-4 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message dispatched successfully.</p>
                    <p className="text-emerald-800 mt-0.5">
                      Thank you for contacting Alderwick &amp; Rowe. A duty partner will respond during normal office hours.
                    </p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="p-4 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-1">
                  <label htmlFor="contact_name" className="block text-xs font-semibold text-[#1F3A2E]">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact_name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Robert Sterling"
                    className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact_email" className="block text-xs font-semibold text-[#1F3A2E]">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact_email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. r.sterling@example.co.uk"
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact_phone" className="block text-xs font-semibold text-[#1F3A2E]">
                      Telephone (Optional)
                    </label>
                    <input
                      id="contact_phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +44 161 832 9400"
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact_message" className="block text-xs font-semibold text-[#1F3A2E]">
                    Your Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="contact_message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify how we may assist you..."
                    className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1F3A2E] mt-0.5 border-[#1F3A2E]/30 focus:ring-[#B08D57]"
                    />
                    <span className="text-xs text-[#222222]/80 leading-relaxed">
                      I agree to Alderwick &amp; Rowe contacting me regarding this enquiry in accordance with the{" "}
                      <Link to="/privacy" className="text-[#B08D57] underline hover:text-[#C5A46F]">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] disabled:opacity-50 rounded transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B08D57]" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <span>Send message</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
