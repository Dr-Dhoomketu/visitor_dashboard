import { useState } from "react";

const initial = [
  { id: 1, title: "Software Engineer", department: "Engineering", level: "Mid" },
  { id: 2, title: "HR Manager", department: "Human Resources", level: "Senior" },
  { id: 3, title: "Product Manager", department: "Management", level: "Senior" },
  { id: 4, title: "Finance Analyst", department: "Finance", level: "Mid" },
  { id: 5, title: "Marketing Executive", department: "Marketing", level: "Junior" },
  { id: 6, title: "Tech Lead", department: "Engineering", level: "Senior" },
];

const levelColor: Record<string, { bg: string; text: string }> = {
  Junior: { bg: "#f0fdf4", text: "#16a34a" },
  Mid: { bg: "#eff6ff", text: "#2563eb" },
  Senior: { bg: "#faf5ff", text: "#7c3aed" },
};

export default function Designation() {
  const [designations, setDesignations] = useState(initial);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", department: "", level: "Junior" });

  const filtered = designations.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) || d.department.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    if (!form.title) return;
    setDesignations([...designations, { id: Date.now(), ...form }]);
    setForm({ title: "", department: "", level: "Junior" });
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Designations</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage job titles and designations across departments.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          + Add Designation
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">New Designation</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Job Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Senior Developer"
                className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Department</label>
              <input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} placeholder="e.g. Engineering"
                className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Level</label>
              <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                <option>Junior</option><option>Mid</option><option>Senior</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg">Save</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search designations..."
          className="w-full max-w-xs bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400" />
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100">
            {["#", "Job Title", "Department", "Level"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((d, i) => {
              const s = levelColor[d.level] || { bg: "#f3f4f6", text: "#6b7280" };
              return (
                <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">{d.title}</td>
                  <td className="px-4 py-3 text-gray-500">{d.department}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: s.bg, color: s.text }}>{d.level}</span>
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
