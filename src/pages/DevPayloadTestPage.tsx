import React, { useState, useEffect } from "react";
import { 
  N8NEnquiryPayload, 
  normalisePayload, 
  submitEnquiryToN8N, 
  getWebhookUrl, 
  setCustomWebhookUrl,
  getDevHistory,
  clearDevHistory,
  DevTestHistoryItem
} from "../services/n8n";
import { 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Clock, 
  RotateCcw, 
  Save, 
  AlertCircle, 
  CheckCircle2, 
  FileCode,
  Sliders,
  History
} from "lucide-react";

export const DevPayloadTestPage: React.FC = () => {
  const [webhookUrl, setWebhookUrlState] = useState<string>("");
  const [copiedJson, setCopiedJson] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [lastResult, setLastResult] = useState<{
    status: number;
    statusText?: string;
    durationMs: number;
    data?: unknown;
    error?: string;
    sentPayload?: N8NEnquiryPayload;
  } | null>(null);

  const [history, setHistory] = useState<DevTestHistoryItem[]>([]);

  // Default payload in the editor
  const [payload, setPayload] = useState<N8NEnquiryPayload>({
    full_name: "James Bellingham",
    email: "j.bellingham@example.co.uk",
    phone: "+44 7700 900482",
    client_type: "Buyer",
    preferred_location: "Didsbury, Manchester",
    property_type: "Semi-detached house",
    bedrooms: "3",
    budget_min: "350000",
    budget_max: "420000",
    budget_currency: "GBP",
    budget_frequency: "one-off",
    transaction: "Purchase",
    timeline: "Within 3 months",
    preferred_contact: "Email",
    service_required: "Sales",
    sample_enquiry: "Viewing enquiry regarding period semi-detached property in Didsbury (AR-PROP-001)",
    message: "Seeking a family residence near primary school catchment with off-road parking.",
    source: "website-dev-test"
  });

  useEffect(() => {
    setWebhookUrlState(getWebhookUrl());
    setHistory(getDevHistory());
  }, []);

  const updateField = (key: keyof N8NEnquiryPayload, value: string) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleWebhookUrlSave = (newUrl: string) => {
    setWebhookUrlState(newUrl);
    setCustomWebhookUrl(newUrl);
  };

  const loadPreset = (presetName: "lead" | "property" | "inspection" | "general") => {
    switch (presetName) {
      case "lead":
        setPayload({
          full_name: "Eleanor Vance",
          email: "e.vance@example.co.uk",
          phone: "+44 7700 900123",
          client_type: "Buyer",
          preferred_location: "Altrincham, Greater Manchester",
          property_type: "Detached house",
          bedrooms: "4",
          budget_min: "550000",
          budget_max: "650000",
          budget_currency: "GBP",
          budget_frequency: "one-off",
          transaction: "Purchase",
          timeline: "Within 1 month",
          preferred_contact: "Telephone",
          service_required: "Sales",
          sample_enquiry: "General Buyer Registration - Altrincham enclaves",
          message: "Pre-approved mortgage in place with Decision in Principle.",
          source: "website"
        });
        break;
      case "property":
        setPayload({
          full_name: "Claire Finch",
          email: "c.finch@example.co.uk",
          phone: "+44 161 832 9400",
          client_type: "Tenant",
          preferred_location: "Salford Quays, Manchester",
          property_type: "Apartment",
          bedrooms: "2",
          budget_min: "1400",
          budget_max: "1600",
          budget_currency: "GBP",
          budget_frequency: "monthly",
          transaction: "Rental",
          timeline: "Immediate",
          preferred_contact: "Email",
          service_required: "Lettings",
          sample_enquiry: "Enquiry about Two-bedroom modern apartment (AR-PROP-002)",
          message: "Looking to take a 12-month AST starting on the 1st of next month.",
          source: "website"
        });
        break;
      case "inspection":
        setPayload({
          full_name: "Dr. Alistair Finch",
          email: "a.finch@example.co.uk",
          phone: "+44 7700 900555",
          client_type: "Buyer",
          preferred_location: "Didsbury, Manchester",
          property_type: "Semi-detached house",
          bedrooms: "3",
          budget_min: "",
          budget_max: "395000",
          budget_currency: "GBP",
          budget_frequency: "one-off",
          transaction: "Purchase",
          timeline: "Immediate viewing",
          preferred_contact: "Telephone",
          service_required: "Viewing",
          sample_enquiry: "Viewing request for Three-bedroom semi-detached house (AR-PROP-001) on 15/11/2026 Morning (09:00 - 12:00). Notes: Accompanied inspection.",
          message: "Will attend with surveyor.",
          source: "website"
        });
        break;
      case "general":
        setPayload({
          full_name: "Robert Sterling",
          email: "r.sterling@example.co.uk",
          phone: "+44 161 832 9400",
          client_type: "",
          preferred_location: "",
          property_type: "",
          bedrooms: "",
          budget_min: "",
          budget_max: "",
          budget_currency: "GBP",
          budget_frequency: "",
          transaction: "",
          timeline: "",
          preferred_contact: "Email",
          service_required: "General Enquiry",
          sample_enquiry: "Inquiry regarding land appraisal in Cheshire East.",
          message: "Seeking confidential meeting with Arthur Alderwick regarding an estate probate valuation.",
          source: "website-contact"
        });
        break;
    }
  };

  const handleCopyJson = () => {
    const text = JSON.stringify(normalisePayload(payload), null, 2);
    navigator.clipboard.writeText(text);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleSendTest = async () => {
    setIsSending(true);
    setLastResult(null);

    const result = await submitEnquiryToN8N(payload);
    setIsSending(false);

    setLastResult({
      status: result.status,
      statusText: result.statusText,
      durationMs: result.durationMs,
      data: result.data,
      error: result.error,
      sentPayload: normalisePayload(payload)
    });

    setHistory(getDevHistory());
  };

  return (
    <div className="min-h-screen bg-[#111A15] text-[#E0E6E2] font-mono p-4 sm:p-8">
      {/* Dev Environment Banner */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded bg-[#16251E] border border-[#B08D57]/40 shadow-lg">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#B08D57]" />
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">
              n8n Webhook Diagnostic Workbench
            </h1>
            <p className="text-xs text-[#E0E6E2]/70 font-sans">
              Protected developer suite · Inspect raw payload contracts, trigger webhook test requests, and evaluate classification latency.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded">
            DEV_TOOLS=ACTIVE
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#B08D57]/20 text-[#B08D57] border border-[#B08D57]/40 px-2.5 py-1 rounded">
            NOINDEX
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Webhook URL Bar */}
          <div className="p-4 rounded bg-[#16251E] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="webhook-url" className="text-xs font-semibold uppercase tracking-wider text-[#B08D57]">
                Target Webhook Endpoint
              </label>
              <button
                type="button"
                onClick={() => handleWebhookUrlSave("https://automation.alderwickrowe.co.uk/webhook/enquiry-intake")}
                className="text-[10px] text-[#B08D57] hover:underline"
              >
                Reset Default
              </button>
            </div>
            <div className="flex gap-2">
              <input
                id="webhook-url"
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrlState(e.target.value)}
                onBlur={(e) => handleWebhookUrlSave(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded bg-black/40 border border-white/20 text-white focus:outline-none focus:border-[#B08D57]"
              />
              <button
                type="button"
                onClick={() => handleWebhookUrlSave(webhookUrl)}
                className="px-3 py-1.5 text-xs rounded bg-[#1F3A2E] text-[#B08D57] border border-[#B08D57]/40 hover:bg-[#2A4D3E]"
              >
                Save
              </button>
            </div>
          </div>

          {/* Test Presets */}
          <div className="p-4 rounded bg-[#16251E] border border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B08D57] block mb-2">
              Route Classification Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => loadPreset("lead")}
                className="px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded border border-white/10 text-left transition-colors"
              >
                1. Leads Route
              </button>
              <button
                type="button"
                onClick={() => loadPreset("property")}
                className="px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded border border-white/10 text-left transition-colors"
              >
                2. Property Route
              </button>
              <button
                type="button"
                onClick={() => loadPreset("inspection")}
                className="px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded border border-white/10 text-left transition-colors"
              >
                3. Inspection Route
              </button>
              <button
                type="button"
                onClick={() => loadPreset("general")}
                className="px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded border border-white/10 text-left transition-colors"
              >
                4. General Route
              </button>
            </div>
          </div>

          {/* Interactive Contract Fields */}
          <div className="p-5 rounded bg-[#16251E] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Payload Contract Inputs
              </span>
              <span className="text-[10px] text-[#B08D57]">
                18 Mandatory Contract Keys
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">full_name</label>
                <input
                  type="text"
                  value={payload.full_name}
                  onChange={(e) => updateField("full_name", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">email</label>
                <input
                  type="email"
                  value={payload.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">phone</label>
                <input
                  type="text"
                  value={payload.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">client_type</label>
                <select
                  value={payload.client_type}
                  onChange={(e) => updateField("client_type", e.target.value as N8NEnquiryPayload["client_type"])}
                  className="w-full px-2 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                >
                  <option value="">(Empty string)</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Landlord">Landlord</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">transaction</label>
                <select
                  value={payload.transaction}
                  onChange={(e) => updateField("transaction", e.target.value as N8NEnquiryPayload["transaction"])}
                  className="w-full px-2 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                >
                  <option value="">(Empty string)</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Rental">Rental</option>
                  <option value="Letting management">Letting management</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">preferred_contact</label>
                <select
                  value={payload.preferred_contact}
                  onChange={(e) => updateField("preferred_contact", e.target.value as N8NEnquiryPayload["preferred_contact"])}
                  className="w-full px-2 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                >
                  <option value="">(Empty string)</option>
                  <option value="Email">Email</option>
                  <option value="Telephone">Telephone</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">preferred_location</label>
                <input
                  type="text"
                  value={payload.preferred_location}
                  onChange={(e) => updateField("preferred_location", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">property_type</label>
                <input
                  type="text"
                  value={payload.property_type}
                  onChange={(e) => updateField("property_type", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">bedrooms</label>
                <input
                  type="text"
                  value={payload.bedrooms}
                  onChange={(e) => updateField("bedrooms", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">budget_min</label>
                <input
                  type="text"
                  value={payload.budget_min}
                  onChange={(e) => updateField("budget_min", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">budget_max</label>
                <input
                  type="text"
                  value={payload.budget_max}
                  onChange={(e) => updateField("budget_max", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">budget_frequency</label>
                <select
                  value={payload.budget_frequency}
                  onChange={(e) => updateField("budget_frequency", e.target.value as N8NEnquiryPayload["budget_frequency"])}
                  className="w-full px-2 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                >
                  <option value="">(Empty string)</option>
                  <option value="monthly">monthly</option>
                  <option value="one-off">one-off</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">budget_currency</label>
                <input
                  type="text"
                  disabled
                  value="GBP"
                  className="w-full px-2.5 py-1 text-xs bg-black/60 border border-white/10 rounded text-[#B08D57]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">service_required</label>
                <input
                  type="text"
                  value={payload.service_required}
                  onChange={(e) => updateField("service_required", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#B08D57] block mb-1">timeline</label>
                <input
                  type="text"
                  value={payload.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#B08D57] block mb-1">sample_enquiry</label>
              <textarea
                rows={2}
                value={payload.sample_enquiry}
                onChange={(e) => updateField("sample_enquiry", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-[#B08D57] block mb-1">message</label>
              <textarea
                rows={2}
                value={payload.message}
                onChange={(e) => updateField("message", e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-black/40 border border-white/20 rounded text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-xs text-[#E0E6E2]/50">
                Source: <span className="text-[#B08D57]">{payload.source}</span>
              </span>

              <button
                type="button"
                onClick={handleSendTest}
                disabled={isSending}
                className="inline-flex items-center gap-2 px-5 py-2 rounded bg-[#B08D57] hover:bg-[#C5A46F] text-[#111A15] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSending ? "Transmitting..." : "POST to Webhook"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live JSON Preview & Raw Webhook Response (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live JSON Preview */}
          <div className="p-4 rounded bg-[#16251E] border border-white/10 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57] flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5" />
                <span>Live JSON Contract Preview</span>
              </span>
              <button
                type="button"
                onClick={handleCopyJson}
                className="inline-flex items-center gap-1 text-[11px] text-[#B08D57] hover:underline"
              >
                {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedJson ? "Copied" : "Copy JSON"}</span>
              </button>
            </div>

            <pre className="p-3 rounded bg-black/60 text-emerald-400 text-[11px] max-h-72 overflow-y-auto leading-relaxed border border-white/5">
              {JSON.stringify(normalisePayload(payload), null, 2)}
            </pre>
          </div>

          {/* Last Response Inspector */}
          <div className="p-4 rounded bg-[#16251E] border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Execution Telemetry
              </span>
              {lastResult && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    lastResult.status >= 200 && lastResult.status < 300
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-amber-950 text-amber-300 border border-amber-800"
                  }`}
                >
                  HTTP {lastResult.status || "ERR"} · {lastResult.durationMs}ms
                </span>
              )}
            </div>

            {lastResult ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#B08D57]">Latency:</span>
                  <span className="text-white font-bold">{lastResult.durationMs} ms</span>
                </div>
                {lastResult.error && (
                  <div className="p-2.5 rounded bg-amber-950/60 border border-amber-800 text-amber-300 text-[11px]">
                    <strong>Error:</strong> {lastResult.error}
                  </div>
                )}
                <div>
                  <span className="text-[#B08D57] block mb-1">Webhook Response Body:</span>
                  <pre className="p-3 rounded bg-black/60 text-white text-[11px] max-h-48 overflow-y-auto border border-white/5">
                    {typeof lastResult.data === "object"
                      ? JSON.stringify(lastResult.data, null, 2)
                      : String(lastResult.data || "HTTP 200 (No Content)")}
                  </pre>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#E0E6E2]/50 italic">
                No webhook calls dispatched yet. Click &ldquo;POST to Webhook&rdquo; above to verify payload ingestion.
              </p>
            )}
          </div>

          {/* Test History in localStorage */}
          <div className="p-4 rounded bg-[#16251E] border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57] flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Recent Test Payloads ({history.length})</span>
              </span>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    clearDevHistory();
                    setHistory([]);
                  }}
                  className="text-[10px] text-red-400 hover:underline"
                >
                  Clear History
                </button>
              )}
            </div>

            {history.length > 0 ? (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded bg-black/40 border border-white/5 hover:border-[#B08D57]/40 text-xs flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-white text-[11px] truncate max-w-[180px]">
                        {item.payload.full_name || "Anonymous"}
                      </div>
                      <div className="text-[10px] text-[#E0E6E2]/60">
                        {item.payload.client_type || "General"} · {item.payload.transaction || "N/A"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          item.success ? "text-emerald-400 bg-emerald-950/60" : "text-amber-400 bg-amber-950/60"
                        }`}
                      >
                        {item.status || "ERR"} ({item.durationMs}ms)
                      </span>
                      <button
                        type="button"
                        onClick={() => setPayload(item.payload)}
                        className="text-[10px] text-[#B08D57] hover:underline"
                      >
                        Load
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#E0E6E2]/40 italic">No saved test history found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
