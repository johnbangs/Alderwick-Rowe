import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { properties, getPropertyById, Property } from "../data/properties";
import { useRouter, Link } from "../context/RouterContext";
import { submitEnquiryToN8N } from "../services/n8n";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  Loader2, 
  AlertCircle, 
  Mail, 
  ShieldCheck, 
  Building 
} from "lucide-react";

const viewingSchema = z.object({
  property_id: z.string().min(1, "Please select a property for inspection"),
  full_name: z.string().min(2, "Please provide your full name"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(7, "Please provide a valid contact telephone number"),
  preferred_contact: z.enum(["Email", "Telephone"]),
  preferred_date: z.string().min(1, "Please choose your preferred viewing date"),
  time_window: z.string().min(1, "Please choose a preferred time window"),
  alternative_date: z.string().optional(),
  notes: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Please confirm your consent to be contacted about this viewing"
  })
});

export const BookViewingPage: React.FC = () => {
  const { searchParams } = useRouter();
  const initialPropId = searchParams.get("property") || properties[0]?.id || "";

  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(initialPropId);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState<"Email" | "Telephone">("Email");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeWindow, setTimeWindow] = useState("Morning (09:00 - 12:00)");
  const [altDate, setAltDate] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const propFromUrl = searchParams.get("property");
    if (propFromUrl) {
      setSelectedPropertyId(propFromUrl);
    }
  }, [searchParams]);

  const selectedProperty = getPropertyById(selectedPropertyId) || properties[0];

  // Calculate min and max dates (Today to Today + 30 days)
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 30);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  const formatDateDisplay = (isoDate: string) => {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-");
    return `${d}/${m}/${y}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parseResult = viewingSchema.safeParse({
      property_id: selectedPropertyId,
      full_name: fullName,
      email,
      phone,
      preferred_contact: preferredContact,
      preferred_date: preferredDate,
      time_window: timeWindow,
      alternative_date: altDate,
      notes,
      consent
    });

    if (!parseResult.success) {
      const errMap: Record<string, string> = {};
      parseResult.error.issues.forEach((err) => {
        const path = String(err.path[0]);
        errMap[path] = err.message;
      });
      setErrors(errMap);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    const clientType = selectedProperty.status === "To let" ? "Tenant" : "Buyer";
    const transaction = selectedProperty.status === "To let" ? "Rental" : "Purchase";
    const displayDate = formatDateDisplay(preferredDate);
    const displayAlt = altDate ? ` (Alt: ${formatDateDisplay(altDate)})` : "";
    const budgetFrequency: "monthly" | "one-off" = selectedProperty.price_frequency === "pcm" ? "monthly" : "one-off";

    const payload = {
      full_name: fullName,
      email,
      phone,
      client_type: clientType as "Buyer" | "Tenant",
      preferred_location: selectedProperty.area,
      property_type: selectedProperty.property_type,
      bedrooms: String(selectedProperty.bedrooms),
      budget_min: "",
      budget_max: String(selectedProperty.price_gbp),
      budget_currency: "GBP" as const,
      budget_frequency: budgetFrequency,
      transaction: transaction as "Purchase" | "Rental",
      timeline: "Immediate viewing",
      preferred_contact: preferredContact,
      service_required: "Viewing",
      sample_enquiry: `Viewing request for ${selectedProperty.title} (${selectedProperty.id}) on ${displayDate} during ${timeWindow}${displayAlt}. Notes: ${notes.trim() || "None"}`,
      message: notes,
      source: "website"
    };

    const result = await submitEnquiryToN8N(payload);
    setIsSubmitting(false);

    if (result.success || result.queuedLocally) {
      setSubmitSuccess(true);
    } else {
      setSubmitError(result.error || "Unable to submit viewing request to the automated calendar check. Please retry or contact us directly.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-24">
      <Breadcrumbs items={[{ label: "Book a Viewing" }]} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
            Accompanied Inspections
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3A2E]">
            Request a Property Viewing
          </h1>
          <p className="text-xs sm:text-sm text-[#222222]/70 max-w-lg mx-auto mt-2 leading-relaxed">
            All viewings are conducted discreetly by appointment with a chartered representative. Please nominate your preferred date and appointment window.
          </p>
        </div>

        {submitSuccess ? (
          <div className="bg-white p-8 sm:p-12 rounded-lg border border-[#1F3A2E]/10 shadow-md text-center space-y-5 animate-in fade-in">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <Check className="w-7 h-7" aria-hidden="true" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#1F3A2E]">
              Viewing Request Received
            </h2>

            <p className="text-sm text-[#222222]/80 max-w-md mx-auto leading-relaxed">
              Request received. Our viewings team will confirm your slot by email once calendar availability has been verified with the current occupier.
            </p>

            <div className="p-4 bg-[#FAF7F0] rounded border border-[#1F3A2E]/10 text-xs text-[#222222]/70 max-w-md mx-auto text-left space-y-1.5">
              <div><strong className="text-[#1F3A2E]">Property:</strong> {selectedProperty.title} ({selectedProperty.id})</div>
              <div><strong className="text-[#1F3A2E]">Requested Date:</strong> {formatDateDisplay(preferredDate)}</div>
              <div><strong className="text-[#1F3A2E]">Window:</strong> {timeWindow}</div>
              <div><strong className="text-[#1F3A2E]">Lead Contact:</strong> {fullName} ({email})</div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link
                to={`/properties/${selectedProperty.slug}`}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded transition-colors"
              >
                Back to property
              </Link>
              <Link
                to="/properties"
                className="px-5 py-2.5 text-xs font-medium text-[#1F3A2E] bg-[#FAF7F0] border border-[#1F3A2E]/20 rounded hover:bg-white transition-colors"
              >
                Browse other listings
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Property Summary Card Header */}
            {selectedProperty && (
              <div className="bg-white p-4 sm:p-5 rounded-lg border border-[#1F3A2E]/10 shadow-xs flex flex-col sm:flex-row items-center gap-5">
                <div className="w-full sm:w-44 h-28 rounded overflow-hidden bg-[#FAF7F0] shrink-0 border border-[#1F3A2E]/10">
                  <img
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B08D57]">
                    Selected Property · Ref {selectedProperty.id}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1F3A2E]">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-xs text-[#222222]/70">{selectedProperty.address}</p>
                  <p className="font-serif text-base font-bold text-[#1F3A2E] pt-1">
                    {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(selectedProperty.price_gbp)}
                    {selectedProperty.price_frequency === "pcm" ? " pcm" : ""}
                  </p>
                </div>
              </div>
            )}

            {submitError && (
              <div className="p-4 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{submitError}</p>
                  <p className="text-amber-800">
                    Your request details have been safely queued. You can also contact our viewings desk directly at{" "}
                    <a href="mailto:viewings@alderwickrowe.co.uk" className="underline font-semibold">
                      viewings@alderwickrowe.co.uk
                    </a>.
                  </p>
                </div>
              </div>
            )}

            {/* Viewing Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-lg border border-[#1F3A2E]/10 shadow-xs space-y-6" noValidate>
              {/* Property Selector */}
              <div className="space-y-1">
                <label htmlFor="property_id" className="block text-xs font-semibold text-[#1F3A2E]">
                  Select Listing to Inspect <span className="text-red-600">*</span>
                </label>
                <select
                  id="property_id"
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {p.area} (£{p.price_gbp.toLocaleString("en-GB")}{p.price_frequency === "pcm" ? " pcm" : ""}) [{p.id}]
                    </option>
                  ))}
                </select>
                {errors.property_id && (
                  <p className="text-[11px] text-red-600 font-medium">{errors.property_id}</p>
                )}
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1F3A2E]/10">
                <div className="space-y-1">
                  <label htmlFor="full_name" className="block text-xs font-semibold text-[#1F3A2E]">
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="full_name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alistair Finch"
                    className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                  {errors.full_name && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.full_name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-semibold text-[#1F3A2E]">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. a.finch@example.co.uk"
                    className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#1F3A2E]">
                    Telephone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +44 161 832 9400"
                    className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1F3A2E]">
                    Preferred Contact
                  </label>
                  <div className="flex items-center gap-6 pt-2">
                    <label className="inline-flex items-center gap-2 text-xs text-[#222222] cursor-pointer">
                      <input
                        type="radio"
                        checked={preferredContact === "Email"}
                        onChange={() => setPreferredContact("Email")}
                        className="w-3.5 h-3.5 text-[#1F3A2E]"
                      />
                      <span>Email</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-[#222222] cursor-pointer">
                      <input
                        type="radio"
                        checked={preferredContact === "Telephone"}
                        onChange={() => setPreferredContact("Telephone")}
                        className="w-3.5 h-3.5 text-[#1F3A2E]"
                      />
                      <span>Telephone</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Date & Time Window */}
              <div className="pt-2 border-t border-[#1F3A2E]/10 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E]">
                  Inspection Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="preferred_date" className="block text-xs font-semibold text-[#1F3A2E]">
                      Preferred Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="preferred_date"
                      type="date"
                      min={minDate}
                      max={maxDate}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    />
                    {preferredDate && (
                      <p className="text-[10px] text-[#222222]/60">UK format: {formatDateDisplay(preferredDate)}</p>
                    )}
                    {errors.preferred_date && (
                      <p className="text-[11px] text-red-600 font-medium">{errors.preferred_date}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="time_window" className="block text-xs font-semibold text-[#1F3A2E]">
                      Time Window <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="time_window"
                      value={timeWindow}
                      onChange={(e) => setTimeWindow(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    >
                      <option value="Morning (09:00 - 12:00)">Morning (09:00–12:00)</option>
                      <option value="Afternoon (12:00 - 17:00)">Afternoon (12:00–17:00)</option>
                      <option value="Evening (17:00 - 18:00)">Evening (17:00–18:00)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="alt_date" className="block text-xs font-semibold text-[#1F3A2E]">
                      Alternative Date (Optional)
                    </label>
                    <input
                      id="alt_date"
                      type="date"
                      min={minDate}
                      max={maxDate}
                      value={altDate}
                      onChange={(e) => setAltDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    />
                    {altDate && (
                      <p className="text-[10px] text-[#222222]/60">UK format: {formatDateDisplay(altDate)}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="viewing_notes" className="block text-xs font-semibold text-[#1F3A2E]">
                    Special Requirements or Questions (Optional)
                  </label>
                  <textarea
                    id="viewing_notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Accompanied by surveyor, specific interest in the boundary or outbuildings..."
                    className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2 border-t border-[#1F3A2E]/10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1F3A2E] mt-0.5 border-[#1F3A2E]/30 focus:ring-[#B08D57]"
                  />
                  <span className="text-xs text-[#222222]/85 leading-relaxed">
                    I agree to Alderwick &amp; Rowe contacting me regarding this inspection request in accordance with the{" "}
                    <Link to="/privacy" className="text-[#B08D57] underline hover:text-[#C5A46F]">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-[11px] text-red-600 font-medium mt-1 ml-7">{errors.consent}</p>
                )}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] disabled:opacity-50 rounded shadow-xs transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#B08D57]" />
                      <span>Checking calendar availability...</span>
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-3.5 h-3.5 text-[#B08D57]" />
                      <span>Submit viewing request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
