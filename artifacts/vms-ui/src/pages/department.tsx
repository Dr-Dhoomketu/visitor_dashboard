import { useState } from "react";

const initial = [
  { id: 1, name: "Human Resources", code: "HR", head: "Alice Johnson", employees: 12 },
  { id: 2, name: "Engineering", code: "ENG", head: "Bob Smith", employees: 34 },
  { id: 3, name: "Management", code: "MGMT", head: "Carol White", employees: 8 },
  { id: 4, name: "Finance", code: "FIN", head: "David Lee", employees: 10 },
  { id: 5, name: "Marketing", code: "MKT", head: "Eva Brown", employees: 7 },
];

export default function Department() {
  const [departments, setDepartments] = useState(initial);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", head: "" });

  const filtered = departments.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.code.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    if (!form.name || !form.code) return;
    setDepartments([...departments, { id: Date.now(), name: form.name, code: form.code, head: form.head, employees: 0 }]);
    setForm({ name: "", code: "", head: "" });
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Departments</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage company departments and their heads.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          + Add Department
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">New Department</p>
          <div className="grid grid-cols-3 gap-4">
            {[["Department Name", "name", "e.g. Sales"], ["Code", "code", "e.g. SALES"], ["Head", "head", "Employee name"]].map(([label, key, ph]) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={ph}
                  className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg">Save</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search departments..."
          className="w-full max-w-xs bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400" />
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100">
            {["#", "Department", "Code", "Head", "Employees"].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{d.name}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-semibold">{d.code}</span></td>
                <td className="px-4 py-3 text-gray-500">{d.head}</td>
                <td className="px-4 py-3 text-gray-500">{d.employees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
