import { useState } from "react";
import { useLocation } from "wouter";

function GeometricCorner({ position }: { position: "top-right" | "bottom-left" }) {
  const isTop = position === "top-right";
  const transform = isTop ? "none" : "rotate(180deg)";

  return (
    <div
      style={{
        position: "absolute",
        ...(isTop ? { top: 0, right: 0 } : { bottom: 0, left: 0 }),
        width: 80,
        height: 80,
        transform,
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 80 80" width="80" height="80">
        <rect x="40" y="-10" width="60" height="18" rx="3" fill="#1565c0" transform="rotate(45 40 0)" />
        <rect x="52" y="2" width="48" height="14" rx="3" fill="#1976d2" transform="rotate(45 40 0)" />
        <rect x="64" y="14" width="38" height="11" rx="3" fill="#2196f3" transform="rotate(45 40 0)" />
        <rect x="76" y="26" width="28" height="9" rx="2" fill="#42a5f5" transform="rotate(45 40 0)" />
      </svg>
    </div>
  );
}

export default function Webcam() {
  const [, setLocation] = useLocation();
  const [captured, setCaptured] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: "32px 16px",
      }}
    >
      {/* Camera card */}
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: "28px 32px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 340,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 20, textAlign: "center" }}>
          Take Your Picture
        </h2>

        <div
          style={{
            border: "2px solid #333",
            width: 240,
            height: 170,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            background: captured ? "#f0fdf4" : "white",
          }}
        >
          {captured ? (
            <div style={{ textAlign: "center" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontSize: 12, color: "#16a34a", marginTop: 6, fontWeight: 600 }}>Photo Captured!</p>
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {!captured ? (
            <button
              onClick={() => setCaptured(true)}
              data-testid="btn-capture-photo"
              style={{
                padding: "8px 28px",
                border: "1.5px solid #bbb",
                borderRadius: 20,
                background: "white",
                fontSize: 13,
                color: "#555",
                cursor: "pointer",
              }}
            >
              Capture
            </button>
          ) : (
            <>
              <button
                onClick={() => setCaptured(false)}
                data-testid="btn-retake-photo"
                style={{
                  padding: "8px 22px",
                  border: "1.5px solid #bbb",
                  borderRadius: 20,
                  background: "white",
                  fontSize: 13,
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                Retake
              </button>
              <button
                onClick={() => setLocation("/dashboard")}
                data-testid="btn-proceed-checkin"
                style={{
                  padding: "8px 22px",
                  border: "1.5px solid #bbb",
                  borderRadius: 20,
                  background: "white",
                  fontSize: 13,
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>

      {/* Visitor Pass card */}
      <div
        style={{
          position: "relative",
          width: 200,
          background: "white",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        }}
      >
        <GeometricCorner position="top-right" />
        <GeometricCorner position="bottom-left" />

        {/* Pass header */}
        <div
          style={{
            padding: "18px 16px 12px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 0 }}>Visitor Pass</p>
        </div>

        {/* Circular avatar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "3px solid #e5e7eb",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        </div>

        <h3 style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: "#2563eb", marginBottom: 10 }}>
          John Doe
        </h3>

        <div style={{ padding: "0 16px", fontSize: 11, color: "#374151", lineHeight: 1.8 }}>
          <p><strong>Email:</strong> john@example.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Company:</strong> ABC Inc.</p>
          <p><strong>Address:</strong> 123 Main St, City</p>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#2563eb",
            fontWeight: 600,
            padding: "12px 0 16px",
          }}
        >
          VTS infosoft PVT LTD
        </p>
      </div>
    </div>
  );
}
