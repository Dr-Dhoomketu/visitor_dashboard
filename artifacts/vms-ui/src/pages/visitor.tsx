import { useVisitors } from "@/hooks/use-visitors";
import { useState } from "react";

export default function Visitor() {
  const { visitors } = useVisitors();
  const [search, setSearch] = useState("");

  const filtered = visitors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) || v.phone.includes(search) || v.id.includes(search)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Visitors</h2>
          <p className="text-xs text-gray-400 mt-0.5">Complete list of all visitors — past and present.</p>
        </div>
        <span className="text-xs text-gray-400">{visitors.length} total visitors</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, or ID..."
          className="w-full max-w-sm bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400" />
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100">
            {["Visitor ID", "Name", "Phone", "Email", "Host", "Purpose", "Date", "Status"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length > 0 ? filtered.map(v => (
              <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-blue-600">{v.id}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{v.name}</td>
                <td className="px-4 py-3 text-gray-500">{v.phone}</td>
                <td className="px-4 py-3 text-gray-500">{v.email}</td>
                <td className="px-4 py-3 text-gray-500">{v.meetWith}</td>
                <td className="px-4 py-3 text-gray-500">{v.purpose}</td>
                <td className="px-4 py-3 text-gray-500">{v.date}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={
                      v.status === "Approved" ? { background: "#dcfce7", color: "#16a34a" } :
                      v.status === "Rejected" ? { background: "#fee2e2", color: "#dc2626" } :
                      { background: "#fef3c7", color: "#d97706" }
                    }>{v.status}</span>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={8} className="text-center py-10 text-gray-400">No visitors found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
