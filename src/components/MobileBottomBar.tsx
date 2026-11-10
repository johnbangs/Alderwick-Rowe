import React from "react";
import { Link } from "../context/RouterContext";
import { Phone, MessageSquarePlus } from "lucide-react";

export const MobileBottomBar: React.FC = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#1F3A2E] text-white border-t border-[#B08D57]/30 shadow-lg px-3 py-2 flex items-center justify-between gap-3 h-14"
      role="region"
      aria-label="Mobile quick actions"
    >
      <a
        href="tel:+441618329400"
        className="flex-1 flex items-center justify-center gap-2 h-10 px-3 rounded text-xs font-semibold uppercase tracking-wider text-[#F5F0E6] bg-[#162B22] border border-[#F5F0E6]/10 active:bg-[#11211A] transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-[#B08D57]" aria-hidden="true" />
        <span>Call</span>
      </a>

      <Link
        to="/enquire"
        className="flex-1 flex items-center justify-center gap-2 h-10 px-3 rounded text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] bg-[#B08D57] active:bg-[#91713F] transition-colors"
      >
        <MessageSquarePlus className="w-3.5 h-3.5 text-[#1F3A2E]" aria-hidden="true" />
        <span>Enquire</span>
      </Link>
    </div>
  );
};
