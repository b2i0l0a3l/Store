"use client";
import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { order } from "../Features/Orders/types";
import { fetchApi } from "./Api/Api";
import { useStore } from "../Features/Sells/store/store";
interface Props {
  clientId?: number;
  showButton?: boolean;
}

const InvoicePrinter = ({ clientId, showButton = true }: Props) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cart = useStore((state)=> state.cart)
  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      setError(null);
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
          setHtml(response.value.value || "");
        } else {
          setError("فشل في جلب الفاتورة من الخادم");
        }
      } catch (err) {
        console.error("Error fetching invoice:", err);
        setError("حدث خطأ أثناء الاتصال بالخادم");
      } finally {
        setLoading(false);
      }
    };

    if (clientId && cart.length > 0) {
      fetchInvoice();
    }
  }, [clientId, cart]);

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

  return (
    <div className="flex flex-col items-center w-full h-full">
      {showButton && (
        <button
          onClick={() => handlePrint()}
          disabled={loading || !!error || !html}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors mb-4 no-print shadow-md ${
            loading || !!error || !html
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <span role="img" aria-label="printer">🖨️</span>
          {loading ? "جاري التحميل..." : "طباعة الفاتورة"}
        </button>
      )}

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
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
            .print-container { width: 100%; direction: rtl; }
          `}
        </style>
      </div>
    </div>
  );
};

export default InvoicePrinter;