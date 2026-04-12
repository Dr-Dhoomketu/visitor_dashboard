import { useState } from "react";
import { useVisitors } from "@/hooks/use-visitors";

export default function PreviousVisits() {
  const { visitors } = useVisitors();
  const [search, setSearch] = useState("");

  const filtered = visitors.filter(v =>
    v.phone.includes(search) || v.name.toLowerCase().includes(search.toLowerCase())
  );

  function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, { bg: string; text: string }> = {
      Pending:  { bg: "#fef3c7", text: "#d97706" },
      Approved: { bg: "#dcfce7", text: "#16a34a" },
      Rejected: { bg: "#fee2e2", text: "#dc2626" },
    };
    const s = styles[status] || { bg: "#f3f4f6", text: "#6b7280" };
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: s.bg, color: s.text }}>
        {status}
      </span>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-gray-700">Been Here Before</h2>
        <p className="text-xs text-gray-400 mt-0.5">Look up returning visitor records by mobile number or name.</p>
      </div>

      {/* Search card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Search Records</p>
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by mobile number or name..."
            data-testid="input-search-history"
            className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Visit History</p>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {["Date & Time", "Name", "Phone", "Host", "Purpose", "Status"].map(h => (
                <th key={h} className="px-5 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((v) => (
                <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-medium text-gray-700">{v.date}</span>
                    <span className="text-gray-400 ml-1.5">{v.time}</span>
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-700">{v.name}</td>
                  <td className="px-5 py-3 text-gray-500">{v.phone}</td>
                  <td className="px-5 py-3 text-gray-500">{v.meetWith}</td>
                  <td className="px-5 py-3 text-gray-500">{v.purpose}</td>
                  <td className="px-5 py-3"><StatusBadge status={v.status} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  {search ? "No records match your search." : "No visit records found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
