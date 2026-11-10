import React, { useState } from "react";
import { useCookieConsent } from "../context/CookieContext";
import { Link } from "../context/RouterContext";
import { Shield, X, Check, SlidersHorizontal } from "lucide-react";

export const CookieBanner: React.FC = () => {
  const {
    hasConsented,
    acceptAll,
    rejectNonEssential,
    openPreferencesModal
  } = useCookieConsent();

  if (hasConsented) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 bg-[#162B22] text-[#F5F0E6] p-5 rounded-lg shadow-2xl border border-[#B08D57]/40 transition-all animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start gap-3.5">
        <Shield className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-3">
          <div>
            <h2 className="text-sm font-serif font-bold text-white tracking-wide">
              Privacy &amp; Cookie Consent
            </h2>
            <p className="text-xs text-[#F5F0E6]/80 mt-1 leading-relaxed">
              We use essential cookies to operate our property search and enquiry services. We would also like your consent to use non-essential analytical cookies to improve our client service. Review our{" "}
              <Link to="/cookies" className="text-[#B08D57] underline hover:text-[#C5A46F]">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#B08D57] underline hover:text-[#C5A46F]">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={acceptAll}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#162B22] bg-[#B08D57] hover:bg-[#C5A46F] rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="px-3.5 py-1.5 text-xs font-medium text-[#F5F0E6] bg-white/10 hover:bg-white/20 rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={openPreferencesModal}
              className="px-3 py-1.5 text-xs font-medium text-[#B08D57] hover:underline flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Manage preferences</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export const CookieModal: React.FC = () => {
  const {
    isModalOpen,
    preferences,
    savePreferences,
    closePreferencesModal
  } = useCookieConsent();

  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [marketing, setMarketing] = useState(preferences.marketing);

  if (!isModalOpen) return null;

  const handleSave = () => {
    savePreferences(analytics, marketing);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="bg-[#FAF7F0] border border-[#1F3A2E]/20 text-[#222222] max-w-lg w-full rounded-lg shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#1F3A2E]/10">
          <h2 id="cookie-modal-title" className="font-serif text-lg font-bold text-[#1F3A2E]">
            Cookie Preferences
          </h2>
          <button
            type="button"
            onClick={closePreferencesModal}
            className="p-1 text-[#222222]/60 hover:text-[#222222] rounded transition-colors"
            aria-label="Close cookie modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs text-[#222222]/80 leading-relaxed">
          <p>
            Configure your cookie consent preferences below. You can update these settings at any time using the link in the footer.
          </p>

          {/* Strictly Necessary */}
          <div className="p-3 bg-white rounded border border-[#1F3A2E]/10 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1F3A2E]">Strictly Necessary Cookies</span>
                <span className="text-[10px] uppercase font-bold text-[#1F3A2E] bg-[#1F3A2E]/10 px-1.5 py-0.5 rounded">
                  Always Active
                </span>
              </div>
              <p className="text-[11px] text-[#222222]/70 mt-1">
                Required for core website security, session persistence, enquiry routing, and accessibility features.
              </p>
            </div>
            <div className="text-emerald-700 mt-1">
              <Check className="w-4 h-4" />
            </div>
          </div>

          {/* Performance & Analytics */}
          <div className="p-3 bg-white rounded border border-[#1F3A2E]/10 flex items-start justify-between gap-3">
            <div>
              <span className="font-semibold text-[#1F3A2E]">Analytical &amp; Performance Cookies</span>
              <p className="text-[11px] text-[#222222]/70 mt-1">
                Allows us to recognise and count visitor volumes and view anonymised traffic journeys to improve website speed and structure.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1F3A2E]"></div>
            </label>
          </div>

          {/* Marketing */}
          <div className="p-3 bg-white rounded border border-[#1F3A2E]/10 flex items-start justify-between gap-3">
            <div>
              <span className="font-semibold text-[#1F3A2E]">Targeting &amp; Marketing Cookies</span>
              <p className="text-[11px] text-[#222222]/70 mt-1">
                Used to deliver relevant property recommendations and track enquiry campaign attribution.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1F3A2E]"></div>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1F3A2E]/10">
          <button
            type="button"
            onClick={closePreferencesModal}
            className="px-4 py-2 text-xs font-medium text-[#222222] hover:bg-black/5 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1F3A2E] hover:bg-[#162B22] rounded transition-colors"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
};
