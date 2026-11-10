import React from "react";
import { RouterProvider, useRouter } from "./context/RouterContext";
import { CookieProvider } from "./context/CookieContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { CookieBanner, CookieModal } from "./components/CookieBanner";
import { ChatWidget } from "./components/ChatWidget";

// Pages
import { HomePage } from "./pages/HomePage";
import { PropertiesPage } from "./pages/PropertiesPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { BuyersPage } from "./pages/BuyersPage";
import { TenantsPage } from "./pages/TenantsPage";
import { LandlordsPage } from "./pages/LandlordsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { EnquirePage } from "./pages/EnquirePage";
import { BookViewingPage } from "./pages/BookViewingPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { CookiesPage } from "./pages/CookiesPage";
import { DevPayloadTestPage } from "./pages/DevPayloadTestPage";

const AppContent: React.FC = () => {
  const { pathname } = useRouter();

  // Route resolver
  const renderRoute = () => {
    // 1. Developer Workbench (No public header/footer)
    if (pathname === "/dev/payload-test" || pathname === "/dev/payload-test/") {
      return <DevPayloadTestPage />;
    }

    // 2. Property detail: /properties/:slug
    if (pathname.startsWith("/properties/") && pathname !== "/properties" && pathname !== "/properties/") {
      const slug = pathname.replace(/^\/properties\//, "").replace(/\/$/, "");
      return <PropertyDetailPage slug={slug} />;
    }

    // 3. Static routes
    switch (pathname) {
      case "/":
        return <HomePage />;
      case "/properties":
      case "/properties/":
        return <PropertiesPage />;
      case "/buyers":
      case "/buyers/":
        return <BuyersPage />;
      case "/tenants":
      case "/tenants/":
        return <TenantsPage />;
      case "/landlords":
      case "/landlords/":
        return <LandlordsPage />;
      case "/about":
      case "/about/":
        return <AboutPage />;
      case "/contact":
      case "/contact/":
        return <ContactPage />;
      case "/enquire":
      case "/enquire/":
        return <EnquirePage />;
      case "/book-viewing":
      case "/book-viewing/":
        return <BookViewingPage />;
      case "/privacy":
      case "/privacy/":
        return <PrivacyPage />;
      case "/terms":
      case "/terms/":
        return <TermsPage />;
      case "/cookies":
      case "/cookies/":
        return <CookiesPage />;
      default:
        return <HomePage />;
    }
  };

  const isDevPage = pathname.startsWith("/dev/");

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E6] text-[#222222] font-sans antialiased">
      {!isDevPage && <Header />}
      
      <div className="flex-1">
        {renderRoute()}
      </div>

      {!isDevPage && <Footer />}
      {!isDevPage && <MobileBottomBar />}

      <CookieBanner />
      <CookieModal />
      <ChatWidget />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CookieProvider>
        <AppContent />
      </CookieProvider>
    </RouterProvider>
  );
}
