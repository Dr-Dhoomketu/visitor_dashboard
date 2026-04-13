import { useState } from "react";

const initial = [
  { id: "EMP-001", name: "Alice Johnson", department: "Human Resources", designation: "HR Manager", email: "alice@fairtech.com", phone: "555-0101", status: "Active" },
  { id: "EMP-002", name: "Bob Smith", department: "Engineering", designation: "Tech Lead", email: "bob@fairtech.com", phone: "555-0102", status: "Active" },
  { id: "EMP-003", name: "Carol White", department: "Management", designation: "Product Manager", email: "carol@fairtech.com", phone: "555-0103", status: "Active" },
  { id: "EMP-004", name: "David Lee", department: "Finance", designation: "Finance Analyst", email: "david@fairtech.com", phone: "555-0104", status: "Active" },
  { id: "EMP-005", name: "Eva Brown", department: "Marketing", designation: "Marketing Executive", email: "eva@fairtech.com", phone: "555-0105", status: "On Leave" },
];

export default function Employee() {
  const [employees] = useState(initial);
  const [search, setSearch] = useState("");

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Employees</h2>
          <p className="text-xs text-gray-400 mt-0.5">Directory of all company employees.</p>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-xs text-gray-400">{employees.length} total employees</span>
          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            + Add Employee
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, department or ID..."
          className="w-full max-w-sm bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400" />
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100">
            {["ID", "Name", "Department", "Designation", "Email", "Phone", "Status"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-blue-600">{e.id}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{e.name}</td>
                <td className="px-4 py-3 text-gray-500">{e.department}</td>
                <td className="px-4 py-3 text-gray-500">{e.designation}</td>
                <td className="px-4 py-3 text-gray-500">{e.email}</td>
                <td className="px-4 py-3 text-gray-500">{e.phone}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={e.status === "Active" ? { background: "#dcfce7", color: "#16a34a" } : { background: "#fef3c7", color: "#d97706" }}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
