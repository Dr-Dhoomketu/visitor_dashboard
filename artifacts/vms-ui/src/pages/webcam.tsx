import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useVisitors } from "@/hooks/use-visitors";

function GeometricCorner({ position }: { position: "top-right" | "bottom-left" }) {
  const isTop = position === "top-right";
  return (
    <div
      style={{
        position: "absolute",
        ...(isTop ? { top: 0, right: 0 } : { bottom: 0, left: 0 }),
        width: 80,
        height: 80,
        transform: isTop ? "none" : "rotate(180deg)",
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
  const { pendingVisitor, confirmVisitorWithPhoto } = useVisitors();
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isNative = Capacitor.isNativePlatform();

  // Start web camera stream
  const startWebCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStreaming(true);
    } catch {
      alert("Camera access denied or unavailable.");
    }
  };

  const stopWebCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStreaming(false);
  };

  // Capture from web camera
  const captureWeb = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    setPhotoDataUrl(canvas.toDataURL("image/jpeg"));
    stopWebCamera();
  };

  // Capture using Capacitor Camera (iOS / Android)
  const captureNative = async () => {
    try {
      // Explicitly request camera permission before opening camera
      const { camera } = await Camera.requestPermissions({ permissions: ["camera"] });
      if (camera === "denied") {
        alert("Camera permission is required to capture visitor photos. Please enable it in your device settings.");
        return;
      }
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 85,
        width: 400,
      });
      if (photo.dataUrl) setPhotoDataUrl(photo.dataUrl);
    } catch {
      // user cancelled
    }
  };

  const handleCapture = () => {
    if (isNative) {
      captureNative();
    } else if (!streaming) {
      startWebCamera();
    } else {
      captureWeb();
    }
  };

  const handleRetake = () => {
    setPhotoDataUrl(null);
    if (!isNative) startWebCamera();
  };

  // Clean up stream on unmount
  useEffect(() => () => stopWebCamera(), []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
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

        {/* Preview area */}
        <div
          style={{
            border: "2px solid #333",
            width: 240,
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            background: "#f8fafc",
            overflow: "hidden",
            borderRadius: 4,
            position: "relative",
          }}
        >
          {photoDataUrl ? (
            <img src={photoDataUrl} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : streaming ? (
            <video ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted playsInline />
          ) : (
            <div style={{ textAlign: "center", color: "#94a3b8" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <p style={{ fontSize: 11, marginTop: 6 }}>
                {isNative ? "Tap Capture" : "Click to start camera"}
              </p>
            </div>
          )}
        </div>

        {/* Hidden canvas for web capture */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div style={{ display: "flex", gap: 16 }}>
          {!photoDataUrl ? (
            <button
              onClick={handleCapture}
              data-testid="btn-capture-photo"
              style={{
                padding: "8px 28px",
                border: "1.5px solid #bbb",
                borderRadius: 20,
                background: streaming ? "#2563eb" : "white",
                color: streaming ? "white" : "#555",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {streaming ? "Capture" : "Start Camera"}
            </button>
          ) : (
            <>
              <button
                onClick={handleRetake}
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
                onClick={() => {
                  confirmVisitorWithPhoto(photoDataUrl!);
                  setLocation("/dashboard");
                }}
                data-testid="btn-proceed-checkin"
                style={{
                  padding: "8px 22px",
                  border: "none",
                  borderRadius: 20,
                  background: "#2563eb",
                  color: "white",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Next →
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

        <div style={{ padding: "18px 16px 12px", textAlign: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>Visitor Pass</p>
        </div>

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
            {photoDataUrl ? (
              <img src={photoDataUrl} alt="Visitor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            )}
          </div>
        </div>

        <h3 style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: "#2563eb", marginBottom: 10 }}>
          {pendingVisitor?.name ?? "Visitor"}
        </h3>

        <div style={{ padding: "0 16px", fontSize: 11, color: "#374151", lineHeight: 1.8 }}>
          <p><strong>Email:</strong> {pendingVisitor?.email ?? "—"}</p>
          <p><strong>Phone:</strong> {pendingVisitor?.phone ?? "—"}</p>
          <p><strong>Meet:</strong> {pendingVisitor?.meetWith ?? "—"}</p>
          <p><strong>Purpose:</strong> {pendingVisitor?.purpose ?? "—"}</p>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "#2563eb", fontWeight: 600, padding: "12px 0 16px" }}>
          VTS infosoft PVT LTD
        </p>
      </div>
    </div>
  );
}
