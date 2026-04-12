import { useState } from "react";
import { useLocation } from "wouter";

export default function Webcam() {
  const [, setLocation] = useLocation();
  const [captured, setCaptured] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center gap-10 px-8" style={{ background: "#ddeaf7" }}>
      {/* Camera card */}
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center" style={{ width: 340 }}>
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Take Your Picture</h2>

        <div className="border-2 border-gray-300 rounded-sm flex items-center justify-center mb-8"
          style={{ width: 260, height: 190 }}>
          {captured ? (
            <div className="flex flex-col items-center gap-2">
              <svg className="text-green-500" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm font-medium text-green-600">Photo Captured!</p>
            </div>
          ) : (
            <svg className="text-gray-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          )}
        </div>

        <div className="flex gap-4">
          {!captured ? (
            <button
              onClick={() => setCaptured(true)}
              data-testid="btn-capture-photo"
              className="px-6 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Capture
            </button>
          ) : (
            <>
              <button
                onClick={() => setCaptured(false)}
                data-testid="btn-retake-photo"
                className="px-6 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Retake
              </button>
              <button
                onClick={() => setLocation("/dashboard")}
                data-testid="btn-proceed-checkin"
                className="px-6 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>

      {/* Visitor Pass card */}
      <div className="relative rounded-xl shadow-lg overflow-hidden flex-shrink-0" style={{ width: 200 }}>
        {/* Blue diagonal top */}
        <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)" }}>
          <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-full" style={{ background: "rgba(255,255,255,0.12)" }} />
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-tr-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <p className="text-white font-bold text-base z-10">Visitor Pass</p>
        </div>

        <div className="bg-white px-5 pb-6 pt-3">
          {/* Avatar */}
          <div className="flex justify-center mb-3 -mt-8">
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-md bg-blue-100 flex items-center justify-center overflow-hidden">
              {captured ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#90caf9" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              )}
            </div>
          </div>

          <h3 className="text-center font-bold text-blue-700 text-sm mb-3">John Doe</h3>

          <div className="space-y-1.5 text-xs text-gray-600">
            <p><span className="font-semibold">Email:</span> john@example.com</p>
            <p><span className="font-semibold">Phone:</span> (123) 456-7890</p>
            <p><span className="font-semibold">Company:</span> ABC Inc.</p>
            <p><span className="font-semibold">Address:</span> 123 Main St, City</p>
          </div>

          <p className="text-center text-blue-500 text-xs font-medium mt-4">VTS infosoft PVT LTD</p>
        </div>

        {/* Bottom blue stripe */}
        <div className="h-3" style={{ background: "linear-gradient(90deg, #1565c0, #42a5f5)" }} />
      </div>
    </div>
  );
}
