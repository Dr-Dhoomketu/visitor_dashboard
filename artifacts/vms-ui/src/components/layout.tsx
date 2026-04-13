import { Link, useLocation } from "wouter";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: "Dashboard", href: "/dashboard",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    name: "Department", href: "/department",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    name: "Designation", href: "/designation",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  },
  {
    name: "Employee", href: "/employee",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
  {
    name: "Visitor", href: "/visitor",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  },
  {
    name: "Pre-visitor", href: "/pre-visitor",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
  {
    name: "Administrator", href: "/administrator",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const currentPage = navigation.find(n => n.href === location)?.name || "Visitor Management";

  return (
    <div className="flex min-h-screen" style={{ background: "#ddeaf7" }}>
      {/* Sidebar — blue, matching reference */}
      <aside className="w-52 flex-shrink-0 hidden md:flex flex-col" style={{ background: "linear-gradient(180deg, #1e78e0 0%, #1565c0 100%)" }}>
        {/* Brand */}
        <div className="flex flex-col items-center py-6 px-4 border-b border-white/10">
          <p className="text-white font-bold text-base tracking-wide">Visitor Pass</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all"
                style={isActive
                  ? { background: "rgba(255,255,255,0.22)", color: "white" }
                  : { color: "rgba(255,255,255,0.82)" }
                }
              >
                <span style={{ opacity: isActive ? 1 : 0.8 }}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-2 py-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-100 shadow-sm">
          <h1 className="text-sm font-semibold text-gray-700">{currentPage}</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:block">Security Admin</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
