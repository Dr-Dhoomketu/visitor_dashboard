import { useState } from "react";

interface Emp { id: string; name: string; email: string; phone: string; status: "Active" | "Inactive" }

const initial: Emp[] = [
  { id: "EMP-001", name: "Alice Johnson", email: "alice@fairtech.com", phone: "555-0101", status: "Active" },
  { id: "EMP-002", name: "Bob Smith", email: "bob@fairtech.com", phone: "555-0102", status: "Active" },
  { id: "EMP-003", name: "Carol White", email: "carol@fairtech.com", phone: "555-0103", status: "Active" },
  { id: "EMP-004", name: "David Lee", email: "david@fairtech.com", phone: "555-0104", status: "Active" },
  { id: "EMP-005", name: "Eva Brown", email: "eva@fairtech.com", phone: "555-0105", status: "Inactive" },
];

export default function Employee() {
  const [employees, setEmployees] = useState<Emp[]>(initial);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", status: "Active" as "Active" | "Inactive" });

  const nextId = () => `EMP-${String(employees.length + 1).padStart(3, "0")}`;

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase())
  );

  function handleSave() {
    if (!form.name.trim()) return;
    if (editId) {
      setEmployees(employees.map(e => e.id === editId ? { ...e, ...form } : e));
      setEditId(null);
    } else {
      setEmployees([...employees, { id: nextId(), ...form }]);
    }
    setForm({ name: "", email: "", phone: "", status: "Active" });
    setShowForm(false);
  }

  function handleEdit(e: Emp) {
    setEditId(e.id);
    setForm({ name: e.name, email: e.email, phone: e.phone, status: e.status });
    setShowForm(true);
  }

  function handleDelete(id: string) {
    setEmployees(employees.filter(e => e.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Employee</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage employee records.</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: "", email: "", phone: "", status: "Active" }); }}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          + Add Employee
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">{editId ? "Edit Employee" : "Add Employee"}</p>
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            {[["Employee Name", "name", "Full name"], ["Email", "email", "Email address"], ["Phone", "phone", "Phone number"]].map(([label, key, ph]) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={ph}
                  className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })}
                className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">Save</button>
            <button onClick={() => { setShowForm(false); setEditId(null); }} className="px-5 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Employee List</p>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400 w-48" />
        </div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100 bg-gray-50">
            {["Employee ID", "Employee Name", "Employee E-mail", "Employee Phone No.", "Status", "Action"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-blue-600">{e.id}</td>
                <td className="px-4 py-3 font-medium text-gray-700">{e.name}</td>
                <td className="px-4 py-3 text-gray-500">{e.email}</td>
                <td className="px-4 py-3 text-gray-500">{e.phone}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={e.status === "Active" ? { background: "#dcfce7", color: "#16a34a" } : { background: "#f3f4f6", color: "#6b7280" }}>
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(e)} className="px-3 py-1 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(e.id)} className="px-3 py-1 rounded-md text-[10px] font-semibold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-gray-400">No employees found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
