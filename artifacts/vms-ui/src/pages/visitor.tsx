import { useVisitors } from "@/hooks/use-visitors";

export default function Visitor() {
  const { visitors } = useVisitors();

  // Group visitors by date
  const grouped = visitors.reduce((acc, v) => {
    const key = v.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(v);
    return acc;
  }, {} as Record<string, typeof visitors>);

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-gray-700">Visitor</h2>
        <p className="text-xs text-gray-400 mt-0.5">Complete visitor records organized by day.</p>
      </div>

      {sortedDates.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center text-sm text-gray-400">
          No visitor records found.
        </div>
      ) : (
        sortedDates.map(date => (
          <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-blue-50 flex items-center justify-between">
              <p className="text-xs font-bold text-blue-600">{new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              <span className="text-[10px] font-semibold text-blue-400">{grouped[date].length} visitor{grouped[date].length !== 1 ? "s" : ""}</span>
            </div>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-gray-100 bg-gray-50">
                {["Visitor ID", "Name", "Phone", "Email", "Host", "Purpose", "Time", "Status"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {grouped[date].map(v => (
                  <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-blue-600">{v.id}</td>
                    <td className="px-4 py-2.5 font-medium text-gray-700">{v.name}</td>
                    <td className="px-4 py-2.5 text-gray-500">{v.phone}</td>
                    <td className="px-4 py-2.5 text-gray-500">{v.email}</td>
                    <td className="px-4 py-2.5 text-gray-500">{v.meetWith}</td>
                    <td className="px-4 py-2.5 text-gray-500">{v.purpose}</td>
                    <td className="px-4 py-2.5 text-gray-400">{v.time}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                        style={
                          v.status === "Approved" ? { background: "#dcfce7", color: "#16a34a" } :
                          v.status === "Rejected" ? { background: "#fee2e2", color: "#dc2626" } :
                          { background: "#fef3c7", color: "#d97706" }
                        }>{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
