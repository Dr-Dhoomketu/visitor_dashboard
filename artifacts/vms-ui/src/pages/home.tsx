import { Link } from "wouter";

function FairTechLogo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 52 }}>
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
  const options = [
    {
      href: "/schedule",
      label: "Schedule an Appointment",
      desc: "Pre-register and book a visit in advance",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d6be4" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
      ),
    },
    {
      href: "/previous-visits",
      label: "Previous Visits Log",
      desc: "Look up your past visit records",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d6be4" strokeWidth="2">
          <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      href: "/checkin",
      label: "Log In / Check In",
      desc: "Walk-in visitor check-in and registration",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d6be4" strokeWidth="2">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          <path d="M16 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#ddeaf7" }}>
      {/* Top nav */}
      <header className="flex items-center justify-between px-10 py-4">
        <FairTechLogo />
        <nav className="flex items-center gap-10">
          <Link href="/schedule" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Have an Appointment</Link>
          <Link href="/previous-visits" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Been Here Before</Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Log in/Check in</Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        <div className="w-full max-w-5xl flex items-start justify-between gap-12 mb-12">
          {/* Left text */}
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-2" style={{ letterSpacing: 0.5 }}>Visitor Pass</p>
            <h1 className="font-bold text-gray-900 leading-tight mb-3" style={{ fontSize: 40 }}>
              Visitor Pass<br />Management System.
            </h1>
            <p className="text-sm text-gray-500">Welcome, Please tap on button to check-in</p>
          </div>
          {/* Right photo */}
          <div style={{ flexShrink: 0, width: "44%" }}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80"
              alt="Office team collaborating"
              style={{ width: "100%", borderRadius: 16, objectFit: "cover", maxHeight: 300, display: "block" }}
            />
          </div>
        </div>

        {/* Three option cards */}
        <div className="w-full max-w-5xl grid grid-cols-3 gap-5">
          {options.map(({ href, label, desc, icon }) => (
            <Link key={href} href={href}>
              <div
                className="bg-white rounded-xl p-6 shadow-sm border border-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                style={{ textDecoration: "none" }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">{label}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
