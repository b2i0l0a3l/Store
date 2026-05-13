"use client";

import { useEffect } from "react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: "#0a0e1a", margin: 0 }}>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "24px",
        }}>
          <div style={{ maxWidth: "480px", textAlign: "center" }}>
            <div style={{
              fontSize: "64px",
              marginBottom: "24px",
            }}>⚠️</div>
            <h1 style={{
              color: "#f1f5f9",
              fontSize: "28px",
              fontWeight: 800,
              marginBottom: "12px",
            }}>
              An unexpected error occurred
            </h1>
            <p style={{
              color: "#94a3b8",
              fontSize: "16px",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}>
              Something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "12px 28px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                color: "white",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(59,130,246,0.3)",
              }}
            >
              retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
