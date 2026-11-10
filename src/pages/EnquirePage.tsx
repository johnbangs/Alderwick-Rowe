import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useRouter, Link } from "../context/RouterContext";
import { getPropertyById } from "../data/properties";
import { submitEnquiryToN8N, N8NEnquiryPayload } from "../services/n8n";
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  Mail, 
  CheckCircle2, 
  RotateCcw,
  Building2,
  Calendar,
  Lock
} from "lucide-react";

// Step-by-Step Zod Schemas
const step1Schema = z.object({
  full_name: z.string().min(2, "Please enter your full name (minimum 2 characters)"),
  email: z.string().email("Please provide a valid email address (e.g. name@domain.co.uk)"),
  phone: z.string().min(7, "Please provide a contact telephone number"),
  preferred_contact: z.enum(["Email", "Telephone"])
});

const step2Schema = z.object({
  client_type: z.enum(["Buyer", "Tenant", "Landlord"]),
  transaction: z.enum(["Purchase", "Rental", "Letting management"]),
  service_required: z.string().min(1, "Please select the service required")
});

const step3Schema = z.object({
  preferred_location: z.string().min(2, "Please enter your preferred location or region"),
  property_type: z.string().min(1, "Please specify a property type"),
  bedrooms: z.string().min(1, "Please specify bedrooms"),
  budget_min: z.string(),
  budget_max: z.string(),
  budget_frequency: z.enum(["monthly", "one-off"]),
  timeline: z.string().min(1, "Please select your expected timeline")
});

const step4Schema = z.object({
  sample_enquiry: z.string().min(5, "Please provide a brief outline of your enquiry"),
  message: z.string()
});

const step5Schema = z.object({
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to Alderwick & Rowe contacting you regarding your enquiry"
  })
});

const STORAGE_KEY = "ar_enquire_form_draft";
const LAST_SUBMIT_KEY = "ar_last_enquiry_timestamp";

