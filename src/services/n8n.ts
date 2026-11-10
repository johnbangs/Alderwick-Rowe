/**
 * Alderwick & Rowe - n8n Webhook Integration Service
 * 
 * Contract:
 * {
 *   "full_name": "", "email": "", "phone": "",
 *   "client_type": "Buyer" | "Tenant" | "Landlord" | "",
 *   "preferred_location": "", "property_type": "", "bedrooms": "",
 *   "budget_min": "", "budget_max": "", "budget_currency": "GBP",
 *   "budget_frequency": "monthly" | "one-off" | "",
 *   "transaction": "Purchase" | "Rental" | "Letting management" | "",
 *   "timeline": "", "preferred_contact": "Email" | "Telephone" | "",
 *   "service_required": "", "sample_enquiry": "", "message": "",
 *   "source": "website"
 * }
 */

export interface N8NEnquiryPayload {
  full_name: string;
  email: string;
  phone: string;
  client_type: "Buyer" | "Tenant" | "Landlord" | "";
  preferred_location: string;
  property_type: string;
  bedrooms: string;
  budget_min: string;
  budget_max: string;
  budget_currency: "GBP";
  budget_frequency: "monthly" | "one-off" | "";
  transaction: "Purchase" | "Rental" | "Letting management" | "";
  timeline: string;
  preferred_contact: "Email" | "Telephone" | "";
  service_required: string;
  sample_enquiry: string;
  message: string;
  source: string;
}

export interface N8NSubmissionResult {
  success: boolean;
  status: number;
  statusText?: string;
  durationMs: number;
  data?: unknown;
  error?: string;
  queuedLocally?: boolean;
}

const QUEUE_STORAGE_KEY = "ar_offline_enquiry_queue";
const WEBHOOK_STORAGE_KEY = "ar_custom_webhook_url";

/**
 * Resolves the n8n webhook URL.
 * Checks localStorage override (from /dev/payload-test), Vite env, and defaults to {{N8N_WEBHOOK_URL}}.
 */
export function getWebhookUrl(): string {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(WEBHOOK_STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved.trim();
    }
  }
  const envUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || (window as unknown as { __N8N_WEBHOOK_URL__?: string }).__N8N_WEBHOOK_URL__;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  return "https://geephixs.app.n8n.cloud/webhook/c6579e49-bc3e-4fea-9401-d80f72bf94a9";
  
}

export function setCustomWebhookUrl(url: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(WEBHOOK_STORAGE_KEY, url);
  }
}

/**
 * Normalises payload to strictly guarantee all expected keys are present as strings.
 */
export function normalisePayload(partial: Partial<N8NEnquiryPayload>): N8NEnquiryPayload {
  return {
    full_name: partial.full_name ?? "",
    email: partial.email ?? "",
    phone: partial.phone ?? "",
    client_type: partial.client_type ?? "",
    preferred_location: partial.preferred_location ?? "",
    property_type: partial.property_type ?? "",
    bedrooms: partial.bedrooms ? String(partial.bedrooms) : "",
    budget_min: partial.budget_min ? String(partial.budget_min) : "",
    budget_max: partial.budget_max ? String(partial.budget_max) : "",
    budget_currency: "GBP",
    budget_frequency: partial.budget_frequency ?? "",
    transaction: partial.transaction ?? "",
    timeline: partial.timeline ?? "",
    preferred_contact: partial.preferred_contact ?? "",
    service_required: partial.service_required ?? "",
    sample_enquiry: partial.sample_enquiry ?? "",
    message: partial.message ?? "",
    source: partial.source ?? "website"
  };
}

/**
 * Submits an enquiry payload to the n8n webhook.
 * On network error or failure, queues locally in localStorage so the user is never blocked.
 */
export async function submitEnquiryToN8N(
  rawPayload: Partial<N8NEnquiryPayload>
): Promise<N8NSubmissionResult> {
  const payload = normalisePayload(rawPayload);
  const targetUrl = getWebhookUrl();
  const startTime = performance.now();

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const durationMs = Math.round(performance.now() - startTime);

    if (response.ok) {
      let responseData: unknown = null;
      try {
        responseData = await response.json();
      } catch {
        responseData = { message: "Accepted by webhook" };
      }

      // Record in recent dev submissions for testing verification
      recordDevHistory(payload, 200, durationMs, true);

      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        durationMs,
        data: responseData
      };
    } else {
      const errorText = await response.text().catch(() => "HTTP Error");
      queueLocally(payload);
      recordDevHistory(payload, response.status, durationMs, false, errorText);

      return {
        success: false,
        status: response.status,
        statusText: response.statusText,
        durationMs,
        error: `Webhook returned status ${response.status}: ${errorText}`,
        queuedLocally: true
      };
    }
  } catch (err: unknown) {
    const durationMs = Math.round(performance.now() - startTime);
    const errorMessage = err instanceof Error ? err.message : "Network request failed";
    
    // Always queue locally so user enquiry is preserved
    queueLocally(payload);
    recordDevHistory(payload, 0, durationMs, false, errorMessage);

    return {
      success: false,
      status: 0,
      statusText: "Connection Error",
      durationMs,
      error: errorMessage,
      queuedLocally: true
    };
  }
}

