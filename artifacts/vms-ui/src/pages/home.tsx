import { Link } from "wouter";
import homeImg from "@assets/image_1776014062971.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#ddeaf7" }}>
      {/* Top nav */}
      <header className="flex items-center justify-between px-10 py-4 bg-white/60 backdrop-blur-sm border-b border-blue-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">Fair Tech Services</span>
        </div>
        <nav className="flex items-center gap-10">
          <Link href="/schedule" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Have an Appointment
          </Link>
          <Link href="/previous-visits" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Been Here Before
          </Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Log in/Check in
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-10 py-16 flex items-center justify-between gap-12">
          {/* Left text */}
          <div className="flex-1 max-w-xl">
            <p className="text-xs font-medium text-blue-500 uppercase tracking-widest mb-3">Visitor Pass</p>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5">
              Visitor Pass<br />Management System.
            </h1>
            <p className="text-sm text-gray-500 mb-10">
              Welcome, Please tap on button to check-in
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/checkin"
                data-testid="btn-home-checkin"
                className="px-7 py-3 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              >
                Log In / Check-In
              </Link>
              <Link
                href="/schedule"
                data-testid="btn-home-schedule"
                className="px-7 py-3 bg-white text-blue-600 text-sm font-semibold rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                Schedule Appointment
              </Link>
              <Link
                href="/previous-visits"
                data-testid="btn-home-history"
                className="px-7 py-3 bg-white text-gray-600 text-sm font-semibold rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Previous Visits
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="flex-shrink-0 w-[42%]">
            <img
              src={homeImg}
              alt="Office team"
              className="w-full rounded-2xl object-cover shadow-lg"
              style={{ maxHeight: 340 }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