export const EnquirePage: React.FC = () => {
  const { searchParams } = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form Data State
  const [formData, setFormData] = useState<N8NEnquiryPayload & { consent: boolean }>({
    full_name: "",
    email: "",
    phone: "",
    client_type: "Buyer",
    preferred_location: "",
    property_type: "Apartment",
    bedrooms: "2",
    budget_min: "",
    budget_max: "",
    budget_currency: "GBP",
    budget_frequency: "one-off",
    transaction: "Purchase",
    timeline: "Within 3 months",
    preferred_contact: "Email",
    service_required: "Sales",
    sample_enquiry: "",
    message: "",
    source: "website",
    consent: false
  });

  // Pre-fill from query params or local draft
  useEffect(() => {
    const propId = searchParams.get("property");
    const typeParam = searchParams.get("type");
    const locParam = searchParams.get("location");

    // Load draft if available
    let draft: Partial<N8NEnquiryPayload & { consent: boolean }> = {};
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        draft = JSON.parse(stored);
      }
    } catch {
      // Ignore
    }

    let defaultEnquiry = draft.sample_enquiry || "";
    let defaultTransaction = draft.transaction || "Purchase";
    let defaultClientType = draft.client_type || "Buyer";
    let defaultFreq: "monthly" | "one-off" = draft.budget_frequency || "one-off";

    if (propId) {
      const matched = getPropertyById(propId);
      if (matched) {
        defaultEnquiry = `Enquiry about ${matched.title} (${matched.id})`;
        if (matched.status === "To let") {
          defaultClientType = "Tenant";
          defaultTransaction = "Rental";
          defaultFreq = "monthly";
        } else {
          defaultClientType = "Buyer";
          defaultTransaction = "Purchase";
          defaultFreq = "one-off";
        }
      }
    }

    if (typeParam) {
      if (typeParam.toLowerCase() === "landlord") {
        defaultClientType = "Landlord";
        defaultTransaction = "Letting management";
      } else if (typeParam.toLowerCase() === "tenant") {
        defaultClientType = "Tenant";
        defaultTransaction = "Rental";
        defaultFreq = "monthly";
      } else if (typeParam.toLowerCase() === "buyer") {
        defaultClientType = "Buyer";
        defaultTransaction = "Purchase";
        defaultFreq = "one-off";
      }
    }

    setFormData((prev) => ({
      ...prev,
      ...draft,
      client_type: defaultClientType as "Buyer" | "Tenant" | "Landlord",
      transaction: defaultTransaction as "Purchase" | "Rental" | "Letting management",
      budget_frequency: defaultFreq,
      sample_enquiry: defaultEnquiry || prev.sample_enquiry,
      preferred_location: locParam || draft.preferred_location || prev.preferred_location
    }));
  }, [searchParams]);

  // Persist draft on edit
  useEffect(() => {
    if (!submitSuccess) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch {
        // Ignore
      }
    }
  }, [formData, submitSuccess]);

  const updateField = (field: keyof typeof formData, value: unknown) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto adjust budget_frequency based on transaction
      if (field === "transaction") {
        if (value === "Rental") {
          updated.budget_frequency = "monthly";
        } else if (value === "Purchase") {
          updated.budget_frequency = "one-off";
        }
      }

      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    let result: { success: boolean; error?: z.ZodError } = { success: true };
    if (step === 1) {
      result = step1Schema.safeParse({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        preferred_contact: formData.preferred_contact
      });
    } else if (step === 2) {
      result = step2Schema.safeParse({
        client_type: formData.client_type,
        transaction: formData.transaction,
        service_required: formData.service_required
      });
    } else if (step === 3) {
      result = step3Schema.safeParse({
        preferred_location: formData.preferred_location,
        property_type: formData.property_type,
        bedrooms: formData.bedrooms,
        budget_min: formData.budget_min,
        budget_max: formData.budget_max,
        budget_frequency: formData.budget_frequency,
        timeline: formData.timeline
      });
    } else if (step === 4) {
      result = step4Schema.safeParse({
        sample_enquiry: formData.sample_enquiry,
        message: formData.message
      });
    } else if (step === 5) {
      result = step5Schema.safeParse({
        consent: formData.consent
      });
    }

    if (!result.success && result.error) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((e) => {
        const path = String(e.path[0]);
        newErrors[path] = e.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) {
      console.warn("Spam detected via honeypot");
      setSubmitSuccess(true);
      return;
    }

    // Client-side rate-limit throttle (max 1 submission per 10s)
    const lastSubmit = localStorage.getItem(LAST_SUBMIT_KEY);
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit, 10);
      if (timeDiff < 10000) {
        setSubmitError("Please wait a moment before sending another enquiry.");
        return;
      }
    }

    if (!validateStep(5)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitEnquiryToN8N(formData);
    setIsSubmitting(false);

    if (result.success || result.queuedLocally) {
      localStorage.setItem(LAST_SUBMIT_KEY, Date.now().toString());
      localStorage.removeItem(STORAGE_KEY);
      setSubmitSuccess(true);
    } else {
      setSubmitError(result.error || "Unable to deliver enquiry to automated intake. Please retry or contact us directly.");
    }
  };

  const steps = [
    { num: 1, title: "About You" },
    { num: 2, title: "Client Role" },
    { num: 3, title: "Requirements" },
    { num: 4, title: "Message" },
    { num: 5, title: "Consent & Send" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-24">
      <Breadcrumbs items={[{ label: "Register Enquiry" }]} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Header */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#B08D57] block mb-1">
            Client Intake
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F3A2E]">
            Register Your Property Enquiry
          </h1>
          <p className="text-xs sm:text-sm text-[#222222]/70 max-w-lg mx-auto mt-2 leading-relaxed">
            Please complete our structured enquiry form. Your details feed directly into our secure client handling workflow for prompt partner assignment.
          </p>
        </div>

        {/* Success Screen */}
        {submitSuccess ? (
          <div className="bg-white p-8 sm:p-12 rounded-lg border border-[#1F3A2E]/10 shadow-md text-center space-y-5 animate-in fade-in">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <Check className="w-7 h-7" aria-hidden="true" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#1F3A2E]">
              Thank You — Enquiry Received
            </h2>

            <p className="text-sm text-[#222222]/80 max-w-md mx-auto leading-relaxed">
              We have received your enquiry and our partners will be in touch shortly. A confirmation note with your reference details will be dispatched to <strong className="text-[#1F3A2E]">{formData.email}</strong>.
            </p>

            <div className="p-4 bg-[#FAF7F0] rounded border border-[#1F3A2E]/10 text-xs text-[#222222]/70 max-w-md mx-auto text-left space-y-1">
              <div><strong className="text-[#1F3A2E]">Contact:</strong> {formData.full_name}</div>
              <div><strong className="text-[#1F3A2E]">Client Type:</strong> {formData.client_type} ({formData.transaction})</div>
              <div><strong className="text-[#1F3A2E]">Location:</strong> {formData.preferred_location || "UK Wide"}</div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link
                to="/properties"
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded transition-colors"
              >
                Browse properties
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmitSuccess(false);
                  setCurrentStep(1);
                }}
                className="px-5 py-2.5 text-xs font-medium text-[#1F3A2E] bg-[#FAF7F0] border border-[#1F3A2E]/20 rounded hover:bg-white transition-colors"
              >
                Submit another enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step Form Container */
          <div className="bg-white rounded-lg border border-[#1F3A2E]/10 shadow-xs p-6 sm:p-10">
            {/* Progress Stepper */}
            <div className="mb-8" aria-label="Form progress">
              <div className="flex items-center justify-between mb-2">
                {steps.map((st) => (
                  <div key={st.num} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        st.num < currentStep
                          ? "bg-emerald-800 text-white"
                          : st.num === currentStep
                          ? "bg-[#1F3A2E] text-white ring-2 ring-[#B08D57]"
                          : "bg-[#FAF7F0] text-[#222222]/40 border border-[#1F3A2E]/10"
                      }`}
                    >
                      {st.num < currentStep ? <Check className="w-4 h-4" /> : st.num}
                    </div>
                    <span className="hidden sm:block text-[11px] font-medium text-[#222222]/70 mt-1">
                      {st.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-[#FAF7F0] h-1.5 rounded-full overflow-hidden border border-[#1F3A2E]/10">
                <div
                  className="bg-[#B08D57] h-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Error Banner */}
            {submitError && (
              <div className="mb-6 p-4 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{submitError}</p>
                  <p className="text-amber-800">
                    Your form contents have been preserved. You can retry submission or email us directly at{" "}
                    <a href="mailto:enquiries@alderwickrowe.co.uk" className="underline font-semibold">
                      enquiries@alderwickrowe.co.uk
                    </a>.
                  </p>
                </div>
              </div>
            )}

            {/* Honeypot field (hidden from real users) */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website-address">Leave blank</label>
              <input
                id="website-address"
                type="text"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: ABOUT YOU */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="font-serif text-xl font-bold text-[#1F3A2E] border-b border-[#1F3A2E]/10 pb-2">
                    Step 1: About You
                  </h2>

                  <div className="space-y-1">
                    <label htmlFor="full_name" className="block text-xs font-semibold text-[#1F3A2E]">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => updateField("full_name", e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      aria-invalid={Boolean(errors.full_name)}
                      aria-describedby={errors.full_name ? "full_name-error" : undefined}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                    />
                    {errors.full_name && (
                      <p id="full_name-error" className="text-[11px] text-red-600 font-medium">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs font-semibold text-[#1F3A2E]">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="e.g. e.vance@example.co.uk"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                      />
                      {errors.email && (
                        <p id="email-error" className="text-[11px] text-red-600 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#1F3A2E]">
                        Contact Telephone <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="e.g. +44 7700 900123"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="text-[11px] text-red-600 font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#1F3A2E]">
                      Preferred Contact Method
                    </label>
                    <div className="flex items-center gap-6 pt-1">
                      <label className="inline-flex items-center gap-2 text-xs text-[#222222] cursor-pointer">
                        <input
                          type="radio"
                          name="preferred_contact"
                          checked={formData.preferred_contact === "Email"}
                          onChange={() => updateField("preferred_contact", "Email")}
                          className="w-3.5 h-3.5 text-[#1F3A2E] focus:ring-[#B08D57]"
                        />
                        <span>Email communication</span>
                      </label>
                      <label className="inline-flex items-center gap-2 text-xs text-[#222222] cursor-pointer">
                        <input
                          type="radio"
                          name="preferred_contact"
                          checked={formData.preferred_contact === "Telephone"}
                          onChange={() => updateField("preferred_contact", "Telephone")}
                          className="w-3.5 h-3.5 text-[#1F3A2E] focus:ring-[#B08D57]"
                        />
                        <span>Telephone call</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: WHAT YOU NEED */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="font-serif text-xl font-bold text-[#1F3A2E] border-b border-[#1F3A2E]/10 pb-2">
                    Step 2: What You Need
                  </h2>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#1F3A2E]">
                      I am registering as a: <span className="text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {(["Buyer", "Tenant", "Landlord"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            updateField("client_type", type);
                            if (type === "Buyer") updateField("transaction", "Purchase");
                            if (type === "Tenant") updateField("transaction", "Rental");
                            if (type === "Landlord") updateField("transaction", "Letting management");
                          }}
                          className={`py-3 px-2 text-xs font-semibold rounded border text-center transition-colors ${
                            formData.client_type === type
                              ? "bg-[#1F3A2E] text-white border-[#1F3A2E]"
                              : "bg-[#FAF7F0] text-[#222222] border-[#1F3A2E]/10 hover:border-[#B08D57]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="transaction" className="block text-xs font-semibold text-[#1F3A2E]">
                      Transaction Type
                    </label>
                    <select
                      id="transaction"
                      value={formData.transaction}
                      onChange={(e) => updateField("transaction", e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    >
                      <option value="Purchase">Purchase (Acquisition)</option>
                      <option value="Rental">Rental (Tenancy)</option>
                      <option value="Letting management">Letting management &amp; Advisory</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="service_required" className="block text-xs font-semibold text-[#1F3A2E]">
                      Service Required
                    </label>
                    <select
                      id="service_required"
                      value={formData.service_required}
                      onChange={(e) => updateField("service_required", e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    >
                      <option value="Sales">Residential Sales</option>
                      <option value="Lettings">Prime Lettings</option>
                      <option value="Letting management">Full Letting Management</option>
                      <option value="Valuation">Market Valuation &amp; Appraisal</option>
                      <option value="Other">Other Advisory Service</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: YOUR REQUIREMENTS */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="font-serif text-xl font-bold text-[#1F3A2E] border-b border-[#1F3A2E]/10 pb-2">
                    Step 3: Your Property Criteria
                  </h2>

                  <div className="space-y-1">
                    <label htmlFor="preferred_location" className="block text-xs font-semibold text-[#1F3A2E]">
                      Preferred Location or Region <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="preferred_location"
                      type="text"
                      value={formData.preferred_location}
                      onChange={(e) => updateField("preferred_location", e.target.value)}
                      placeholder="e.g. Didsbury, Manchester or Morningside, Edinburgh"
                      aria-invalid={Boolean(errors.preferred_location)}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    />
                    {errors.preferred_location && (
                      <p className="text-[11px] text-red-600 font-medium">{errors.preferred_location}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="property_type" className="block text-xs font-semibold text-[#1F3A2E]">
                        Property Type
                      </label>
                      <select
                        id="property_type"
                        value={formData.property_type}
                        onChange={(e) => updateField("property_type", e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                      >
                        <option value="Any">Any type</option>
                        <option value="Semi-detached house">Semi-detached house</option>
                        <option value="Detached house">Detached house</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Flat">Flat</option>
                        <option value="Cottage">Cottage</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Bungalow">Bungalow</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="bedrooms" className="block text-xs font-semibold text-[#1F3A2E]">
                        Desired Bedrooms
                      </label>
                      <select
                        id="bedrooms"
                        value={formData.bedrooms}
                        onChange={(e) => updateField("bedrooms", e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                      >
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4 Bedrooms</option>
                        <option value="5">5+ Bedrooms</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#1F3A2E]">
                        Budget Range (£ GBP)
                      </label>
                      <span className="text-[11px] text-[#B08D57] font-medium">
                        {formData.budget_frequency === "monthly" ? "Per Calendar Month (pcm)" : "Purchase Price (one-off)"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#222222]/50">£</span>
                        <input
                          type="number"
                          value={formData.budget_min}
                          onChange={(e) => updateField("budget_min", e.target.value)}
                          placeholder="Min budget"
                          className="w-full pl-7 pr-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#222222]/50">£</span>
                        <input
                          type="number"
                          value={formData.budget_max}
                          onChange={(e) => updateField("budget_max", e.target.value)}
                          placeholder="Max budget"
                          className="w-full pl-7 pr-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="timeline" className="block text-xs font-semibold text-[#1F3A2E]">
                      Desired Timeline
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => updateField("timeline", e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    >
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="Within 3 months">Within 3 months</option>
                      <option value="Within 6 months">Within 6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Just browsing">Just browsing / Market research</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 4: MESSAGE */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="font-serif text-xl font-bold text-[#1F3A2E] border-b border-[#1F3A2E]/10 pb-2">
                    Step 4: Your Message &amp; Notes
                  </h2>

                  <div className="space-y-1">
                    <label htmlFor="sample_enquiry" className="block text-xs font-semibold text-[#1F3A2E]">
                      Enquiry Summary <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="sample_enquiry"
                      rows={3}
                      value={formData.sample_enquiry}
                      onChange={(e) => updateField("sample_enquiry", e.target.value)}
                      placeholder="e.g. Enquiry regarding period semi-detached property in Didsbury (AR-PROP-001)"
                      aria-invalid={Boolean(errors.sample_enquiry)}
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    />
                    {errors.sample_enquiry && (
                      <p className="text-[11px] text-red-600 font-medium">{errors.sample_enquiry}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-xs font-semibold text-[#1F3A2E]">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Please include any specific requirements such as school proximity, chain status, or mortgage in principle..."
                      className="w-full px-3 py-2 text-xs rounded border border-[#1F3A2E]/20 bg-white focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: CONSENT & SUBMISSION */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="font-serif text-xl font-bold text-[#1F3A2E] border-b border-[#1F3A2E]/10 pb-2">
                    Step 5: Review &amp; Consent
                  </h2>

                  {/* Summary of criteria */}
                  <div className="p-4 bg-[#FAF7F0] rounded-lg border border-[#1F3A2E]/10 space-y-2 text-xs text-[#222222]">
                    <h3 className="font-serif font-bold text-[#1F3A2E] text-sm">
                      Enquiry Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div><strong className="text-[#1F3A2E]">Name:</strong> {formData.full_name}</div>
                      <div><strong className="text-[#1F3A2E]">Email:</strong> {formData.email}</div>
                      <div><strong className="text-[#1F3A2E]">Telephone:</strong> {formData.phone}</div>
                      <div><strong className="text-[#1F3A2E]">Client Type:</strong> {formData.client_type}</div>
                      <div><strong className="text-[#1F3A2E]">Location:</strong> {formData.preferred_location}</div>
                      <div><strong className="text-[#1F3A2E]">Timeline:</strong> {formData.timeline}</div>
                    </div>
                  </div>

                  {/* UK GDPR Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => updateField("consent", e.target.checked)}
                        className="w-4 h-4 rounded text-[#1F3A2E] mt-0.5 border-[#1F3A2E]/30 focus:ring-[#B08D57]"
                      />
                      <span className="text-xs text-[#222222]/85 leading-relaxed">
                        I agree to Alderwick &amp; Rowe contacting me about my enquiry in accordance with the{" "}
                        <Link to="/privacy" className="text-[#B08D57] underline hover:text-[#C5A46F]">
                          Privacy Policy
                        </Link>
                        . We respect your confidentiality and never share your details with unauthorized third parties.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-[11px] text-red-600 font-medium mt-1.5 ml-7">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-8 mt-6 border-t border-[#1F3A2E]/10 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#FAF7F0] hover:bg-[#1F3A2E]/5 rounded border border-[#1F3A2E]/20 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded transition-colors shadow-xs"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-7 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] hover:bg-[#C5A46F] disabled:opacity-50 rounded transition-colors shadow-xs cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#1F3A2E]" />
                        <span>Send enquiry</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
