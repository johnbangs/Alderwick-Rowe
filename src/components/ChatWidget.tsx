import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "../context/RouterContext";
import { sendChatMessageToN8N, ChatMessage, getWebhookUrl } from "../services/n8n";
import { 
  MessageSquare, 
  X, 
  Send, 
  Loader2, 
  Building2, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  User, 
  Mail, 
  CheckCheck,
  ChevronDown,
  Minimize2,
  Maximize2,
  Sparkles
} from "lucide-react";

const CHAT_STORAGE_KEY = "ar_chat_history_v1";
const CHAT_USER_KEY = "ar_chat_user_profile_v1";

export const ChatWidget: React.FC = () => {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // User contact details for n8n payload matching
  const [userProfile, setUserProfile] = useState<{
    full_name: string;
    email: string;
    phone: string;
    client_type: "Buyer" | "Tenant" | "Landlord" | "";
  }>({
    full_name: "",
    email: "",
    phone: "",
    client_type: "Buyer"
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore
    }
    return [
      {
        id: "msg-welcome",
        sender: "agent",
        text: "Good day. Welcome to the Alderwick & Rowe client advisory desk. How may we assist with your property search, private viewing, or valuation across England, Scotland, or Wales?",
        timestamp: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        status: "sent"
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load saved profile
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(CHAT_USER_KEY);
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Scroll to bottom on message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isSending) return;

    const userMessageId = `usr-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      status: "sending"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsSending(true);

    // Save profile if updated
    try {
      localStorage.setItem(CHAT_USER_KEY, JSON.stringify(userProfile));
    } catch {
      // Ignore
    }

    // Determine current property id if on detail page
    let activePropertyId: string | undefined;
    if (pathname.startsWith("/properties/")) {
      activePropertyId = pathname.replace(/^\/properties\//, "").replace(/\/$/, "");
    }

    const response = await sendChatMessageToN8N(
      text,
      userProfile,
      {
        pageUrl: typeof window !== "undefined" ? window.location.href : pathname,
        propertyId: activePropertyId
      }
    );

    setIsSending(false);

    // Update user message status to sent
    setMessages((prev) =>
      prev.map((m) => (m.id === userMessageId ? { ...m, status: "sent" } : m))
    );

    // Append agent reply
    const agentMsg: ChatMessage = {
      id: `agt-${Date.now()}`,
      sender: "agent",
      text: response.reply,
      timestamp: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      status: "sent"
    };

    setMessages((prev) => [...prev, agentMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const clearChat = () => {
    const initial: ChatMessage[] = [
      {
        id: `msg-${Date.now()}`,
        sender: "agent",
        text: "Conversation refreshed. Our advisory desk is ready to assist your enquiry.",
        timestamp: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        status: "sent"
      }
    ];
    setMessages(initial);
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(initial));
    } catch {
      // Ignore
    }
  };

  // Hide on dev pages to prevent collision with dev workbench
  if (pathname.startsWith("/dev/")) return null;

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1F3A2E] text-white hover:bg-[#162B22] border border-[#B08D57]/40 shadow-xl transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer group"
            aria-label="Open Advisory Desk Chat"
          >
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-[#B08D57]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#B08D57]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold tracking-wide text-white group-hover:text-[#F5F0E6]">
                Advisory Desk
              </span>
              <span className="text-[10px] text-[#B08D57] font-medium leading-none">
                Live n8n Intake
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Alderwick & Rowe Advisory Chat"
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[400px] h-[520px] max-h-[85vh] bg-[#FAF7F0] rounded-xl shadow-2xl border border-[#1F3A2E]/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <div className="bg-[#1F3A2E] text-white p-3.5 px-4 flex items-center justify-between border-b border-[#B08D57]/30 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#162B22] border border-[#B08D57]/40 flex items-center justify-center text-[#B08D57] shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white tracking-wide">
                  Alderwick &amp; Rowe
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-[#B08D57]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Advisory Desk · Live Automation</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                title="Restart chat session"
                className="p-1.5 text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors"
                aria-label="Clear chat"
              >
                <span className="text-[10px] uppercase font-semibold">Reset</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/70 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Minimise chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional Contact Capture Bar */}
          <div className="bg-[#F5F0E6] px-4 py-2 border-b border-[#1F3A2E]/10 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setShowContactForm(!showContactForm)}
              className="text-[11px] font-semibold text-[#1F3A2E] hover:text-[#B08D57] flex items-center gap-1 transition-colors"
            >
              <User className="w-3 h-3 text-[#B08D57]" />
              <span>
                {userProfile.email
                  ? `${userProfile.full_name || "Client"} (${userProfile.email})`
                  : "Add your contact details for partner callback"}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showContactForm ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Contact Details Drawer */}
          {showContactForm && (
            <div className="p-3 bg-white border-b border-[#1F3A2E]/10 space-y-2 text-xs animate-in fade-in">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Full name"
                  value={userProfile.full_name}
                  onChange={(e) => setUserProfile({ ...userProfile, full_name: e.target.value })}
                  className="px-2 py-1 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="px-2 py-1 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="tel"
                  placeholder="Telephone"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className="px-2 py-1 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white"
                />
                <select
                  value={userProfile.client_type}
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      client_type: e.target.value as "Buyer" | "Tenant" | "Landlord"
                    })
                  }
                  className="px-2 py-1 text-xs rounded border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white"
                >
                  <option value="Buyer">Buyer</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Landlord">Landlord</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="w-full py-1 text-[11px] font-semibold text-white bg-[#1F3A2E] rounded hover:bg-[#162B22]"
              >
                Save Details
              </button>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-[#FCFBF7]">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                      isUser
                        ? "bg-[#1F3A2E] text-white rounded-br-xs"
                        : "bg-white text-[#222222] border border-[#1F3A2E]/10 shadow-xs rounded-bl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#222222]/50 px-1">
                    <span>{msg.timestamp}</span>
                    {isUser && msg.status === "sent" && (
                      <CheckCheck className="w-3 h-3 text-[#B08D57]" />
                    )}
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#1F3A2E]/10 max-w-[70%] text-xs text-[#222222]/70 shadow-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B08D57]" />
                <span>Transmitting to advisory desk...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts (when few messages) */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-[#F5F0E6] border-t border-[#1F3A2E]/10 flex flex-wrap gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleSuggestedPrompt("I would like to book a private viewing")}
                className="text-[10px] px-2.5 py-1 rounded bg-white hover:bg-[#1F3A2E] hover:text-white text-[#1F3A2E] border border-[#1F3A2E]/15 transition-colors cursor-pointer"
              >
                Book a viewing
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedPrompt("I require a residential landlord valuation")}
                className="text-[10px] px-2.5 py-1 rounded bg-white hover:bg-[#1F3A2E] hover:text-white text-[#1F3A2E] border border-[#1F3A2E]/15 transition-colors cursor-pointer"
              >
                Request valuation
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedPrompt("I want to register my buyer search criteria")}
                className="text-[10px] px-2.5 py-1 rounded bg-white hover:bg-[#1F3A2E] hover:text-white text-[#1F3A2E] border border-[#1F3A2E]/15 transition-colors cursor-pointer"
              >
                Register as buyer
              </button>
            </div>
          )}

          {/* Input Area */}
          <div className="p-2.5 bg-white border-t border-[#1F3A2E]/15 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2"
            >
              <textarea
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isSending}
                className="flex-1 px-3 py-2 text-xs rounded-md border border-[#1F3A2E]/20 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:border-[#B08D57] resize-none max-h-20"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="h-8 w-8 rounded-md bg-[#1F3A2E] text-white hover:bg-[#162B22] disabled:opacity-40 flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5 text-[#B08D57]" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-[#222222]/50 mt-1.5 px-0.5">
              <span>Direct dispatch to n8n webhook</span>
              <a
                href="tel:+441618329400"
                className="text-[#1F3A2E] font-medium hover:underline flex items-center gap-1"
              >
                <Phone className="w-2.5 h-2.5 text-[#B08D57]" />
                <span>+44 (0) 161 832 9400</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
