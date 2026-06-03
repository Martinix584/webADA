"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface ProductDetailModalProps {
  children: React.ReactNode;
}

export function ProductDetailModal({ children }: ProductDetailModalProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Trigger entering animation
  useEffect(() => {
    setMounted(true);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    // Animate out
    setMounted(false);
    setTimeout(() => {
      router.back();
    }, 200); // match duration-200
  }, [router]);

  // Close on Backdrop Click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (overlayRef.current === e.target) {
      handleClose();
    }
  };

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={containerRef}
        className={`relative w-full sm:max-w-3xl sm:my-8 bg-card/95 sm:rounded-2xl border-t sm:border border-DEFAULT shadow-2xl backdrop-blur-xl flex flex-col transition-all duration-300 ease-out max-h-[90vh] sm:max-h-[85vh] ${
          mounted
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-10 sm:translate-y-0 sm:scale-95 opacity-0"
        }`}
      >
        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-secondary/35 hover:bg-secondary/70 border border-DEFAULT hover:border-danger hover:text-danger text-foreground flex items-center justify-center transition-all duration-200"
          aria-label="Cerrar modal"
        >
          <X size={16} />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto p-6 md:p-10 pr-6 sm:pr-8 md:pr-10">
          {children}
        </div>
      </div>
    </div>
  );
}