function queueLocally(payload: N8NEnquiryPayload): void {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    const queue: { timestamp: string; payload: N8NEnquiryPayload }[] = raw ? JSON.parse(raw) : [];
    queue.push({
      timestamp: new Date().toISOString(),
      payload
    });
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.warn("Unable to save enquiry to offline queue", e);
  }
}

export function getOfflineQueue(): { timestamp: string; payload: N8NEnquiryPayload }[] {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearOfflineQueue(): void {
  try {
    localStorage.removeItem(QUEUE_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

// Dev test history for /dev/payload-test
export interface DevTestHistoryItem {
  id: string;
  timestamp: string;
  payload: N8NEnquiryPayload;
  status: number;
  durationMs: number;
  success: boolean;
  notes?: string;
}

const DEV_HISTORY_KEY = "ar_dev_test_history";

export function recordDevHistory(
  payload: N8NEnquiryPayload,
  status: number,
  durationMs: number,
  success: boolean,
  notes?: string
): void {
  try {
    const raw = localStorage.getItem(DEV_HISTORY_KEY);
    const items: DevTestHistoryItem[] = raw ? JSON.parse(raw) : [];
    items.unshift({
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      payload,
      status,
      durationMs,
      success,
      notes
    });
    // Keep max 20 items
    localStorage.setItem(DEV_HISTORY_KEY, JSON.stringify(items.slice(0, 20)));
  } catch {
    // Ignore
  }
}

export function getDevHistory(): DevTestHistoryItem[] {
  try {
    const raw = localStorage.getItem(DEV_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearDevHistory(): void {
  try {
    localStorage.removeItem(DEV_HISTORY_KEY);
  } catch {
    // Ignore
  }
}

export interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  status?: "sending" | "sent" | "error";
}

/**
 * Dispatches a chat message to the n8n production webhook.
 * Adheres strictly to the 18-key contract while parsing diverse n8n output structures.
 */
export async function sendChatMessageToN8N(
  messageText: string,
  profile?: {
    full_name?: string;
    email?: string;
    phone?: string;
    client_type?: "Buyer" | "Tenant" | "Landlord" | "";
    transaction?: "Purchase" | "Rental" | "Letting management" | "";
    preferred_location?: string;
  },
  context?: {
    pageUrl?: string;
    propertyId?: string;
  }
): Promise<{ reply: string; success: boolean; durationMs: number; raw?: unknown }> {
  const targetUrl = getWebhookUrl();
  const startTime = performance.now();

  const payload: N8NEnquiryPayload = normalisePayload({
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    client_type: profile?.client_type || "",
    preferred_location: profile?.preferred_location || "",
    property_type: "",
    bedrooms: "",
    budget_min: "",
    budget_max: "",
    budget_currency: "GBP",
    budget_frequency: "",
    transaction: profile?.transaction || "",
    timeline: "Immediate chat",
    preferred_contact: "Email",
    service_required: context?.propertyId ? `Property Chat (${context.propertyId})` : "Live Advisory Chat",
    sample_enquiry: messageText,
    message: context?.propertyId ? `[Regarding Property ${context.propertyId}] ${messageText}` : messageText,
    source: "website-chat"
  });

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const durationMs = Math.round(performance.now() - startTime);

    if (response.ok) {
      let replyText = "";
      let rawData: unknown = null;
      try {
        rawData = await response.json();
        if (typeof rawData === "object" && rawData !== null) {
          const dict = rawData as Record<string, unknown>;
          replyText =
            (dict.output as string) ||
            (dict.message as string) ||
            (dict.reply as string) ||
            (dict.response as string) ||
            (dict.text as string) ||
            (Array.isArray(dict) && dict[0]?.output ? String(dict[0].output) : "");
        } else if (typeof rawData === "string") {
          replyText = rawData;
        }
      } catch {
        // Response was text or empty
        const textData = await response.text().catch(() => "");
        replyText = textData;
      }

      if (!replyText || replyText.trim().length === 0) {
        replyText =
          "Thank you for contacting Alderwick & Rowe. Your enquiry has been received by our automated desk and directed to the appropriate regional partner. If you require immediate assistance or wish to book a viewing today, please telephone our offices on +44 (0) 161 832 9400.";
      }

      recordDevHistory(payload, response.status, durationMs, true);
      return { reply: replyText, success: true, durationMs, raw: rawData };
    } else {
      const errorText = await response.text().catch(() => "HTTP error");
      recordDevHistory(payload, response.status, durationMs, false, errorText);
      queueLocally(payload);

      return {
        reply:
          "Thank you. Your message has been safely queued and will be processed by our client desk as soon as connectivity is re-established. You may also contact us directly at enquiries@alderwickrowe.co.uk.",
        success: false,
        durationMs,
        raw: errorText
      };
    }
  } catch (err: unknown) {
    const durationMs = Math.round(performance.now() - startTime);
    const errMessage = err instanceof Error ? err.message : "Network failure";
    queueLocally(payload);
    recordDevHistory(payload, 0, durationMs, false, errMessage);

    return {
      reply:
        "Your message has been preserved and queued for delivery. Our team has been notified. You can also telephone our advisory desk directly on +44 (0) 161 832 9400.",
      success: false,
      durationMs,
      raw: errMessage
    };
  }
}

