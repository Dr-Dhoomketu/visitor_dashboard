import { useVisitors } from "@/hooks/use-visitors";

export default function Approval() {
  const { visitors, approveVisitor, rejectVisitor } = useVisitors();

  const pendingCount = visitors.filter(v => v.status === "Pending").length;
  const approvedCount = visitors.filter(v => v.status === "Approved").length;
  const rejectedCount = visitors.filter(v => v.status === "Rejected").length;

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
        <h2 className="text-base font-bold text-gray-700">Access Approvals</h2>
        <p className="text-xs text-gray-400 mt-0.5">Review and manage visitor entry requests.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", count: pendingCount, bg: "#fef3c7", text: "#d97706", icon: "⏳" },
          { label: "Approved", count: approvedCount, bg: "#dcfce7", text: "#16a34a", icon: "✓" },
          { label: "Rejected", count: rejectedCount, bg: "#fee2e2", text: "#dc2626", icon: "✕" },
        ].map(({ label, count, bg, text, icon }) => (
          <div key={label} className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">{label} Requests</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{count}</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold" style={{ background: bg, color: text }}>
              {icon}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Visitor Requests</p>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {["Visitor Details", "Purpose", "Host", "Time", "Status", "Actions"].map(h => (
                <th key={h} className="px-5 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <p className="font-semibold text-gray-700">{visitor.name}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{visitor.id}</p>
                </td>
                <td className="px-5 py-3 text-gray-500">{visitor.purpose}</td>
                <td className="px-5 py-3 text-gray-500">{visitor.meetWith}</td>
                <td className="px-5 py-3 text-gray-500">{visitor.time}</td>
                <td className="px-5 py-3"><StatusBadge status={visitor.status} /></td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveVisitor(visitor.id)}
                      disabled={visitor.status !== "Pending"}
                      data-testid={`btn-approve-${visitor.id}`}
                      className="px-3 py-1.5 rounded-md text-[10px] font-semibold border transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={visitor.status === "Pending" ? { background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0" } : { background: "#f9fafb", color: "#9ca3af", borderColor: "#e5e7eb" }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectVisitor(visitor.id)}
                      disabled={visitor.status !== "Pending"}
                      data-testid={`btn-reject-${visitor.id}`}
                      className="px-3 py-1.5 rounded-md text-[10px] font-semibold border transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={visitor.status === "Pending" ? { background: "#fff1f2", color: "#dc2626", borderColor: "#fecaca" } : { background: "#f9fafb", color: "#9ca3af", borderColor: "#e5e7eb" }}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
