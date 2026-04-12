import { Users, UserCheck, UserMinus, CalendarCheck, Activity } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { useVisitors } from "@/hooks/use-visitors";

const barData = [
  { name: "Mon", visitors: 42 }, { name: "Tue", visitors: 58 },
  { name: "Wed", visitors: 35 }, { name: "Thu", visitors: 61 },
  { name: "Fri", visitors: 70 }, { name: "Sat", visitors: 15 },
  { name: "Sun", visitors: 8 },
];

const pieData = [
  { name: "Meeting", value: 45 }, { name: "Interview", value: 25 },
  { name: "Delivery", value: 15 }, { name: "Personal", value: 10 }, { name: "Other", value: 5 },
];

const PIE_COLORS = ["#2196f3", "#4caf50", "#ff9800", "#9c27b0", "#f44336"];

function StatCard({ label, value, note, icon: Icon, color }: { label: string; value: number | string; note: string; icon: any; color: string }) {
  return (
    <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <div className="p-1.5 rounded-lg" style={{ background: color + "15" }}>
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{note}</p>
    </div>
  );
}

export default function Dashboard() {
  const { visitors } = useVisitors();
  const approvedVisitors = visitors.filter(v => v.status === "Approved");

  const statusColor: Record<string, string> = {
    Approved: "#16a34a", Pending: "#d97706", Rejected: "#dc2626",
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-gray-700">Security Dashboard</h2>
        <p className="text-xs text-gray-400 mt-0.5">Overview of today's visitor traffic and facility activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total Visitors" value={visitors.length} note="+12% from last week" icon={Users} color="#2196f3" />
        <StatCard label="Today's Visitors" value={24} note="+4 since last hour" icon={Activity} color="#9c27b0" />
        <StatCard label="Total Check-In" value={18} note="Currently on premise" icon={UserCheck} color="#4caf50" />
        <StatCard label="Total Check-Out" value={6} note="Departed today" icon={UserMinus} color="#f44336" />
        <StatCard label="Appointments" value={12} note="Pre-registered" icon={CalendarCheck} color="#ff9800" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-4">Visitor Traffic (Last 7 Days)</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} tick={{ fill: "#9ca3af" }} />
                <YAxis axisLine={false} tickLine={false} fontSize={11} tick={{ fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }}
                  cursor={{ fill: "#f0f4ff" }}
                />
                <Bar dataKey="visitors" fill="#2196f3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-4">Visit Purposes Breakdown</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent approved visitors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Recent Approved Visitors</p>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {["Visitor ID", "Name", "Host", "Purpose", "Time", "Status"].map(h => (
                <th key={h} className="px-5 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {approvedVisitors.slice(0, 5).map((v) => (
              <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-semibold text-blue-600">{v.id}</td>
                <td className="px-5 py-3 text-gray-700">{v.name}</td>
                <td className="px-5 py-3 text-gray-500">{v.meetWith}</td>
                <td className="px-5 py-3 text-gray-500">{v.purpose}</td>
                <td className="px-5 py-3 text-gray-500">{v.time}</td>
                <td className="px-5 py-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    Approved
                  </span>
                </td>
              </tr>
            ))}
            {approvedVisitors.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No approved visitors yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
