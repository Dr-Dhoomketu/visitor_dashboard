import { useState } from "react";

interface Desig { id: string; name: string; status: "Active" | "Inactive" }

const initial: Desig[] = [
  { id: "DES-001", name: "Software Engineer", status: "Active" },
  { id: "DES-002", name: "HR Manager", status: "Active" },
  { id: "DES-003", name: "Product Manager", status: "Active" },
  { id: "DES-004", name: "Finance Analyst", status: "Active" },
  { id: "DES-005", name: "Marketing Executive", status: "Inactive" },
  { id: "DES-006", name: "Tech Lead", status: "Active" },
];

export default function Designation() {
  const [designations, setDesignations] = useState<Desig[]>(initial);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", status: "Active" as "Active" | "Inactive" });

  const nextId = () => `DES-${String(designations.length + 1).padStart(3, "0")}`;

  const filtered = designations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase())
  );

  function handleSave() {
    if (!form.name.trim()) return;
    if (editId) {
      setDesignations(designations.map(d => d.id === editId ? { ...d, ...form } : d));
      setEditId(null);
    } else {
      setDesignations([...designations, { id: nextId(), ...form }]);
    }
    setForm({ name: "", status: "Active" });
    setShowForm(false);
  }

  function handleEdit(d: Desig) {
    setEditId(d.id);
    setForm({ name: d.name, status: d.status });
    setShowForm(true);
  }

  function handleDelete(id: string) {
    setDesignations(designations.filter(d => d.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Designation</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage job designations and titles.</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: "", status: "Active" }); }}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          + Add Designation
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">{editId ? "Edit Designation" : "Add Designation"}</p>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Designation Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Enter designation name"
                className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
            </div>
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
          <p className="text-sm font-semibold text-gray-700">Designation List</p>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400 w-48" />
        </div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100 bg-gray-50">
            {["Designation ID", "Designation Name", "Status", "Action"].map(h => (
              <th key={h} className="px-5 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-semibold text-blue-600">{d.id}</td>
                <td className="px-5 py-3 font-medium text-gray-700">{d.name}</td>
                <td className="px-5 py-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={d.status === "Active" ? { background: "#dcfce7", color: "#16a34a" } : { background: "#f3f4f6", color: "#6b7280" }}>
                    {d.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(d)} className="px-3 py-1 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(d.id)} className="px-3 py-1 rounded-md text-[10px] font-semibold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-gray-400">No designations found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
