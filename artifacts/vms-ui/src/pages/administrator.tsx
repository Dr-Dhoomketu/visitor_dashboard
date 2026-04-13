import { useState } from "react";

const initial = [
  { id: "ADM-001", name: "Security Admin", username: "secadmin", email: "admin@fairtech.com", role: "Super Admin", lastLogin: "Today, 09:00 AM", status: "Active" },
  { id: "ADM-002", name: "Reception Desk", username: "reception", email: "reception@fairtech.com", role: "Receptionist", lastLogin: "Today, 08:45 AM", status: "Active" },
  { id: "ADM-003", name: "Guard Station 1", username: "guard1", email: "guard1@fairtech.com", role: "Guard", lastLogin: "Yesterday, 10:00 PM", status: "Active" },
  { id: "ADM-004", name: "HR Coordinator", username: "hrcoord", email: "hr@fairtech.com", role: "HR Admin", lastLogin: "2 days ago", status: "Inactive" },
];

const roleColor: Record<string, { bg: string; text: string }> = {
  "Super Admin": { bg: "#faf5ff", text: "#7c3aed" },
  "Receptionist": { bg: "#eff6ff", text: "#2563eb" },
  "Guard": { bg: "#f0fdf4", text: "#16a34a" },
  "HR Admin": { bg: "#fff7ed", text: "#ea580c" },
};

export default function Administrator() {
  const [admins] = useState(initial);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Administrators</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage system users and their access roles.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          + Add Administrator
        </button>
      </div>

      {/* Role summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { role: "Super Admin", count: 1, color: "#7c3aed", bg: "#faf5ff" },
          { role: "Receptionist", count: 1, color: "#2563eb", bg: "#eff6ff" },
          { role: "Guard", count: 1, color: "#16a34a", bg: "#f0fdf4" },
          { role: "HR Admin", count: 1, color: "#ea580c", bg: "#fff7ed" },
        ].map(({ role, count, color, bg }) => (
          <div key={role} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
            <p className="text-xs font-medium text-gray-500">{role}</p>
            <p className="text-2xl font-bold mt-1" style={{ color }}>{count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">System Users</p>
        </div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100">
            {["ID", "Name", "Username", "Email", "Role", "Last Login", "Status"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {admins.map(a => {
              const r = roleColor[a.role] || { bg: "#f3f4f6", text: "#6b7280" };
              return (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-blue-600">{a.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold flex-shrink-0">
                        {a.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-semibold text-gray-700">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono">{a.username}</td>
                  <td className="px-4 py-3 text-gray-500">{a.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: r.bg, color: r.text }}>{a.role}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{a.lastLogin}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                      style={a.status === "Active" ? { background: "#dcfce7", color: "#16a34a" } : { background: "#f3f4f6", color: "#6b7280" }}>
                      {a.status}
                    </span>
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
