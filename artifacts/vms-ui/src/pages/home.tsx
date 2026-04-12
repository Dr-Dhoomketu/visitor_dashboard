import { Link } from "wouter";

function FairTechLogo() {
  return (
    <div className="flex flex-col items-center" style={{ width: 52 }}>
      <svg viewBox="0 0 60 52" width="42" height="36">
        <polygon points="30,2 58,50 2,50" fill="#2d6be4" />
        <polygon points="30,14 46,50 14,50" fill="#5b8cf5" />
        <polygon points="30,26 40,50 20,50" fill="#8db4fa" />
      </svg>
      <p style={{ fontSize: 7, letterSpacing: 1, color: "#555", fontWeight: 600, marginTop: 2, textTransform: "uppercase" }}>
        FAIR TECH SERVICES
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#ddeaf7" }}>
      {/* Top nav — matches reference exactly */}
      <header className="flex items-center justify-between px-10 py-3">
        <FairTechLogo />
        <nav className="flex items-center gap-12">
          <Link href="/schedule" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Have an Appointment
          </Link>
          <Link href="/previous-visits" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Been Here Before
          </Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Log in/Check in
          </Link>
        </nav>
      </header>

      {/* Hero — two column */}
      <main className="flex-1 flex items-center">
        <div className="w-full px-12 py-6 flex items-center justify-between gap-10">
          {/* Left */}
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-3" style={{ letterSpacing: 0.5 }}>Visitor Pass</p>
            <h1 className="font-bold text-gray-900 leading-tight mb-3" style={{ fontSize: 42 }}>
              Visitor Pass<br />Management System.
            </h1>
            <p className="text-sm text-gray-500">Welcome,Please tap on button to check-in</p>
          </div>

          {/* Right — office photo */}
          <div style={{ flexShrink: 0, width: "42%" }}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80"
              alt="Office team collaborating"
              style={{ width: "100%", borderRadius: 16, objectFit: "cover", maxHeight: 320, display: "block" }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
