import { useState } from "react";

const initial = [
  { id: "PRE-001", name: "Raj Kumar", email: "raj@example.com", phone: "555-1001", host: "Alice Johnson", date: "2026-04-14", time: "10:00 AM", purpose: "Interview", status: "Confirmed" },
  { id: "PRE-002", name: "Priya Sharma", email: "priya@example.com", phone: "555-1002", host: "Bob Smith", date: "2026-04-15", time: "02:30 PM", purpose: "Meeting", status: "Confirmed" },
  { id: "PRE-003", name: "James Wilson", email: "james@example.com", phone: "555-1003", host: "Carol White", date: "2026-04-16", time: "11:00 AM", purpose: "Vendor", status: "Pending" },
  { id: "PRE-004", name: "Maria Garcia", email: "maria@example.com", phone: "555-1004", host: "Reception", date: "2026-04-17", time: "09:00 AM", purpose: "Delivery", status: "Confirmed" },
];

const statusStyle: Record<string, { bg: string; text: string }> = {
  Confirmed: { bg: "#dcfce7", text: "#16a34a" },
  Pending: { bg: "#fef3c7", text: "#d97706" },
  Cancelled: { bg: "#fee2e2", text: "#dc2626" },
};

export default function PreVisitor() {
  const [preVisitors] = useState(initial);
  const [search, setSearch] = useState("");

  const filtered = preVisitors.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Pre-Visitors</h2>
          <p className="text-xs text-gray-400 mt-0.5">Pre-registered visitors with scheduled appointments.</p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">{preVisitors.length} scheduled</span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Scheduled", count: preVisitors.length, color: "#2563eb", bg: "#eff6ff" },
          { label: "Confirmed", count: preVisitors.filter(p => p.status === "Confirmed").length, color: "#16a34a", bg: "#dcfce7" },
          { label: "Pending Confirmation", count: preVisitors.filter(p => p.status === "Pending").length, color: "#d97706", bg: "#fef3c7" },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-3xl font-bold mt-1" style={{ color }}>{count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pre-visitors..."
          className="w-full max-w-sm bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400" />
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100">
            {["ID", "Name", "Phone", "Host", "Date & Time", "Purpose", "Status"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(p => {
              const s = statusStyle[p.status] || { bg: "#f3f4f6", text: "#6b7280" };
              return (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-blue-600">{p.id}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{p.host}</td>
                  <td className="px-4 py-3 text-gray-500">{p.date} <span className="text-gray-400">{p.time}</span></td>
                  <td className="px-4 py-3 text-gray-500">{p.purpose}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: s.bg, color: s.text }}>{p.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
