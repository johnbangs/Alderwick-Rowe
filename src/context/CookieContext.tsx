import React, { createContext, useContext, useState, useEffect } from "react";

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  consentedAt?: string;
}

interface CookieContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  isModalOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (analytics: boolean, marketing: boolean) => void;
  openPreferencesModal: () => void;
  closePreferencesModal: () => void;
}

const STORAGE_KEY = "ar_cookie_consent_v1";

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false
};

const CookieContext = createContext<CookieContextType | null>(null);

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return context;
};

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState<boolean>(true); // initially assume true to prevent flash, check in effect
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({
          essential: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
          consentedAt: parsed.consentedAt
        });
        setHasConsented(true);
      } else {
        setHasConsented(false);
      }
    } catch {
      setHasConsented(false);
    }
  }, []);

  const persist = (prefs: CookiePreferences) => {
    const data = { ...prefs, consentedAt: new Date().toISOString() };
    setPreferences(data);
    setHasConsented(true);
    setIsModalOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable
    }
  };

  const acceptAll = () => {
    persist({
      essential: true,
      analytics: true,
      marketing: true
    });
  };

  const rejectNonEssential = () => {
    persist({
      essential: true,
      analytics: false,
      marketing: false
    });
  };

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    persist({
      essential: true,
      analytics,
      marketing
    });
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        isModalOpen,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openPreferencesModal: () => setIsModalOpen(true),
        closePreferencesModal: () => setIsModalOpen(false)
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};
