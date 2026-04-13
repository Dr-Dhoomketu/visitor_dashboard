import { useState } from "react";

interface User { id: string; name: string; email: string; department: string; designation: string; username: string }

const initial: User[] = [
  { id: "USR-001", name: "Security Admin", username: "secadmin", email: "admin@fairtech.com", department: "Management", designation: "Administrator" },
  { id: "USR-002", name: "Alice Johnson", username: "alicej", email: "alice@fairtech.com", department: "Human Resources", designation: "HR Manager" },
  { id: "USR-003", name: "Bob Smith", username: "bobs", email: "bob@fairtech.com", department: "Engineering", designation: "Tech Lead" },
  { id: "USR-004", name: "Reception Desk", username: "reception", email: "reception@fairtech.com", department: "Management", designation: "Receptionist" },
];

const departments = ["Management", "Human Resources", "Engineering", "Finance", "Marketing"];
const designations = ["Administrator", "HR Manager", "Tech Lead", "Receptionist", "Finance Analyst", "Software Engineer"];

export default function Administrator() {
  const [users, setUsers] = useState<User[]>(initial);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", username: "", email: "", department: "", designation: "" });

  const nextId = () => `USR-${String(users.length + 1).padStart(3, "0")}`;

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editId) {
      setUsers(users.map(u => u.id === editId ? { ...u, ...form } : u));
      setEditId(null);
    } else {
      setUsers([...users, { id: nextId(), ...form }]);
    }
    setForm({ name: "", username: "", email: "", department: "", designation: "" });
    setShowForm(false);
  }

  function handleEdit(u: User) {
    setEditId(u.id);
    setForm({ name: u.name, username: u.username, email: u.email, department: u.department, designation: u.designation });
    setShowForm(true);
  }

  function handleDelete(id: string) {
    setUsers(users.filter(u => u.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-700">Administrator</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage system users and access.</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: "", username: "", email: "", department: "", designation: "" }); }}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          + Add User
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">{editId ? "Edit User" : "Add User"}</p>
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            {[["User Name", "name", "Full name"], ["Username", "username", "Login username"], ["User E-mail", "email", "Email address"]].map(([label, key, ph]) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={ph}
                  className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Department</label>
              <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                <option value="">-- Select --</option>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Designation</label>
              <select value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })}
                className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
                <option value="">-- Select --</option>
                {designations.map(d => <option key={d}>{d}</option>)}
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
          <p className="text-sm font-semibold text-gray-700">User List</p>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400 w-48" />
        </div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-100 bg-gray-50">
            {["User ID", "User Name", "User E-mail", "Department", "Designation", "Action"].map(h => (
              <th key={h} className="px-5 py-3 text-left font-semibold text-gray-400 uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-semibold text-blue-600">{u.id}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold flex-shrink-0">
                      {u.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500">{u.email}</td>
                <td className="px-5 py-3 text-gray-500">{u.department}</td>
                <td className="px-5 py-3 text-gray-500">{u.designation}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(u)} className="px-3 py-1 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(u.id)} className="px-3 py-1 rounded-md text-[10px] font-semibold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-gray-400">No users found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
