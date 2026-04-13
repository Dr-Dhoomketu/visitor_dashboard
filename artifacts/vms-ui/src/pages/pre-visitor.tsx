import { useState } from "react";

interface PreV { id: string; name: string; email: string; phone: string; host: string; date: string; time: string; purpose: string; status: "Confirmed" | "Pending" | "Cancelled" }

const initial: PreV[] = [
  { id: "PRE-001", name: "Raj Kumar", email: "raj@example.com", phone: "555-1001", host: "Alice Johnson", date: "2026-04-14", time: "10:00 AM", purpose: "Interview", status: "Confirmed" },
  { id: "PRE-002", name: "Priya Sharma", email: "priya@example.com", phone: "555-1002", host: "Bob Smith", date: "2026-04-15", time: "02:30 PM", purpose: "Meeting", status: "Confirmed" },
  { id: "PRE-003", name: "James Wilson", email: "james@example.com", phone: "555-1003", host: "Carol White", date: "2026-04-16", time: "11:00 AM", purpose: "Vendor", status: "Pending" },
  { id: "PRE-004", name: "Maria Garcia", email: "maria@example.com", phone: "555-1004", host: "Reception", date: "2026-04-17", time: "09:00 AM", purpose: "Delivery", status: "Confirmed" },
  { id: "PRE-005", name: "Tom Chen", email: "tom@example.com", phone: "555-1005", host: "Alice Johnson", date: "2026-04-13", time: "03:00 PM", purpose: "Meeting", status: "Confirmed" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Confirmed: { bg: "#dcfce7", color: "#16a34a" },
  Pending: { bg: "#fef3c7", color: "#d97706" },
  Cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

export default function PreVisitor() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<PreV[]>([]);

  function handleSearch() {
    const filtered = initial.filter(p => {
      if (fromDate && p.date < fromDate) return false;
      if (toDate && p.date > toDate) return false;
      return true;
    });
    setResults(filtered);
    setSearched(true);
  }

  function handleReset() {
    setFromDate("");
    setToDate("");
    setSearched(false);
    setResults([]);
  }

  const displayList = searched ? results : initial;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-gray-700">Pre-Visitor</h2>
        <p className="text-xs text-gray-400 mt-0.5">Search and view pre-registered visitor reports by date.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Scheduled", count: initial.length, color: "#2563eb", bg: "#eff6ff" },
          { label: "Confirmed", count: initial.filter(p => p.status === "Confirmed").length, color: "#16a34a", bg: "#dcfce7" },
          { label: "Pending", count: initial.filter(p => p.status === "Pending").length, color: "#d97706", bg: "#fef3c7" },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-3xl font-bold mt-1" style={{ color }}>{count}</p>
          </div>
        ))}
      </div>

      {/* Date filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <p className="text-sm font-semibold text-gray-700 mb-4">Search Report by Date</p>
        <div className="flex items-end gap-4 flex-wrap">
          <div>
            <label className="block text-xs text-gray-500 mb-1">From Date</label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">To Date</label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <button onClick={handleSearch} className="px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
          {searched && (
            <button onClick={handleReset} className="px-5 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Reset
            </button>
          )}
        </div>
        {searched && (
          <p className="text-xs text-gray-400 mt-3">{results.length} record{results.length !== 1 ? "s" : ""} found{fromDate || toDate ? ` for selected date range` : ""}</p>
        )}
      </div>

      {/* Pre-visitor list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Pre-Visitor List</p>
        </div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100 bg-gray-50">
            {["ID", "Name", "Email", "Phone", "Host", "Date", "Time", "Purpose", "Status"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {displayList.length > 0 ? displayList.map(p => {
              const s = statusStyle[p.status];
              return (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-blue-600">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-700">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.email}</td>
                  <td className="px-4 py-3 text-gray-500">{p.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{p.host}</td>
                  <td className="px-4 py-3 text-gray-500">{p.date}</td>
                  <td className="px-4 py-3 text-gray-400">{p.time}</td>
                  <td className="px-4 py-3 text-gray-500">{p.purpose}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={s}>{p.status}</span>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan={9} className="text-center py-8 text-gray-400">No records found for the selected date range.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
