"use client";
import React, { useRef, useState, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { fetchApi } from "./Api/Api";
import { useStore } from "../Features/Sells/store/store";
import { toast } from "@/store/useToastStore";

interface Props {
  clientId?: number;
  showButton?: boolean;
}

const InvoicePrinter = ({ clientId, showButton = true }: Props) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const cart = useStore((state) => state.cart);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Invoice_${new Date().toLocaleString("ar-MA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
  });

  const handleClick = useCallback(async () => {
    if (cart.length === 0) return;

    setLoading(true);
    try {
      const response = await fetchApi<any>("/Ivoice/html-invoice", {
        method: "POST",
        body: JSON.stringify({
          clientId: clientId ?? null,
          items: cart.map((i) => ({
            productName: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
        }),
      });

      if (response.succeeded && response.value) {
        const invoiceHtml =
          typeof response.value === "string"
            ? response.value
            : response.value.value || "";
        setHtml(invoiceHtml);
        setTimeout(() => handlePrint(), 100);
      }
    } catch {
      toast.error("Error fetching invoice");
    } finally {
      setLoading(false);
    }
  }, [cart, clientId, handlePrint]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      {showButton && (
        <button
          onClick={handleClick}
          disabled={loading || cart.length === 0}
          className={`flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg font-semibold text-xs transition-all duration-200 shadow-sm active:scale-[0.98] ${
            loading || cart.length === 0
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-500 text-white hover:shadow-violet-500/25 cursor-pointer"
          }`}
        >
          <span role="img" aria-label="printer" className="text-sm">
            🖨️
          </span>
          {loading ? "Loading..." : "Print"}
        </button>
      )}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <div
          ref={componentRef}
          className="print-container"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <style type="text/css" media="print">
          {`
            @page { size: auto; margin: 10mm; }
            body { margin: 0; }
            .no-print { display: none !important; }
            .print-container { width: 100%; direction: ltr; }
          `}
        </style>
      </div>
    </div>
  );
};

export default InvoicePrinter;
