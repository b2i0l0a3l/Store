"use client";

import { memo, useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import CardSection from "../Card/Card";
import { XMarkIcon } from "@heroicons/react/24/solid";

function CustomModal({
  children,
  title,
  icon,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---- Scroll Lock + Escape Key ---- */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  /* ---- Focus Trap ---- */
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const focusableElements =
      modal.querySelectorAll<HTMLElement>(focusableSelectors);
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    firstEl?.focus();

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    }

    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, []);

  const stopPropagation = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    [],
  );

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4
        animate-[fadeIn_200ms_ease-out_forwards]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        onClick={stopPropagation}
        className="w-full max-w-lg relative
          animate-[scaleIn_250ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          type="button"
          aria-label="Close"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <CardSection
          accentColor="bg-linear-to-r from-red-500 to-pink-500"
          title={title}
          icon={icon}
        >
          <form className="flex flex-col gap-5 mt-2">{children}</form>
        </CardSection>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body,
  );
}

export default memo(CustomModal);
